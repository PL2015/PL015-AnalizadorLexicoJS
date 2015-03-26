var chai = require('chai');
var request = require('supertest');
var express = require('express');

var app = require('../app');

var assert = chai.assert;


suite('analizadorLex', function () {
   setup(function(){
        //var result;
    
        //if (typeof __html__ !== 'undefined') {
          //  document.body.innerHTML = __html__['test.html'];
            //original = document.getElementById('original');
        //}
        
    });



   test ('1', function (done) {
   
   //console.log(request(app).get('/'));
   
      request(app).get('/').expect(200)
      .end(function(err, res) {
         console.log ('hola');
         
         assert.deepEqual(0, 0, 'Dos ceros.');
         
         
         done();
      });
   
   });
   
   test ('2', function () {
   
   });
   
   
   test ('3', function () {
   
   });
   
   
   test ('4', function () {
   
   });
   
});
