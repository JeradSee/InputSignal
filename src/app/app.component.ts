import { Component, signal } from '@angular/core';
import { UserListComponent } from './list.component';
import { User } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  users = signal<User[]>([
    { id: 1, name: 'Jerad', lastName: 'Cho', username: 'jerad.cho' },
    { id: 2, name: 'Brandon', lastName: 'Pasquarelli', username: 'brandon.pasquarelli' },
    { id: 3, name: 'Stephen', lastName: 'Birchmore', username: 'stephen.birchmore' },
    { id: 4, name: 'Darrik', lastName: 'Marstaller', username: 'darrik.marstaller' },
  ]);

  name = signal('');
  lastName = signal('');

  private nextId = Math.max(...this.users().map(u => u.id), 0) + 1;

  addUser() {
    const name = this.name().trim();
    const lastName = this.lastName().trim();

    if (!name || !lastName) return;

    const newUser: User = {
      id: this.nextId++,
      name,
      lastName,
      username: generateUsername(name, lastName),
    };

    this.users.set([...this.users(), newUser]);
    this.name.set('');
    this.lastName.set('');
  }
};

function generateUsername(name: string, lastName: string): string {
  return `${name}.${lastName}`.toLowerCase().replace(/\s+/g, '');
}