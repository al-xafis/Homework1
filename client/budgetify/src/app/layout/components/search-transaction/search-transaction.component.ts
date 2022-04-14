import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounce, debounceTime, fromEvent } from 'rxjs';
import { TransactionsService } from 'src/app/transactions/transactions.service';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss'],
})
export class SearchTransactionComponent implements OnInit, AfterViewInit {
  @ViewChild('search') search!: ElementRef;
  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(400))
      .subscribe((event: any) => {
        this.transactionService.searchTransaction(event.target.value);
      });
  }
}
