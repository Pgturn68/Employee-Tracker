const db= require ("./DB/db");
const inquirer = require("inquirer");
const { response } = require("express");
require("console.table");
start();


function start(){
    console.log("Welcome to my app");
    mainMenu();
}
function mainMenu(){
    
inquirer.prompt({
    message:"What would you like to do?",
    name: "choice",
    type:"list",
    choices:[
       {
           name:"View all employees",
           value:"viewEmployees"
       },
       {
        name:"View all roles",
        value:"viewRoles"
    },  
    {
        name:"View all departments",
        value:"viewDepartments"
    },
    {
        name:"Add employee",
        value:"addEmployee"
    },
    {
        name:"Add role",
        value:"addRole"
    },
    {
        name:"Add department",
        value:"addDepartment"
    },
    {
        name:"Update employee role",
        value:"updateRole"
    },
    {
        name: "Exit",
        value:"finish"
    }

    ]
}).then(handleAction);

}

function handleAction(action){
    if(actions[action.choice])
    {actions[action.choice]()}
} 

function viewEmployees(){
    db.getAllEmployees((err,results)=>{
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

function viewRoles(){db.getAllRoles((err,results)=>{
    if (err) throw err;
    console.table(results);
    mainMenu();
});}

function viewDepartments(){
    db.getAllDepartments((err,results)=>{
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
}

function addEmployee(){
    db.getAllEmployees((err,results)=>{
        if (err)throw err;
        const managers=results.map(m=>({name:`${m.first_name} ${m.last_name}`,value:m.id}));
        managers.push({name:"none",value:null});
        db.getAllRoles((err,results)=>{
            if (err) throw err;
            const roles=results.map(r=>({name:r.title,value:r.id}));
            inquirer.prompt([
                {
                    message:"first name?",
                    name:"first_name",

                },
                {
                    message:"last name?",
                    name:"last_name"
                },
                {
                    message:"role?",
                    name:"role_id",
                    type:"list",
                    choices: roles
                },
                {
                    message:"manager?",
                    name:"manager_id",
                    type:"list",
                    choices: managers
                }
            ]).then(response=>{
                db.newEmployee(response,err=>{
                    if (err) throw err;
                    console.log("employee created");
                    mainMenu();
                }); 
            });
            
        });
    });
}

function addRole(){
    db.getAllDepartments((err,results)=>{
        if (err) throw err;
        const departments = results.map(d=>({name:d.name,value:d.id}));
        inquirer.prompt([
            {
                message:"role title?",
                name:"title"
            
            },
            {
                message:"role salary",
                name:"salary"
            },
            {
                message:"role department?",
                name:"department_id",
                type:"list",
                choices: departments
            }
        ]).then(response=>{
            db.newRole(response,err=>{
                if (err) throw err;
                console.log("role created");
                mainMenu();
            });
        });
    });  
}

function addDepartment(){
    inquirer.prompt({
        message:"What is the departments name?",
        name: "name", 
    }).then(response =>{
      //response.name is name of new department
      //send name to db.add department
      db.newDepartment(response,(err)=>{
          if(err) throw err;
         //when it's done show conformation message
         console.log("Department created");
      // return to main menu  
      mainMenu();
      });
       
    });
}

function updateRole(){
    const query = "SELECT id, first_name, last_name, role_id  FROM employee";
  db.newEmployee(response,)(err)  
    if (err) throw err;
    console.table(res);
    {
      inquirer.prompt({
        type: "input",
        message: "Which employee do you want to update?",
        name: "name"
      });
    }
  };



function finish(){
    console.log("thank you for using my app");
    process.exit(1);
}


const actions = {
    viewEmployees, viewRoles, viewDepartments, addEmployee, addRole, addDepartment, updateRole, finish
};
  