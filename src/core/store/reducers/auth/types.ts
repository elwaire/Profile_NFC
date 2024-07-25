export type AuthState = {
    loading: boolean;
    user:User | null;
}

type User = {
    displayName: string;
    email: string;
}