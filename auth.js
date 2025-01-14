function myAlert(icon, title, text) {
  swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
}
window.customAlert = myAlert;

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

async function signUp() {
  let signUpEmail = document.getElementById("signupEmail");
  let signUpPassword = document.getElementById("signupPassword");
  if (signUpEmail.value === "" || signUpPassword.value === "") {
    myAlert("error", "Oops...", "Fields cannot be empty");
    return;
  }

  if (emailRegex.test(signUpEmail.value)) {
    if (passwordRegex.test(signUpPassword.value)) {
      try {
        swal.showLoading();
        const { data, error } = await supabase.auth.signUp({
          email: signUpEmail.value,
          password: signUpPassword.value,
        });
        if (error) throw error;

        if (data) {
          swal.close();
          myAlert("success","Done","Account Created");
          setTimeout(() => {
           window.location.href = '/login.html'
          }, 2000);
         
        }
      } catch (error) {
        swal.close();
        console.log(error);
        setTimeout(() => {
          myAlert("error", "Oops...", error.message);
        }, 500);
      }
    } else {
      myAlert("error", "Oops...", "Choose a valid password");
    }
  } else {
    myAlert("error", "Oops...", "Enter Valid email");
  }
}

let signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
  signUpBtn.addEventListener("click", signUp);
}

async function login() {
  let loginEmail = document.getElementById("loginEmail").value;
  let loginPassword = document.getElementById("loginPassword").value;
  if (loginEmail === "" || loginPassword === "") {
    myAlert("error", "Oops...", "Fields cannot be empty");
    return;
  }
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
        window.location.href = "/dashboard.html";
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
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
let logOutBtn = document.getElementById("logout_btn");
if (logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
}
