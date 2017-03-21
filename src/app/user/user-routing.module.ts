import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './user-edit.component';
import { UserAddComponent } from './user-add.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        data: {
            title: 'List User'
        }
    },
    {
        path: 'add',
        component: UserAddComponent,
        data: {
            title: 'Add User'
        }
    },
    {
        path: 'detail/:id',
        component: UserEditComponent,
        data: {
            title: 'Edit User'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
