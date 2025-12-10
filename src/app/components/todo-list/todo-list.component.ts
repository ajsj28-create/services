import { Component, OnInit } from '@angular/core';
import { Itodo } from 'src/app/models/todos.type';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todosArray: Array<Itodo> = [];

  filterValue!: string;

  editId!: string;

  constructor(
    private _todoService: TodoServiceService,
    private _snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this._todoService.fetchAllTodos().subscribe({
      next: data => { this.todosArray = data },
      error: err => {}
    });

    this._todoService.editId$.subscribe({
      next: data => {
        this.editId = data;
      },
      error: err => {}
    })
  }

  onEdit(obj: Itodo) {
    this._todoService.editTodo$.next(obj);
    this.editId = obj.id;
  }

  onRemove(obj: Itodo) {
    let sure = confirm(`Are you sure to delete Todo with id ${obj.id}`);
    if(sure){
      this._todoService.deleteTodo(obj).subscribe({
        next: data => { this._snackbarService.showAlert(`Todo with id ${obj.id} deleted successfully!`) },
        error: err => {}
      })       
    }    
  }

}