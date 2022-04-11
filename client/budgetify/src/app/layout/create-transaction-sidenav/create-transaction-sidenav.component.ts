import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { TransactionsService } from 'src/app/transactions/transactions.service';
import { Transaction } from 'src/app/transactions/transactions.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { Account } from 'src/app/accounts/accounts.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-transaction-sidenav',
  templateUrl: './create-transaction-sidenav.component.html',
  styleUrls: ['./create-transaction-sidenav.component.scss'],
})
export class CreateTransactionSidenavComponent implements OnInit, OnDestroy {
  transactionCreateForm!: FormGroup;
  selectedAccount!: Account;
  selectedAccountSubscription!: Subscription;
  selectedVal!: string;
  today = new Date();

  incomeCategoryList: string[] = [
    'Salary',
    'Debt repayment',
    'Gift',
    'Rental income',
    'Premium/bonus',
  ];

  expenseCategoryList: string[] = [
    'Food',
    'Transportation',
    'Housing',
    'Education',
    'Shopping',
    'Kids',
    'Entertainment',
    'Health and beauty',
    'Pet',
    'Internet',
    'Mobile',
  ];

  categoryList: string[] = this.expenseCategoryList;

  constructor(
    private mainService: MainService,
    private transactionsSevice: TransactionsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.selectedVal = 'Expense';
    this.selectedAccountSubscription = this.accountsService
      .getSelectedAccount()
      .subscribe((data) => {
        this.selectedAccount = data;
      });

    this.transactionCreateForm = new FormGroup({
      type: new FormControl(this.selectedVal, Validators.required),
      title: new FormControl(null),
      categories: new FormControl([], Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      date: new FormControl(null, Validators.required),
      payee: new FormControl(null),
      description: new FormControl(null),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.transactionCreateForm?.get('type')?.valueChanges.subscribe((val) => {
      if (val === 'Income') {
        this.categoryList = this.incomeCategoryList;
      } else if (val === 'Expense') {
        this.categoryList = this.expenseCategoryList;
      }
    });
  }

  onToppingRemoved(category: string) {
    const categories = this.transactionCreateForm.value.categories;
    this.removeFirst(categories, category);
    // this.categories.setValue(categories); // To trigger change detection
    this.transactionCreateForm.controls['categories'].setValue(categories); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  sidebarOpen() {
    this.mainService.sidebarOpen();
  }

  closeSidebar() {
    this.mainService.sidebarOpen();
  }

  Submit() {
    let { type, title, categories, amount, date, payee, description } =
      this.transactionCreateForm.value;

    if (title == null) {
      title = categories[0];
    }

    let newTransaction = {
      accountTitle: this.selectedAccount.title,
      type,
      title,
      category: categories,
      amount,
      date,
      payee,
      description,
    };

    this.transactionsSevice
      .createTransaction(newTransaction)
      .subscribe((data) => {
        console.log(this.transactionCreateForm);
        console.log(data);
        this.transactionCreateForm.reset();
        this.mainService.sidebarClose();
      });
  }

  ngOnDestroy(): void {
    this.selectedAccountSubscription.unsubscribe();
  }
}
