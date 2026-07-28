


const API_URL =
"https://script.google.com/macros/s/AKfycbztCASYjDuoXyQle5Tv7ZtXkuLnZrDj7UjuBGjLGb9nUT5puEFQfPiCzdx6Vn-gY24ayg/exec";


// ===============================
// IMAGE
// ===============================

let imageBase64 = "";

const imageInput = document.getElementById("customerImage");
const imagePreview = document.getElementById("imagePreview");
const defaultAvatar = document.getElementById("defaultAvatar");



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
// NORMALIZE PHONE
// ===============================

function cleanPhone(phone){

return String(phone)
.replace(/\D/g,"")
.slice(-10);

}






// ===============================
// CHECK GOOGLE SHEET
// ===============================

async function checkExistingCustomer(phone){


try{


const response = await fetch(API_URL);



const customers = await response.json();



console.log("Google Sheet Data:",customers);



const userPhone = cleanPhone(phone);



const foundCustomer = customers.find(customer=>{


return cleanPhone(customer.phone) === userPhone;


});



return foundCustomer || null;



}

catch(error){


console.log(
"Sheet Fetch Error:",
error
);


return null;


}



}








// ===============================
// FORM SUBMIT
// ===============================


document
.getElementById("customerForm")
.addEventListener("submit",async function(e){


e.preventDefault();





const customer={


name:
document.getElementById("name").value.trim(),


phone:
document.getElementById("phone").value.trim(),


email:
document.getElementById("email").value.trim(),


plan:
document.getElementById("plan").value,


amount:
document.getElementById("amount").value,


date:
new Date()
.toLocaleDateString("en-GB"),


image:
imageBase64



};





// ===============================
// REQUIRED CHECK
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
"Enter valid WhatsApp number"
);


return;


}







try{


// ===============================
// DUPLICATE CHECK
// ===============================


const existing =
await checkExistingCustomer(customer.phone);



if(existing){


alert(

`⚠️ You are already a member!


👤 Name:
${existing.name}


📱 Phone:
${existing.phone}


📦 Plan:
${existing.plan}


💰 Amount:
₹${existing.amount}


📅 Joining Date:
${existing.date}


Please renew your membership.`

);


return;


}







// ===============================
// SAVE TO GOOGLE SHEET
// ===============================


const saveResponse =
await fetch(API_URL,{


method:"POST",


body:
JSON.stringify(customer)



});




const result =
await saveResponse.json();




console.log(result);





if(result.success){


alert(
"✅ Customer Added Successfully"
);



}
else{


alert(
"❌ Customer not saved"
);


return;


}







// ===============================
// WHATSAPP
// ===============================


const message = `

🏋️ *WELCOME TO APEX ARENA GYM* 💪


Hi *${customer.name}* 👋


Your membership has been activated successfully.


📋 *MEMBERSHIP DETAILS*


👤 Name:
${customer.name}


📱 Phone:
${customer.phone}


📦 Plan:
${customer.plan}


💰 Amount Paid:
₹${customer.amount}


📅 Joining Date:
${customer.date}



Thank you for choosing

*Apex Arena Gym* ❤️


Stay Fit 💪

`;





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
// RESET
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






setTimeout(()=>{


window.location.href="customer.html";


},10);






}

catch(error){


console.log(error);


alert(
"Server error. Check Google Sheet API"
);


}



});