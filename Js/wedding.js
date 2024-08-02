document.getElementById("managertool").addEventListener("click", function() {
    window.location.href = "./manager-tool.html"; 
});
document.getElementById("homepage").addEventListener("click", function() {
    window.location.href = "./wedding-invitation.html"; 
});
document.getElementById("home").addEventListener("click", function() {
    window.location.href = "./wedding-invitation.html";
});


function resetInput() {
    document.getElementById("name").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("email").value = ""
    document.getElementById("message").value = ""
}

function validateForm() {
    let formElement = document.querySelector(".form_content")
    let inputElement = document.querySelectorAll(".form-control")
    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter your ${inputElement[i].id}`
        } else (
            inputElement[i].parentElement.querySelector(".error-message").innerText = ""
        )
        
    }
}

function addNew() {
    validateForm()
    let formElement = document.querySelector(".form_content")
    let errorElement = formElement.querySelectorAll(".error-message")
    let arrErrorElement = []
    for (let i = 0; i < errorElement.length; i++) {
        arrErrorElement.push(errorElement[i].innerText)
    }
    let checkErrorElement = arrErrorElement.every(value => value === "")
    if (checkErrorElement) {
        let name = document.getElementById("name").value
        let phone = document.getElementById("phone").value
        let gender = document.getElementById("gender").value
        let email = document.getElementById("email").value
        let attend = document.getElementById("attend").value
        let message = document.getElementById("message").value
        let listAll = localStorage.getItem("list-All") ? JSON.parse(localStorage.getItem("list-All")) : []
        listAll.push({
            name: name,
            phone: phone,
            gender: gender,
            email: email,
            attend: attend,
            message: message
        })
        localStorage.setItem("list-All", JSON.stringify(listAll))
        
        // Toast Show
        let toast = new bootstrap.Toast(document.getElementById('successToast'))
        toast.show()
        resetInput()
        renderList()
    }
    
}

function renderList() {
    let listAll = localStorage.getItem("list-All") ? JSON.parse(localStorage.getItem("list-All")) : []
    let list = `<tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">PhoneNumber</th>
          <th scope="col">Gender</th>
          <th scope="col">Email</th>
          <th scope="col">Attend</th>
          <th scope="col">Message</th>
          <th scope="col">Action</th>
    </tr>`
    listAll.map((value, index) =>{
        list += `<tr>
          <td scope="col">${index + 1}</td>
          <td scope="col">${value.name}</td>
          <td scope="col">${value.phone}</td>
          <td scope="col">${value.gender}</td>
          <td scope="col">${value.email}</td>
          <td scope="col">${value.attend}</td>
          <td scope="col">${value.message}</td>
          <td scope="col">
          <button id="edit_btn" onclick="editList(${index})">Edit</button>
          <button onclick="deleteList(${index})">Delete</button>
          </td>
        </tr>`
    })
    document.getElementById("tablecontent").innerHTML = list
}

function editList(index) {
    document.getElementById('edit_btn').addEventListener('click', function() {
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
          keyboard: false
        });
        myModal.show();
    });
    let listAll = localStorage.getItem("list-All") ? JSON.parse(localStorage.getItem("list-All")) : []
    document.getElementById("name").value = listAll[index].name
    document.getElementById("phone").value = listAll[index].phone
    document.getElementById("gender").value = listAll[index].gender
    document.getElementById("email").value = listAll[index].email
    document.getElementById("attend").value = listAll[index].attend
    document.getElementById("message").value = listAll[index].message
    document.getElementById("index").value = index
}


function changeList() {
    let listAll = localStorage.getItem("list-All") ? JSON.parse(localStorage.getItem("list-All")) : []
    let index = document.getElementById('index').value
    listAll[index] = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        email: document.getElementById("email").value,
        attend: document.getElementById("attend").value,
        message: document.getElementById("message").value
    }
    localStorage.setItem("list-All", JSON.stringify(listAll))
    renderList()
    resetInput()
}

function deleteList(index) {
    let listAll = localStorage.getItem("list-All") ? JSON.parse(localStorage.getItem("list-All")) : []
    listAll.splice(index, 1)
    localStorage.setItem("list-All", JSON.stringify(listAll))
    renderList()
}