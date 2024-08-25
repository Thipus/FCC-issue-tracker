const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
//let allIssues=[{project:'apitest',issues:[{_id:'1',open:'open'}]}];
chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('Create an issue with every field: POST request to /api/issues/{project}',function(done){
    /*
    let project = req.params.project;
    let titleQ=req.body.issue_title;
    let textQ=req.body.issue_text;
    let createdbyQ=req.body.created_by;
    let assignedtoQ=req.body.assigned_to?req.body.assigned_to:"";
    let statustextQ=req.body.status_text?req.body.status_text:"";
    */
    chai.
    request(server)
    .keepOpen()
    .post('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({issue_title:'New title',issue_text:'New text',created_by:'new created by',assigned_to:'new assigned to',status_text:'new status text'})
    .end(function(err,res){
        assert.include(res.text,'"issue_title":"New title"');
        assert.include(res.text,'"issue_text":"New text"');
        assert.include(res.text,'"created_by":"new created by"');
        assert.include(res.text,'"assigned_to":"new assigned to"');
        assert.include(res.text,'"status_text":"new status text"');
        done();
        })
  });

  test('Create an issue with only required fields: POST request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .post('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({issue_title:'New title',issue_text:'New text',created_by:'new created by'})
    .end(function(err,res){
        assert.include(res.text,'"issue_title":"New title"');
        assert.include(res.text,'"issue_text":"New text"');
        assert.include(res.text,'"created_by":"new created by"');
        done();
        })
  });

  test('Create an issue with missing required fields: POST request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .post('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({issue_title:'New title'})
    .end(function(err,res){
        assert.include(res.text,'"error":"required field(s) missing"');
        done();
        })
  });

  test('View issues on a project: GET request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .get('/api/issues/apitest')
    .end(function(err,res){
        assert.isArray(res.body);
        done();
        })
  });

  test('View issues on a project with one filter: GET request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .get('/api/issues/apitest?open=true')
    .end(function(err,res){
        assert.isArray(res.body);
        assert.notInclude(res.body,'"open":false')
        done();
        })
  });

  test('View issues on a project with multiple filters: GET request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .get('/api/issues/apitest?issue_text=test&_id=1')
    .end(function(err,res){
        assert.isArray(res.body);
        assert.include(res.body[0],{_id:1})
        assert.include(res.body[0],{issue_text:"test"})
        done();
        })
  });

  test('Update one field on an issue: PUT request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .put('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:1,issue_title:'New new title'})
    .end(function(err,res){
        assert.include(res.text,'successfully updated');
        done();
        })
  });

  test('Update multiple fields on an issue: PUT request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .put('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:1,issue_title:'New new title',issue_text:'new text'})
    .end(function(err,res){
        assert.include(res.text,'successfully updated');
        done();
        })
  });

  test('Update an issue with missing _id: PUT request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .put('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({issue_title:'New new title',issue_text:'new text'})
    .end(function(err,res){
        assert.include(res.text,'missing _id');
        done();
        })
  });

  test('Update an issue with no fields to update: PUT request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .put('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:1})
    .end(function(err,res){
        assert.include(res.text,'no update field(s) sent');
        done();
        })
  });

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .put('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:2,issue_text:"bob"})
    .end(function(err,res){
        assert.include(res.text,'could not update');
        done();
        })
  });

  test('Delete an issue: DELETE request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .delete('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:1})
    .end(function(err,res){
        assert.include(res.text,'successfully deleted');
        done();
        })
  });

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .delete('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({_id:2})
    .end(function(err,res){
        assert.include(res.text,'could not delete');
        done();
        })
  });
  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}',function(done){
    chai.
    request(server)
    .keepOpen()
    .delete('/api/issues/apitest')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({})
    .end(function(err,res){
        assert.include(res.text,'missing _id');
        done();
        })
  });







});
