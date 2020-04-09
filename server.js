"use strict";
// Express Package
const express = require("express");
const app = express();
// Server構築
const server = require("http").Server(app);
const pg = require("pg");
const conn = 
//'postgres://postgres:br9qs6wg@localhost:5432/postgres';
//'postgres://iitrojblaqujzf:faf2bf8e7956a51370d06b56f766c20e919530b223b556e9abc05198ac142423@ec2-52-6-143-153.compute-1.amazonaws.com:5432/ddgdel8v3uejk3';
'postgres://rosndqtazwwzac:a066047b5ec4f8537219912347a5ef2155dc555c6475210d00593086a0800dde@ec2-184-72-235-80.compute-1.amazonaws.com:5432/d3ku61oage2jn9'
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
const PORT = process.env.PORT || 8080;
// 公開フォルダ設定
app.use(express.static(__dirname + '/public'));
// サーバー起動
server.listen(PORT,
	function(){
		console.log("Server on port %d", PORT);
	}
);
