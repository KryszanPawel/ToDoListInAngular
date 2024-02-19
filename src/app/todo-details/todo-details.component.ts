import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TodoApiService } from '../core/services/todo-api.service';
import { from, switchMap } from 'rxjs';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  errorMessage: string = '';
  todo!: Todo;
  id!: number;

  constructor(
    private todoApiService: TodoApiService,
    private todoService: TodoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) =>
          this.todoApiService.getTodo(Number(params.get('id')))
        )
      )
      .subscribe({
        next: (todo) => (this.todo = { ...todo }),
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = 'Brak następnego zadania';
          }
        },
      });
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.todo.id + 1]);
  }

  navigateBack() {
    this.location.back();
  }
  clearErrorMessage() {
    this.errorMessage = '';
  }
}
