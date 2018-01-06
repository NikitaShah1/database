const mysql = require('mysql');

const con =mysql.createConnection({
    host:'sql2.freemysqlhosting.net',
    user     : 'sql2214315',
    password : 'jI8!lV1%',
    database : 'sql2214315'
});

con.connect((err) => {
    if(err){
        console.log('error : ',err);
    }
    console.log('connected...');

    //create(con);
    //insert(con);
    //delete1(con);
    display(con);
    //update(con)
});

function create(con) {
    con.query('create table temp(id int , name char(10))',(er,res) => {
        if(er){
            return console.log('error : ',er);
        }
        console.log('table created....');
    });

}

function insert(con) {
    con.query('insert into temp values (2,"harry")',(er,res) => {
        if(er){
            console.log('error : ', er);
        }
        console.log('record inserted ....');
    });
}

function display(con) {
    con.query('select * from temp',(er,res) => {
        if(er){
            console.log(er);
        }
        console.log(res);
    });
}
function delete1(con) {

    con.query('delete from temp where id =2',(er) => {
        if(er){
            console.log('error : ', er);
        }
        console.log('record deleted ....');
    });
}

function update(con) {

    con.query('update temp set name="hermionee" where id = 2',(er) => {
        if(er){
            console.log('error : ', er);
        }
        console.log('record updated ....');
    });
}