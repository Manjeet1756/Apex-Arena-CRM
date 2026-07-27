const API_URL =
"https://script.google.com/macros/s/AKfycbwxTnsX48ltWt4SrcbUK1YvE_npQ48iSS-EQqmAVGx03XawcTsaVMx1hh-3O-RNA6SfTQ/exec";


document
.getElementById("memberForm")
.addEventListener("submit", async function(e){

e.preventDefault();


const data = {

name: document.getElementById("name").value,

phone: document.getElementById("phone").value,

email: document.getElementById("email").value,

plan: document.getElementById("plan").value,

amount: document.getElementById("amount").value,

date: new Date().toLocaleDateString()

};


console.log(data);



try {


const response = await fetch(API_URL, {

method:"POST",

body: JSON.stringify(data)

});



const result = await response.text();


console.log(result);



alert("Customer Saved Successfully");


this.reset();



}

catch(error){


console.error("API Error:", error);


alert("Something went wrong");


}



});