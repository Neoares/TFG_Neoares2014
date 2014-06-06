$(document).ready(function(){
	$(".btn-up-building").click(upBuild);
	$(".btn-up-mercenary").click(hireMerc);
	$(".btn-attack").click(attack);
});

function upBuild(){
	var id = $(this).attr("name");
	$.ajax({
		async: true,
		type: "POST",
		dataType: "html",
		data: {id: id},
		url: "/upgrade",
		success: function(){window.location.reload();}
	});
	return false;
}

function hireMerc(){
	var id = $(this).attr("name");
	var amount = $("#"+id).val();
	$.ajax({
		async: true,
		type: "POST",
		datatype: "html",
		data: {id: id, amount: amount},
		url: "/hire",
		success: function(){window.location.reload();}
	});
}

function attack(){
	var t = $(this).attr("name");
	$.ajax({
		async: true,
		type: "POST",
		datatype: "html",
		data: {target: t},
		url: "/attack",
		success: function(w){
			//console.log("success!!"),
			//$("#notifications").text(w);
			window.location.reload();
		}
	});
}