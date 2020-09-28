import { InjectionToken } from '@angular/core';

export interface AuthConfig {
    auth0ClientOptions: any;
    userApi: string;
    redirectOnFail: string;
}

export const AuthConfigService = new InjectionToken<AuthConfig>('AuthConfig');
