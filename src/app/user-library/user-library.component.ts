import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-library',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-library.component.html',
  styleUrl: './user-library.component.css'
})
export class UserLibraryComponent implements OnInit, AfterViewInit {

  protected displayedColumns: string[] = ['title', 'authors', 'publisher', 'category', 'actions'];
  protected dataSource: MatTableDataSource<Book>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private bookService: BookService, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Book>();
  }

  ngOnInit(): void {
      this.loadLibrary();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadLibrary(): void {
    this.bookService.getBooksInLibraryUser().subscribe( (books: Book[]) => {
        this.dataSource.data = books;
    });
  }

  removeBookLibrary(book: Book): void {
    this.bookService.removeBookInLibraryUser(book.id, book.title, true)
    .subscribe(bookRemoved => {
      let message: string = 'Livro, ' + bookRemoved.bookTitle + ', removido da lista de interesse!';
      this.showSuccessSnackbar(message);
      this.loadLibrary();
    });
  }

  private showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'], 
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
