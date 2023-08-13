import { Component } from '@angular/core';
import { BookService } from '../book-service.service';
import { Book } from '../Books.model';
import { transactions } from '../transaction.model';
import { member } from '../member.models';

@Component({
  selector: 'app-book-rental',
  templateUrl: './book-rental.component.html',
  styleUrls: ['./book-rental.component.css']
})
export class BookRentalComponent {
  memberName: string = '';
  memberEmail: string = '';
  selectedBook:Book;

  constructor(private bookService: BookService) {
    this.selectedBook = this.bookService.selectedBook.book;
  }
  members:member[] =[];
  transactions:transactions[]=[];

  ngOnInit(){
    this.bookService.getMembers().subscribe(
      (res:any)=>{
        this.members = res;
        return res;
      }
    );
    this.bookService.getTransactions().subscribe(
      (res:any)=>{
        this.transactions = res;
        return res;
      }
    );
  }

  issueBook() {
    const member = this.bookService.getMemberByEmail(this.memberEmail);
    if (!member) {
      console.log('Member not found');
      return;
    }
  
    const rentalFee = 10; // 10 Rs per day
    const rentDurationInDays = 7; // Assume renting for 7 days
    const totalRent = rentalFee * rentDurationInDays;
  
    if (member.debt + totalRent > 500) {
      console.log('Debt limit exceeded');
      return;
    }
  
    member.debt += totalRent;
  
    const book = this.bookService.issueBook(member,  rentDurationInDays,this.selectedBook);
    if (book) {
      console.log(`Book '${book.title}' issued to ${this.memberName}`);
    }
  }
  
  memberhistory;
  transactionhistory
  returnBook() {
    const member = this.bookService.getMemberByEmail(this.memberEmail);
    if (!member) {
      console.log('Member not found');
      return;
    }
    this.memberhistory.member = member;
    this.memberhistory.returned_books = this.selectedBook;
    

    const rentalFee = 10; 
    const book = this.bookService.getBookByBorrower(member.id);
    if (book) {
      const returnDate = new Date(book.returnDate);
      const currentDate = new Date();
      const daysLate = Math.max(0, Math.floor((currentDate.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24)));

      const fine = daysLate * rentalFee;
      this.transactionhistory.book = this.selectedBook;
      this.transactionhistory.member = member;
      this.transactionhistory.action = "return";
      this.transactionhistory.transaction_date = new Date();

      if (fine > member.debt) {
        member.debt = 0;
      } else {
        member.debt -= fine;
      }
      this.bookService.updateMember(member);
      this.bookService.returnBook(book);
      this.bookService.updateMemberHistory(this.memberhistory).subscribe();
      this.bookService.addMemberTranaction(this.transactionhistory).subscribe();

      console.log(`Book '${book.title}' returned by ${this.memberName}`);
    } else {
      console.log('No book found or book not returned yet');
    }
  }
}
