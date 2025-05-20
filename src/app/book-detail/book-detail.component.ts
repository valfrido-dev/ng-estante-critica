import { Component, OnInit, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookService } from '../book-service/book.service';
import { Book } from '../models/book';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookRateDialogComponent } from '../book-rate-dialog/book-rate-dialog.component';
import { BookReview } from '../models/book-review';


@Component({
  selector: 'app-book-detail',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

  protected bookDetail!: Book;
  protected reviews!: BookReview[];
  protected bookRate: number[];
  protected bookRateHalf: boolean;
  @Input() bookId: string;


  constructor(private bookService: BookService, private rateDialog: MatDialog, private snackBar: MatSnackBar) {
    this.bookId = '';
    this.bookRate = [];
    this.bookRateHalf = false;
  }

  ngOnInit(): void {
      this.loadBook();
  }

  loadBook(): void {
    this.bookService.getBook(this.bookId).subscribe(resp => {
      this.bookDetail = resp;
      this.setBookRateInt(this.bookDetail.numberAverageRating);
      this.setBookRateHalf(this.bookDetail.numberAverageRating);
      this.loadBookReviews(this.bookDetail.id);
    });
  }

  loadBookReviews(bookId: string): void {
    this.bookService.getBookReviews(bookId).subscribe(resp => {
      this.reviews = resp;
    });
  }

  ratingActionDialog(): void {
    const dialogRef = this.rateDialog.open(BookRateDialogComponent, {
      width: '600px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rating(result);
      }
    });
  }

  private rating(result: any): void {
    this.bookService.saveBookReview(this.bookDetail.id, result.numberRating, result.comments)
      .subscribe({
        next: () => this.showSuccessSnackbar('Avaliação enviada com sucesso!'),
      });
  }

  private setBookRateInt(rateNumber: number): void {
    let rateIntValue = Math.trunc(rateNumber);
    this.bookRate = Array.from({length: rateIntValue}, (_, i) => i + 1);
  }

  private setBookRateHalf(rateNumber: number): void {
    this.bookRateHalf = rateNumber > 0 && !Number.isInteger(rateNumber);
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
