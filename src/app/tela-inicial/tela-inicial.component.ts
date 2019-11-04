import { Component, OnInit, HostListener } from '@angular/core';
import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';
import { MatDialogRef } from '@angular/material';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32,
  TECLA_1 = 49,
  TECLA_2 = 50,
  TECLA_3 = 51,
  TECLA_4 = 52
}

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AdminLayoutComponent>) {}

  ngOnInit() {}

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.SPACE) {
      this.dialogRef.close();
    }
  }
}
