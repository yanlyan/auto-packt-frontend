import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
    constructor(private _http: Http, private _config: AppConfig) { }

    login(useremail: string, password: string) {
        return this._http.post(this._config.apiUrl + '/user/login', { username: useremail, password: password })
            .map((response: Response) => {
                if (response.json().status) {
                    const user = response.json().data;
                    user.token = response.json().meta.token;
                    localStorage.setItem('autopackt-currentUser', JSON.stringify(user));
                    return true;
                }
                return false;
            });
    }

    logout() {
        localStorage.removeItem('autopackt-currentUser');
    }
}

