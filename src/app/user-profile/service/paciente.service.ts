import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare var $: any;
export interface Teste {
  tempo_inicial: Number,
  tempo_final: Number,
  data_do_teste: Date,
  tipo_do_teste: String
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  uri = 'http://localhost:4000/pacientes';

  constructor(private http: HttpClient) { }

  adicionarPaciente(paciente_nome, paciente_genero, paciente_data_de_nascimento) {
    const obj = {
      paciente_nome: paciente_nome,
      paciente_genero: paciente_genero,
      paciente_data_de_nascimento: paciente_data_de_nascimento,
      testes : [{
        tempo_inicial: 10,
        tempo_final: 11,
        data_do_teste: paciente_data_de_nascimento,
        tipo_do_teste: 'visual'
      },{
        tempo_inicial: 10,
        tempo_final: 11,
        data_do_teste: paciente_data_de_nascimento,
        tipo_do_teste: 'visual'
      }]
    };
    
    this.http.post(`${this.uri}/adicionar`, obj)
      .subscribe(res => {
        this.showNotification(res.valueOf()['paciente'])
      });
  }

  getPacientes() {
    return this
      .http
      .get(`${this.uri}`);
  }

  editarPaciente(id) {
    return this
      .http
      .get(`${this.uri}/editar/${id}`);
  }
  visualizarPaciente(id) {
    return this
      .http
      .get(`${this.uri}/visualizar/${id}`);
  }

  atualizarPaciente(paciente_nome, paciente_genero, paciente_data_de_nascimento, id) {

    const obj = {
      paciente_nome: paciente_nome,
      paciente_genero: paciente_genero,
      paciente_data_de_nascimento: paciente_data_de_nascimento,
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => this.showNotification(res));
  }

  deletarPaciente(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  showNotification(msg) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: msg

    }, {
        type: type[color],
        timer: 2000,
        placement: {
          from: 'top',
          align: 'right'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }
}

