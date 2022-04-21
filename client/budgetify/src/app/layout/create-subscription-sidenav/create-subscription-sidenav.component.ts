import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/categories.service';
import { SubscriptionService } from 'src/app/subscription/subscription.service';

@Component({
  selector: 'app-create-subscription-sidenav',
  templateUrl: './create-subscription-sidenav.component.html',
  styleUrls: ['./create-subscription-sidenav.component.scss'],
})
export class CreateSubscriptionSidenavComponent implements OnInit {
  subscriptionCreateForm!: FormGroup;

  incomeCategoryList: string[] = [];

  expenseCategoryList: string[] = [];

  categoryList: string[] = this.expenseCategoryList;

  constructor(
    private categoriesService: CategoriesService,
    private subscriptionService: SubscriptionService
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

    this.subscriptionCreateForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      categories: new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      initialDate: new FormControl(null, Validators.required),
      lastDate: new FormControl(null),
      description: new FormControl(null),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.subscriptionCreateForm?.get('type')?.valueChanges.subscribe((val) => {
      this.subscriptionCreateForm.controls['categories'].setValue([]);

      if (val === 'Income') {
        this.categoryList = this.incomeCategoryList;
      } else if (val === 'Expense') {
        this.categoryList = this.expenseCategoryList;
      }
    });
  }

  onToppingRemoved(category: string) {
    const categories = this.subscriptionCreateForm.value.categories;
    this.removeFirst(categories, category);
    this.subscriptionCreateForm.controls['categories'].setValue(categories);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  closeSidebar() {
    this.subscriptionService.closeCreateSubscriptionSidebar();
  }

  Submit() {
    console.log('submit');
  }
}
