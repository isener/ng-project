import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {UserService} from '../../helpers/current-user/user.service';
import {LoginRequestModel} from './login.model';
import {UserModel} from '../../helpers/current-user/user.model';
import {ButtonSizes, ButtonStyles} from '../../components/button/button.types.enum';
import {AlertTypes} from '../../components/alert/alert.types.enum';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: 'app-login',
    providers: [LoginService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

    credentials: LoginRequestModel = new LoginRequestModel();
    isFormSubmitted = false;
    formError = '';
    buttonStyles = ButtonStyles;
    buttonSizes = ButtonSizes;
    alertTypes = AlertTypes;

    private componentDestroyed$: Subject<boolean> = new Subject();

    constructor(private loginService: LoginService,
                private userService: UserService,
                private router: Router) {
    }

    ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    login(credentials: LoginRequestModel) {
        this.isFormSubmitted = true;
        this.formError = '';
        const data = {
            password: credentials.Password,
            username: credentials.Username,
            grant_type: 'password'
        };
        this.loginService
            .login(data)
            .takeUntil(this.componentDestroyed$)
            .subscribe((res: any) => {
                    res = res.json();
                    if (res.access_token) {
                        const user: UserModel = {
                            userName: res.userName,
                            access_token: res.access_token,
                            refresh_token: res.refresh_token,
                            token_type: res.token_type,
                            expires_in: res.expires_in,
                            user_id: res.user_id,
                            vendor_id: res.vendor_id,
                            isLoggedIn: true
                        };
                        this.userService.setUser(user);
                        this.router.navigate(['/store']);
                    } else {
                        this.formError = 'Bir hata oluştu';
                    }
                    this.isFormSubmitted = false;
                },
                (err) => {
                    const error = err.json();
                    if (error.error === 'invalid_grant') {
                        this.formError = 'E-posta, GLN veya parola yanlış';
                    } else {
                        this.formError = 'Bir hata oluştu, lütfen tekrar deneyiniz';
                    }
                    this.isFormSubmitted = false;
                });
    }

}
