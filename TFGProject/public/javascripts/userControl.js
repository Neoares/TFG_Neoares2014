



function checkRegisterForm(form){
	if(form.password.value != form.password2.value){
		alert("Error: las contraseñas no coinciden.");
		return false;
	}
}