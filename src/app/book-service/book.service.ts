import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookReview } from '../models/book-review';
import { BookRegister } from '../models/book-register';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl: string = 'http://localhost:8080/api';
  
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  searchBooks(title: string, category: string): Observable<Book[]> {
    const params = this.getSearchParams(title, category);
    return this.http.get<Book[]>(this.apiBaseUrl + '/books/find', {headers: this.headers, params: params}
  )};

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiBaseUrl + '/books/list', {headers: this.headers}
  )};

  getBook(bookId: string): Observable<Book> {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(this.apiBaseUrl + '/books/book', {headers: this.headers, params: params}
  )};

  bookRegister(newBook: BookRegister): Observable<string> {
    return this.http.post<string>(this.apiBaseUrl + '/books/book/register', newBook, {headers: this.headers}
  )};

  getBookReviews(bookId: string): Observable<BookReview[]> {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<BookReview[]>(this.apiBaseUrl + '/book/review/list', {headers: this.headers, params: params}
  )};

  saveBookReview(bookId: string, numberRating: number, comments: string): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/book/review/new',
    {bookId: bookId, numberRating: numberRating, comments: comments}, {headers: this.headers}
  )};

  private getSearchParams(title: string, category: string): HttpParams {

    if (title !== null && title.trim().length > 0 &&
          category !== null && category.trim().length > 0) {
      return new HttpParams().set('title', title).set('category', category);
    
    }


    if (title !== null && title.trim().length > 0) {
      return new HttpParams().set('title', title);
    }

    if (category !== null && category.trim().length > 0) {
      return new HttpParams().set('category', category);
    }
    return new HttpParams();
  }

}
