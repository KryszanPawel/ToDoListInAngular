import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos: Todo[] = [];
  errorMessage: string = "";
  testSwitchCase = "nie"

  addTodo(todo: string): void {
    if(todo.length <= 3){
      this.errorMessage = "Zadanie powinno mieć conajmniej 4 znaki";
      return;
    }
    let newTodo: Todo = {name: todo, isCompleted: false};
    this.todos.push(newTodo);
    console.log("Aktualna lista todos: ", this.todos);
  }

  changeTodoStatus(todoItem: Todo){
    todoItem.isCompleted = !todoItem.isCompleted;
  }

  clearErrorMessage(){
    this.errorMessage = "";
  }

}
