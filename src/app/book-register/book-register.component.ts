import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BookService } from '../book-service/book.service';
import { BookRegister } from '../models/book-register';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './book-register.component.html',
  styleUrl: './book-register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookRegisterComponent implements OnInit, OnDestroy {

  protected bookRegisterForm: FormGroup;
  protected subscription: Subscription;

  constructor(private fb: FormBuilder, private bookService: BookService,
    private snackBar: MatSnackBar, private route: Router) {
    this.subscription = new Subscription();
    this.bookRegisterForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.bookRegisterForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      authors: ['', Validators.required],
      category: ['', Validators.required],
      publisher: ['', Validators.required],
      publicationDate: ['', Validators.required],
      thumbnailLink: [''],
      synopsis: ['']
    });
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setPublicationDate(normalizedMonthAndYear: Date, datepicker: MatDatepicker<Date>) {
    const dateValue = this.bookRegisterForm.value.publicationDate;
    dateValue.month(normalizedMonthAndYear.getMonth());
    dateValue.year(normalizedMonthAndYear.getFullYear());
    this.bookRegisterForm.value.publicationDate.setValue(dateValue);
    datepicker.close();
  }

  onSubmit(): void {
    if (this.bookRegisterForm.valid) {
      let newBook: BookRegister = this.getNewBook();
      this.subscription = this.bookService.bookRegister(newBook).subscribe(book => {
        this.showSuccessSnackbar('Livro, book.title, cadastrado com sucesso!');
        this.goHome();
      });
    }
  }

  private getNewBook(): BookRegister {
    let newBook: BookRegister = {
      title: this.bookRegisterForm.value.title,
      subtitle: this.bookRegisterForm.value.subtitle,
      authors: this.getAuthors(),
      category: this.bookRegisterForm.value.category,
      publisher: this.bookRegisterForm.value.publisher,
      publicationDate: this.bookRegisterForm.value.publicationDate.toString(),
      thumbnail: this.bookRegisterForm.value.thumbnailLink,
      synopsis: this.bookRegisterForm.value.synopsis
    };
    return newBook;
  }

  private getAuthors(): string[] {
    let authors: string[] = [];
    authors.push(this.bookRegisterForm.value.authors);
    return authors;
  }

  private showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'], 
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private goHome(): void {
    this.route.navigate(['/Home']);
  }


}
