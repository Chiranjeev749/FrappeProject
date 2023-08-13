import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BooksApi,Book } from './Books.model';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { transactions } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  members=[];
  transactions=[];
  books=[];
  selectedBook:transactions|null=null;
  transactionhistory:any
  memberhistory:any
  setbook:Subject<Book | null> = new Subject()

  constructor(private http:HttpClient) {}
  // booklist(url):Observable<any>{
  //   console.log(url)
  //   return this.http.get<any>(url).pipe(map((res:any)=>{
  //     return { data:res};
  //   }))
  // }
  private baseUrl = 'http://localhost:8000/';

  getBooks(): Observable<any> {
    console.log("hello")
    return this.http.get(this.baseUrl + 'books/').pipe((map((res)=>{
      console.log(res,'res');
      this.books.push(res);
      return res;
   })));
  }

  getMembers(): Observable<any> {
    return this.http.get(this.baseUrl + 'members/').pipe((map((res)=>{
       this.members.push(res);
       return res;
    })))
  }

  addMembers(data):Observable<any>{
    return this.http.post(this.baseUrl+'members/',data).pipe(map((res)=>{
      console.log(res,"memebr");
      return res;
    }))
  }
  updateBook(data):Observable<any>{
    return this.http.put(this.baseUrl+'books/',data).pipe(
      (res:any)=>{
        return res;
      }
    );
  }
  updateMember(data):Observable<any>{
    return this.http.put(this.baseUrl+'members/',data).pipe(
      (res:any)=>{
        return res;
      }
    );
  }
  updateMemberHistory(data):Observable<any>{
    return this.http.put(this.baseUrl+'member-history/',data).pipe(
      (res:any)=>{
        return res;
      }
    );
  }
  addMemberTranaction(data):Observable<any>{
    return this.http.post(this.baseUrl+'member-transaction/',data).pipe(
      (res:any)=>{
        return res;
      }
    );
  }

  addTransaction(data:transactions):Observable<any>{
    return this.http.post(this.baseUrl+'transactions/',data).pipe(map((res)=>{
      console.log(res,"memebr");
      return res;
    }))
  }

  getTransactions(): Observable<any> {
    return this.http.get(this.baseUrl + 'transactions/').pipe((map((res)=>{
      this.transactions.push(res);
      return res;
    })))
  }
  getMemberByEmail(email: string) {
    return this.members.find(member => member.email === email);
  }

  getBookByBorrower(memberId: number) {
    return this.books.find(book => book.borrower === memberId);
  }
  SetBook(book){
    this.setbook = book;
    this.selectedBook.book = book;
  }

  issueBook(member: any, rentDurationInDays: number, book: any) {
    if (this.selectedBook) {
      this.selectedBook = this.selectedBook;
      this.selectedBook.member = member.id;
      this.selectedBook. borrow_date = new Date();
      this.selectedBook.return_date.setDate(this.selectedBook.return_date.getDate() + rentDurationInDays);
      this.addTransaction(this.selectedBook);
      this.selectedBook.book.available = false;
      this.updateBook(this.selectedBook.book);
      member.debt += 10 * rentDurationInDays;
      this.updateMember(member);
      this.memberhistory.member = member;
      this.transactionhistory.member = member;
      this.transactionhistory.book = this.selectedBook.book;
      this.transactionhistory.transaction_date = new Date();
      this.transactionhistory.action = "issue"
      this.memberhistory.issued_books.push(this.selectedBook.book.title);

      this.addMemberTranaction(this.transactionhistory);
      this.updateMemberHistory(this.memberhistory);
      
      return this.selectedBook.book;
  }
  return null;
}
  

  returnBook(book: any) {
    const borrowerId = book.borrower;
    if (borrowerId) {
      const borrower = this.members.find(member => member.id === borrowerId);
      if (borrower) {
        book.borrower = null;
        book.returnDate = null;
        borrower.returnedBooks.push(book.title);
        return true;
      }
    }
    return false;
  }
}