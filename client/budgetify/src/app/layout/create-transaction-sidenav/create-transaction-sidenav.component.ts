import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { TransactionsService } from 'src/app/transactions/transactions.service';
import { Transaction } from 'src/app/transactions/transactions.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { Account } from 'src/app/accounts/accounts.model';
import { share, shareReplay, Subscription, take, tap } from 'rxjs';
import Decimal from 'decimal.js';
import { CategoriesService } from 'src/app/categories/categories.service';

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

  incomeCategoryList: string[] = [];

  expenseCategoryList: string[] = [];

  categoryList: string[] = this.expenseCategoryList;

  constructor(
    private mainService: MainService,
    private transactionsSevice: TransactionsService,
    private accountsService: AccountsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data) => {
      data.map((category) => {
        if (
          category.type === 'Income' &&
          !this.incomeCategoryList.includes(category.title)
        ) {
          this.incomeCategoryList.push(category.title);
        } else if (
          category.type === 'Expense' &&
          !this.categoryList.includes(category.title)
        ) {
          this.categoryList.push(category.title);
        }
      });
    });

    this.selectedVal = 'Expense';
    this.selectedAccountSubscription = this.accountsService
      .getSelectedAccount()
      .subscribe((data) => {
        this.selectedAccount = data;
      });

    this.transactionCreateForm = new FormGroup({
      type: new FormControl(this.selectedVal, Validators.required),
      title: new FormControl(null),
      categories: new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      date: new FormControl(null, Validators.required),
      payee: new FormControl(null),
      description: new FormControl(null),
    });

    this.onChanges();
    // this.onCategoryChange();
  }

  onChanges(): void {
    this.transactionCreateForm?.get('type')?.valueChanges.subscribe((val) => {
      this.transactionCreateForm.controls['categories'].setValue([]);

      if (val === 'Income') {
        this.categoryList = this.incomeCategoryList;
      } else if (val === 'Expense') {
        this.categoryList = this.expenseCategoryList;
      }
    });
  }

  // onCategoryChange(): void {
  //   this.transactionCreateForm
  //     ?.get('categories')
  //     ?.valueChanges.subscribe((val) => {
  //       if (
  //         this.transactionCreateForm.controls['categories'].value.includes(
  //           'Create new'
  //         )
  //       ) {
  //         console.log('create');
  //       }
  //     });
  // }

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

    if (this.transactionCreateForm.valid) {
      this.transactionsSevice
        .createTransaction(newTransaction)
        .pipe(
          take(1),
          tap((data) => {
            if (newTransaction.type === 'Income') {
              this.selectedAccount.amount = new Decimal(
                this.selectedAccount.amount!
              )
                .plus(newTransaction.amount)
                .toNumber();
            } else if (newTransaction.type === 'Expense') {
              this.selectedAccount.amount = new Decimal(
                this.selectedAccount.amount!
              )
                .minus(newTransaction.amount)
                .toNumber();
            }
          })
        )
        .subscribe(() => {
          this.transactionCreateForm.reset();
          this.mainService.sidebarClose();
        });
    }
  }

  ngOnDestroy(): void {
    this.selectedAccountSubscription.unsubscribe();
  }
}
