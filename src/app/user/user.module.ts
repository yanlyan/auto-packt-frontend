import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { UserEditComponent } from './user-edit.component';
import { UserRoutingModule } from './user-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng2PaginationModule, PaginatePipe, PaginationControlsComponent, PaginationControlsDirective } from 'ng2-pagination';
@NgModule({
    imports: [
        UserRoutingModule,
        CommonModule,
        Ng2PaginationModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [UserListComponent, UserEditComponent]
})
export class UserModule { }
