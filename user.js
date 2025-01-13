let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let company = document.getElementById("company");
let address = document.getElementById("address");
let email = document.getElementById("email");
let userTableBody = document.getElementById("user_table_body");

async function addData() {
  try {
    swal.showLoading();
    const { error } = await supabase.from("users").insert({
      first_name: firstName.value,
      last_name: lastName.value,
      company: company.value,
      address: address.value,
      email: email.value,
    });
    if (error) throw error;
    firstName.value = "";
    lastName.value = "";
    company.value = "";
    address.value = "";
    email.value = "";
    Swal.fire({
      title: "User Added",
      text: "User Sucesfully Added in the System",
      icon: "success",
    });
    userTableBody.innerHTML = "";
    showData();
  } catch (error) {
    console.log(error);
  } finally {
    swal.close();
  }
}
let addDataBtn = document.getElementById("add-user-btn");
if (addDataBtn) {
  addDataBtn.addEventListener("click", addData);
}

async function showData() {
  try {
    swal.showLoading()
    const { data, error } = await supabase.from("users").select();
    if (error) throw error;
  
    if (data) {
      setTimeout(()=>{
        swal.close()
      },500)
        data.map((user)=> {
        userTableBody.innerHTML +=`
        <tr>
                             <td scope="col" class = "border">${user.first_name}</td>
                             <td scope="col" class = "border">${user.last_name}</td>
                             <td scope="col" class = "border">${user.company}</td>
                             <td scope="col" class = "border">${user.address}</td>
                             <td scope="col" class = "border">${user.email}</td>
                             <td scope="col" class="text-danger border">Delete ${user.id} </td>
                           </tr>`
        return  
      })
    }
  } catch (error) {
    swal.close()
    setTimeout(()=>{
      customAlert('error','Oops...',error.message)
    },500)
    console.log(error);
   
  }

}
if(window.location.pathname === '/dashboard.html'){
    showData()
}
