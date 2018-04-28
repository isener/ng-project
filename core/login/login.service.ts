import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {environment} from './../../../environments/environment';
import {serializeObj} from 'app/helpers/serializer.function';

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    login(data) {
        const body = serializeObj(data);
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(environment.apiUrl + 'auth', body, options);
    }

}
