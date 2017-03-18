import { Injectable } from '@angular/core';
import { Http, Headers, XHRBackend, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient extends Http {

    constructor(backend: XHRBackend, options: RequestOptions) {
        const user = JSON.parse(localStorage.getItem('autopackt-currentUser'));
        if (user) {
            options.headers.set('Authorization', user.token);
        }
        super(backend, options);
    }
}
