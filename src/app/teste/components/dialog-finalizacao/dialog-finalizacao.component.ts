import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TesteTdrComponent } from '../teste-tdr/teste-tdr.component';

@Component({
  selector: 'app-dialog-finalizacao',
  templateUrl: './dialog-finalizacao.component.html',
  styleUrls: ['./dialog-finalizacao.component.scss']
})
export class DialogFinalizacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TesteTdrComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
