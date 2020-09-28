import { InjectionToken } from '@angular/core';

export interface ApiConfig {
    apiDomain: string;
}

export const ApiConfigService = new InjectionToken<ApiConfig>('ApiConfig');
