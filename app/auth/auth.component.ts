import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth', 
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;   
    }

    onSubmit(form: NgForm) {
        const user = form.value.user;
        const password = form.value.password;

        this.isLoading = true;
        if (this.isLoginMode) {
            this.authService.login(user, password).subscribe(resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['./accounts']);
                }, error => {
                console.log(error);
                this.error = 'An error occured!';
                this.isLoading = false;
            });
        } else {
            this.authService.signup(user, password).subscribe(resData => {
                console.log(resData);
                this.isLoading = false;
                }, error => {
                console.log(error);
                this.error = 'An error occured!';
                this.isLoading = false;
            });
        }

        form.reset();
    }
}