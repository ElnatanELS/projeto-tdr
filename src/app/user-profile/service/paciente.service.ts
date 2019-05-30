import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teste } from 'shared/model/teste.model';
declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  uri = 'http://localhost:4000/pacientes';

  constructor(private http: HttpClient) { }

  adicionarPaciente(paciente_nome, paciente_genero, paciente_data_de_nascimento) {
    let teste: Teste[]
    const obj = {
      paciente_nome: paciente_nome,
      paciente_genero: paciente_genero,
      paciente_data_de_nascimento: paciente_data_de_nascimento,
      testes : []
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
  inserirTeste(paciente_nome, paciente_genero, paciente_data_de_nascimento, teste_atual, teste_novo, id) {
    let testeAtuais: Teste[] = teste_atual;
    testeAtuais.push(teste_novo)
   
    
    const obj = {
      paciente_nome: paciente_nome,
      paciente_genero: paciente_genero,
      paciente_data_de_nascimento: paciente_data_de_nascimento,
      teste: testeAtuais
    };

    console.log(obj);
    
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => this.showNotification("teste inserido"));
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


