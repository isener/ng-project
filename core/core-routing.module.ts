import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from 'login/login.component';
import {AuthGuard} from "../helpers/auth.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: '../admin/admin.module#AdminModule'
    },
    {
        path: 'form',
        loadChildren: '../form/form.module#FormModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
