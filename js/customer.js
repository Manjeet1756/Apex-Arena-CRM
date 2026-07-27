const API_URL =
"https://script.google.com/macros/s/AKfycbzuVkC9LyPu46crcNrWaxjwBxpKyWMJZ35Qhro7u6CDa0Lwpp4EhMBvMasJQi6Em-POQg/exec";


const customerList =
document.getElementById("customerList");



async function loadCustomers(){


try{


const response = await fetch(API_URL);



const customers =
await response.json();



console.log(customers);



let html="";



customers.reverse().forEach(customer=>{


html += `


<tr class="border-b">


<td class="p-3">

${customer.name}

</td>



<td class="p-3">

${customer.phone}

</td>



<td class="p-3">

₹${customer.amount}

</td>



<td class="p-3">


<a

target="_blank"

class="bg-green-600 text-white px-3 py-2 rounded"

href="https://wa.me/91${customer.phone}?text=Hello ${customer.name}, Thank you for joining Apex Arena Gym. Your payment of ₹${customer.amount} has been received.">


WhatsApp


</a>


</td>


</tr>



`;


});



customerList.innerHTML = html;



}



catch(error){


console.log(error);


customerList.innerHTML = `

<tr>

<td colspan="4">

Error loading customers

</td>

</tr>

`;


}



}



loadCustomers();