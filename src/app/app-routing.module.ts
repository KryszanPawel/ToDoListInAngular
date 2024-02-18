import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'FirstProjectApp',
  },
  { path: 'todo', component: TodoListComponent, title: 'Dodaj zadanie!' },
  {
    path: 'todo/:id',
    component: TodoDetailsComponent,
    title: 'Szczegóły zadania',
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page not found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
