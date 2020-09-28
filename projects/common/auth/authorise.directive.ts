import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { AuthorisorService, IAuthorisable } from './services/authorisor.service';
import { AuthState, getPermissions } from './state';

@Directive({
    selector: '[authorise]'
})
export class AuthoriseDirective implements OnInit, OnDestroy {

    private staticPermissions: IAuthorisable[] = [];
    private isActive = true;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorisorSrv: AuthorisorService,
        private store: Store<AuthState>) {
    }

    ngOnInit() {
        this.store.pipe(
            select(getPermissions),
            takeWhile(x => this.isActive)
        ).subscribe(() => this.isVisible());
    }

    @Input() set authorise(permissions) {
        this.staticPermissions = permissions;
    }

    isVisible() {
        this.viewContainer.clear();
        if (this.staticPermissions.every(x => !x.operation)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        for (const permission of this.staticPermissions) {
            if (!permission.operation) { continue; }
            const canView = this.authorisorSrv.authorise(permission);
            if (canView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return;
            }
        }
    }

    ngOnDestroy() {
        this.isActive = false;
    }
}
