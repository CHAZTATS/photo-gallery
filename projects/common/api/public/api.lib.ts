import { HttpHeaders, HttpParams } from '@angular/common/http';

export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Delete = 'Delete',
    Local = 'Local'
}

export interface Api {
    readonly config: ApiConfig;
}

export interface ApiConfig {
    requestType: Method;
    path: any;
    param?: string;
    body?: any;
    options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: any;
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: any;
        withCredentials?: boolean;
    };
}
