export interface Book {
    id: number;
    title: string;
    authors: string;
    isbn:any;
    publisher:any;
    available:boolean;
  }
export interface BooksApi {
  bookID: string;
  title: string;
  authors: string;
  average_rating: string;
  isbn: string;
  isbn13: string;
  language_code: string;
   num_pages: string;
  ratings_count: string;
  text_reviews_count: string;
  publication_date: string;
  publisher: string;
}  
  