import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from 'src/app/models/todos.type';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { UuidService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  isEditMode: boolean = false;

  editObj!: Itodo;

  @ViewChild('todoForm') todoForm!: NgForm;

  constructor(
    private _todoService: TodoServiceService,
    private _uuidService: UuidService,
    private _snackbarService: SnackbarService
    ) {}

  ngOnInit(): void {
    this._todoService.editTodo$.subscribe({
      next: data => {
        this.todoForm.form.patchValue(data);
        this.editObj = data;
        this.isEditMode = true;
      },
      error: err => {}
    })
  }

  onAddTodo() {
    if(this.todoForm.valid){
      let obj = {...this.todoForm.value, id: this._uuidService.uuid()};
      this.todoForm.resetForm()
      this._todoService.postTodo(obj).subscribe({
        next: data => { this._snackbarService.showAlert(`New todo with id ${obj.id} created successfully!`) },
        error: err => {}
      })      
    }else{
      this._snackbarService.showAlert(`Fill all the required fields`)
    }
  }

  onUpdateTodo() {
    if(this.todoForm.valid){
      let obj = {...this.todoForm.value, id: this.editObj.id};
      this.todoForm.resetForm();
      this.isEditMode = false;
      this._todoService.editId$.next('');
      this._todoService.patchTodo(obj).subscribe({
        next: data => { this._snackbarService.showAlert(`Todo with id ${obj.id} updated successfully!`) },
        error: err => {}
      })      
    }else{
      this._snackbarService.showAlert(`Fill all the required fields`)
    }
  }

  onCancel() {
    this.todoForm.resetForm();
    this.isEditMode = false;
    this._todoService.editId$.next('');
  }

}
