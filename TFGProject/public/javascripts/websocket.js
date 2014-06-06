var socket = io.connect();

socket.on('date', function(data){
	$('#date').text(data.date);
});

socket.on('resources', function(data){
	$('#wood').html("<p>"+data.wood+"</p>");
	$('#stone').html("<p>"+data.stone+"</p>");
	$('#iron').html("<p>"+data.iron+"</p>");
});