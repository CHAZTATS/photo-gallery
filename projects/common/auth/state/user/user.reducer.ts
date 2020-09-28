import { Auth0User } from '../../auth.models';
import { UserActions, UserActionTypes } from './user.actions';
import { Permission } from './user.models';

export interface UserState {
    user: Auth0User;
    isLoggedIn: boolean;
    permissions: Permission[];
    loading: boolean;
    error: string;
}

export const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    permissions: null,
    error: '',
    loading: false,
};

export function userReducer(state = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.SetUser:
            return {
                ...state,
                user: action.user
            };

        case UserActionTypes.LogoutFail:
            return {
                ...state,
                user: null
            };

        case UserActionTypes.Login:
            return {
                ...state,
                loading: true,
                error: ''
            };

        case UserActionTypes.LoginSuccess:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                error: ''
            };

        case UserActionTypes.LoginFail:
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: 'true'
            };

        case UserActionTypes.LoadPermissions:
            return {
                ...state,
                loading: true,
                error: ''
            };

        case UserActionTypes.LoadPermissionsSuccess:
            return {
                ...state,
                permissions: action.payload,
                loading: false,
                error: ''
            };

        case UserActionTypes.LoadPermissionsFail:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                error: 'true'
            };

        case UserActionTypes.Logout:
            return {
                ...state,
                loading: true,
                error: ''
            };

        case UserActionTypes.LogoutSuccess:
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                error: ''
            };

        case UserActionTypes.LogoutFail:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
}
