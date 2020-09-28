export * from './user.apis';

export interface Permission {
    id: string;
    roleId: string;
    officeId: string;
    global: boolean;
    operation: Operation;
}

export interface Operation {
    type: string;
    value: string;
}
