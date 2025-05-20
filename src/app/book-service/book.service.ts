import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookReview } from '../models/book-review';
import { BookRegister } from '../models/book-register';
import { SearchParams } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiBaseUrl: string = 'http://localhost:8080/api';
  
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  searchBooks(searchParams: SearchParams): Observable<Book[]> {
    const params = this.getSearchParams(searchParams);
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

  private getSearchParams(searchParams: SearchParams): HttpParams {
    return new HttpParams().set(searchParams.key, searchParams.value);
  }

}
