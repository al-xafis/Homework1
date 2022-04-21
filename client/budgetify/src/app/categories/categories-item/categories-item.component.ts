import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.scss'],
})
export class CategoriesItemComponent implements OnInit, AfterViewInit {
  @ViewChild('name') name!: ElementRef;
  @Input() category!: any;
  editMode: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  editCategory() {
    this.categoriesService
      .editCategory(this.category._id, this.name.nativeElement.value)
      .subscribe((data) => {
        console.log(data);
        this.toggleEdit();
      });
  }

  deleteCategory() {
    this.categoriesService
      .deleteCategory(this.category._id)
      .subscribe((data) => {
        console.log(data);
      });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
