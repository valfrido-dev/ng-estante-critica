import { ErrorHandler, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export class CustomErrorHandling implements ErrorHandler {

    private _snackBar = inject(MatSnackBar);

    handleError(resp: any): void {     
        if (resp.status != 200) {
            this.tratarErrorMessage(resp);
        }   
    }

    private tratarErrorMessage(error: any): void {
        let message: string = '';
        if (error instanceof ProgressEvent) {
            message = "Erro para acessar API";
        } else {
            message = error.error.errors;
            console.log(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error.errors}`);
        }
        this.showErrorSnackBar(message);
    }

    private showErrorSnackBar(message: string) {
        this._snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }

}
