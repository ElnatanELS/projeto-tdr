

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Teste = new Schema({
  tempo_inicial: {
    type: Date
  },
  tempo_final: {
    type: Date
  },
  data_do_teste: {
    type: Date
  },
  tipo_do_teste: {
    type: String
  },
  tempo_aleatorio: {
    type: String
  }
});

// Define collection and schema for AdUnits
let Paciente = new Schema({
  paciente_nome: {
    type: String
  },
  paciente_genero: {
    type: String
  },
  paciente_data_de_nascimento: {
    type: String
  },
  testes: {
    type: [Teste]
  },
},{
    collection: 'Paciente'
});




module.exports = mongoose.model('Paciente', Paciente);