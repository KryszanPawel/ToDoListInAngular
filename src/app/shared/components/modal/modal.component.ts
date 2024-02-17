import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, of, tap } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Output() close = new EventEmitter<void>();
  sub!: Subscription;

  constructor() {}
  ngOnInit(): void {
    this.sub = of(...[1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(tap((num) => console.log(num)))
      .subscribe({
        next: (value) => console.log(value),
      });
    console.log(this.sub);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    console.log(this.sub);
  }

  onClose() {
    this.close.emit();
  }
}
