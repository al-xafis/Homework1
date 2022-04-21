import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { CategoriesService } from 'src/app/categories/categories.service';

@Component({
  selector: 'app-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.scss'],
})
export class SearchCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(400))
      .subscribe((event: any) => {
        this.categoriesService.searchCategories(event.target.value);
      });
  }
}
