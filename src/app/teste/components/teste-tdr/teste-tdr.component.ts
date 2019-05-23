import { Component, OnInit, HostListener } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Teste } from 'shared/model/teste.model';
import { Paciente } from 'shared/model/paciente.model';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  SPACE = 32
}
@Component({
  selector: 'app-teste-tdr',
  templateUrl: './teste-tdr.component.html',
  styleUrls: ['./teste-tdr.component.scss']
})
export class TesteTdrComponent implements OnInit {

  value = 0;
  tempo_inicial: any;
  tempo_final: any;
  difrenca_no_tempo: any;

  imagem: any;
  audio: any;
  tipo_de_teste: any;

  constructor( private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.startCountDown(3)

  }
  @HostListener('window:keyup', ['$event'])

  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.SPACE) {
      this.setHoraFinal();
      this.diferenca(),
        this.imagem = "",
        this.audio = ""
      this.inserirTest()
    }




    console.log(this.tempo_inicial, this.tempo_final, this.difrenca_no_tempo);

  }

  setHoraFinal() {
    this.tempo_final = new Date();
  }

  diferenca() {
    this.difrenca_no_tempo = ((this.tempo_final - this.tempo_inicial))

  }

  startCountDown(seconds) {
    var counter = seconds;
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      if (counter < 0) {

        // code here will run when the counter reaches zero.

        clearInterval(interval);
        console.log('Ding!');
        this.imagem = "../../assets/img/20190521155538448942e.jpg";
        // this.audio = "../../assets/audio/audio1.wav"
        this.tempo_inicial = new Date();
      }
    }, 1000);
  }

  inserirTest() {
    this.route.params.subscribe(params => {
      this.service.visualizarPaciente( params['id']).subscribe( (data: Paciente) => {
        const teste_novo: Teste ={
          tempo_inicial: this.tempo_inicial,
          tempo_final: this.tempo_final,
          data_do_teste: new Date(),
          tipo_do_teste: this.tipo_de_teste

        };
        this.service.inserirTeste(data.paciente_nome, data.paciente_genero, data.paciente_data_de_nascimento,data.testes,teste_novo, params['id'])}

      );
      // this.router.navigate(['table-list']);
    });
  }




}
