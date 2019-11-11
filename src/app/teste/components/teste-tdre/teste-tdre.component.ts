import { Component, OnInit, HostListener } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { KEY_CODE } from 'app/tela-inicial/tela-inicial.component';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';
import { DialogFinalizacaoComponent } from '../dialog-finalizacao/dialog-finalizacao.component';
import { DialogContinuacaoComponent } from '../dialog-continuacao/dialog-continuacao.component';
import { Paciente } from 'shared/model/paciente.model';
import { Teste } from 'shared/model/teste.model';

@Component({
  selector: 'app-teste-tdre',
  templateUrl: './teste-tdre.component.html',
  styleUrls: ['./teste-tdre.component.css']
})
export class TesteTdreComponent implements OnInit {
  value = 0;
  tempo_inicial: any;
  tempo_final: any;
  difrenca_no_tempo: any;

  imagem: any;
  audio: any;
  tipo_de_teste: any;
  quant: any;
  stop: boolean = true;
  tipo_de_cor: number;
  nome_cor: string;
  verde: boolean;
  vermelho: boolean;
  amarelo: boolean;
  azul: boolean;
  cores_amarelo: number[] = [2, 3, 4];
  cores_azul: number[] = [1, 3, 4];
  cores_verde: number[] = [1, 2, 4];
  cores_vermelho: number[] = [1, 2, 3];

  repeticao: any = 1;
  tipo_aleatorio: any = '';
  tempo_aleatorio: any = -1;
  cont_tipo_sonoro: any = 0;
  cont_tipo_visual: any = 0;

  constructor(
    private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    document.querySelector('body').style.backgroundColor = 'black';
    this.route.params.subscribe(params => {
      this.tipo_de_teste = params['tipo'];
      if (params['quant'] == 0) {
        this.quant = 1;
      } else {
        this.quant = params['quant'];
      }
    });
    console.log(this.tipo_de_teste);

    this.inicializarteste(this.tipo_de_teste);
  }
  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event.keyCode);
    console.log(this.tipo_de_cor);

    if (event.keyCode === KEY_CODE.TECLA_1) {
      if (this.tipo_de_cor == 1) {
        this.setHoraFinal();
        this.diferenca(),
          (this.imagem = ''),
          (this.audio = ''),
          (this.nome_cor = ''),
          (this.azul = false),
          (this.amarelo = false),
          (this.verde = false),
          (this.vermelho = false);

        this.inserirTest(this.tipo_aleatorio);

        if (
          this.repeticao == this.quant &&
          this.tipo_de_teste === 'aleatorio'
        ) {
          this.openDialogFinalizacao();
          this.cont_tipo_sonoro = 0;
          this.cont_tipo_visual = 0;
        }
        this.repeticao++;
        if (this.tipo_de_teste != 'aleatorio') {
          this.openDialog();
        }
        if (this.repeticao <= this.quant) {
          // this.inicializarteste(this.tipo_de_teste)
          this.openDialogContinuacao();
        }
      }
    } else if (event.keyCode === KEY_CODE.TECLA_2) {
      if (this.tipo_de_cor == 2) {
        this.setHoraFinal();
        this.diferenca(),
          (this.imagem = ''),
          (this.audio = ''),
          (this.nome_cor = ''),
          (this.azul = false),
          (this.amarelo = false),
          (this.verde = false),
          (this.vermelho = false);

        this.inserirTest(this.tipo_aleatorio);

        if (
          this.repeticao == this.quant &&
          this.tipo_de_teste === 'aleatorio'
        ) {
          this.openDialogFinalizacao();
          this.cont_tipo_sonoro = 0;
          this.cont_tipo_visual = 0;
        }
        this.repeticao++;
        if (this.tipo_de_teste != 'aleatorio') {
          this.openDialog();
        }
        if (this.repeticao <= this.quant) {
          // this.inicializarteste(this.tipo_de_teste)
          this.openDialogContinuacao();
        }
      }
    } else if (event.keyCode === KEY_CODE.TECLA_3) {
      if (this.tipo_de_cor == 3) {
        this.setHoraFinal();
        this.diferenca(),
          (this.imagem = ''),
          (this.audio = ''),
          (this.nome_cor = ''),
          (this.azul = false),
          (this.amarelo = false),
          (this.verde = false),
          (this.vermelho = false);

        this.inserirTest(this.tipo_aleatorio);

        if (
          this.repeticao == this.quant &&
          this.tipo_de_teste === 'aleatorio'
        ) {
          this.openDialogFinalizacao();
          this.cont_tipo_sonoro = 0;
          this.cont_tipo_visual = 0;
        }
        this.repeticao++;
        if (this.tipo_de_teste != 'aleatorio') {
          this.openDialog();
        }
        if (this.repeticao <= this.quant) {
          // this.inicializarteste(this.tipo_de_teste)
          this.openDialogContinuacao();
        }
      }
    } else if (event.keyCode === KEY_CODE.TECLA_4) {
      if (this.tipo_de_cor == 4) {
        this.setHoraFinal();
        this.diferenca(),
          (this.imagem = ''),
          (this.audio = ''),
          (this.nome_cor = ''),
          (this.azul = false),
          (this.amarelo = false),
          (this.verde = false),
          (this.vermelho = false);

        this.inserirTest(this.tipo_aleatorio);

        if (
          this.repeticao == this.quant &&
          this.tipo_de_teste === 'aleatorio'
        ) {
          this.openDialogFinalizacao();
          this.cont_tipo_sonoro = 0;
          this.cont_tipo_visual = 0;
        }
        this.repeticao++;
        if (this.tipo_de_teste != 'aleatorio') {
          this.openDialog();
        }
        if (this.repeticao <= this.quant) {
          // this.inicializarteste(this.tipo_de_teste)
          this.openDialogContinuacao();
        }
      }
    }
  }

  setHoraFinal() {
    this.tempo_final = new Date();
  }

  diferenca() {
    this.difrenca_no_tempo = this.tempo_final - this.tempo_inicial;
  }

  startCountDown(seconds, tipo) {
    var counter = seconds;
    var interval = setInterval(() => {
      if (this.tempo_aleatorio == -1) {
        this.tempo_aleatorio = counter;
      }

      console.log(counter);
      counter--;

      if (counter < 0) {
        // code here will run when the counter reaches zero.
        console.log('bing !!');

        clearInterval(interval);

        this.tipo_de_cor = this.getRandomInt(4);
        console.log(this.tipo_de_cor, ' cor');

        if (tipo == 'cores') {
          if (this.tipo_de_cor == 1) {
            console.log('amerela');

            this.imagem = './assets/img/bola.png';
          } else if (this.tipo_de_cor == 2) {
            console.log('azul');

            this.imagem = './assets/img/bola_azul.png';
          } else if (this.tipo_de_cor == 3) {
            console.log('verde');

            this.imagem = './assets/img/bola_verde.png';
          } else if (this.tipo_de_cor == 2) {
            console.log('vermelho');

            this.imagem = './assets/img/bola_vermelho.png';
          }
        } else {
          if (this.tipo_de_cor == 1) {
            console.log('amerela');
            console.log(this.coresPalavras(this.tipo_de_cor), 'tipo de cor');

            this.nome_cor = 'AMARELO';
            this.cores(this.coresPalavras(this.tipo_de_cor));
          } else if (this.tipo_de_cor == 2) {
            console.log('azul');
            console.log(this.coresPalavras(this.tipo_de_cor), 'tipo de cor');

            this.nome_cor = 'AZUL';
            this.cores(this.coresPalavras(this.tipo_de_cor));
          } else if (this.tipo_de_cor == 3) {
            console.log('verde');
            console.log(this.coresPalavras(this.tipo_de_cor), 'tipo de cor');

            this.nome_cor = 'VERDE';
            this.cores(this.coresPalavras(this.tipo_de_cor));
          } else if (this.tipo_de_cor == 2) {
            console.log('vermelho');
            console.log(this.coresPalavras(this.tipo_de_cor), 'tipo de cor');

            this.nome_cor = 'VERMELHO';
            this.cores(this.coresPalavras(this.tipo_de_cor));
          }
        }

        this.tempo_inicial = new Date();
      }
    }, 1000);
    this.tempo_aleatorio = -1;
  }

  inserirTest(tipo?: any) {
    let teste = this.tipo_de_teste;
    if (tipo) {
      teste = tipo;
    }
    this.route.params.subscribe(params => {
      this.service
        .visualizarPaciente(params['id'])
        .subscribe((data: Paciente) => {
          const teste_novo: Teste = {
            tempo_inicial: this.tempo_inicial,
            tempo_final: this.tempo_final,
            data_do_teste: new Date(),
            tipo_do_teste: teste,
            tempo_aleatorio: this.tempo_aleatorio
          };
          this.service.inserirTeste(
            data.paciente_nome,
            data.paciente_genero,
            data.paciente_data_de_nascimento,
            data.testes,
            teste_novo,
            params['id']
          );
        });
      // this.router.navigate(['inicio']);
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1;
  }
  getRandomInt1(max) {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoConfirmacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.router.navigate(['inicio']);
      }

      if (result) {
        this.inicializarteste(this.tipo_de_teste);
      }
    });
  }

  openDialogFinalizacao(): void {
    const dialogRef = this.dialog.open(DialogFinalizacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['inicio']);
      }
    });
  }
  openDialogContinuacao(): void {
    const dialogRef = this.dialog.open(DialogContinuacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.inicializarteste(this.tipo_de_teste);
      }
    });
  }

  inicializarteste(tipo_de_teste) {
    if (tipo_de_teste === 'aleatorio') {
      let tipo = this.tiposIguaisAleatorios();
      if (tipo === 2) {
        tipo_de_teste = 'visual';
      } else {
        tipo_de_teste = 'auditivo';
      }
    }

    this.tipo_aleatorio = tipo_de_teste;

    this.startCountDown(this.getRandomInt(10), tipo_de_teste);
  }

  tiposIguaisAleatorios() {
    let tipoAl = this.getRandomInt(2);
    if (tipoAl == 2) {
      this.cont_tipo_visual++;
    }

    if (this.cont_tipo_visual > this.quant / 2 && tipoAl == 2) {
      return 1;
    }
    if (tipoAl == 1) {
      this.cont_tipo_sonoro++;
    }

    if (this.cont_tipo_sonoro > this.quant / 2 && tipoAl == 1) {
      return 2;
    }

    return tipoAl;
  }
  coresPalavras(numero) {
    let numero_cor = this.getRandomInt1(2);
    if (numero == 1) {
      console.log('amerela');
      return this.cores_amarelo[numero_cor];
    } else if (numero == 2) {
      console.log('azul');
      return this.cores_azul[numero_cor];
    } else if (numero == 3) {
      console.log('verde');
      return this.cores_verde[numero_cor];
    } else if (numero == 4) {
      console.log('vermelho');
      return this.cores_vermelho[numero_cor];
    }
  }
  cores(numero) {
    if (numero == 1) {
      console.log('amerela');
      this.amarelo = true;
    } else if (numero == 2) {
      console.log('azul');
      this.azul = true;
    } else if (numero == 3) {
      console.log('verde');
      this.verde = true;
    } else if (numero == 4) {
      console.log('vermelho');
      this.vermelho = true;
    }
  }

  ngOnDestroy() {
    document.querySelector('body').style.backgroundColor = '#eee';
  }
}
