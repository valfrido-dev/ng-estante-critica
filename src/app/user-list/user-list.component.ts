import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User } from '../models/user';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, AfterViewInit {

  protected displayedColumns: string[] = ['name', 'username', 'email', 'admin'];
  protected dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
      this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe( (users: User[]) => {
        this.dataSource.data = users;
    });
  }

  setRoleAdmin(userSelected: User) {
    this.userService.setAdminUser(userSelected.id, !userSelected.admin)
      .subscribe(resp => {
          userSelected.admin = resp.hasRoleAdmin;
      });
  }

}
