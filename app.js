async function checkSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    let authPages = ["/index.html", "/login.html", "/"];
    let currentPath = window.location.pathname;
    let isAuth = authPages.some((page) => page.includes(currentPath));
    const session = data.session;
    if (session) {
      if (isAuth) {
        window.location.href = "/dashboard.html";
      }
    }
    if (session === null) {
      if (!isAuth) {
        window.location.href = "/login.html";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
checkSession();

async function getUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      try {
        const { data, error } = await supabase
          .from('LoggedUsers')
          .select('name, email , id')
          .eq("userId", user.id)
        if (data) {
          let currentUser = {
            name: data[0].name,
            email: data[0].email,
            id: data[0].id,
            userId: user.id
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        }
        if (error) throw error
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);

  }
}
window.onload = getUser