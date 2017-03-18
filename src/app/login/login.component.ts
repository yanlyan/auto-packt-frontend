import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading: boolean = false;
    returnUrl: string;

    constructor(private _route: ActivatedRoute, private _router: Router, private _authService: AuthService) { }

    login() {
        this.loading = true;
        this._authService.login(this.model.username, this.model.password)
            .subscribe(data => {
                if (data) {
                    this._router.navigate([this.returnUrl]);
                }
                // error animation
            },
            error => {
                // error animation
                this.loading = false;
            });
    }

    ngOnInit() {
        this._authService.logout();

        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
}
