export interface AuthResult {
    expiresIn: number;
    accessToken: string;
    idTokenPayload: string;
}

export interface Auth0User {
    'https://statement.scryer.eu/roles': string[];
    'https://statement.scryer.eu/connection': string;
    'https://statement.scryer.eu/username': string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    sub: string;
}
