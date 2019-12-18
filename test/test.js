var chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var indexServer = require('../index.js');

describe('test', function(){
    describe('Post registration test', function(){
        // it(text,action)
        it('it should register a simgle image',
        chai.request(indexServer)
        .post('/registration')
        .set('content-type','application/x-www-form-urlencoded')
        .send({
            username: 'XYZ',
            file:"image",
        })
        .end(function(err,res){
            res.should.have.status(201);
            res.body.should.have.property('message').eql('your registration isn success');
        })
        )
    })
    })
