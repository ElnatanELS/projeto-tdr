import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";

export interface Teste {
  id: Number,
  tempo_inicial: String,
  tempo_final: String,
  data_do_teste: String,
  tipo_do_teste: String
}

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  paciente: any = [];

  constructor(private service: PacienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.visualizarPaciente(params['id']).subscribe(res => {


        this.paciente = res;
        console.log();
        console.log( - this.paciente.testes[0].tempo_inicial);
        
      });
    });

   
  }

  formatarData(data){
   return moment(data).format('DD/MM/YYYY')
  }

  diferenca(tempo1, tempo2){
    return Number(moment(tempo1).format('x')) - Number( moment(tempo2).format('x'))
  }

  voltar(){
    this.router.navigate(['table-list'])
    
  }

}
