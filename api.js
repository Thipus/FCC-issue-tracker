'use strict';
const Solves = require('../functions.js');
module.exports = function (app) {
let allIssues=[{project:'apitest',issues:[{_id:'1',open:'open'}]}];
//let allIssues=[];
  let solveS=new Solves();
  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let idQ=req.query._id;
      let titleQ=req.query.issue_title;
      let textQ=req.query.issue_text;
      let createdonQ=req.query.created_on;
      let updatedonQ=req.query.updated_on;
      let createdbyQ=req.query.created_by;
      let assignedtoQ=req.query.assigned_to;
      let openQ=req.query.open;
      let statustextQ=req.query.status_text;
      res.send(solveS.solveGet(allIssues,project,idQ,titleQ,textQ,createdonQ,updatedonQ,createdbyQ,assignedtoQ,openQ,statustextQ));
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let titleQ=req.body.issue_title;
      let textQ=req.body.issue_text;
      let createdbyQ=req.body.created_by;
      let assignedtoQ=req.body.assigned_to?req.body.assigned_to:"";
      let statustextQ=req.body.status_text?req.body.status_text:"";
      //check missing fields
        if(!titleQ || !textQ || !createdbyQ){
            res.send({error: 'required field(s) missing' });
        }else{
      res.send(solveS.solvePost(allIssues,project,titleQ,textQ,createdbyQ,assignedtoQ,statustextQ));
        }
    })
    
    .put(function (req, res){
      let idQ=req.body._id;       
      let project = req.params.project;
      let titleQ=req.body.issue_title?req.body.issue_title:"";
      let textQ=req.body.issue_text?req.body.issue_text:"";
      let createdbyQ=req.body.created_by?req.body.created_by:"";
      let assignedtoQ=req.body.assigned_to?req.body.assigned_to:"";
      let statustextQ=req.body.status_text?req.body.status_text:"";
      let openQ=req.body.open?req.body.open:"";
      res.send(solveS.solvePut(allIssues,project,idQ,titleQ,textQ,createdbyQ,assignedtoQ,statustextQ,openQ));
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      let idQ=req.body._id;
      res.send(solveS.solveDelete(allIssues,project,idQ));
    });
    
};
