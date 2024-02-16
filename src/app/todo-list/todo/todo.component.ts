import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  @Input() todoItem! : Todo;
  @Input() todoIndex! : number;
  openModal: boolean = false;


  changeTodoStatus(todoItem: Todo) : void{
    todoItem.isCompleted = !todoItem.isCompleted;
    }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }


}
