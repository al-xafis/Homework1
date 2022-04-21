import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesItemComponent } from './categories-item/categories-item.component';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories.component';
import { SearchCategoriesComponent } from '../layout/components/search-categories/search-categories.component';
import { AddCategoryControlComponent } from '../layout/add-category-control/add-category-control.component';
import { CreateCategorySidenavComponent } from '../layout/create-category-sidenav/create-category-sidenav.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    CategoriesItemComponent,
    SearchCategoriesComponent,
    AddCategoryControlComponent,
    CreateCategorySidenavComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    // CategoriesComponent,
    // CategoriesListComponent,
    // CategoriesItemComponent,
    AddCategoryControlComponent,
    SearchCategoriesComponent,
    CreateCategorySidenavComponent,
  ],
})
export class CategoriesModule {}
