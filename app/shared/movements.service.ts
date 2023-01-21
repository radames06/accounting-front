import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movement } from './model';

@Injectable()
export class MovementsService {

    movementSubject = new Subject<{ account: number, movement: Movement }>();
    currentId: number = 10;
    newMovementEvent = new EventEmitter<Movement>();
    deleteMovementEvent = new EventEmitter<Movement>();
    editMovementEvent = new EventEmitter<Movement>();
    accountBalanceEvent = new EventEmitter<{accountId: number, movementAmount: number}>();

    constructor(private http: HttpClient) { }

    getMovementsByAccount(accountId: number) {
        return this.http.get<Movement[]>('http://localhost:8080/accounts/' + accountId + '/movements');
    }

    updateMovement(accountId: number, movement: Movement, oldAmount: number) {
        console.log("updateMovement :");
        console.log(oldAmount);
        console.log(movement);
        this.editMovementEvent.emit(movement);
        this.accountBalanceEvent.emit({accountId: accountId, movementAmount: (movement.amount - oldAmount)});
        return this.http.put<Movement>('http://localhost:8080/accounts/' + accountId + '/movements/' + movement.id, movement );
    }

    createMovement(accountId: number, movement: Movement) {
        movement.accountId = accountId;
        this.newMovementEvent.emit(movement);
        this.accountBalanceEvent.emit({accountId: accountId, movementAmount: movement.amount});
        return this.http.post<Movement>('http://localhost:8080/accounts/' + accountId + '/movements', movement);
    }

    setEditedMovement(accountId: number, movement: Movement) {
        this.movementSubject.next({ 'account': accountId, 'movement': movement });
    }

    deleteMovement(accountId: number, movementToDelete: Movement) {
        this.deleteMovementEvent.emit(movementToDelete);
        this.accountBalanceEvent.emit({accountId: accountId, movementAmount: -movementToDelete.amount});
        return this.http.delete('http://localhost:8080/accounts/' + accountId + '/movements/' + movementToDelete.id);
    }

}