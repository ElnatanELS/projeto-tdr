import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from "moment";
import { element } from '@angular/core/src/render3';

import * as XLSX from 'xlsx';
type AOA = any[][];

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
  data: AOA;

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


          for (let index = 0; index < this.paciente.testes.length; index++) {
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
              if (this.formatarDataSemHora(element.data_do_teste) == this.formatarDataSemHora(novaArr[i].data_do_teste) && possui) {

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

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    console.log(this.data)
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Testes');

    var fileName: string = 'TDR_' + this.paciente.paciente_nome +'_'+ moment(String(this.testes[0].data_do_teste)).format('DD/MM/YYYY') + '.xlsx';

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  criarData(dadosinicias) {
    var data: any[][] = [];

    var cabecalho: any[] = ['N°','Nome', 'Data de Nascimento', 'Genero', 'tipo de teste', 'tempo para iniciar', 'tempo de reação', 'data do teste']

    var linha: any[] = [];
    data.push(cabecalho);

    for (var j = 0; dadosinicias.length > j; j++) {
      linha.push(String(j + 1));
      linha.push(this.paciente.paciente_nome);
      linha.push(moment(this.paciente.paciente_data_de_nascimento).format('DD/MM/YYYY'));
      linha.push(this.paciente.paciente_genero);
      linha.push(dadosinicias[j].tipo_do_teste);
      linha.push(dadosinicias[j].tempo_aleatorio);
      linha.push(this.diferenca(dadosinicias[j].tempo_final, dadosinicias[j].tempo_inicial));
      linha.push(moment(dadosinicias[j].data_do_teste).format('DD/MM/YYYY'));
      data.push(linha);
      linha = []
    }


    return data
  }

  exportarLinha(item){
    this.data = this.criarData(item);
    // setTimeout(function() { console.log(); }, 1000);
    this.export()
    
  }

}
