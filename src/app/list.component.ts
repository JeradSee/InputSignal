import { Component, computed, effect, input, signal, Injector, inject, runInInjectionContext } from '@angular/core';
import { User, ModifiedUser } from './models';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './list.component.html',
})

export class UserListComponent {

  userList = input.required({
    alias: 'users',
    transform: concatUserNames
  });

  constructor() {
    effect(() => {
        const users = this.userList();
        if (users.length > 0) {
            console.log('New Input value is: ', this.userList());
        }
      // track changes in the signal
    })
  }

  // User Filter - but why is it not working ??????
  protected filteredUsers = computed(() =>
    this.userList().filter(({ displayName }) =>
      displayName.toLowerCase().startsWith(this.query().toLowerCase())
    )
  );

  // tested setting query at the top of the class - made no difference
  private query = signal('');

  updateQuery(e: Event) {
    // track when the query is updated
    console.log('Query Updated');
    this.query.set((e.target as HTMLInputElement).value);
  }
}

// Function to concatenate users so we can search by first + last
function concatUserNames(users: User[]): ModifiedUser[] {
  return users.map(({ name, lastName, ...user }) => ({
    ...user,
    displayName: `${name} ${lastName}`,
  }));
}