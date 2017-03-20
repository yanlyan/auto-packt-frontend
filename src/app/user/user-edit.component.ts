import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { User } from './user';

import { AlertService } from '../shared/alert/alert.service';

@Component({
    templateUrl: 'user-edit.component.html'
})
export class UserEditComponent implements OnInit {
    id: string;
    errorMessage: String;
    user: User;
    editForm: FormGroup;
    loading = false;

    constructor(private _userService: UserService, private _route: ActivatedRoute, private _location: Location,
        private _formBuilder: FormBuilder, private _alertService: AlertService) {

        this._route.params.subscribe(params => {
            this.id = params.id;
        });
    }

    submitForm(value: any) {
        this.loading = true;
        if (this.editForm.valid) {
            this._userService.update(this.id, this.editForm.value).subscribe(data => {
                if (data) {
                    this._alertService.success('Data saved, yay!');
                } else {
                    this._alertService.error('Data here not saved, too bad :(');
                }
                this.loading = false;

            }, error => {
                console.error(error);
                this._alertService.error('Data not saved, too bad :(');
            });
        } else {
            this._alertService.error('Please fix the input first');
            this.loading = false;
        }
    }

    ngOnInit() {
        this._userService.find(this.id).subscribe(data => {
            this.user = data;
            this.buildForm();
        }, error => this.errorMessage = error);
    }

    buildForm() {
        // this.editForm.reset();
        this.editForm = new FormGroup({
            name: new FormControl(this.user.name, Validators.required),
            username: new FormControl(this.user.username, Validators.compose([Validators.required, Validators.minLength(5)])),
            email: new FormControl(this.user.email, Validators.compose([Validators.required, CustomValidators.email]))
        });
    }

    goBack(): void {
        this._location.back();
    }

    reset(): void {
        console.log('reset');
        this.buildForm();
    }
}
