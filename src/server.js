const express = require('express');

const app = express();
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const knex = require('knex');

const postgresDB = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});



const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}

	]
}

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> {
	
	postgresDB.select('*').from('users').then(data => {res.json(data)});
	
	//res.send('this is working');
	//res.send(database.users);
})

app.post('/signin', (req,res)=> {

bcrypt.compare("apples", "$2b$10$S/ukIgxPEce3aQQ57MwLnOPQDzxFI4ydCLk65N5QmFaXnQxxb6VBa", function(err, result) {
    console.log("first guess",result)
});
bcrypt.compare("bacon", "$2b$10$S/ukIgxPEce3aQQ57MwLnOPQDzxFI4ydCLk65N5QmFaXnQxxb6VBa", function(err, result) {
    console.log("second guess",result)
});

	postgresDB.select('email','hash').from('login').where('email','=',req.body.email)
		.then(response => {
			bcrypt.compare(req.body.password, response[0].hash, function(err, result) {
    			console.log("Does the passwork work?",result);
    			if (result) {
    				return postgresDB.select('*').from('users').where('email','=',req.body.email)
	    				.then (userprofile => {
	    					res.json(userprofile[0])
    				})
    				.catch(err => res.status(400).json('unable to get this user'))
    			}
    			else { 
    				res.status(400).json('wrong password')
    			}
			});
		})
		.catch(err => res.status(400).json('caught on error'))

	// if (req.body.email === database.users[0].email &&
	// 	req.body.password === database.users[0].password) {
	// 	res.json(database.users[0])
		
	// 	//We need to return a user, not a just a text message that says success
	// 	//res.json('success')
	// } else {
	// 	res.status(400).json('error logging in');
	// }
	//can only have one response out put or you will get
	//[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
	//res.send('signin');
})

app.post('/register', (req,res) => {

	const { name, email, password } = req.body;

	//sync method
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);


	//async method
	// bcrypt.hash(password, saltRounds, function(err, hash) {
	//   console.log(hash);
	// });

	postgresDB.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
				name: name,
				email: loginEmail[0],
				joined: new Date()
			}).then(response => {
				res.json(response[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})

	// postgresDB('users')
	// 	.returning('*')
	// 	.insert({
	// 	name: name,
	// 	email: email,
	// 	joined: new Date()
	// }).then(response => {
	// 	res.json(response[0]);
	// })
	.catch(err => res.status(400).json('Error'))

	// database.users.push({
	// 	id: '125',
	// 	name: name,
	// 	email: email,
	// 	password: password,
	// 	entries: 0,
	// 	joined: new Date()
	// })

	// res.json(database.users[database.users.length-1]);
	//res.json('You registered');
})

app.get('/profile/:id' , (req,res) => {
	const { id } = req.params;
	//let found = false;

	postgresDB.select('*').from('users').where({id: id})
		.then(response => {
			if (response.length) {
				console.log(response[0]);
				res.json(response[0]);
			}
			else {
				res.status(400).json('User not found')
			}
		})
		.catch(err => res.status(400).json('There was an error'))

	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		return res.json(user);
	// 	} 
	// })
	// if (!found) {
	// 		res.status(404).json('no such user');
	// 	}
})

app.put('/image' , (req,res)=> {
	const { id } = req.body;
	

	postgresDB('users').where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(result => {
			console.log(result);
			res.json(result[0]);
		})
		.catch(err => {res.status(400).json('Unable to get entries')})

	// let found = false;
	// database.users.forEach(user => {
	// 	if (user.id === id) {
	// 		found = true;
	// 		user.entries++;
	// 		return res.json(user.entries);
	// 	} 
	// })
	// if (!found) {
	// 		res.status(404).json('no such user');
	// 	}
})

app.listen(1234, ()=> {
	console.log('app is running on port 1234');
})