import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthInterceptor } from './auth.interceptor';
import { AuthoriseDirective } from './authorise.directive';
import { AuthConfig, AuthConfigService } from './services/auth-config.service';
import { AuthService } from './services/auth.service';
import { AuthorisorService } from './services/authorisor.service';
import { reducers } from './state';
import { UserEffects } from './state/user/user.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forFeature([UserEffects])
    ],
})
export class AuthModule {

    static forRoot(config: AuthConfig): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                {
                    provide: AuthConfigService,
                    useValue: config
                },
                AuthService,
                AuthorisorService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                }
            ],
        };
    }
}


@NgModule({
    declarations: [
        AuthoriseDirective
    ],
    exports: [
        AuthoriseDirective
    ]
})
export class SharedAuthModule { }

