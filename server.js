const logo = require('asciiart-logo');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'bootcamp123',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// Renders logo
const logoI = console.log(
    logo({
        name: 'Employee Manager',
        font: '',
        lineChars: 8,
        padding: 2,
        margin: 3,
        borderColor: 'bold-green',
        logoColor: 'bold-green',
    }).render());

db.connect((err) => {
  if (err) throw err;
  logoI;
  start();
});

const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'menu', 
      message: 'What would you like to do?',
      choices: 
      ['View All Employees', 
        'Add An Employee', 
        'Update An Employee Role', 
        'View All Roles', 
        'Add Role', 
        'View All Departments', 
        'Add Department',
        'View Department Budgets',
        'Quit']}
  ]).then((answer) => {
    switch (answer.menu) {
        case 'View All Employees':
            allEmployees();
            break;
        case 'Add An Employee':
            addEmployee();
            break;
        case 'Update An Employee Role':
            updateRole();
            break;
        case 'View All Roles':
            allRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            allDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'View Department Budgets':
            showBudgets();
            break;
        case 'Quit': 
              quit();
            break;
        default:
          db.end();
    }})
    .catch(error => {
      console.error(error);
    });
};

allEmployees = () => {
  let e = 'SELECT * FROM employee';
  db.query(e, (err, res) => {
      if (err) throw err;
      console.table(res); 
      start();
  })
};

addEmployee = () => {
  db.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
          {
          name: 'first_name',
          type: 'input', 
          message: "What is the employee's first name?",
          },
          {
          name: 'last_name',
          type: 'input', 
          message: "What is the employee's last name?"
          },
          {
          name: 'role_id', 
          type: 'list',
          choices: () => {
          let array = [];
          for (let i = 0; i < res.length; i++) {
            array.push(res[i].title);
          }
          return array;
          },
          message: "What is this employee's role?"
          },
          {
          name: 'manager_id',
          type: 'input', 
          message: "What is the employee's manager's ID?"
          }
          
      ]).then((answer) => {
          let idR;
          for (let i = 0; i < res.length; i++) {
              if (res[i].role_id == answer.roles) {
                  idR = res[i].role_id;
              }                  
          }  
          db.query(
          'INSERT INTO employee SET ?',
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: idR,
            manager_id: answer.manager_id,
          },
          (err) => {
              if (err) throw err;
              start();
          })
      })
  })
};

updateRole = () => {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
        {
          name: 'title',
          type: 'input', 
          message: "What new role would you like to add?"
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary of this role?'
        },
        {
          name: 'department',
          type: 'list',
          choices: () => {
              let array = [];
              for (let i = 0; i < res.length; i++) {
                array.push(res[i].dept_name);
              }
              return array;
          },
        }
    ]).then((answer) => {
        let department_id;
        for (let a = 0; a < res.length; a++) {
            if (res[a].dept_name == answer.department) {
                department_id = res[a].id;
            }}
        db.query(
            'INSERT INTO roles SET ?',
            {
              title: answer.title,
              salary: answer.salary,
              department_id: department_id
            },
            (err, res) => {
              if(err) throw err;
              start();
            })
    })
  })
};

allRoles = () => {
  let e = 'SELECT * FROM roles';
  db.query(e, (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
  })
};

addRole = () => {
  db.query('SELECT * FROM department', (err, res) => {
  if (err) throw err;
  inquirer.prompt([
      {
        name: 'title',
        type: 'input', 
        message: "What new role would you like to add?"
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary of this role?'
      },
      {
        name: 'department',
        type: 'list',
        choices: () => {
            let array = [];
            for (let i = 0; i < res.length; i++) {
              array.push(res[i].dept_name);
            }
            return array;
        },
      }
  ]).then((answer) => {
      let department_id;
      for (let a = 0; a < res.length; a++) {
          if (res[a].dept_name == answer.department) {
            department_id = res[a].id;
          }
      }
  db.query('INSERT INTO roles SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: department_id
        },
        (err, res) => {
          if(err) throw err;
          start();
        })
  })
})};

allDepartments = () => {
  let e = 'SELECT * FROM department';
  db.query(e, (err, res) => {
      if(err) throw err;
      console.table(res);
      start();
  })
};

addDepartment = () => {
  inquirer
  .prompt([
    {
      name: 'Department', 
      type: 'input', 
      message: 'Which department would you like to add?'
    }
    ]).then((answer) => {
      db.query(
            'INSERT INTO department SET ?',
            {
              dept_name: answer.Department
            });
        let e = 'SELECT * FROM department';
        db.query(e, (err, res) => {
        if(err) throw err;
        start();
        })
    })
};

showBudgets = () => {
  db.query("SELECT * FROM DEPARTMENT", (err, res) => {
    if (err) throw err;
    let dep = [];
    res.forEach(({ title, id }) => {
      dep.push({
        name: title,
        value: id
      })
    });

    let budget = [
      {
        type: "list",
        name: "id",
        choices: dep,
        message: "Which Department budget would you like to see?"
      }
    ];

    inquirer.prompt(budget)
    .then(resp => {
      let e = `SELECT department_id AS id, 
      department.dept_name AS department,
      SUM(salary) AS budget
      FROM  roles  
      JOIN department ON roles.department_id = department.id GROUP BY department_id`;
      db.query(e, [resp.id], (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      });
    })
    .catch(err => {
      console.error(err);
    });
  });
};

quit = () => {
  db.end();
};
