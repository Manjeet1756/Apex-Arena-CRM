const API_URL =
"https://script.google.com/macros/s/AKfycbzuVkC9LyPu46crcNrWaxjwBxpKyWMJZ35Qhro7u6CDa0Lwpp4EhMBvMasJQi6Em-POQg/exec";



async function loadCustomers(){


const table =
document.getElementById("customerData");



table.innerHTML = `

<tr>
<td colspan="6" class="p-5 text-center">

Loading Customers...

</td>
</tr>

`;



try{


const response = await fetch(API_URL);



if(!response.ok){

throw new Error(
"API Error " + response.status
);

}



const customers =
await response.json();



console.log("Customers:",customers);



if(customers.length === 0){


table.innerHTML = `

<tr>

<td colspan="6"
class="p-5 text-center">

No Customers Found

</td>

</tr>

`;

return;

}



let rows="";



customers.reverse()
.forEach(customer=>{


rows += `


<tr class="border-b">


<td class="p-3">
${customer.name}
</td>


<td class="p-3">
${customer.phone}
</td>


<td class="p-3">
${customer.email}
</td>


<td class="p-3">
${customer.plan}
</td>


<td class="p-3">
₹${customer.amount}
</td>


<td class="p-3">

${customer.date}

</td>


<td class="p-3">


<a

href="https://wa.me/91${customer.phone}?text=Hello ${customer.name}, welcome to Apex Arena Gym. Your payment of ₹${customer.amount} has been received."

target="_blank"

class="bg-green-600 text-white px-3 py-2 rounded">


WhatsApp


</a>


</td>


</tr>


`;



});



table.innerHTML=rows;



}

catch(error){


console.error(
"Fetch Error:",
error
);



table.innerHTML = `

<tr>

<td colspan="6"
class="p-5 text-red-600 text-center">

Failed to load customers

</td>

</tr>

`;


}



}



loadCustomers();