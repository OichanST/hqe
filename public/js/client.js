const socket = io.connect();
socket.on("connect", function(){
	console.log("connected");
});
socket.on("disconnect", function(){
	socket.disconnect();
});
socket.on("success", function(res){
	console.log(res);
});
socket.on("error", function(msg){
	alert("ERROR!\n" + msg);
});
