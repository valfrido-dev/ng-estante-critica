import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit  {
    
  protected loginForm: FormGroup;
  hide = signal(true);
  
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(() => { 
        this.actionLoginEvent();
        this.goRoute('/home');
      });
    }
  }

  goCreateUser(): void {
    this.goRoute('/user/register');
  }

  private goRoute(routeInfo: string): void {
    this.route.navigate([routeInfo]);
  }

  private actionLoginEvent(): void {
    this.authService.setLoggedAction(true);
  }

}
