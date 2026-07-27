const API_URL =
"https://script.google.com/macros/s/AKfycbzuVkC9LyPu46crcNrWaxjwBxpKyWMJZ35Qhro7u6CDa0Lwpp4EhMBvMasJQi6Em-POQg/exec";


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