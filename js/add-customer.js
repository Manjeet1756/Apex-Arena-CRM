const API_URL =
"https://script.google.com/macros/s/AKfycbwxTnsX48ltWt4SrcbUK1YvE_npQ48iSS-EQqmAVGx03XawcTsaVMx1hh-3O-RNA6SfTQ/exec";


const form = document.getElementById("customerForm");


if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();


const customer = {

name: document.getElementById("name").value,

phone: document.getElementById("phone").value,

email: document.getElementById("email").value,

plan: document.getElementById("plan").value,

amount: document.getElementById("amount").value,

payment:
document.getElementById("payment").value,

date:
new Date().toLocaleDateString()


};



console.log(customer);



try{


const response = await fetch(API_URL,{

method:"POST",

body:JSON.stringify(customer)

});



const result = await response.text();



console.log(result);



alert("Customer Added Successfully");



form.reset();



window.location.href="customers.html";



}

catch(error){


console.error(error);


alert(
"Something went wrong while saving customer"
);


}



});


}