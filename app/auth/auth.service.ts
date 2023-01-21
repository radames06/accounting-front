import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, tap } from "rxjs";
import { User } from "../shared/model";
import { Router } from "@angular/router";

interface AuthResponseData {
    username: string;
    enabled: boolean; 
    email: string;
    provider: string; 
    roles: [];
    categories: [];
    stringRoles: [string];
    autorithies: [];
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
}

interface LoginResponseData {
    username: string; 
    token: string;
    expiresIn: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}
    
    signup(user: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8080/auth/register', {
            "username": user,
            "password": password,
            "email": "a",
            "enabled": "true",
            "provider": "LOCAL"
        })
    }

    login(user: string, password: string) {
        return this.http.post<LoginResponseData>('http://localhost:8080/auth/signin', {
            "username": user,
            "password": password
        })
        .pipe(tap(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn);
            // console.log("login : ");
            // console.log(resData);
            // console.log(expirationDate);
            const user = new User(resData.username, resData.token, expirationDate);
            this.user.next(user);
            this.autoLogout(+resData.expiresIn);
            let storageResult = localStorage.setItem('userData', JSON.stringify(user));
            // console.log(storageResult);
            // console.log(JSON.stringify(user));
            // console.log("End of login");
            // const userData = JSON.parse(localStorage.getItem('userData'));
            // console.log(userData);
        }))
    }

    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        } else {
            const loadedUser = new User(userData.username, userData._token, new Date(userData._tokenExpirationDate));
            if (loadedUser.token) {
                this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}