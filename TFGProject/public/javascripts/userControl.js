



function checkRegisterForm(form){
	if(form.password.value != form.password2.value){
		alert("Error: las contrase�as no coinciden.");
		return false;
	}
}