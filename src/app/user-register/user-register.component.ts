import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user-service/user.service';
import { NewUser } from '../models/user';

@Component({
  selector: 'app-user-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegisterComponent implements OnInit {
  
  protected userRegisterForm: FormGroup;
  hidePassword = signal(true);

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.userRegisterForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  showHidePasswordEvent(event: MouseEvent): void {
      this.hidePassword.set(!this.hidePassword());
      event.stopPropagation();
  }

  onSubmit(): void {
    if (this.userRegisterForm.valid) {
      let newUser: NewUser = this.getNewUser();
      this.userService.saveUser(newUser).subscribe(() => {
        this.showSuccessSnackbar('Usuário cadastrado com sucesso!');
      });
    }
  }

  private getNewUser(): NewUser {
    let user: NewUser = {
      username: this.userRegisterForm.value.username,
      name: this.userRegisterForm.value.name,
      email: this.userRegisterForm.value.email,
      password: this.userRegisterForm.value.password
    };
    return user;
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
