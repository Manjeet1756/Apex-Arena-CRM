const API_URL =
"YOUR_GOOGLE_SCRIPT_URL";


document
.getElementById("memberForm")
.addEventListener("submit",
async function(e){


e.preventDefault();



let data={

name:
name.value,

phone:
phone.value,

email:
email.value,

plan:
plan.value,

amount:
amount.value,

date:
new Date()
.toLocaleDateString()

};



await fetch(API_URL,{

method:"POST",

body:
JSON.stringify(data)

});



alert(
"Customer Saved"
);


this.reset();


});