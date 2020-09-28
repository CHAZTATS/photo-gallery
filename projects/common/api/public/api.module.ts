import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApiConfig, ApiConfigService } from '../internal/api-config.service';
import { ApiService } from './api.service';

@NgModule({
    imports: [
        CommonModule,
    ],
})
export class ApiModule {

    static forFeature(config: ApiConfig): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [
                {
                    provide: ApiConfigService,
                    useValue: config
                },
                ApiService,
            ],
        };
    }
}



