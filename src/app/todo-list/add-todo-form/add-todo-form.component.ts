import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.css'],
})
export class AddTodoFormComponent {
  @Output() outputNameValue = new EventEmitter<string>();

  todoName: string = '';

  addTodo() {
    this.outputNameValue.emit(this.todoName);
  }
}
