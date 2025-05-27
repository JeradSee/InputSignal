import { Component } from '@angular/core';
import { UserListComponent } from './list.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  template: `
    <section class="header">
      <button (click)="addUser()">Add Andy</button>
      <img width="120" src="./assets/logo-01.png" />
    </section>
    <app-user-list [users]="users" />
  `,
})

export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Jerad', lastName: 'Cho', username: 'jerad.cho' },
    { id: 2, name: 'Brandon', lastName: 'Pasquarelli', username: 'brandon.pasquarelli' },
    { id: 3, name: 'Stephen', lastName: 'Birchmore', username: 'stephen.birchmore' },
    { id: 4, name: 'Darrik', lastName: 'Marstaller', username: 'darrik.marstaller' },
  ];

  addUser() {
    this.users = [
      {
        id: 5,
        name: 'Brown',
        lastName: 'Bear',
        username: 'brown.bear',
      },
      ...this.users,
    ];
    console.log('Current Users', this.users);
  }
};