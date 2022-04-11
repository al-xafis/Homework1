import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.scss'],
})
export class AddControlComponent implements OnInit {
  @Input() label!: string;
  constructor() {}

  ngOnInit(): void {}
}
