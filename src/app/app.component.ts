import { Component } from '@angular/core';
import { UserService } from './user/user.service';
@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>',
    providers: [UserService]
})
export class AppComponent { }
