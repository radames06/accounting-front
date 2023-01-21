import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import { AccountsService } from '../shared/accounts.service';
import { Account, Movement } from '../shared/model';
import { MovementsService } from '../shared/movements.service';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit {

  account: Account;
  accountId: number;
  movementsList: Movement[];
  isLoading: boolean = false;

  constructor(private movementsService: MovementsService, private route: ActivatedRoute, private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.pipe(map((params: Params) => {
      this.accountId = this.route.snapshot.params['id'];
      return this.accountId;
    }), switchMap(accountId => forkJoin(this.accountsService.getAccountById(accountId), this.movementsService.getMovementsByAccount(this.accountId))))
      .subscribe(([account, movements]) => {
        this.account = account;
        this.movementsList = movements;

        this.isLoading = false;
      });

    this.movementsService.newMovementEvent.subscribe(movement => {
      this.movementsList.push(movement);
    })

    this.movementsService.deleteMovementEvent.subscribe(movementToDelete => {
      this.movementsList.forEach((movement, index) => {
        if (movementToDelete.id == movement.id) this.movementsList.splice(index, 1);
      });
    })

    this.movementsService.editMovementEvent.subscribe(movement => {
      let oldMovementIndex = this.findMovementByIdAndAccount(movement.id);
      this.movementsList.splice(oldMovementIndex, 1);
      this.movementsList.push(movement);
    })

    this.movementsService.accountBalanceEvent.subscribe(({accountId, movementAmount}) => {
      console.log("AccountBalanceEvent Subscribe dans movement-list component");
      console.log(accountId);
      console.log(movementAmount);
      this.account.balance += movementAmount;
    })
  }

  findMovementByIdAndAccount(movementId: number) {
    return this.movementsList.findIndex(x => x.id == movementId);
  }

  onEditMovement(movement: Movement) {
    console.log("onEditMovement");
    console.log(this.movementsList);
    this.movementsService.setEditedMovement(this.accountId, { ...movement});
  }

  onDeleteMovement(movementToDelete: Movement) {
    this.movementsService.deleteMovement(this.accountId, movementToDelete)
      .subscribe(() => {
        //...
      });
  }
}
