import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";
import { element } from '@angular/core/src/render3';

export interface Teste {
  id: Number,
  tempo_inicial: String,
  tempo_final: String,
  data_do_teste: String,
  tipo_do_teste: String
}
export interface TesteEx {
  data_do_teste: String,
  teste: Teste[]
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  paciente: any = [];
  panelOpenState = false;
  testes: TesteEx[] = [];

  constructor(private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.visualizarPaciente(params['id']).subscribe(res => {


        this.paciente = res;

        

        var data: any = this.paciente.testes[0].data_do_teste;
        var novaArr = []
        this.paciente.testes.forEach((item) => {
          var duplicated = novaArr.findIndex(redItem => {
            return this.formatarDataSemHora(item.data_do_teste) == this.formatarDataSemHora(redItem.data_do_teste);
          }) > -1;

          if (!duplicated) {
            novaArr.push(item);
          }
        });

        console.log(this.paciente);
        
        for (let i = 0; i < novaArr.length; i++) {
          var possui = true


          for (let index = 0; index < this.paciente.testes.length ; index++) {
            const element = this.paciente.testes[index];

            if (this.formatarDataSemHora(data) == this.formatarDataSemHora(element.data_do_teste)) {
              var e = this.paciente.testes.filter((element) =>
                this.formatarDataSemHora(element.data_do_teste) == this.formatarDataSemHora(this.paciente.testes[index].data_do_teste)
              )

              // console.log(e, 'array');
              var teste: TesteEx = {
                data_do_teste: element.data_do_teste,
                teste: e
              };
              if(this.formatarDataSemHora(element.data_do_teste) == this.formatarDataSemHora(novaArr[i].data_do_teste) && possui){

                this.testes.push(teste)
                possui = false
              }
              
            }
            data = element.data_do_teste

          }

          
        }

        console.log(this.testes, 'Teste final')
      });
    });




  }

  formatarData(data) {
    return moment(data).format('DD/MM/YYYY HH:MM')
  }

  formatarDataSemHora(data) {
    return moment(data).format('DD/MM/YYYY')
  }

  diferenca(tempo1, tempo2) {
    return Number(moment(tempo1).format('x')) - Number(moment(tempo2).format('x'))
  }

  voltar() {
    this.router.navigate(['table-list'])

  }

}
