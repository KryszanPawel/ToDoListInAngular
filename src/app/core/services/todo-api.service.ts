import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private endpoint: string = 'http://localhost:3000/todo';

  constructor(
    private httpClient: HttpClient,
    private todoService: TodoService
  ) {}

  fetchTodos(): Observable<Todo[]> {
    return this.httpClient
      .get<Todo[]>(this.endpoint)
      .pipe(tap((todos) => (this.todoService.setTodos = todos)));
  }

  postTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.httpClient
      .post<Todo>(this.endpoint, todo)
      .pipe(tap((todo) => this.todoService.addTodo(todo)));
  }

  deleteTodo(id: number): Observable<{}> {
    return this.httpClient
      .delete<{}>(`${this.endpoint}/${id}`)
      .pipe(tap((value) => this.todoService.deleteTodoItem(id)));
  }

  patchTodo(id: number, todo: Omit<Todo, 'id' | 'name'>): Observable<Todo> {
    return this.httpClient
      .patch<Todo>(`${this.endpoint}/${id}`, todo)
      .pipe(tap((newTodo) => this.todoService.changeTodoStatus(id, newTodo)));
  }

  getTodo(id: number): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.endpoint}/${id}`);
  }
}
