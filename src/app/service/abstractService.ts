import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AbstractService {
    public http = inject(HttpClient);
    public url: string = "";

    constructor(uri: String) {
        this.url = environment.apiUrl + uri
    }
}