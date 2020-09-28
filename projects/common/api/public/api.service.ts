import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfig, ApiConfigService } from '../internal/api-config.service';
import { retryWithBackoff } from '../internal/retryWhen';
import { Api } from './api.lib';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'any'
})
export class ApiService<T extends Api> {

    constructor(private httpClient: HttpClient, @Inject(ApiConfigService) private config: ApiConfig, private snackbarService: SnackbarService) { }

    public request(api: T): Observable<any> {
        const path = this.generateUrl(api);

        switch (api.config.requestType) {
            case 'Get': return this.httpClient.get(path, api.config.options).pipe(retryWithBackoff(1000), catchError(this.showError));
            case 'Put': return this.httpClient.put(path, api.config.body, api.config.options).pipe(retryWithBackoff(1000), catchError(this.showError));
            case 'Post': return this.httpClient.post(path, api.config.body, api.config.options).pipe(retryWithBackoff(1000), catchError(this.showError));
            case 'Delete': return this.httpClient.delete(path, api.config.options).pipe(retryWithBackoff(1000), catchError(this.showError));
            case 'Local': return this.httpClient.get(`../../${api.config.path}`).pipe(retryWithBackoff(1000), catchError(this.showError));
        }
    }

    private generateUrl(api: T): string {
        const fullPath = `${this.config.apiDomain}/${api.config.path}`;
        return api.config.param ? `${fullPath}/${api.config.param}` : fullPath;
    }

    private showError = (err: any) => {
        if (err instanceof HttpErrorResponse) {
            this.snackbarService.display(err.error || 'An Error has Occurred, Please Try Again.');
        }
        return throwError(err);
    }
}

