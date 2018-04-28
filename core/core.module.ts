import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {LoginComponent} from 'login/login.component';
import {RouterModule} from '@angular/router';
import {AuthenticationService} from '/src/app/core/services/authentication.service';
import {AuthGuard} from '../helpers/auth.guard';

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule
    ],
    declarations: [LoginComponent],
    exports: [
        RouterModule
    ],
    providers: [
        AuthenticationService,
        AuthGuard
    ]
})
export class CoreModule {
}
