import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar: MatSnackBar
  ) {}

  showAlert(msg: string, action: string = 'Close') {
    this._snackbar.open(msg, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    })
  }


}
