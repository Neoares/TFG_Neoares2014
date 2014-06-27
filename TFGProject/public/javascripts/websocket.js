var rSocket = io.connect('/resources');
var dSocket = io.connect('/date');

dSocket.on('date', function(data){
	$('#date').text(data.date);
});

rSocket.on('resources', function(data){
	$('#wood').html("<p>"+data.wood+"</p>");
	$('#stone').html("<p>"+data.stone+"</p>");
	$('#iron').html("<p>"+data.iron+"</p>");
});