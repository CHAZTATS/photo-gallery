import { Api, Method } from 'projects/common/api';

export type UserApi = GetPermissionsApi;

export class GetPermissionsApi implements Api {
    readonly config = {
        requestType: Method.Get,
        path: 'permissions',
    };
    constructor() { }
}
