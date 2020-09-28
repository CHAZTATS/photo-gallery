import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiModule } from 'projects/common/api';
import { AuthModule } from 'projects/common/auth';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AccessDeniedComponent, CallbackComponent, HomeComponent, LoadingComponent, LoginComponent } from './components';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,

        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
    ],
    declarations: [
        AccessDeniedComponent,
        HomeComponent,
        LoginComponent,
        LoadingComponent,
        CallbackComponent,
    ],
    exports: [
        AccessDeniedComponent,
        HomeComponent,
        LoginComponent,
        LoadingComponent,
        CallbackComponent,
        StoreModule,
        EffectsModule,
    ]
})
export class CoreModule { }
