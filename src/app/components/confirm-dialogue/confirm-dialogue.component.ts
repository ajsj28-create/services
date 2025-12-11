import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.scss']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(
    private _ref2: MatDialogRef<ConfirmDialogueComponent>
  ) {}

  ngOnInit(): void {
  }

  onClose(flag: boolean) {
    this._ref2.close(flag);
  }

}
