import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = 'http://localhost:3000/categories';
  user = JSON.parse(localStorage.getItem('user') ?? '{}');
  queryParams = new HttpParams().append('email', String(this.user.email));

  categories: any[] = [];
  categoriesChanged$ = new BehaviorSubject<any[]>([...this.categories]);
  categoriesLength = new Subject<number>();

  openCategoryCreate$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'white-snackbar',
    });
  }

  openCreateCategorySidebar() {
    this.openCategoryCreate$.next(true);
  }

  closeCreateCategorySidebar() {
    this.openCategoryCreate$.next(false);
  }

  categoryCreateSidebarState() {
    return this.openCategoryCreate$.asObservable();
  }

  getCategories() {
    this.http
      .get<any[]>(this.url, { params: this.queryParams })
      .pipe(
        tap((data) => {
          this.categories = data;
          this.categoriesChanged$.next(this.categories.slice());
          this.categoriesLength.next(this.categories.length);
          this.oldCategories = data;
        })
      )
      .subscribe();
    return this.categoriesChanged$.asObservable();
  }

  createCategory(type: string, title: string) {
    this.http
      .post<any>(this.url, { type, title }, { params: this.queryParams })
      .pipe(
        tap((data) => {
          console.log(data);
          this.categories = data;
          this.categoriesChanged$.next(this.categories.slice());
          this.oldCategories = data;
        })
      )
      .subscribe(() => this.openSnackBar('Category created successfully'));
    return this.categoriesChanged$.asObservable();
  }

  editCategory(id: string, title: string) {
    this.http
      .put<any>(
        this.url + '/' + id,
        { title: title },
        { params: this.queryParams }
      )
      .pipe(
        tap((data) => {
          this.categories = data;
          this.categoriesChanged$.next(this.categories.slice());
        })
      )
      .subscribe(() => this.openSnackBar('Category updated successfully'));
    return this.categoriesChanged$.asObservable();
  }

  deleteCategory(id: string) {
    this.http
      .delete<any>(this.url + '/' + id, { params: this.queryParams })
      .pipe(
        tap((data) => {
          this.categories = data;
          this.categoriesChanged$.next(this.categories.slice());
          this.categoriesLength.next(this.categories.length);
        })
      )
      .subscribe(() => this.openSnackBar('Category deleted successfully'));
    return this.categoriesChanged$.asObservable();
  }

  searchCategories(str: string) {
    const filteredCategories = this.categories.filter((category) => {
      return category.title?.toLowerCase().includes(str);
    });
    this.categoriesChanged$.next(filteredCategories);
  }

  showFilter: boolean = false;
  oldCategories: any[] = [];

  filterIncome() {
    if (this.showFilter === false) {
      let filteredTransactions = this.categories.filter((category) => {
        return category.type === 'Income';
      });
      this.categoriesChanged$.next(filteredTransactions.slice());
      this.showFilter = !this.showFilter;
    } else {
      this.categoriesChanged$.next(this.oldCategories.slice());
      this.showFilter = !this.showFilter;
    }
  }

  filterExpense() {
    if (this.showFilter === false) {
      let filteredTransactions = this.categories.filter((category) => {
        return category.type === 'Expense';
      });
      this.categoriesChanged$.next(filteredTransactions.slice());
      this.showFilter = !this.showFilter;
    } else {
      this.categoriesChanged$.next(this.oldCategories.slice());
      this.showFilter = !this.showFilter;
    }
  }
}
