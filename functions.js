//allIssues=[{project:projet1,issues:[{datas}]}]
function Solves(){
    this.solveGet=function(allIssues,projectQ,idQ,titleQ,textQ,createdonQ,updatedonQ,createdbyQ,assignedtoQ,openQ,statustextQ){
        //check if project exist and if not, return empty        
        if(!allIssues.find(({project})=>project==projectQ)){
            return '{project}'
        };
        //if project exist, return all issues
        let issuesofP=allIssues.find(({project})=>project==projectQ).issues;
        if(idQ!==undefined){
            issuesofP=issuesofP.filter(({_id})=>_id==idQ);
        };
        if(titleQ!==undefined){
            issuesofP=issuesofP.filter(({issue_title})=>issue_title==titleQ);
        };
        if(textQ!==undefined){
            issuesofP=issuesofP.filter(({issue_text})=>issue_text==textQ);
        };
        if(createdonQ!==undefined){
            issuesofP=issuesofP.filter(({created_on})=>created_on==createdonQ);
        };
        if(updatedonQ!==undefined){
            issuesofP=issuesofP.filter(({updated_on})=>updated_on==updatedonQ);
        };
        if(createdbyQ!==undefined){
            issuesofP=issuesofP.filter(({created_by})=>created_by==createdbyQ);
        };
        if(assignedtoQ!==undefined){
            issuesofP=issuesofP.filter(({assigned_to})=>assigned_to==assignedtoQ);
        };
        if(openQ!==undefined){
            issuesofP=issuesofP.filter(({open})=>open==openQ);
        };
        if(statustextQ!==undefined){
            issuesofP=issuesofP.filter(({status_text})=>status_text==statustextQ);
        };        
        return (issuesofP);
    } 

    this.solvePost=function(allIssues,projectQ,titleQ,textQ,createdbyQ,assignedtoQ,statustextQ){
        let randomID=Math.floor(Math.random() * 1000);
        let createdOnDate=new Date();
        let updateOnDate=new Date();
       
         //check if project exist and if not, create it   

         if(!allIssues.find(({project})=>project==projectQ)){
            allIssues.push({project:projectQ,issues:[]});
        };
        allIssues.forEach((item)=>{
            if(item.project===`${projectQ}`){
                item.issues.push({_id:randomID,issue_title:titleQ,issue_text:textQ,created_on:createdOnDate.toDateString(),updated_on:updateOnDate.toDateString(),created_by:createdbyQ,assigned_to:assignedtoQ,open:true,status_text:statustextQ});
            }
        })
        
        return ({_id:randomID.toString(),issue_title:titleQ,issue_text:textQ,created_on:createdOnDate.toDateString(),updated_on:updateOnDate.toDateString(),created_by:createdbyQ,assigned_to:assignedtoQ,open:true,status_text:statustextQ});
    }
    
    this.solvePut=function(allIssues,projectQ,idQ,titleQ,textQ,createdbyQ,assignedtoQ,statustextQ,openQ){
        if(idQ===undefined){
            return ({error:'missing _id'})
        };
        let toBeReturned={};
        

        let falseID=0;
        allIssues.forEach((item)=>{          
            if(item.project===projectQ){   
                item.issues.forEach((issueC)=>{
                    if(issueC._id==idQ.toString()){
                        falseID=1;    
                        let updateStatus=0;
                        if (titleQ!=""){
                            issueC.issue_title=titleQ;
                            updateStatus++;
                        }
                        if (textQ!=""){
                            issueC.issue_text=textQ;
                            updateStatus++;
                        }
                        if (createdbyQ!=""){
                            issueC.created_by=createdbyQ;
                            updateStatus++;
                        }
                        if (assignedtoQ!=""){
                            issueC.assigned_to=assignedtoQ;
                            updateStatus++;
                        }
                        if (statustextQ!=""){
                            issueC.status_text=statustextQ;
                            updateStatus++;
                        }
                        if (openQ!=""){
                            issueC.open=false;
                            updateStatus++;
                        }

                        if (updateStatus>0){
                            let updateOnDate=new Date();
                            issueC.updated_on=updateOnDate;
                            toBeReturned= {result: 'successfully updated', '_id':idQ};
                        } else {
                            toBeReturned= {error: 'no update field(s) sent', '_id': idQ};
                        }
                        
                    }
                });    
                
            }
        });
        if(falseID===0){
            toBeReturned={error:'could not update', '_id': idQ};
        }
        if(titleQ==""&&textQ==""&&createdbyQ==""&&assignedtoQ==""&&statustextQ==""&openQ==""){
            toBeReturned= {error: 'no update field(s) sent', '_id': idQ};
        }

        return toBeReturned
    }

    this.solveDelete=function(allIssues,projectQ,idQ){
        if(idQ===undefined){
            return ({error:'missing _id'})
        };
        let toBeReturned={ error: 'could not delete', '_id': idQ };
        allIssues.forEach((item)=>{          
            if(item.project===projectQ){   
                item.issues.forEach((issueToDelete,index)=>{
                    if(issueToDelete._id==idQ){
                        delete(item.issues[index]);
                        toBeReturned={ result: 'successfully deleted', '_id': idQ };
                    }
                });
            }
        }); 
        return toBeReturned;   
    };
};
module.exports = Solves;