import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})

// OnChanges
// OnInit
// DoCheck
// implements AfterViewInit
export class TodoComponent implements OnDestroy, OnInit {
  @Input() todoItem!: Todo;
  @Input() todoIndex!: number;
  @Output() deleteTodoItem = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  // @ViewChild('li') li!: ElementRef;

  keyValueTest: { [key: string]: string | number } = {
    name: 'test',
    age: 12,
  };

  openModal: boolean = false;

  constructor() {
    // console.log(this.todoItem)
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  // ngAfterViewInit(): void {
  //   console.log(this.li);
  // }

  // ngDoCheck(): void {
  //   console.log("Ng do check wykonany");
  // }

  // ngOnInit(): void {
  //   console.log(this.todoItem);
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes)
  // }

  changeTodoStatus(): void {
    this.changeStatus.emit(this.todoIndex);
  }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo() {
    this.deleteTodoItem.emit();
  }
}
