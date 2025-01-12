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
        data.map((user)=> {
        userTableBody.innerHTML +=`
        <tr>
                             <td scope="col">${user.first_name}</td>
                             <td scope="col">${user.last_name}</td>
                             <td scope="col">${user.company}</td>
                             <td scope="col">${user.address}</td>
                             <td scope="col">${user.email}</td>
                             <td scope="col" class="text-danger">Delete</td>
                           </tr>`
        return  
      })
    }
  } catch (error) {
    console.log(error);
  }
  finally{
    swal.close()
  }
}
if(window.location.pathname === '/dashboard.html'){
    showData()
}