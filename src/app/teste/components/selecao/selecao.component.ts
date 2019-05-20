import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Paciente {
  nome: string
}

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss']
})
export class SelecaoComponent implements OnInit {

  tipo: any;

  options: Paciente[] = [
    { nome: 'Camilla' },
    { nome: 'Elnatan' },
    { nome: 'Natan' },
    { nome: 'Lara' },
  ]

  filteredOptions: Observable<Paciente[]>;

  constructor(private route: ActivatedRoute) { }

  // form: FormGroup = new FormGroup({
  //   $key: new FormControl(null),
  //   paciente_nome: new FormControl('', Validators.required),
  // });

  paciente_nome = new FormControl('', Validators.required)

  initializeFormGroup() {
    this.paciente_nome.setValue({
      $key: null,
      paciente_nome: ''
    });
  }

  onClear() {
    this.paciente_nome.reset();
    this.initializeFormGroup();
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo']
    });
    this.filteredOptions = this.paciente_nome.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())

      );

      
  }

  
  displayFn(user?: Paciente): string | undefined {
    return user ? user.nome : undefined;
  }

  private _filter(name: string): Paciente[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nome.toLowerCase().indexOf(filterValue) === 0);
  }




}
