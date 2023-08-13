    import { Component, OnInit } from '@angular/core';
    import { Book, BooksApi } from '../Books.model';
    import { BookService } from '../book-service.service';
import { transactions } from '../transaction.model';
import { Router } from '@angular/router';

    @Component({
      selector: 'app-book-list',
      templateUrl: './book-list.component.html',
      styleUrls: ['./book-list.component.css']
    })
    export class BookListComponent implements OnInit {
      constructor(private service:BookService,private router:Router){}
      ngOnInit(): void {
        // this.fetchBooks(this.amount,this.title,this.authors,this.isbn,this.publisher);
        this.fetchBooks()
      }
      books:Book[]= [];
  //     frappeurl:string="https://frappe.io/api/method/frappe-library";
  //     amount:number = 20;
  //     title:any = "Harry Potter";
  //     authors:string;
  //     isbn:number;
  //     publisher:string;
  //     constructURL = (title?: string, authors?: string, isbn?: number, publisher?: string,page=1):string =>{
  //       let url = this.frappeurl+"?page="+page;
  //       if(title){
  //         url+="&title="+title
  //       }
  //       if(authors){
  //         url+="&authors="+authors
  //       }
  //       if(isbn){
  //         url+="&isbn="+isbn
  //       }
  //       if(publisher){
  //         url+="&publisher="+publisher
  //       }
  //       return url.replaceAll(" ","%20");
  //     }


  // fetchBooks = async (amount = 20, title: string | null, authors: string | null, isbn: number | null, publisher: string | null, page = 1) => {
  //     let amountFetched = 0;

  //     while (amountFetched < amount) {
  //         const url = this.constructURL(title, authors, isbn, publisher, page);

  //         const response = await this.service.booklist(url).toPromise();

  //         if (!response || response.length === 0) {
  //             // No more data to fetch, exit the loop
  //             break;
  //         }

  //         if (amountFetched + response.length > amount) {
  //             // Only fetch the remaining number of items needed
  //             response.splice(amount - amountFetched);
  //         }

  //         this.data.push(...response);
  //         amountFetched += response.length;
  //         page++;
  //     }
  // };
  showDetails = false;
  Selectedbook:Book;
  fetchBooks() {
    this.service.getBooks().subscribe(
      (res: any) => {
        if (Array.isArray(res)) {  
          this.books.push(...res);
          console.log(this.books, 'data');
        }
      }
    );
  }
  toggleBookDetails(book) {
    this.showDetails = !this.showDetails;
    this.Selectedbook = book;
    this.service.SetBook(book);
  }
  
    
    }
  

