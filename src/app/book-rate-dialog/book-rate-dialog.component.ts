import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface DataRateDialog {
  numberRating: number;
  comments: string;
}

@Component({
  selector: 'app-book-rate-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatSelectModule,
    MatDialogActions
  ],
  templateUrl: './book-rate-dialog.component.html',
  styleUrl: './book-rate-dialog.component.css'
})
export class BookRateDialogComponent {

  readonly dialogRef = inject(MatDialogRef<BookRateDialogComponent>);
  readonly data = inject<DataRateDialog>(MAT_DIALOG_DATA);

  protected bookRating: number = 0;
  protected comments: string = '';

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    
    const result: DataRateDialog = {
      numberRating: this.bookRating,
      comments: this.comments
    };

    this.dialogRef.close(result);

  }


}
