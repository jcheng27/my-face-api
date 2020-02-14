const express = require('express');

const app = express();
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
	//res.send('this is working');
	res.send(database.users);
})

app.post('/signin', (req,res)=> {

bcrypt.compare("apples", "$2b$10$S/ukIgxPEce3aQQ57MwLnOPQDzxFI4ydCLk65N5QmFaXnQxxb6VBa", function(err, result) {
    console.log("first guess",result)
});
bcrypt.compare("bacon", "$2b$10$S/ukIgxPEce3aQQ57MwLnOPQDzxFI4ydCLk65N5QmFaXnQxxb6VBa", function(err, result) {
    console.log("second guess",result)
});

	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0])
		
		//We need to return a user, not a just a text message that says success
		//res.json('success')
	} else {
		res.status(400).json('error logging in');
	}
	//can only have one ressponse out put or you will get
	//[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
	//res.send('signin');
})

app.post('/register', (req,res) => {

	const { name, email, password } = req.body;

	bcrypt.hash(password, saltRounds, function(err, hash) {
	  console.log(hash);
	});

	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id' , (req,res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
			res.status(404).json('no such user');
		}
})

app.put('/image' , (req,res)=> {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		} 
	})
	if (!found) {
			res.status(404).json('no such user');
		}
})

app.listen(1234, ()=> {
	console.log('app is running on port 1234');
})