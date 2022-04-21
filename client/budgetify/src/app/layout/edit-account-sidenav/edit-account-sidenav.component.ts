import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-edit-account-sidenav',
  templateUrl: './edit-account-sidenav.component.html',
  styleUrls: ['./edit-account-sidenav.component.scss'],
})
export class EditAccountSidenavComponent implements OnInit {
  accountEditForm!: FormGroup;
  selectedAccount!: Account;

  constructor(
    private mainService: MainService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountsService.getSelectedAccount().subscribe((acc) => {
      this.selectedAccount = acc;
    });

    this.accountEditForm = new FormGroup({
      title: new FormControl(this.selectedAccount.title, [
        Validators.required,
        Validators.maxLength(128),
      ]),
      currency: new FormControl(
        this.selectedAccount.currency,
        Validators.required
      ),
      description: new FormControl(
        this.selectedAccount.description,
        Validators.maxLength(256)
      ),
    });
  }
  onSubmit() {
    const { title, currency, description } = this.accountEditForm.value;
    let newAccount = {
      oldTitle: this.selectedAccount.title,
      title,
      currency,
      description,
    };
    let oldTitle = this.selectedAccount.title;
    this.accountsService.editAccount(newAccount, oldTitle).subscribe(() => {
      this.accountEditForm.reset();
      this.closeSidebar();
    });
  }

  closeSidebar() {
    this.mainService.closeEditAccountSidebar();
  }
}
