import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { resetState } from 'src/app/core/state/navigation/navigation.actions';
import { State } from './../../../src/app/state';

@Injectable({
    providedIn: 'root'
})
export class ForbiddenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private store: Store<State>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401 && err.status !== 403) {
                        return;
                    }
                    this.store.dispatch(resetState());
                    this.router.navigate(['access-denied']);
                }
            }));
    }
}
