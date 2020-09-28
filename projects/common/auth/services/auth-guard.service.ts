import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthorisorService, IAuthorisable } from './authorisor.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authorisorService: AuthorisorService
    ) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
        if (this.authorisorService.permissions.length < 1) {
            this.router.navigateByUrl('/loading');
        } else {
            return this.isAuthorisedToViewRoute(activatedRouteSnapshot.data['permissions']).pipe(
                map((isAuthorisedToViewRoute) => {
                    if (isAuthorisedToViewRoute) {
                        return true;
                    } else {
                        this.router.navigateByUrl('/access-denied');
                    }
                }));
        }
    }

    isAuthorisedToViewRoute(permissions: IAuthorisable[]): Observable<boolean> {
        if (!permissions) {
            return of(true);
        }
        for (const permission of permissions) {
            if (this.authorisorService.authorise(permission)) {
                return of(true);
            }
        }
        return of(false);
    }
}
