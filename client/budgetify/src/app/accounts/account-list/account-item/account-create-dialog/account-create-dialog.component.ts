import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AccountsService } from 'src/app/accounts/accounts.service';

@Component({
  selector: 'app-account-create-dialog',
  templateUrl: './account-create-dialog.component.html',
  styleUrls: ['./account-create-dialog.component.scss'],
})
export class AccountCreateDialogComponent implements OnInit {
  accountCreateForm!: FormGroup;

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountCreateForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(128),
      ]),
      currency: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.maxLength(256)),
    });
  }

  onSubmit() {
    const title = this.accountCreateForm.value.title;
    const currency = this.accountCreateForm.value.currency;
    const description = this.accountCreateForm.value.description;
    console.log(this.accountCreateForm);
    this.accountsService
      .createAccount(title, currency, description)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
