import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  constructor(private categoriesService: CategoriesService) {}

  categories: any[] = [];
  categoriesSub$!: Subscription;

  ngOnInit(): void {
    this.categoriesSub$ = this.categoriesService
      .getCategories()
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categoriesSub$.unsubscribe();
  }
}
