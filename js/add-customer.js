const API_URL =
"https://script.google.com/macros/s/AKfycbzuVkC9LyPu46crcNrWaxjwBxpKyWMJZ35Qhro7u6CDa0Lwpp4EhMBvMasJQi6Em-POQg/exec";



document
.getElementById("customerForm")
.addEventListener("submit", async function(e){

e.preventDefault();



const customer = {


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



try{


await fetch(API_URL,{

method:"POST",

body:
JSON.stringify(customer)

});



alert(
"Customer Added Successfully"
);




// Create WhatsApp Message

const message = `

🏋️ Welcome to Apex Arena Gym 💪


Hello ${customer.name},


Thank you for joining Apex Arena Gym.


Your Membership Details:


👤 Name:
${customer.name}


📱 Phone:
${customer.phone}


📚 Plan:
${customer.plan}


💰 Amount Paid:
₹${customer.amount}


📅 Joining Date:
${customer.date}


We are happy to have you as a part of Apex Arena family.


Stay Fit 💪
Stay Strong 🔥



Thank You,
Apex Arena Gym

`;



// Open WhatsApp

const whatsappURL =
"https://wa.me/91"
+
customer.phone
+
"?text="
+
encodeURIComponent(message);



window.open(
whatsappURL,
"_blank"
);



// Reset Form

this.reset();



setTimeout(()=>{

window.location.href="customers.html";

},1500);



}



catch(error){


console.log(error);


alert(
"Customer save failed"
);


}



});