import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Itodo } from 'src/app/models/todos.type';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { ConfirmDialogueComponent } from '../confirm-dialogue/confirm-dialogue.component';

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
    private _snackbarService: SnackbarService,
    private _confirm: MatDialog) {}

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
    this.filterValue='';
  }

  onRemove(obj: Itodo) {

    const config = new MatDialogConfig();
    config.width = '300px';
    config.maxWidth = '90%';
    config.disableClose = true;
    config.data = obj.todo;

    let ref = this._confirm.open(ConfirmDialogueComponent, config);

    ref.afterClosed().subscribe(res => {
      if(res){
        this.filterValue=''
        this._todoService.deleteTodo(obj).subscribe({
          next: data => { this._snackbarService.showAlert(`Todo with id ${obj.id} deleted successfully!`) },
          error: err => {}
        }) 
      }
    }) 
  }

}