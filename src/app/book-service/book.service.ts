import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookReview } from '../models/book-review';
import { BookRegister } from '../models/book-register';
import { SearchParams } from '../home/home.component';
import { BookLibrary } from '../models/book-library';

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

  bookRegister(newBook: BookRegister): Observable<Book> {
    return this.http.post<Book>(this.apiBaseUrl + '/books/book/register', newBook, {headers: this.headers}
  )};

  getBookReviews(bookId: string): Observable<BookReview[]> {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<BookReview[]>(this.apiBaseUrl + '/book/review/list', {headers: this.headers, params: params}
  )};

  saveBookReview(bookId: string, numberRating: number, comments: string): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/book/review/new',
    {bookId: bookId, numberRating: numberRating, comments: comments}, {headers: this.headers}
  )};

  getBooksInLibraryUser(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiBaseUrl + '/library/list', {headers: this.headers}
  )};

  hasBookInLibraryUser(bookId: string, title: string = ''): Observable<BookLibrary> {
    const bookLibrary: BookLibrary = {
      bookId: bookId,
      bookTitle: title,
      hasBook: false
    };
    return this.http.post<BookLibrary>(this.apiBaseUrl + '/library/user/hasBook', bookLibrary, {headers: this.headers}
  )};

  addBookInLibraryUser(bookId: string, title: string = '', hasBook: boolean = false): Observable<BookLibrary> {
    const bookLibrary: BookLibrary = {
      bookId: bookId,
      bookTitle: title,
      hasBook: hasBook
    };
    return this.http.post<BookLibrary>(this.apiBaseUrl + '/library/user/book/add', bookLibrary, {headers: this.headers}
  )};

  removeBookInLibraryUser(bookId: string, title: string = '', hasBook: boolean = true): Observable<BookLibrary> {
    const bookLibrary: BookLibrary = {
      bookId: bookId,
      bookTitle: title,
      hasBook: hasBook
    };
    return this.http.post<BookLibrary>(this.apiBaseUrl + '/library/user/book/remove', bookLibrary, {headers: this.headers}
  )};

  private getSearchParams(searchParams: SearchParams): HttpParams {
    return new HttpParams().set(searchParams.key, searchParams.value);
  }

}
