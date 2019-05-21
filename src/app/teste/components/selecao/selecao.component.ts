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

  options: Paciente[] =[];

  filteredOptions: Observable<Paciente[]>;

  constructor(private route: ActivatedRoute,
    private service: PacienteService,
    private router: Router) { }

  // form: FormGroup = new FormGroup({
  //   $key: new FormControl(null),
  //   paciente_nome: new FormControl('', Validators.required),
  // });

  paciente_nome = new FormControl('', Validators.required);
  paciente_quant = new FormControl('', Validators.required);

  initializeFormGroup() {
    this.paciente_nome.setValue({
      $key: null,
      paciente_nome: '',
      paciente_quant: ''
    });
  }

  onClear() {
    this.paciente_nome.reset();
    this.paciente_quant.reset();
    this.initializeFormGroup();
  }



  ngOnInit() {
    this.service.getPacientes().subscribe(
      (data: Paciente[]) => {
        this.options = data
        console.log(data);
        
      }
    )
    this.route.params.subscribe(params => {
      this.tipo = params['tipo']
    });
    this.filteredOptions = this.paciente_nome.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(nome => nome ? this._filter(nome) : this.options.slice())

      );

      console.log(this.options, 'pacientes');
      
  }

  
  displayFn(user?: Paciente): string | undefined {
    return user ? user.paciente_nome : undefined;
  }

  private _filter(nome: string): Paciente[] {
    const filterValue = nome.toLowerCase();

    return this.options.filter(option => option.paciente_nome.toLowerCase().indexOf(filterValue) === 0);
  }

  irParaTeste(paciente_nome, paciente_quant?){
    console.log(paciente_nome, paciente_quant)
    this.router.navigate(['teste-tdr', paciente_nome.value._id])
  }



}
