const API_URL =
"https://script.google.com/macros/s/AKfycbzuVkC9LyPu46crcNrWaxjwBxpKyWMJZ35Qhro7u6CDa0Lwpp4EhMBvMasJQi6Em-POQg/exec";


let customers=[];

function deleteCustomer(id){


const confirmDelete = confirm(
    "Are you sure you want to remove this customer from the list?"
);



if(!confirmDelete){

    return;

}


// Remove only from frontend memory

customers = customers.filter(customer => 
    customer.id !== id
);


// Re-render UI

renderCustomers(customers);



}

async function loadCustomers(){

const response=await fetch(API_URL);

customers=await response.json();

renderCustomers(customers);

}

function renderCustomers(data){

/* ---------------- MOBILE ---------------- */

const cards=document.getElementById("customerCards");

cards.innerHTML="";

data.slice().reverse().forEach(customer=>{

cards.innerHTML+=`

<div class="bg-white rounded-3xl shadow p-5">

<div class="flex justify-between items-start">

<div>

<div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">

👤

</div>

</div>

<div class="text-right">

<span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

₹${customer.amount}

</span>

</div>

</div>

<h2 class="font-bold text-xl mt-4">

${customer.name}

</h2>

<p class="text-gray-500 mt-1">

📞 ${customer.phone}

</p>

<p class="text-gray-500">

✉️ ${customer.email || "-"}

</p>

<div class="flex justify-between mt-4">

<span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

${customer.plan}

</span>

<span class="text-gray-500">

${customer.date}

</span>

</div>

<a

target="_blank"

href="https://wa.me/91${customer.phone}"

class="mt-5 flex justify-center items-center bg-green-600 text-white rounded-2xl h-12 font-semibold">

WhatsApp

</a>

</div>

`;

});

/* ---------------- DESKTOP ---------------- */

const table=document.getElementById("customerTable");

table.innerHTML="";

data.slice().reverse().forEach(customer=>{

table.innerHTML+=`

<tr class="border-b hover:bg-slate-50">

<td class="p-4 font-semibold">

${customer.name}

</td>

<td>

${customer.phone}

</td>

<td>

${customer.email || "-"}

</td>

<td>

${customer.plan}

</td>

<td>

₹${customer.amount}

</td>

<td>

${customer.date}

</td>

<td>

<div class="grid grid-cols-2 gap-3 mt-5">


<a

target="_blank"

href="https://wa.me/91${customer.phone}"

class="flex justify-center items-center bg-green-600 text-white rounded-2xl h-12 font-semibold">

WhatsApp

</a>



<button

onclick="deleteCustomer('${customer.id}')"

class="bg-red-600 text-white rounded-2xl h-12 font-semibold">

Delete

</button>


</div>

</td>

</tr>

`;

});

}

/* Search */

document
.getElementById("searchCustomer")
.addEventListener("input",function(){

const keyword=this.value.toLowerCase();

const filtered=customers.filter(c=>

(c.name||"").toLowerCase().includes(keyword) ||

(c.phone||"").includes(keyword) ||

(c.email||"").toLowerCase().includes(keyword)

);

renderCustomers(filtered);

});

loadCustomers();