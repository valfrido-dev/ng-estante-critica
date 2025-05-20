import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserRegisterComponent } from './user-register/user-register.component'
import { UserListComponent } from './user-list/user-list.component';
import { BookRegisterComponent } from './book-register/book-register.component';
import { HomeComponent } from './home/home.component';
import { LoginActivate } from './auth-service/login-activate';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user/register', component: UserRegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [LoginActivate] },
    { path: 'user/list', component: UserListComponent, canActivate: [LoginActivate] },
    { path: 'book/register', component: BookRegisterComponent, canActivate: [LoginActivate] },
    { path: 'book/detail/:bookId', component: BookDetailComponent, canActivate: [LoginActivate] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
