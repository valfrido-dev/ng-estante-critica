import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { NgForOf, NgIf } from '@angular/common';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book';
import { RouterLink } from '@angular/router';

export interface SearchParams {
  key: string;
  value: string;
}


@Component({
  selector: 'app-home',
  imports: [
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatRadioModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchBooks: string = '';
  protected typeSearch: string;
  protected listTopFive: Book[];
  protected listTopFiveByFantasy: Book[];
  protected listTopFiveByRomance: Book[];
  protected listResultSearch: Book[];

  constructor(private bookService: BookService) {
    this.typeSearch = 'title';
    this.listTopFive = [];
    this.listTopFiveByFantasy = [];
    this.listTopFiveByRomance = [];
    this.listResultSearch = [];
  }

  ngOnInit(): void {
    this.loadTopFiveBooks();
    this.loadTopBooksByFantasy();
    this.loadTopBooksByRomance();
  }

  changeTypeSearch(): void {
    this.searchBooksAction();
  }

  searchBooksAction(): void {
    if (this.searchBooks !== null && this.searchBooks.trim().length > 0) {
      this.clearLists();
      const search: SearchParams = this.getSearchParams(this.typeSearch, this.searchBooks);
      this.bookService.searchBooks(search)
      .subscribe(resp => {
        this.listResultSearch = resp;
      });
    } else {
      this.loadTopFiveBooks();
      this.loadTopBooksByFantasy();
      this.loadTopBooksByRomance();
      this.listResultSearch = [];
    }
  }

  loadTopFiveBooks(): void {
    this.bookService.getBooks()
    .subscribe(resp => {
      this.listTopFive = this.getFirstFives(resp);
    });
  }

  loadTopBooksByFantasy(): void {
    const search: SearchParams = this.getSearchParams('category', 'fantasy');
    this.bookService.searchBooks(search)
    .subscribe(resp => {
      this.listTopFiveByFantasy = this.getFirstFives(resp);
    });
  }

  loadTopBooksByRomance(): void {
    const search: SearchParams = this.getSearchParams('category', 'romance');
    this.bookService.searchBooks(search)
    .subscribe(resp => {
      this.listTopFiveByFantasy = this.getFirstFives(resp);
    });
  }

  private clearLists(): void {
    this.listTopFive = [];
    this.listTopFiveByFantasy = [];
    this.listTopFiveByRomance = [];
    this.listResultSearch = [];
  }

  private getFirstFives(list: Book[]): Book[] {
    if (list !== null && list.length > 5) {
      return list.slice(0,5);
    }
    return list;
  }

  private getSearchParams(key: string, value: string): SearchParams {
    let searchParams: SearchParams = {
      key: key,
      value: value
    };
    return searchParams;
  }



}
