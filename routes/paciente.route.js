// adunit.route.js

const express = require('express');
const app = express();
const pacienteRoutes = express.Router();

// Require AdUnit model in our routes module
let Paciente = require('../models/Paciente');

// Defined store route
pacienteRoutes.route('/adicionar').post(function (req, res) {
  let paciente = new Paciente(req.body);
  console.log(req.body);
  
  paciente.save()
    .then(game => {
    res.status(200).json({'paciente': 'Paciente adicionado com sucesso!'});
    })
    .catch(err => {
    res.status(400).send("Erro ao salvar" ,err);
    });
});

// Defined get data(index or listing) route
pacienteRoutes.route('/').get(function (req, res) {
    Paciente.find(function (err, paciente){
    if(err){
      console.log(err);
    }
    else {
      res.json(paciente);
    }
  });
});

// Defined edit route
pacienteRoutes.route('/editar/:id').get(function (req, res) {
  let id = req.params.id;
  Paciente.findById(id, function (err, paciente){
      res.json(paciente);
  });
});

// Defined visualizar route
pacienteRoutes.route('/visualizar/:id').get(function (req, res) {
  let id = req.params.id;
  Paciente.findById(id, function (err, paciente){
      res.json(paciente);
  });
});

//  Defined update route
pacienteRoutes.route('/update/:id').post(function (req, res) {
    Paciente.findById(req.params.id, function(err, paciente) {
    if (!paciente)
      return next(new Error('Could not load Document'));
    else {
        paciente.paciente_nome = req.body.paciente_nome;
        paciente.paciente_genero = req.body.paciente_genero;
        paciente.paciente_data_de_nascimento = req.body.paciente_data_de_nascimento;
        paciente.testes = req.body.testes;

        paciente.save().then(paciente => {
          res.json('Atualização concluida!');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
pacienteRoutes.route('/delete/:id').get(function (req, res) {
    Paciente.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = pacienteRoutes;