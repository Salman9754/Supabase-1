async function checkSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    let authPages = ["/index.html", "/login.html", "/"];
    let currentPath = window.location.pathname;
    let isAuth = authPages.some((page) => page.includes(currentPath));
    const session = data.session;
    if(session){
        if(isAuth){
            window.location.href = '/dashboard.html'
        }
    }
    if(session === null){
        if(!isAuth){
            window.location.href = '/login.html'
        }
    }
  } catch (error) {
    console.log(error);
  }
}
checkSession()
