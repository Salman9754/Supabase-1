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
        myAlert("sucess", "Done", "Account Created");
      }, 500);
    }
  } catch (error) {
    console.log(error);
  } finally {
    signUpEmail = "";
    signUpPassword = "";
  }
}

let signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", signUp);
}

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
       window.location.href = '/dashboard.html'
      }, 500);
     
    }
  } catch (error) {
    myAlert("error", "Oops...", error);
  }
}
let LoginBtn = document.getElementById("LoginBtn");
if (LoginBtn) {
  LoginBtn.addEventListener("click", login);
}

async function logOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
}
let logOutBtn = document.getElementById("logout_btn");
if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
}

