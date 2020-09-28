import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthConfig, AuthConfigService } from '../../services/auth-config.service';
import { AuthService } from '../../services/auth.service';
import { UserApiService } from '../../services/userApi.service';
import * as userActions from './user.actions';
import { GetPermissionsApi, UserApi } from './user.apis';

@Injectable()
export class UserEffects {
    constructor(
        @Inject(AuthConfigService) private config: AuthConfig,
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private api: UserApiService<UserApi>) { }

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType(userActions.UserActionTypes.Login),
        tap(() => {
            this.authService.login();
        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoginSuccess),
        tap(() => {
            // this.authService.login();
        })
    );

    @Effect({ dispatch: false })
    loginFail$ = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoginFail),
        tap(() => {
            this.router.navigateByUrl(this.config.redirectOnFail);
        })
    );

    @Effect()
    loadPermissions$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoadPermissions),
        mergeMap(() => this.api.request(new GetPermissionsApi()).pipe(
            map(permissions => new userActions.LoadPermissionsSuccess(permissions)),
            catchError(err => {
                return of(new userActions.LoadPermissionsFail(err));
            })
        ))
    );

    @Effect({ dispatch: false })
    loadPermissionsFail$ = this.actions$.pipe(
        ofType<userActions.Login>(userActions.UserActionTypes.LoadPermissionsFail),
        tap(() => {
            this.router.navigateByUrl(this.config.redirectOnFail);
        })
    );
}
