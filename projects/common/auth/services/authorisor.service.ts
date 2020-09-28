import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';
import { AuthState, getPermissions } from '../state';
import { Permission } from '../state/user/user.models';

export interface IAuthorisable {
    operation: string;
    officeId?: string;
}
@Injectable()
export class AuthorisorService implements OnDestroy {
    public permissionsReoloaded$ = new Subject<boolean>();
    private isActive = true;
    private permissions$: Observable<Permission[]>;
    permissions: Permission[] = [];

    constructor(private store: Store<AuthState>) {
        this.permissions$ = this.store.pipe(
            select(getPermissions),
            filter(p => !!p),
            takeWhile((p) => this.isActive)
        );
        this.permissions$.subscribe(p => {
            this.permissions = p;
        });
    }

    authorise(permission: IAuthorisable): boolean {
        if (!!permission.officeId) {
            return this.permissions.some((p) =>
                p.operation.value === permission.operation
                && (p.officeId === permission.officeId || p.global)
            );
        } else {
            return this.permissions.some((p) => p.operation.value === permission.operation) || !permission.operation;
        }
    }

    ngOnDestroy() {
        this.isActive = false;
    }
}

