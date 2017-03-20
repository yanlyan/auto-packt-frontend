import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
@Component({
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: any[];
    errorMessage: String;
    itemsPerPage: number;
    p: number;
    total: number;

    constructor(private _userService: UserService) {
        this.users = [];
        this.p = 1;
    }

    ngOnInit() {
        this.getUsers(1);
    }

    getUsers(page: number = 1) {
        this._userService.all(page)
            .subscribe(data => {
                this.users = data.data;
                this.itemsPerPage = data.meta.pagination.limit;
                this.p = data.meta.pagination.page;
                this.total = data.meta.pagination.total;
            },
            error => this.errorMessage = error);
    }
}
