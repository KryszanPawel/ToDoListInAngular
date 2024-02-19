import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TodoService } from 'src/app/core/services/todo.service';
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
  @Input() todoId!: number;
  @Output() deleteTodoItem = new EventEmitter<void>();
  @Output() changeStatus = new EventEmitter<number>();
  // @ViewChild('li') li!: ElementRef;

  keyValueTest: { [key: string]: string | number } = {
    name: 'test',
    age: 12,
  };

  openModal: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  changeTodoStatus(): void {
    this.changeStatus.emit(this.todoId);
  }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo() {
    this.deleteTodoItem.emit();
  }

  navigateToDetails() {
    const navigationExtars: NavigationExtras = {
      relativeTo: this.activatedRoute,
      // queryParams: { id: this.todoIndex, test: 'wartość' },
      // state: { example: 'test' },
    };
    this.router.navigate([this.todoId], navigationExtars);
  }
}
