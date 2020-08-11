function regvalidate()
{
if((document.registerationform.fnametxt.value=="")&&(document.registerationform.snametxt.value==""))
{
document.getElementById('une').innerHTML = "Must enter a first and last name.";
registerationform.fnametxt.focus();
return(false);
}

if(document.registerationform.unametxt.value=="" || document.registerationform.unametxt.value.length < 4)
{
document.getElementById('une').innerHTML = "Username should be at least 4 characters long.";
registerationform.unametxt.focus();
return(false);
}

if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.registerationform.emailtxt.value)))
{
document.getElementById('une').innerHTML = "Email is invalid.";
registerationform.emailtxt.focus();
return(false);
}

if(document.registerationform.pwdtxt.value=="" || document.registerationform.pwdtxt.value.length < 8)
{
document.getElementById('une').innerHTML = "Password should be at least 8 characters long.";
registerationform.pwdtxt.focus();
return(false);
}

if((document.registerationform.pwdtxt.value) != (document.registerationform.cpwdtxt.value))
{
document.getElementById('une').innerHTML = "Passwords must match. Please try again.";
registerationform.pwdtxt.value = "";
registerationform.cpwdtxt.value = "";
registerationform.pwdtxt.focus();
return(false);
}
else
{
return(true);
}
}