const connection = require ("./connection");
module.exports = {
    getAllEmployees: function(callBack){
        connection.query("select * from employee",callBack);
    },
    getAllRoles: function(callBack){
        connection.query("select * from role",callBack);
    },


    getAllDepartments: function(callBack){
        connection.query("select * from department",callBack);
    },

    newEmployee: function(vals,callBack){
        connection.query("insert into employee set ?",vals,callBack);
    },

    newRole: function(vals,callBack){
        connection.query("insert into role set ?",vals,callBack);
    },


    newDepartment: function(vals,callBack){
        connection.query("insert into department set ?",vals,callBack);
    },
};