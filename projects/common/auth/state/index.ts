import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { userReducer, UserState } from './user/user.reducer';


export interface AuthState {
    users: UserState;
}

export const reducers: ActionReducerMap<AuthState> = {
    users: userReducer,
};

export const authState = createFeatureSelector<AuthState>('auth');

export * from './user/user.actions';
export * from './user/user.models';

const getUserState = createSelector(
    authState,
    state => state.users
);

export const getIsLoggedIn = createSelector(
    getUserState,
    state => state.isLoggedIn
);

export const getPermissions = createSelector(
    getUserState,
    state => state.permissions
);

export const getEmail = createSelector(
    getUserState,
    state => state.user?.email
);

export const getTenant = createSelector(
    getUserState,
    state => !!state.user ? state.user['https://statement.scryer.eu/connection'] : null
);

export const isAdmin = createSelector(
    getUserState,
    state => !!state.user ? state.user['https://statement.scryer.eu/roles'].includes('Admin') : false
);

export const getAuthError = createSelector(
    getUserState,
    state => state.error
);

// export const getAuthLoading = createSelector(
//     getUserState,
//     state => state.loading
// );
