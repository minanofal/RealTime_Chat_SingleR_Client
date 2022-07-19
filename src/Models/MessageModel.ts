export interface Message{
    Id : string;
    senderUserName :string;
    messageText :string;
    createdAt : Date;
    seen : boolean;
}