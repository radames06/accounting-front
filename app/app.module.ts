import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { MovementEditComponent } from './movement-edit/movement-edit.component';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageTiersComponent } from './manage-tiers/manage-tiers.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AccountsService } from './shared/accounts.service';
import { MovementsService } from './shared/movements.service';
import { AccountListItemComponent } from './account-list-item/account-list-item.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountsListComponent,
    MovementsListComponent,
    MovementEditComponent,
    DropdownDirective,
    ManageAccountsComponent,
    ManageTiersComponent,
    ManageCategoriesComponent,
    AccountsComponent,
    HeaderComponent,
    AccountListItemComponent,
    AuthComponent, 
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [AccountsService, MovementsService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
