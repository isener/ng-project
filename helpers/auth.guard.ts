import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {UserService} from '../helpers/current-user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        const anonymousLogin = route.data.anonymousLogin;

        return this.checkLogin(url, anonymousLogin);
    }

    checkLogin(url: string, anonymousLogin: Boolean): boolean {
        const user = this.userService.getUserSync();

        if (anonymousLogin && !user.isLoggedIn) {
            return true;
        }

        if (!anonymousLogin && user.isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.userService.redirectUrl = url;

        // Navigate to the login page with extras
        if (user.isLoggedIn) {
            this.router.navigate(['/store']);
        } else {
            this.router.navigate(['/login']);
        }
        return false;
    }
}
