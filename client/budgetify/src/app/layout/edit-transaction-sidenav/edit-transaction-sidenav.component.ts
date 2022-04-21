import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Decimal from 'decimal.js';
import { Subscription, take, tap } from 'rxjs';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { CategoriesService } from 'src/app/categories/categories.service';
import { MainService } from 'src/app/main/main.service';
import { Transaction } from 'src/app/transactions/transactions.model';
import { TransactionsService } from 'src/app/transactions/transactions.service';

@Component({
  selector: 'app-edit-transaction-sidenav',
  templateUrl: './edit-transaction-sidenav.component.html',
  styleUrls: ['./edit-transaction-sidenav.component.scss'],
})
export class EditTransactionSidenavComponent implements OnInit {
  transactionEditForm!: FormGroup;
  selectedAccount!: Account;
  selectedAccountSubscription!: Subscription;
  // selectedVal!: string;
  today = new Date();
  transaction!: Transaction;

  incomeCategoryList: string[] = [
    // 'Salary',
    // 'Debt repayment',
    // 'Gift',
    // 'Rental income',
    // 'Premium/bonus',
  ];

  expenseCategoryList: string[] = [
    // 'Food',
    // 'Transportation',
    // 'Housing',
    // 'Education',
    // 'Shopping',
    // 'Kids',
    // 'Entertainment',
    // 'Health and beauty',
    // 'Pet',
    // 'Internet',
    // 'Mobile',
  ];

  categoryList!: string[];

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
          !this.expenseCategoryList.includes(category.title)
        ) {
          this.expenseCategoryList.push(category.title);
        }
      });
    });

    this.transactionsSevice.getSelectedTransction().subscribe((transaction) => {
      this.transaction = transaction;
      this.categoryList =
        this.transaction.type === 'Income'
          ? this.incomeCategoryList
          : this.expenseCategoryList;
    });

    this.selectedAccountSubscription = this.accountsService
      .getSelectedAccount()
      .subscribe((data) => {
        this.selectedAccount = data;
      });

    this.transactionEditForm = new FormGroup({
      type: new FormControl(this.transaction.type, Validators.required),
      title: new FormControl(this.transaction.title),
      categories: new FormControl(this.transaction.category, [
        Validators.required,
        // Validators.minLength(1),
      ]),
      amount: new FormControl(this.transaction.amount, [
        Validators.required,
        Validators.min(1),
      ]),
      date: new FormControl(this.transaction.date, Validators.required),
      payee: new FormControl(this.transaction.payee),
      description: new FormControl(this.transaction.description),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.transactionEditForm?.get('type')?.valueChanges.subscribe((val) => {
      this.transactionEditForm.controls['categories'].setValue([]);
      if (val === 'Income') {
        this.categoryList = this.incomeCategoryList;
      } else if (val === 'Expense') {
        this.categoryList = this.expenseCategoryList;
      }
    });
  }

  onToppingRemoved(category: string) {
    const categories = this.transactionEditForm.value.categories;
    this.removeFirst(categories, category);
    // this.categories.setValue(categories); // To trigger change detection
    this.transactionEditForm.controls['categories'].setValue(categories); // To trigger change detection
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
    this.mainService.closeTransactionEditSidebar();
  }

  Submit() {
    let { type, title, categories, amount, date, payee, description } =
      this.transactionEditForm.value;

    if (title == null) {
      title = categories[0];
    }

    let newTransaction = {
      _id: this.transaction._id,
      accountTitle: this.selectedAccount.title,
      type,
      title,
      category: categories,
      amount,
      date,
      payee,
      description,
    };

    if (this.transactionEditForm.valid) {
      this.transactionsSevice
        .editTransaction(newTransaction)
        .pipe(take(1))
        .subscribe(() => {
          this.transactionEditForm.reset();
          this.mainService.closeTransactionEditSidebar();
        });
    }
  }

  ngOnDestroy(): void {
    this.selectedAccountSubscription.unsubscribe();
  }
}
