const API_URL =
"https://script.google.com/macros/s/AKfycbwxTnsX48ltWt4SrcbUK1YvE_npQ48iSS-EQqmAVGx03XawcTsaVMx1hh-3O-RNA6SfTQ/exec";


if(!localStorage.getItem("apexAdmin")){

window.location.href="index.html";

}



function logout(){

localStorage.removeItem("apexAdmin");

window.location.href="index.html";

}



async function loadDashboard(){


const response =
await fetch(API_URL);


const customers =
await response.json();



document.getElementById("totalCustomers")
.innerText =
customers.length;



let total=0;


customers.forEach(item=>{

total += Number(item.amount);

});



document.getElementById("totalAmount")
.innerText =
"₹"+total;


}



loadDashboard();