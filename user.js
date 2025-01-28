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
      userTableBody.innerHTML = ""
      data.map((user) => {
        userTableBody.innerHTML += `
        <tr>
                             <td scope="col" class = "border">${user.first_name}</td>
                             <td scope="col" class = "border">${user.last_name}</td>
                             <td scope="col" class = "border">${user.company}</td>
                             <td scope="col" class = "border">${user.address}</td>
                             <td scope="col" class = "border">${user.email}</td>
                             <td scope="col" class="border" on onclick="deleteUser(${user.id})"><i class="fa-solid fa-trash"></i></td>
                           </tr>`;
        return;
      });
    }
  } catch (error) {
    setTimeout(() => {
      customAlert("error", "Oops...", error.message);
    }, 500);
    console.log(error);
  }
  finally{
    swal.close()
  }
}
showData()
window.deleteUser = deleteUser;
async function deleteUser(userId) {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data, error } = await supabase
            .from("users")
            .delete()
            .eq("id", userId)
            .select();
          if (error) throw error;
          if (data) {
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          showData()
        }
      });
  } catch (error) {
    console.log(error);
  }
}
