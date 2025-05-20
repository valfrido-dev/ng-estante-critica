import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../auth-service/auth.service';
import { UserAuth } from '../models/user-auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  protected isLoggedIn: boolean;
  protected userLogged: UserAuth;

  constructor(private authService: AuthService) {
     this.isLoggedIn = this.authService.isLoggedIn();
     this.userLogged = this.authService.getUserAutenticated();
  }

  ngOnInit(): void {
      this.authService.getLoggedAction.subscribe(l => {
        this.loadLoggedActual();
      });
  }

  logout(): void {
    this.authService.logout();
  }

  private loadLoggedActual(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userLogged = this.authService.getUserAutenticated();
  }

}
