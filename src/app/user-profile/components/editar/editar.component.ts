import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  paciente: any = {};
  paciente_gerenro: any = '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: PacienteService,
    // private dataAdapter: DateAdapter<any>
    ) { }




  updatePaciente(paciente_nome, paciente_genero?, paciente_data_de_nascimento?) {
    this.route.params.subscribe(params => {
      this.service.atualizarPaciente(paciente_nome, paciente_genero, paciente_data_de_nascimento, params['id']);
      this.router.navigate(['inicio']);
    });
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    paciente_nome: new FormControl('', Validators.required),
    paciente_genero: new FormControl(''),
    paciente_data_de_nascimento: new FormControl(''),
  });

  ngOnInit() {
    // this.dataAdapter.setLocale('pt');
    this.route.params.subscribe(params => {
      this.service.editarPaciente(params['id']).subscribe(res => {
        this.paciente = res;
      });
    });
  }

}
