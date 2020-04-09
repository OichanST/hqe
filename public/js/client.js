const socket = io.connect();
socket.on("connect", function(){
	console.log("connected");
});
socket.on("disconnect", function(){
	socket.disconnect();
});
socket.on("success", function(res){
	console.log(res);
	switch(res.command){
		case "SELECT":
			ById("cnt").innerText = "検索結果:" + res.rowCount + "件";
			var t = new Table("rows").removeAll(true);
			
			res.rows.forEach(function(row, index){
				if(index == 0){
					const hr = new Row();
					for(let column in row){
						hr.addHeader(column);
					}
					t.add(hr);
				}
				
				const r = new Row();
				
				for(let column in row){
					r.add(row[column]);
				}
				
				t.add(r);
				
			});
			
			break;
	}
});
socket.on("error", function(msg){
	alert("ERROR!\n" + msg);
});
