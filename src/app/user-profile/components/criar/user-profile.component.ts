import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {
  paciente_gerenro: any = '';

  constructor(private service: PacienteService,
    // private dataAdapter:DateAdapter<any>
    ) { }

  ngOnInit() {
    // this.dataAdapter.setLocale('pt');
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    paciente_nome: new FormControl('', Validators.required),
    paciente_genero: new FormControl(''),
    paciente_data_de_nascimento: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      paciente_nome: '',
      paciente_genero: '',
      paciente_data_de_nascimento: '',
    });
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  adicionarPaciente(paciente_nome, paciente_genero?, paciente_data_de_nascimento?) {
    this.service.adicionarPaciente(paciente_nome, paciente_genero, paciente_data_de_nascimento)
    this.onClear()
    console.log(paciente_nome, paciente_genero, paciente_data_de_nascimento);

  }

  

}
