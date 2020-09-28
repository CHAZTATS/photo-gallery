import { Action } from '@ngrx/store';
import { Permission } from './user.models';

export enum UserActionTypes {
    Login = '[User] Login',
    LoginSuccess = '[User] Login Success',
    LoginFail = '[User] Login Fail',
    Logout = '[User] Logout',
    LogoutSuccess = '[User] Logout Success',
    LogoutFail = '[User] Logout Fail',
    LoadPermissions = '[User] Load Permissions',
    LoadPermissionsSuccess = '[User] Load Permissions Success',
    LoadPermissionsFail = '[User] Load Permissions Fail',
    SetUser = 'SetUser',
    RemoveUser = 'RemoveUser'
}

export class Login implements Action {
    readonly type = UserActionTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = UserActionTypes.LoginSuccess;
}

export class LoginFail implements Action {
    readonly type = UserActionTypes.LoginFail;
}

export class Logout implements Action {
    readonly type = UserActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = UserActionTypes.LogoutSuccess;
}

export class LogoutFail implements Action {
    readonly type = UserActionTypes.LogoutFail;

    constructor(public error: string) { }
}

export class LoadPermissions implements Action {
    readonly type = UserActionTypes.LoadPermissions;
}

export class LoadPermissionsSuccess implements Action {
    readonly type = UserActionTypes.LoadPermissionsSuccess;
    constructor(public payload: Permission[]) { }
}

export class LoadPermissionsFail implements Action {
    readonly type = UserActionTypes.LoadPermissionsFail;
    constructor(public error: string) { }
}

export class SetUser implements Action {
    readonly type = UserActionTypes.SetUser;
    constructor(public user: any) { }
}

export class RemoveUser implements Action {
    readonly type = UserActionTypes.RemoveUser;
    constructor() { }
}

export type UserActions =
    | Login
    | LoginSuccess
    | LoginFail
    | Logout
    | LogoutSuccess
    | LogoutFail
    | LoadPermissions
    | LoadPermissionsSuccess
    | LoadPermissionsFail
    | SetUser
    | RemoveUser;
