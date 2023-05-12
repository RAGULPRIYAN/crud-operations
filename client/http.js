window.onload = getAllUsers();
let form = document.getElementById('my-form');
// let btn = document.getElementById('form-btn');
updateBtn = document.getElementById("updateBtn")
// let uniqueId ;
// btn.addEventListener("click",()=>{
//   if(btn.textContent == "submit"){
//     createuser();
//   }else{
//     updateUser();
//   }
//   form.reset();

// })


function createuser() {
  // if (name == "" || email == "" || subject == "" || message == "") {
  //   alert("Please fill in all fields");
  //   return;
  // }
 
 

  // Check if any input fields are empty
  var isValid = true;
  if (document.getElementById('name').value == "") {
    nameError.style.display='block';
    isValid = false;
  }
  else{
    nameError.style.display='none';
  }
  if (document.getElementById('email').value == "") {
    emailError.style.display='block';
    isValid = false;
  }
  else{
    emailError.style.display='none';
  }
  if (document.getElementById('subject').value == "") {
    subjectError.style.display='block';
    isValid = false;
  }
  else{
    subjectError.style.display='none';
  }
  if (document.getElementById('message').value == "") {
    messageError.style.display='block';
    isValid = false;
  }
  else{
    messageError.style.display='none';
  }

if(isValid){
  console.log('true');
  fetch('http://localhost:3000/insert', {
    // mode :"cors",
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      // message: document.getElementById("message").value,
      subject: document.getElementById("subject").value,
      
    })
  })

    .then((response) => response.json())
    .then((json) =>{
      getAllUsers();
      form.reset();
      
      
    } );
  }
}
function getAllUsers() {
  fetch('http://localhost:3000/getall')
    .then(response => response.json())
    .then(users => {
      console.log(users)
      html = ""
      users.forEach(e => {
        html += `<tr>
            <td>
                ${e.id}
                </td>
            <td>
                ${e.name}
                </td>
                <td>
                ${e.email}
                </td>
        
                <td>
                ${e.subject}
                </td>
                <td>
                    
                  <a class="pencil" onclick="edituser(${e.id})">  <i class="bi bi-pencil-square"></i></a>
                   <a onclick="deleteuser(${e.id})"> <i class="bi bi-trash"></i></a>

                     </td>
               
        </tr>`
      });

      document.getElementById("mycontacttable").innerHTML = html;

    })
}
function edituser(id) {
  console.log(id)
  // uniqueId = id;
  fetch(`http://localhost:3000/getusers/${id}`)
    .then((response) => response.json())
    .then((e) => {


      document.getElementById("name").value = e[0]['name'];
      document.getElementById("email").value = e[0]['email'];
      document.getElementById("subject").value = e[0]['subject'];
      document.getElementById("message").value = e[0]['message'];
      // btn.textContent = "Update";
      submitBtn.style.display = 'none';
    updateBtn.style.display = 'block';
    updateBtn.setAttribute("user-Id", id)


    });

}
function deleteuser(id) {
  console.log(id)
  let payload={
    id:id
  }
  fetch(`http://localhost:3000/delete/`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => response.json())
    .then((json) => {
      getAllUsers();
      console.log(json)
    });

}

function updateUser() {
  let id = updateBtn.getAttribute('user-Id');
  console.log(id)
  

  fetch('http://localhost:3000/update', {
    // mode :"cors",
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      subject: document.getElementById("subject").value,
      id:id,
    })
  })
    .then((response) => response.json())
    .then((json) =>{
      submitBtn.style.display = 'block';
      updateBtn.style.display = 'none';
      getAllUsers();
      form.reset();
    } );
}
