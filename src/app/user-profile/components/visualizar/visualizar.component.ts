import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

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
      });
    });
  }

  voltar(){
    this.router.navigate(['table-list'])
    
  }

}
