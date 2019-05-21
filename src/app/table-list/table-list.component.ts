import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { Paciente } from 'shared/model/paciente.model';



@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  pacientes: Paciente[];

  constructor(private service: PacienteService) { }

  delatarPaciente(id) {
    this.service.deletarPaciente(id).subscribe(res => {
      console.log('Deleted');
      this.service
      .getPacientes()
      .subscribe((data: Paciente[]) => {
      this.pacientes = data;
    });
    });
  }

  ngOnInit() {
    this.service
      .getPacientes()
      .subscribe((data: Paciente[]) => {
      this.pacientes = data;
      console.log(data);
      
    });
  }

}
