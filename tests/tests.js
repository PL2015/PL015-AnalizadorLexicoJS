var assert = chai.assert;


suite('analizadorLex', function () {
   setup(function(){
        //var result;
    
        if (typeof __html__ !== 'undefined') {
            document.body.innerHTML = __html__['test.html'];
            //original = document.getElementById('original');
        }
        
    });



   test ('Probando el uso del objeto token', function () {
   
      var textoEntrada = "var aux = \"prueba\";";
      var textoComparar = '[{"type":"name","value":"var","from":0,"to":3},'
                        + '{"type":"name","value":"aux","from":4,"to":7},'
                        + '{"type":"operator","value":"=","from":8,"to":9},'
                        + '{"type":"string","value":"prueba","from":10,"to":18},'
                        + '{"type":"operator","value":";","from":18,"to":19}]';
                   
      var objetoParseado = JSON.stringify(textoEntrada.tokens());
      assert.deepEqual(objetoParseado, textoComparar);
   
   
   });
   
   test ('Probando el uso del objeto parse', function () {
   
      var parse = make_parse();
      var entrada = "var aux = \"prueba\";";
      //var seEspera = '{\n        "value": "=",\n    "arity": "binary",\n    "first": '
      //             + '{\n    "value": "aux",\n        "arity": "name"\n    },'
      //             + '\n    "second": {\n        "value": "prueba",\n        "arity": "literal"\n    }\n}';
                   
                   
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
   
   
   test ('Probando el uso del objeto parse usando numeros', function () {
   
      var parse = make_parse();
      var entrada = "var aux = 7 + 3;";
      var seEspera = '{\n    "value": "=",\n    "arity": "binary",'
                   + '\n    "first": {\n        "value": "aux",\n  '
                   + '      "arity": "name"\n    },\n    "second": '
                   + '{\n        "value": "+",\n        "arity": "binary",'
                   + '\n        "first": {\n            "value": 7,'
                   + '\n            "arity": "literal"\n        },'
                   + '\n        "second": {\n            "value": 3,'
                   + '\n            "arity": "literal"\n        }\n    }\n}';
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
   
   
   test ('Probando el uso del objeto parse usando varios tipos de operadores', function () {
   
      var parse = make_parse();
      var entrada = "var aux = 7 + 3;\n aux += 2;";
      var seEspera = '[\n    {\n        "value": "=",\n        "arity": "binary",\n        "first": '
                   + '{\n            "value": "aux",\n            "arity": "name"\n        },\n      '
                   + '  "second": {\n            "value": "+",\n            "arity": "binary",\n    '
                   + '        "first": {\n                "value": 7,\n                "arity": '
                   + '"literal"\n            },\n            "second": {\n                "value": 3,'
                   + '\n                "arity": "literal"\n            }\n        }\n    },\n    {\n'
                   + '        "value": "+=",\n        "arity": "binary",\n        "first": {\n     '
                   + '       "value": "aux",\n            "arity": "name"\n        },\n        "second":'
                   + ' {\n            "value": 2,\n            "arity": "literal"\n        }\n    }\n]';
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



   test('Probando a generar errores en el objeto parse', function() {
      var parse = make_parse();
      var entrada = "var aux = as456rftsd??$?%;";
      var seEspera = "\"Syntax error near \'??$?%;\'\"";
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
      
      //Probando error de operador desconocido
      
      entrada = 'var aux = "salimos" + "pepe"';
      seEspera = '{\n    "name": "TypeError",\n    "message": "token.error is not a function"\n}';
      
      
      try {
         tree = parse(entrada);
         salida = JSON.stringify(tree, ['key', 'name', 'message',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      } catch (e) {
         salida = JSON.stringify(e, ['name', 'message', 'from', 'to', 'key',
                'value', 'arity', 'first', 'second', 'third', 'fourth'], 4);
      }
      assert.deepEqual(salida, seEspera);
      
      
      //Probando a duplicar variables
      entrada = 'var a = "salimos"; var a = "pepe"';
      seEspera = '{\n    "name": "TypeError",\n    "message": "n.error is not a function"\n}';
      
      
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


});