const API_URL =
"https://script.google.com/macros/s/AKfycbwyZ_fTgYFhAGw09A4yGnRSuyYc-pIwPSxEnbiOK6vyZXyDTXmwrjwKsk9Q0JQ1apzXjQ/exec";



// ===============================
// IMAGE HANDLING
// ===============================

let imageBase64 = "";


const imageInput =
document.getElementById("customerImage");


const imagePreview =
document.getElementById("imagePreview");


const defaultAvatar =
document.getElementById("defaultAvatar");



if(imageInput){


imageInput.addEventListener("change",function(){


const file=this.files[0];


if(file){


const reader=new FileReader();


reader.onload=function(e){


imageBase64=e.target.result;



if(imagePreview){

imagePreview.src=imageBase64;

imagePreview.classList.remove("hidden");

}



if(defaultAvatar){

defaultAvatar.classList.add("hidden");

}



};



reader.readAsDataURL(file);



}


});


}






// ===============================
// CLEAN PHONE NUMBER
// ===============================

function cleanPhone(phone){

return String(phone)
.replace(/\D/g,"")
.slice(-10);

}








// ===============================
// FORM SUBMIT
// ===============================


document
.getElementById("customerForm")
.addEventListener("submit",async function(e){



e.preventDefault();





const customer = {


name:
document.getElementById("name")
.value
.trim(),



phone:
document.getElementById("phone")
.value
.trim(),



email:
document.getElementById("email")
.value
.trim(),



plan:
document.getElementById("plan")
.value,



amount:
document.getElementById("amount")
.value,



date:
new Date()
.toLocaleDateString("en-GB"),



image:
imageBase64 || ""



};







// ===============================
// VALIDATION
// ===============================


if(
!customer.name ||
!customer.phone ||
!customer.plan ||
!customer.amount
){


alert(
"Please fill all required fields"
);


return;


}




if(cleanPhone(customer.phone).length !== 10){


alert(
"Please enter valid WhatsApp number"
);


return;


}






try{



// ===============================
// SEND TO GOOGLE SHEET API
// ===============================


const response =
await fetch(API_URL,{


method:"POST",


body:
JSON.stringify(customer)



});






const result =
await response.json();




console.log(result);






// ===============================
// ALREADY MEMBER
// ===============================


if(result.exists){



const member =
result.customer;



alert(

`⚠️ Already a Member of Apex Arena Gym


👤 Name:
${member.name}


📱 WhatsApp:
${member.phone}


📦 Current Plan:
${member.plan}


💰 Amount Paid:
₹${member.amount}


📅 Joining Date:
${member.date}


Please renew the membership instead.`

);



return;


}








// ===============================
// SUCCESS
// ===============================


if(result.success){



alert(
"✅ Customer Added Successfully"
);



}

else{


alert(
"❌ Customer could not be added"
);


return;


}







// ===============================
// WHATSAPP MESSAGE
// ===============================


const message = `

🏋️ *WELCOME TO APEX ARENA GYM* 💪

━━━━━━━━━━━━━━

Hi *${customer.name}* 👋


🎉 Your membership has been successfully activated.


📋 *MEMBERSHIP DETAILS*


👤 Name:
${customer.name}


📱 WhatsApp:
${customer.phone}


📧 Email:
${customer.email || "Not Provided"}


📦 Plan:
${customer.plan}


💰 Amount Paid:
₹${customer.amount}


📅 Joining Date:
${customer.date}


━━━━━━━━━━━━━━


💪 Stay Consistent

🔥 Stay Strong

🏆 Achieve Your Fitness Goals


Thank you for choosing

*Apex Arena Gym* ❤️


*Team Apex Arena Gym*

`;







// ===============================
// OPEN WHATSAPP
// ===============================


const whatsappURL =

"https://wa.me/91"

+

cleanPhone(customer.phone)

+

"?text="

+

encodeURIComponent(message);






window.open(
whatsappURL,
"_blank"
);








// ===============================
// RESET FORM
// ===============================


this.reset();



imageBase64="";



if(imagePreview){


imagePreview.src="";

imagePreview.classList.add("hidden");


}



if(defaultAvatar){


defaultAvatar.classList.remove("hidden");


}







// REDIRECT
setTimeout(()=>{


window.location.href="customer.html";


},1500);







}

catch(error){



console.log(error);



alert(
"Server error. Please try again"
);



}



});