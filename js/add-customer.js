const API_URL =
"https://script.google.com/macros/s/AKfycbztCASYjDuoXyQle5Tv7ZtXkuLnZrDj7UjuBGjLGb9nUT5puEFQfPiCzdx6Vn-gY24ayg/exec";



// Image variables

let imageBase64 = "";

const imageInput =
document.getElementById("customerImage");


const imagePreview =
document.getElementById("imagePreview");


const defaultAvatar =
document.getElementById("defaultAvatar");



// Capture image and preview

if(imageInput){

imageInput.addEventListener("change", function(){


const file = this.files[0];


if(file){


const reader = new FileReader();


reader.onload = function(e){


imageBase64 = e.target.result;


// Show preview

imagePreview.src = imageBase64;

imagePreview.classList.remove("hidden");


defaultAvatar.classList.add("hidden");


};


reader.readAsDataURL(file);


}


});


}





document
.getElementById("customerForm")
.addEventListener("submit", async function(e){


e.preventDefault();



// Customer Data

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
.toLocaleDateString("en-GB"),


// Image

image:
imageBase64 || ""



};




try{


const response = await fetch(API_URL,{

method:"POST",

body:
JSON.stringify(customer)

});



const result =
await response.json();



console.log(result);



alert(
"Customer Added Successfully"
);





// ===============================
// WhatsApp Message
// ===============================


const message = `

🏋️ *WELCOME TO APEX ARENA GYM* 💪

━━━━━━━━━━━━━━━━━━

Hi *${customer.name}* 👋,

Welcome to the *Apex Arena Gym* family! 🎉


📋 *MEMBERSHIP DETAILS*


👤 *Name:* ${customer.name}

📱 *WhatsApp:* ${customer.phone}

📧 *Email:* ${customer.email || "Not Provided"}

📦 *Membership Plan:* ${customer.plan}

💰 *Amount Paid:* ₹${customer.amount}

📅 *Joining Date:* ${customer.date}


━━━━━━━━━━━━━━━━━━


🎯 *Remember:*


🏋️ Be Consistent

🥗 Eat Healthy

💧 Stay Hydrated

😴 Get Proper Rest


Success comes one workout at a time! 💯


━━━━━━━━━━━━━━━━━━


Thank you for choosing
*Apex Arena Gym* ❤️


See you in the gym! 💪🔥


*Team Apex Arena Gym*

`;





// WhatsApp Open


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



// Reset Image

imageBase64="";


if(imagePreview){

imagePreview.src="";

imagePreview.classList.add("hidden");

}


if(defaultAvatar){

defaultAvatar.classList.remove("hidden");

}






setTimeout(()=>{


window.location.href =
"customer.html";


},1500);






}

catch(error){


console.log(error);


alert(
"Customer save failed"
);


}



});