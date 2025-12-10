import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Itodo } from '../models/todos.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  todosArray: Array<Itodo> = JSON.parse(localStorage.getItem('todoArray') as string) || [];

  editTodo$: Subject<Itodo> = new Subject();

  editId$: Subject<string> = new Subject();

  constructor( private _snackbar: MatSnackBar ) {}

  fetchAllTodos(): Observable<Array<Itodo>> {
    return of(this.todosArray);
  }

  postTodo(obj: Itodo): Observable<Itodo> {
    this.todosArray.push(obj);
    this.setLocalStorage()
    return of(obj)
  }

  patchTodo(obj: Itodo): Observable<Itodo> {
    let ind = this.todosArray.findIndex(ele => ele.id === obj.id);
    this.todosArray[ind] = obj;
    this.setLocalStorage()
    return of(obj);
  }

  deleteTodo(obj: Itodo): Observable<Itodo> {
    let ind = this.todosArray.findIndex(ele => ele.id === obj.id);
    this.todosArray.splice(ind, 1);
    this.setLocalStorage()
    return of(obj);
  } 

  setLocalStorage() {
    localStorage.setItem('todoArray', JSON.stringify(this.todosArray));
  }

}