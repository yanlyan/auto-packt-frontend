import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { User } from './user';

import { AlertService } from '../shared/alert/alert.service';

@Component({
    templateUrl: 'user-add.component.html'
})
export class UserAddComponent implements OnInit {
    id: string;
    errorMessage: String;
    user: User;
    addForm: FormGroup;
    loading = false;
    errors: any;

    constructor(private _userService: UserService, private _route: ActivatedRoute, private _location: Location,
        private _formBuilder: FormBuilder, private _alertService: AlertService) {
        this.user = { id: 0, username: '', name: '', email: '', created_at: '', updated_at: '' };
    }

    submitForm(value: any) {
        this.loading = true;
        if (this.addForm.valid) {
            this._userService.create(this.addForm.value).subscribe(data => {
                if (data) {
                    this._alertService.success('Data saved, yay!');
                    this.addForm.reset();
                } else {
                    this._alertService.error('Data not saved, too bad :(');
                }
                this.loading = false;
            }, error => {
                throw error;
                // this._alertService.error('Data not saved, too bad :(');
            });
        } else {
            this.validate();
            this._alertService.error('Please fix the input first');
            this.loading = false;
        }
    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        const password = new FormControl(null, Validators.compose([
            Validators.required,
            Validators.pattern('(?=[!-~]*[0-9!-/:-@[-`{-~])(?=[!-~]*[a-zA-Z])[!-~]{8,}')
        ]));
        const confirmPassword = new FormControl(null, Validators.compose([
            Validators.required,
            CustomValidators.equalTo(password)
        ]));
        this.addForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5)]),
                this.usernameUniqueValidator.bind(this)),
            email: new FormControl(null, Validators.compose([Validators.required, CustomValidators.email]),
                this.emailUniqueValidator.bind(this)),
            password: password,
            confirmPassword: confirmPassword

        }, );
        this.errors = {
            name: null,
            username: null,
            email: null,
            password: null,
            confirmPassword: null
        };
    }

    goBack(): void {
        this._location.back();
    }

    reset(): void {
        console.log('reset');
        this.buildForm();
    }

    validate() {
        this.errors.name = this.addForm.controls.name.errors;
        this.errors.username = this.addForm.controls.username.errors;
        this.errors.email = this.addForm.controls.email.errors;
        this.errors.password = this.addForm.controls.password.errors;
        this.errors.confirmPassword = this.addForm.controls.confirmPassword.errors;
        console.log(this.errors);
    }

    usernameUniqueValidator(g: FormControl) {
        return new Promise(resolve => {
            this._userService.isUsernameExist(g.value).subscribe(data => {
                if (data) {
                    resolve({ 'duplicate': true });
                } else {
                    resolve(null);
                }
            }, error => {
                resolve(null);
            });
        });
    }
    emailUniqueValidator(g: FormControl) {
        return new Promise(resolve => {
            this._userService.isEmailExist(g.value).subscribe(data => {
                if (data) {
                    resolve({ 'duplicate': true });
                } else {
                    resolve(null);
                }
            }, error => {
                resolve(null);
            });
        });
    }
}