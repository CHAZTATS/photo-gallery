import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, shareReplay, tap } from 'rxjs/operators';
import { AuthState, LoginFail, SetUser } from '../state';
import { AuthConfig, AuthConfigService } from './auth-config.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    config = this.moduleConfig.auth0ClientOptions;

    get hasConfig() {
        return !!this.config;
    }
    // Create an observable of Auth0 instance of client
    auth0Client$ = (from(
        createAuth0Client({
            ...this.config,
            redirect_uri: `${window.location.origin}/callback`
        })
    ) as Observable<Auth0Client>).pipe(
        shareReplay(1), // Every subscription receives the same shared value
        catchError(err => {
            return throwError(err);
        })
    );
    // Define observables for SDK methods that return promises by default
    // For each Auth0 SDK method, first ensure the client instance is ready
    // concatMap: Using the client instance, call SDK method; SDK returns a promise
    // from: Convert that resulting promise into an observable
    isAuthenticated$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.isAuthenticated())),
        tap(res => this.loggedIn = res)
    );
    handleRedirectCallback$ = this.auth0Client$.pipe(
        concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
    );
    // Create subject and public observable of user profile data
    private userProfileSubject$ = new BehaviorSubject<any>(null);
    userProfile$ = this.userProfileSubject$.asObservable();
    // Create a local property for login status
    loggedIn: boolean = null;

    authSetupComplete = false;

    constructor(@Inject(AuthConfigService) private moduleConfig: AuthConfig, private router: Router, private store: Store<AuthState>) { }

    // When calling, options can be passed if desired
    // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
    getUser$(options?): Observable<any> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getUser(options))),
            tap(user => this.store.dispatch(new SetUser(user))),
            tap(user => this.userProfileSubject$.next(user))
        );
    }

    getTokenSilently$(options?): Observable<string> {
        return this.auth0Client$.pipe(
            concatMap((client: Auth0Client) => from(client.getTokenSilently(options))),
            shareReplay(1)
        );
    }

    localAuthSetup() {
        // This should only be called on app initialization
        // Set up local authentication streams
        this.authSetupComplete = false;
        const checkAuth$ = this.isAuthenticated$.pipe(
            concatMap((loggedIn: boolean) => {
                if (loggedIn) {
                    // If authenticated, get user and set in app
                    // NOTE: you could pass options here if needed
                    return this.getUser$();
                }
                // If not authenticated, return stream that emits 'false'
                return of(loggedIn);
            })
        );
        checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {

            // If authenticated, response will be user object
            // If not authenticated, response will be 'false'
            this.authSetupComplete = true;
            this.loggedIn = !!response;
        });
    }

    login(redirectPath: string = '/') {
        // A desired redirect path can be passed to login method
        // (e.g., from a route guard)
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log in
            client.loginWithRedirect({
                redirect_uri: `${window.location.origin}/callback`,
                appState: { target: redirectPath }
            });
        });
    }

    handleAuthCallback() {
        // Only the callback component should call this method
        // Call when app reloads after user logs in with Auth0
        let targetRoute: string; // Path to redirect to after login processsed
        const authComplete$ = this.handleRedirectCallback$.pipe(
            // Have client, now call method to handle auth callback redirect
            tap(cbRes => {
                // Get and set target redirect route from callback results
                targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
            }),
            concatMap(() => {
                // Redirect callback complete; get user and login status
                return combineLatest([
                    this.getUser$(),
                    this.isAuthenticated$
                ]);
            }),
            catchError(err => {
                console.log(err);
                this.store.dispatch(new LoginFail());
                return throwError(err);
            })
        );
        // Subscribe to authentication completion observable
        // Response will be an array of user and login status
        authComplete$.subscribe(([user, loggedIn]) => {
            // Redirect to target route after callback processing
            this.authSetupComplete = true;
            this.router.navigate([targetRoute]);
        });
    }

    logout() {
        // Ensure Auth0 client instance exists
        this.auth0Client$.subscribe((client: Auth0Client) => {
            // Call method to log out
            client.logout({
                client_id: this.config.client_id,
                returnTo: `${window.location.origin}/home`
            });
        });
    }

}
