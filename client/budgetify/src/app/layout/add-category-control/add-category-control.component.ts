import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-category-control',
  templateUrl: './add-category-control.component.html',
  styleUrls: ['./add-category-control.component.scss'],
})
export class AddCategoryControlComponent implements OnInit {
  @Input() label!: string;

  constructor() {}

  ngOnInit(): void {}
}
