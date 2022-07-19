export interface Auth{
    id : string;
    message: string;
    userName: string;
    email: string;
    firstName : string;
    lastName : string;
    token : string;
    expire : string;
    isAuthenticated : boolean;
    image : string;
}