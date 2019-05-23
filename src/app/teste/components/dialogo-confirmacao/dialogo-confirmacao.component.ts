import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TesteTdrComponent } from '../teste-tdr/teste-tdr.component';

@Component({
  selector: 'app-dialogo-confirmacao',
  templateUrl: './dialogo-confirmacao.component.html',
  styleUrls: ['./dialogo-confirmacao.component.scss']
})
export class DialogoConfirmacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TesteTdrComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
