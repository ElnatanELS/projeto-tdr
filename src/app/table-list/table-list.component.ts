import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { Paciente } from 'shared/model/paciente.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConfirmacaoComponent } from './dialog-confirmacao/dialog-confirmacao.component';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  pacientes: Paciente[];

  constructor(private service: PacienteService,
    private router: Router,
    public dialog: MatDialog) { }

  delatarPaciente(id) {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ', result);
      if(result){
        this.service.deletarPaciente(id).subscribe(res => {
          console.log('Deleted');
          this.service
            .getPacientes()
            .subscribe((data: Paciente[]) => {
              this.pacientes = data;
            });
        });
      }
      
    })
    
  }

  ngOnInit() {
    this.service
      .getPacientes()
      .subscribe((data: Paciente[]) => {
        this.pacientes = data;
        console.log(data);
        

      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service
        .getPacientes()
        .subscribe((data: Paciente[]) => {
          this.pacientes = data;
        });
    })

  }

}
