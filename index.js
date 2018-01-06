let {MongoClient} =  require('mongodb');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let con;
MongoClient.connect('mongodb://localhost:27017/SignUp',(err,db) => {

        if (err) {
            return console.log('error : ', err);
        }

        console.log('connected .......');

       con = db.db('SignUp');
        // insert(con);
        //display(con);
        // remove(con);
        // update(con)

   //     db.close();
    }

);




app.use(bodyParser.json());

app.post('/insert',(req,res) => {

    let name = req.body.name;
    let age = req.body.age;
    let add = req.body.address;

    let user = {
        name,
        age,
        add
    };
    insert(con,user);
});


app.get('/dis',(req,res) => {
     display(con,(result) =>{
        //console.log('get : ',res);
        res.send(result);
    } );

});

app.delete('/del/:id',(req,res) => {
    let user = {
        name :req.params.id
    };
    console.log(user);
    var status = 400;
    var msg = 'not found..';
    remove(con,user,(result) => {
        console.log('get',result);
            status = 200;
            msg = result.toString()+'document deleted...';
            console.log(msg);
        res.status(status).send(msg).end();
    });

});

app.listen(3000,(er) => {
    if(er){
        console.log('error : ',er);
    }
});



function insert(con,user) {


//    var myobj = { name: 'John', address: 'Highway 71'};
    con.collection('user').insertOne(user,(er,res) => {
        if(er){
            return console.log('error : ',er);
        }
        console.log(res.ops);
    });

}

function display(con,callback) {
    let s = {name: -1};
    con.collection('user').find({name: 'Susan'},{projection:{name:true}}).sort(s).toArray().then((res) => {
        console.log('from display : ',res);
        callback (res);
    });

}

function remove(con,name,callback) {
    con.collection('user').deleteMany(name).then((res) => {
        if(res.result.n===0){
            //return console.log('no such document found .');
            callback('no such document found .');
        }
       // console.log('number of documents deleted : ',res.result.n);
        else {
            callback(res.result.n);
        }

    });
}

function update(con) {
    con.collection('user').findOneAndUpdate({
    name:'harry potter'
    },{
        $set:{
            name:'ron'
        }
    },{
        returnOriginal : false
    }).then((res) => {
        console.log(res);
    });
}

