import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Paciente } from 'shared/model/paciente.model';
import { PacienteService } from 'app/user-profile/service/paciente.service';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss']
})
export class SelecaoComponent implements OnInit {
  tipo: any;

  options: Paciente[] = [];

  filteredOptions: Observable<Paciente[]>;

  constructor(
    private route: ActivatedRoute,
    private service: PacienteService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    paciente_nome: new FormControl('', Validators.required),
    paciente_quant: new FormControl('')
  });

  // paciente_nome = new FormControl('', Validators.required);
  // paciente_quant = new FormControl('', Validators.required);

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      paciente_nome: '',
      paciente_quant: ''
    });
  }

  onClear() {
    this.form.reset();
    this.initializeFormGroup();
  }

  ngOnInit() {
    this.service.getPacientes().subscribe((data: Paciente[]) => {
      this.options = data;
    });
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'];
    });
    this.filteredOptions = this.form.get('paciente_nome').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nome)),
      map(nome => (nome ? this._filter(nome) : this.options.slice()))
    );
  }

  displayFn(user?: Paciente): string | undefined {
    return user ? user.paciente_nome : undefined;
  }

  private _filter(nome: string): Paciente[] {
    const filterValue = nome.toLowerCase();

    return this.options.filter(
      option => option.paciente_nome.toLowerCase().indexOf(filterValue) === 0
    );
  }

  irParaTeste(form) {
    console.log(form);
    console.log(form.invalid || form.controls.paciente_nome.status === 'VALID');
    if (this.tipo === 'cores' || this.tipo === 'palavras') {
      this.router.navigate([
        'teste-tdre',
        form.value.paciente_nome._id,
        this.tipo,
        1
      ]);
    } else if (this.tipo === 'd-e') {
      this.router.navigate([
        'teste-d-e',
        form.value.paciente_nome._id
      ]);
      
    } else {
      if (!form.value.paciente_quant) {
        this.router.navigate([
          'teste-tdr',
          form.value.paciente_nome._id,
          this.tipo,
          1
        ]);
      } else {
        this.router.navigate([
          'teste-tdr',
          form.value.paciente_nome._id,
          this.tipo,
          form.value.paciente_quant
        ]);
      }
    }
  }
}
