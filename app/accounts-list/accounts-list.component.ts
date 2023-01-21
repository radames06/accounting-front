import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../shared/accounts.service';
import { Account } from '../shared/model';
import { MovementsService } from '../shared/movements.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  accountsList: Account[];

  constructor(private accountsService: AccountsService, private movementService: MovementsService) { }

  ngOnInit(): void {
    this.accountsService.getAccounts().subscribe({
      next: accounts => {
        this.accountsList = accounts;
      },
      error: error => {
        console.log('ERROR : ');
        console.log(error);
      }
    })

    this.movementService.accountBalanceEvent.subscribe(({ accountId, movementAmount }) => {
      console.log("accountsList.eventSubscribe :");
      console.log(movementAmount);
      console.log(accountId);
      console.log(this.accountsList);
      this.accountsList.forEach(account => {
        if (account.id == accountId) {
          account.balance += movementAmount;
        }
      })
    })
  }

}