import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/categories/categories.service';

@Component({
  selector: 'app-create-category-sidenav',
  templateUrl: './create-category-sidenav.component.html',
  styleUrls: ['./create-category-sidenav.component.scss'],
})
export class CreateCategorySidenavComponent implements OnInit {
  categoryCreateForm!: FormGroup;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryCreateForm = new FormGroup({
      type: new FormControl('Expense', Validators.required),
      title: new FormControl(null),
    });
  }

  closeSidebar() {
    this.categoriesService.closeCreateCategorySidebar();
  }

  Submit() {
    const { type, title } = this.categoryCreateForm.value;
    this.categoriesService.createCategory(type, title).subscribe(() => {
      this.categoryCreateForm.reset();
      this.closeSidebar();
    });
  }
}
