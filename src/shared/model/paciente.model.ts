import { Teste } from "./teste.model";

export interface Paciente {
    id: Number;
    paciente_nome: string;
    paciente_genero: Number;
    paciente_data_de_nascimento: string;
    testes: Teste[]
  }