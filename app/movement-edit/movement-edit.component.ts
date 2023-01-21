import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movement } from '../shared/model';
import { MovementsService } from '../shared/movements.service';

@Component({
  selector: 'app-movement-edit',
  templateUrl: './movement-edit.component.html',
  styleUrls: ['./movement-edit.component.css']
})
export class MovementEditComponent implements OnInit {
  selectedType: number = 0;
  formActive: boolean = false;
  movementSign: string = '';
  activeMovement: Movement = new Movement();
  amount: number; 
  movementDate: Date;
  //tiers: string;
  currentMode: string; 
  @Input() accountId: number; 

  constructor(private movementService: MovementsService) {}

  ngOnInit(): void {
    this.movementService.movementSubject.subscribe(({account, movement}) => {
      this.activeMovement = movement;
      this.amount = Math.abs(movement.amount);
      this.movementDate = movement.movementDate;
      //this.tiers = movement.tiers;
      if (this.activeMovement.amount >= 0) {
        this.movementSign = '+';
        this.selectedType = 1;
      } else {
        this.movementSign = '-';
        this.selectedType = 2;
      }
      this.formActive = true;
      this.currentMode = "Edit";
    })
  }

  switch(selected: number) {
    this.selectedType = selected;
    this.formActive = true;
    if (this.selectedType == 1) {
      this.movementSign = '+';
    } else if (this.selectedType == 2) {
      this.movementSign = '-';
    } else {
      this.movementSign = '+';
    }
    this.activeMovement = new Movement();
    this.amount = 0;
    this.movementDate = new Date();
    //this.tiers = "";
    this.currentMode = "New";
  }

  onCancel() {
    this.selectedType = 0;
    this.formActive = false;
    this.movementSign = ' ';
  }

  updateDate(date: Date) {
    this.movementDate = new Date(date);
  }

  onSubmit(form: NgForm) {
    let oldAmount = this.activeMovement.amount;
    this.activeMovement.amount = form.value.amount * (this.movementSign=='-' ? -1 : 1);
    this.activeMovement.tiers = form.value.tiers;
    this.activeMovement.movementDate = this.movementDate;
    if (this.currentMode==="Edit") {
      this.movementService.updateMovement(this.accountId, this.activeMovement, oldAmount)
        .subscribe(movement => {
          console.log("Component - Edit mode :");
          console.log(this.activeMovement);
          console.log(movement);
        });
    } else {
      this.movementService.createMovement(this.accountId, this.activeMovement)
        .subscribe(movement => { 
          console.log("Component - Insert mode :");
          console.log(movement); 
        });
    }
    this.formActive = false;
    this.selectedType = 0;
  }
}
