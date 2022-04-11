import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-account-item-dummy',
  templateUrl: './account-item-dummy.component.html',
  styleUrls: ['./account-item-dummy.component.scss'],
})
export class AccountItemDummyComponent implements OnInit {
  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  openAccCreateSidebar() {
    this.mainService.accountCreateSidebarOpen();
  }
}
