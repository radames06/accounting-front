import { Component, Input } from '@angular/core';
import { Account } from '../shared/model';

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.css']
})
export class AccountListItemComponent {
  @Input() item: Account;
  @Input() index: number;
}
