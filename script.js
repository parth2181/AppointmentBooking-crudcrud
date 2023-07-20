function submitdetails(event){
    event.preventDefault()
    const fname = event.target.name.value
    const email = event.target.emailid.value
    const mobile = event.target.phno.value

    // localStorage.setItem('name',fname)
    // localStorage.setItem('emailId',email)
    // localStorage.setItem('number',mobile)

    const obj = {
        fname,
        email,
        mobile
    } 

    axios.post("https://crudcrud.com/api/3605c91671e14695b9cf49d2fe68cdfb/appointmentData",obj)
    .then((response) => {
        showuseronscreen(response.data)
        console.log(response)
    })
    .catch((err) => {
        console.log(err)
    })
    // localStorage.setItem(obj.email,JSON.stringify(obj))
    // showuseronscreen (obj)

}

window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/3605c91671e14695b9cf49d2fe68cdfb/appointmentData")
    .then((response) =>{
        console.log(response)

        for(var i=0; i<response.data.length; i++)
        {
            showuseronscreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
})


function showuseronscreen (obj){
    const parentelem = document.getElementById("users")
    const childelem = document.createElement("li")
    childelem.textContent = obj.fname + ' - ' + obj.email+' - ' + obj.mobile

    const deletebutton = document.createElement("input")
    deletebutton.type = "button"
    deletebutton.value = "Delete"

    deletebutton.onclick = () => {
        axios
          .delete(`https://crudcrud.com/api/3605c91671e14695b9cf49d2fe68cdfb/appointmentData/${obj._id}`)
          .then(() => {
            parentelem.removeChild(childelem);
          })
          .catch((err) => {
            console.log(err);
          });
    }
   


    const editbutton = document.createElement("input")
    editbutton.type ="button"
    editbutton.value = "Edit"

    editbutton.onclick = () => {
        localStorage.removeItem(obj.email)
        parentelem.removeChild(childelem)
        document.getElementById("name").value = obj.name
        document.getElementById("emailid").value = obj.email
        document.getElementById("phno").value = obj.mobile
        document.getElementById("submitbutton").style.display = "none";
    const updatebutton = document.getElementById("updatebutton");
    updatebutton.style.display = "block";
    updatebutton.onclick = () => {
      axios
        .put(`https://crudcrud.com/api/3605c91671e14695b9cf49d2fe68cdfb/appointmentData/${obj._id}`, {
          name: document.getElementById("name").value,
          email: document.getElementById("emailid").value,
          mobile: document.getElementById("mobile").value,
        })
        .then((response) => {
          childelem.textContent = response.data.name + " - " + response.data.email + " - " + response.data.phno;
          document.getElementById("submitbutton").style.display = "block";
          updatebutton.style.display = "none";
        })
        .catch((err) => {
          console.log(err);
        });
    };

    }



    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)

    parentelem.appendChild(childelem)
}