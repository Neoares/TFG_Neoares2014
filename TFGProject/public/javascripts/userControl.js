



function checkRegisterForm(form){
	if(form.password.value != form.password2.value){
		alert("Error: las contraseņas no coinciden.");
		return false;
	}
}