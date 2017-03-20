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

    all(page: number = 1, limit: number = 10, name: string = '', username: string = '', email: string = ''): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        params.set('username', username);
        params.set('email', email);

        return this._http.post(this._config.apiUrl + '/user/list', { page: page, limit: limit }, { search: params })
            .map((response: Response) => <any>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.errorHandler);
    }

    find(id: string) {
        return this._http.get(this._config.apiUrl + '/user/' + id)
            .map((response: Response) => <User>response.json().data)
            .do(data => { console.log(data); })
            .catch(this.errorHandler);
    }

    update(id: string, user: User) {
        return this._http.put(this._config.apiUrl + '/user/' + id, user).map((response: Response) => {
            if (response.json().data) {
                return true;
            }
            return false;
        }).catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error) || 'Server Error';
    }
}
