const db = require("./db");

//inquire prompts with switch cases 
const inquirer = require("inquirer");
require("console.table");

function init(){
    startPrompt()
};
init();
function startPrompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View all Employees",
                    value: "view_employees"
                },
                {
                    name: "View all Departments",
                    value: "view_departments"
                },
                {
                    name: "View all Roles",
                    value: "view_roles"
                },
                {
                    name: "Add a Department",
                    value: "add_department"
                },
                {
                    name: "Add a Role",
                    value: "add_role"
                }
            ]
        }
    ])
    .then(res => {
        let choice = res.choice;
        switch (choice){
            case "view_employees":
                viewEmployees();
                break;
            case "view_departments":
                viewDepartments();
                break;
            case "view_roles":
                viewRoles();
                break;
            case "add_department":
                addDepartment();
                break;
            case "add_role":
                addRole();
                break;
            //continue adding cases
            default: 
                quit();
        }
    })
}
function viewEmployees(){
    db.findAllEmployees()
    .then(([rows]) =>{
        let employees = rows;
        console.table(employees);
    })
    .then(() => startPrompt())
}
function viewDepartments(){
    db.findAllDepartments()
    .then (([rows]) =>{
        let departments = rows;
        console.table(departments);
    })
    .then(() => startPrompt())
}
function viewRoles(){
    db.findAllRoles()
    .then (([rows]) =>{
        let employeeRoles = rows;
        console.table(employeeRoles);
    })
    .then(() => startPrompt())
}
function addDepartment(){
    inquirer.prompt([
        {
            name:"name",
            message: "What is the name of the Department?"
        }
    ])
    .then (res => {
        let name = res;
        db.createDepartment(name)
        .then (()=> console.log(`added ${name.name} to the database!`))//department_name add if name doesnt work
        .then(() => startPrompt())
    })
}
function addRole(){
    inquirer.prompt([
        {
            name:"name",
            message: "What is the name of the Role?"
        }
    ])
    .then (res => {
        let roleName = res;
        db.createRole(roleName)
        .then (()=> console.log(`added role of ${roleName.name} to the database!`))
        .then(() => startPrompt())
    })
}
// function addEmployee(){
//     inquirer.prompt([
//         {
//             name:"first_name",
//             message: "What is the first name of the employee?"
//         }
//     ])
//     .then (res => {
//         let name = res;
//         db.createEmployee(first_name)
//         .then (()=> console.log(`added ${name.name} to the database!`))//department_name add if name doesnt work
//         .then(() => startPrompt())
//     })
// }