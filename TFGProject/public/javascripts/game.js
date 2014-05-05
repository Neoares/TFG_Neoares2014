$(document).ready(function(){
	$(".btn-up-building").click(sendPost);
});

function sendPost(){
	var id = $(this).attr("name");
	$.ajax({
		async: true,
		type: "POST",
		dataType: "html",
		data:"id="+id,
		url: "/upgrade",
		success:function(){window.location.reload();}
	});
	return false;
}