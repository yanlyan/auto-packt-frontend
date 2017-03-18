import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
    constructor(private _http: Http, private _config: AppConfig) { }

    login(useremail: string, password: string) {
        return this._http.post(this._config.apiUrl + 'user', { username: "lyandwi", password: "anggurmanis" })
            .map((response: Response) => {
                console.log(response.json().data);
            });
    }

    logout() { }
}

