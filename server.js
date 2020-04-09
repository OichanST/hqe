"use strict";
// Express Package
const express = require("express");
const app = express();
// Server�\�z
const server = require("http").Server(app);
const pg = require("pg");
const conn = 
'postgres://postgres:br9qs6wg@localhost:5432/postgres';
//'postgres://iitrojblaqujzf:faf2bf8e7956a51370d06b56f766c20e919530b223b556e9abc05198ac142423@ec2-52-6-143-153.compute-1.amazonaws.com:5432/ddgdel8v3uejk3';
const pool = new pg.Pool({
	connectionString:conn
});
/*----------------------------------------------------------------------------*/
// IO Socket����
const io = require("socket.io")(server);
// �ڑ�������
io.on("connection", function(socket){
	socket.on("query", function(query){
		pool.query(query)
		.then(function(result){
			io.emit("success", result);
		})
		.catch(function(e){
			console.log("ERROR!");
			io.emit("error", JSON.stringify(e));
		});
	});
});
// ���J�t�H���_�ݒu�G
app.use(express.static(__dirname + '/public'));
// �T�[�o�[�N��
server.listen(8080,
	function(){
		console.log("Server on port %d", 8080);
	}
);
