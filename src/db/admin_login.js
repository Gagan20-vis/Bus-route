
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'sql_login',
	user : 'root',
	password : 'Gagan@20'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});


