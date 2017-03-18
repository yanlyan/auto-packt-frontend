import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
} from '@angular/router';

import { UserListComponent } from './user-list.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        data: {
            title: 'List User'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
