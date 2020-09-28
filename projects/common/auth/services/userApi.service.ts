import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Api, ApiService, SnackbarService } from 'projects/common/api';
import { AuthConfig, AuthConfigService } from './auth-config.service';

@Injectable({
    providedIn: 'root'
})
export class UserApiService<T extends Api> extends ApiService<T> {

    constructor(httpClient: HttpClient, @Inject(AuthConfigService) config: AuthConfig, snackbarService: SnackbarService) {
        super(httpClient, { apiDomain: config.userApi }, snackbarService);
    }
}
