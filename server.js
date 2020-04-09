"use strict";
// Express Package
const express = require("express");
const app = express();
// Server構築
const server = require("http").Server(app);
const pg = require("pg");
const conn = 
'postgres://postgres:br9qs6wg@localhost:5432/postgres';
//'postgres://iitrojblaqujzf:faf2bf8e7956a51370d06b56f766c20e919530b223b556e9abc05198ac142423@ec2-52-6-143-153.compute-1.amazonaws.com:5432/ddgdel8v3uejk3';
const pool = new pg.Pool({
	connectionString:conn
});
/*----------------------------------------------------------------------------*/
// IO Socket準備
const io = require("socket.io")(server);
// 接続時処理
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
// 公開フォルダ設置絵
app.use(express.static(__dirname + '/public'));
// サーバー起動
server.listen(8080,
	function(){
		console.log("Server on port %d", 8080);
	}
);
