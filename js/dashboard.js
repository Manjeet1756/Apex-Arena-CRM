const API_URL =
"https://script.google.com/macros/s/AKfycbwxTnsX48ltWt4SrcbUK1YvE_npQ48iSS-EQqmAVGx03XawcTsaVMx1hh-3O-RNA6SfTQ/exec";



async function loadMembers(){


try{


const response = await fetch(API_URL);


const members = await response.json();



console.log(members);



document.getElementById("totalMembers")
.innerText = members.length;



let total = 0;


members.forEach(member=>{

total += Number(member.amount);

});



document.getElementById("totalAmount")
.innerText = "₹" + total;



let html="";


members.forEach(member=>{


html += `

<tr>

<td>
${member.name}
</td>


<td>
${member.phone}
</td>


<td>
₹${member.amount}
</td>


<td>

<a 
target="_blank"
href="https://wa.me/91${member.phone}?text=Hello ${member.name}, Welcome to Apex Arena Gym">

WhatsApp

</a>

</td>


</tr>

`;


});



document.getElementById("memberList")
.innerHTML = html;



}

catch(error){

console.log(error);

}

}



loadMembers();