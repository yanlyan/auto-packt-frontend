import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import swal from 'sweetalert2';

@Component({
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {

    users: any[];
    errorMessage: String;
    itemsPerPage: number;
    p: number;
    total: number;

    constructor(public _userService: UserService) {
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

    confirmDelete(id: string) {
        console.log(id);
        const promise = swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        promise.then(() => {
            this._userService.delete(id).subscribe(data => {
                this.getUsers();
                swal(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                );
            }, error => this.errorMessage = error);
        });
    }
}
