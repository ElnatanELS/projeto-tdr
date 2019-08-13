import { Component, OnInit, HostListener } from '@angular/core';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { MatDialogRef } from '@angular/material';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32
}

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})


export class TelaInicialComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminLayoutComponent>) { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.SPACE) {
      this.dialogRef.close()
    }
  }

}
