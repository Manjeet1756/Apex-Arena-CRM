const ADMIN_EMAIL = "admin@apexarena.com";
const ADMIN_PASSWORD = "123456";


document
.getElementById("loginForm")
.addEventListener("submit",function(e){


e.preventDefault();



let email =
document.getElementById("email").value;



let password =
document.getElementById("password").value;



if(
email === ADMIN_EMAIL &&
password === ADMIN_PASSWORD
){


localStorage.setItem(
"apexAdmin",
"true"
);



window.location.href="dashboard.html";


}

else{


document.getElementById("error")
.innerHTML =
"Invalid Email or Password";


}



});