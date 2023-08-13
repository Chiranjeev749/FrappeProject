import { Book } from "./Books.model";
import { member } from "./member.models";

export interface transactions{
    id:number;
    book:Book;
    member:member;
    borrow_date;
    return_date
}