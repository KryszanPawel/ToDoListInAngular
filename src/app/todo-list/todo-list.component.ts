import { Component, Input, inject } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';

import { TodoComponent } from './todo/todo.component';
import { TodoService } from '../core/services/todo.service';
import { TestService } from '../core/services/test.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

// implements OnChanges
// implements AfterViewInit, AfterViewChecked
export class TodoListComponent {
  todos: Todo[] = this.todoService.todos;
  errorMessage: string = '';
  testSwitchCase = 'nie';

  @Input() test!: string;
  testService = inject(TestService);
  constructor(private todoService: TodoService) {}
  // @ViewChild(TodoComponent) todoComponent!: TodoComponent;

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  // ngAfterViewInit(): void {
  //   console.log(this.todoComponent);
  // }

  // ngAfterViewChecked(): void {
  //   console.log(this.todoComponent);
  // }

  addTodo(todo: string): void {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
      return;
    }
    this.todoService.addTodo(todo);
    this.todos = this.todoService.todos;
  }

  changeTodoStatus(index: number) {
    this.todoService.changeTodoStatus(index);
    this.todos = this.todoService.todos;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  deleteTodoItem(todoIndex: number) {
    this.todoService.deleteTodoItem(todoIndex);
    this.todos = this.todoService.todos;
  }
}
