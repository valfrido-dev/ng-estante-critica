export interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    admin: boolean;
    books: string[];
    createDate: Date;
    updateDate: Date;
}

export interface NewUser {
    username: string;
    name: string;
    email: string;
    password: string;
}
