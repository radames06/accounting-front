import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Account } from "./model";

@Injectable()
export class AccountsService implements OnInit{

    constructor(private authService: AuthService, private http: HttpClient) {}

    getAccounts() {
        return this.http.get<Account[]>('http://localhost:8080/accounts');
    }

    getAccountById(accountId: number) {
        return this.http.get<Account>('http://localhost:8080/accounts/' + accountId );
    }

    ngOnInit(): void {
        
    }

}