import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book';
import { RouterLink } from '@angular/router';

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
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchBooks: string = '';
  protected listTopFive: Book[];
  protected listTopFiveByFantasy: Book[];
  protected listTopFiveByRomance: Book[];
  protected listResultSearch: Book[];

  constructor(private bookService: BookService) { 
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

  searchBooksAction(): void {
    if (this.searchBooks !== null && this.searchBooks.trim().length > 0) {
      this.bookService.searchBooks(this.searchBooks, '')
      .subscribe(resp => {
        this.listResultSearch = resp;
        this.listTopFive = [];
        this.listTopFiveByFantasy = [];
        this.listTopFiveByRomance = [];
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
    this.bookService.searchBooks('', 'fantasy')
    .subscribe(resp => {
      this.listTopFiveByFantasy = this.getFirstFives(resp);
    });
  }

  loadTopBooksByRomance(): void {
    this.bookService.searchBooks('', 'romance')
    .subscribe(resp => {
      this.listTopFiveByFantasy = this.getFirstFives(resp);
    });
  }

  private getFirstFives(list: Book[]): Book[] {
    if (list !== null && list.length > 5) {
      return list.slice(0,5);
    }
    return list;
  }



}
