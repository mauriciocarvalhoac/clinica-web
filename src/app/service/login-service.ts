import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable, tap } from 'rxjs';

@Service()
export class LoginService extends AbstractService {

    constructor() {
        super("/auth/login");
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.url, { "username": username, "password": password })
            .pipe(
                tap(response => {
                    if (response) {
                        localStorage.setItem('token', response.token);
                    }
                })
            );
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }
}
