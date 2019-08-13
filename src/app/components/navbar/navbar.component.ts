import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import * as XLSX from 'xlsx';
import { PacienteService } from 'app/user-profile/service/paciente.service';
import  * as moment from "moment";
import { MatDialog } from '@angular/material';

type AOA = any[][];


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    data: AOA;

    constructor(location: Location, private element: ElementRef, private router: Router, private service: PacienteService,
        private dialog: MatDialog) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {

        
  
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.service.getPacientes().subscribe(
            data => this.data = this.criarData(data)
        );

    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();
        console.log(titlee);
        

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard s';
    }




    wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
    fileName: string = 'Testes_tempo_de_reacao_'+moment(new Date()).format('DD_MM_YYYY')+'.xlsx';

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

        /* save to file */
        XLSX.writeFile(wb, this.fileName);
    }

    criarData(dadosinicias) {
        var data: any[][] = [];

        var cabecalho: any[] = ['N°','Nome', 'Data de Nascimento', 'Genero', 'tipo de teste', 'tempo para iniciar', 'tempo de reação', 'data do teste']

        var linha: any[] = [];
        data.push(cabecalho);
        for (var i = 0; dadosinicias.length > i; i++) {
            for (var j = 0; dadosinicias[i].testes.length > j; j++) {
                linha.push(String(j + 1));
                linha.push(dadosinicias[i].paciente_nome);
                linha.push(moment(dadosinicias[i].paciente_data_de_nascimento).format('DD/MM/YYYY'));
                linha.push(dadosinicias[i].paciente_genero);
                linha.push(dadosinicias[i].testes[j].tipo_do_teste);
                linha.push(dadosinicias[i].testes[j].tempo_aleatorio);
                linha.push(this.diferenca(dadosinicias[i].testes[j].tempo_final, dadosinicias[i].testes[j].tempo_inicial));
                linha.push(moment(dadosinicias[i].testes[j].data_do_teste).format('DD/MM/YYYY'));
                data.push(linha);
                linha = []
            }

        }
        return data
    }

    diferenca(tempo1, tempo2){
        return Number(moment(tempo1).format('x')) - Number( moment(tempo2).format('x'))
      }
}
