const API_URL =
"https://script.google.com/macros/s/AKfycbyR8GDtZ7rDl9wIKaZVHHrlOSmBU8azAz4-YuiGwUslYpWJMaMgRvIp_K_ec0267clkPw/exec";



document
.getElementById("customerForm")
.addEventListener(
"submit",
async function(e){


e.preventDefault();



const customer={


name:
document.getElementById("name").value,


phone:
document.getElementById("phone").value,


email:
document.getElementById("email").value,


plan:
document.getElementById("plan").value,


amount:
document.getElementById("amount").value,


date:
new Date()
.toLocaleDateString("en-GB")


};



console.log(customer);



try{


await fetch(API_URL,{

method:"POST",

body:
JSON.stringify(customer)

});



alert(
"Customer Added Successfully"
);



this.reset();



window.location.href=
"customer.html";



}

catch(error){

console.log(error);

alert(
"Failed to save customer"
);


}


});