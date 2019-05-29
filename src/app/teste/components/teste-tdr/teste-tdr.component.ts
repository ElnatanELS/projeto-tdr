import { Component, OnInit, HostListener } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Teste } from 'shared/model/teste.model';
import { Paciente } from 'shared/model/paciente.model';
import { MatDialog } from '@angular/material';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';
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
  quant: any;
  stop: boolean = true;



  constructor(private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tipo_de_teste = params['tipo'],
        this.quant = params['quant']

    });

    this.inicializarteste(this.tipo_de_teste)
    




  }
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.SPACE) {
      this.setHoraFinal();
      this.diferenca(),
        this.imagem = "",
        this.audio = ""
      this.inserirTest()
      this.openDialog()

    }




    console.log(this.tempo_inicial, this.tempo_final, this.difrenca_no_tempo);

  }

  setHoraFinal() {
    this.tempo_final = new Date();
  }

  diferenca() {
    this.difrenca_no_tempo = ((this.tempo_final - this.tempo_inicial))

  }

  startCountDown(seconds, tipo) {
    var counter = seconds;
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      if (counter < 0) {

        // code here will run when the counter reaches zero.

        clearInterval(interval);
        console.log('Ding!');
        if (tipo === 'visual') {
          this.imagem = "../../assets/img/bola.png";
        }
        else {
          this.audio = "../../assets/audio/audio1.wav"
        }
        this.tempo_inicial = new Date();

      }
    }, 1000);
  }

  inserirTest() {
    this.route.params.subscribe(params => {
      this.service.visualizarPaciente(params['id']).subscribe((data: Paciente) => {
        const teste_novo: Teste = {
          tempo_inicial: this.tempo_inicial,
          tempo_final: this.tempo_final,
          data_do_teste: new Date(),
          tipo_do_teste: this.tipo_de_teste

        };
        this.service.inserirTeste(data.paciente_nome, data.paciente_genero, data.paciente_data_de_nascimento, data.testes, teste_novo, params['id']);
        

      }

      );
      // this.router.navigate(['inicio']);
    });

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
      if(!result){
        this.router.navigate(['inicio'])
      }

      if(result){
        this.inicializarteste(this.tipo_de_teste)
      }
      
    });
  }

  inicializarteste(tipo_de_teste){
    if (tipo_de_teste === 'aleatorio') {
      let tipo = this.getRandomInt(2);
      if (tipo === 2) {
        tipo_de_teste = 'visual'
      } else {
        tipo_de_teste = 'sonoro'
      }
    }

    console.log(tipo_de_teste);

    this.startCountDown(this.getRandomInt(10), tipo_de_teste)

  }

}
