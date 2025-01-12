function myAlert(icon, title, text) {
  swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
}

async function signUp() {
  let signUpEmail = document.getElementById("signupEmail").value;
  let signUpPassword = document.getElementById("signupPassword").value;

  try {
    swal.showLoading();
    const { data, error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
    });
    if (error) {
      swal.close();
      setTimeout(() => {
        myAlert("error", "Oops...", error.message || "Something went wrong");
      }, 500);
      return;
    }
    if (data) {
      swal.close();
      console.log(data);
      setTimeout(() => {
        myAlert('sucess', "Done", "Account Created");
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
  finally{
    signUpEmail = ''
    signUpPassword = ''
  }
}

let signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", signUp);

async function login() {
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;
  try {
    swal.showLoading();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      swal.close();
      setTimeout(() => {
        myAlert("error", "Oops...", error.message || "Something went wrong");
      }, 500);
      return;
    }
    if (data) {
      swal.close();
      setTimeout(() => {
        myAlert("success", "Done", "Login Successful");
      }, 500);
      console.log(data);
    }
  } catch (error) {
    myAlert("error", "Oops...", error);
  }

}
let LoginBtn = document.getElementById("LoginBtn");
LoginBtn.addEventListener("click", login);


// async function signInGoogle() {
//   try {
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider: 'google'
//     })
// if(error){
//   console.log(error.message);
//   return
// }    
// if(data){
//   console.log(data);
//   return
// }
//   } catch (error) {
//     console.log(error);
    
//   }
// }

// let signUpGoogle = document.getElementById('signUpGoogle').addEventListener('click',signInGoogle)