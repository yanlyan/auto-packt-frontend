import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    imports: [
        UserRoutingModule
    ],
    declarations: [UserListComponent]
})
export class UserModule { }
