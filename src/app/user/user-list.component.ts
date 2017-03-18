import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
@Component({
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: User[];
    errorMessage: String;

    constructor(private _userService: UserService) { }

    ngOnInit() {
        this._userService.all()
            .subscribe(users => this.users, error => this.errorMessage = error);
    }
}
