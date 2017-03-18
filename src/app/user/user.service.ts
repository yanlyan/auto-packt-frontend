import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../lib/http-client.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { User } from './user';

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private _config: AppConfig) { }

    all(name: string = '%', username: string = '%', email: string = '%'): Observable<User[]> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('username', username);
        params.set('email', email);

        return this._http.get(this._config.apiUrl + '/user', { search: params })
            .map((response: Response) => <User[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error) || 'Server Error';
    }
}
