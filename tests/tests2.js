var chai = require('chai');
var request = require('supertest');
var express = require('express');

var app = require('../app');

var assert = chai.assert;

var tutu = require('../scripts/tokens');
var chuchu = require('../scripts/parse');
//var tuchu = require('../scripts/main');


suite('analizadorLex', function () {
   setup(function(){
        //var result;
    
        //if (typeof __html__ !== 'undefined') {
          //  document.body.innerHTML = __html__['test.html'];
            //original = document.getElementById('original');
        //}
        
    });



   test ('Probando el objeto token', function (done) {
   
   //console.log(request(app).get('/'));
      
   
   
      request(app).get('/test').expect(200)
      .end(function(err, res) {
         //console.log ('hola');
         
         //assert.deepEqual(0, 0, 'Dos ceros.');
         
         
         var textoEntrada = "var aux = \"prueba\";";
         var textoComparar = '[{"type":"name","value":"var","from":0,"to":3},'
                        + '{"type":"name","value":"aux","from":4,"to":7},'
                        + '{"type":"operator","value":"=","from":8,"to":9},'
                        + '{"type":"string","value":"prueba","from":10,"to":18},'
                        + '{"type":"operator","value":";","from":18,"to":19}]';
                   
         var objetoParseado = JSON.stringify(textoEntrada.tokens());
         assert.deepEqual(objetoParseado, textoComparar);
         
         done();
      });
   
   });
   
   test ('Probando el objeto parse', function () {
      var parse = chuchu.make_parseOLE ();
      var entrada = "var aux = \"prueba\";";
                   
      var seEspera = '{\n    "value": "=",\n    "arity": "binary",\n    "first": '
                   + '{\n        "value": "aux",\n        "arity": "name"\n    },'
                   + '\n    "second": {\n        "value": "prueba",\n        "arity": "literal"\n    }\n}';
                   
                   
      var salida, tree;
      
      try {
            tree = parse(entrada);
            salida = JSON.stringify(tree, ['key', 'name', 'message',
                   'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      } catch (e) {
            salida = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                   'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      }
      assert.deepEqual(salida, seEspera);
   });
   
   
   test ('Probando la carga de la pagina index.html usando las views de express', function (done) {
      request(app).get('/').expect(200, done);
   });
   
   
   test ('Probando la carga de la pagina test.html usando las views de express', function (done) {
      request(app).get('/test').expect(200, done);
   
   });
   
});
