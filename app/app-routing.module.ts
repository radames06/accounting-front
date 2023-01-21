import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountsComponent } from "./accounts/accounts.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { ManageAccountsComponent } from "./manage-accounts/manage-accounts.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManageTiersComponent } from "./manage-tiers/manage-tiers.component";
import { MovementsListComponent } from "./movements-list/movements-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/accounts', pathMatch: 'full'},
    { 
        path: 'accounts', 
        component: AccountsComponent, 
        canActivate: [AuthGuard],
        children: [
        { path: ':id', component: MovementsListComponent }
    ]},
    { 
        path: 'manage', 
        canActivate: [AuthGuard],
        children: [
            { path: 'tiers', component: ManageTiersComponent}, 
            { path: 'accounts', component: ManageAccountsComponent}, 
            { path: 'categories', component: ManageCategoriesComponent}
        ]
    },
    { path: 'auth', component: AuthComponent }
]; 

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}