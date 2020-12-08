document.addEventListener("DOMContentLoaded", function(){
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    // var dropdowns = document.querySelectorAll('.dropdown-button')
    // for (var i = 0; i < dropdowns.length; i++){
    //     M.Dropdown.init(dropdowns[i]);
    // }
    // $(".dropdown-trigger").dropdown();
    loadNav();
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    function loadPage  (page){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState === 4){
                const content = document.querySelector("#body-content");
                if(this.status === 200){
                    window.scrollTo(0,0);
                    content.innerHTML = xhttp.responseText;
                    if (page === "signup"){
                        const createAccount = document.getElementById('createAccount');
                        createAccount.addEventListener('click', function(){
                            let valid = true; 
                            const usernameInput = document.getElementById('user_name').value;
                            const nameInput = document.getElementById('full_name').value;
                            const pass = document.getElementById('password').value;
                            const confPass = document.getElementById('confirmPassword').value;
                            const validUsername = validateUsername(usernameInput);
                            const validName = validateName(nameInput);
                            const validPass = checkPass(pass);
                            const matchPass = validatePass(confPass, pass);
                            const MTusername = MTInput(usernameInput);
                            const MTname = MTInput(nameInput);
                            const MTPass = MTInput(pass);
                            if (MTusername){
                                document.getElementById('UsernameWarning').innerHTML = `Please enter an username`;
                                valid = false;
                            }
                            else if(!validUsername){
                                document.getElementById('UsernameWarning').innerHTML = `Please provide valid username`;
                                valid = false;
                            }
                            else{
                                document.getElementById('UsernameWarning').innerHTML = ``;
                            }
                            if(MTname){
                                document.getElementById('nameWarning').innerHTML = `Please enter your name`;
                                valid = false;
                            }
                            else if (!validName){
                                document.getElementById('nameWarning').innerHTML = `Please enter a valid name`;
                                valid = false;
                            }
                            else{
                                document.getElementById('nameWarning').innerHTML = ``
                            }
                            if(MTPass){
                                document.getElementById('passWarning').innerHTML = `Please enter your password`;
                                valid = false;
                            }
                            else if(!validPass){
                                document.getElementById('passWarning').innerHTML = `Please provide a valid password`;
                                valid = false;
                            }
                            else{
                                document.getElementById('passWarning').innerHTML = ``;
                            }
                            if (!matchPass){
                                document.getElementById('confPassWarning').innerHTML = `Password not match`;
                                valid = false;
                            }
                            else{
                                document.getElementById('confPassWarning').innerHTML = ``;
                            }
                            console.log(nameInput)
                            if(valid){
                                signup(nameInput, usernameInput, pass, confPass)
                            }
                        })
                    }
                    if (page==="login"){
                        let MT = false;
                        const loginButton = document.getElementById('loginButton');
                        loginButton.addEventListener('click', function(){
                            const usernameInput = document.getElementById('user_name').value;
                            const passInput = document.getElementById('password').value;
                            const MTusername = MTInput(usernameInput);
                            const MTPass = MTInput(passInput);
                            if (MTusername){
                                document.getElementById('UsernameWarning').innerHTML = `Please enter an username`;
                                MT = true;
                            }
                            else{
                                document.getElementById('UsernameWarning').innerHTML = ``
                            }
                            if(MTPass){
                                document.getElementById('passWarning').innerHTML = `Please enter your password`;
                                MT = true;
                            }
                            else{
                                document.getElementById('passWarning').innerHTML = ``;
                            }
                            if (!MT){
                                login(usernameInput, passInput);
                                // loadNav();
                                // loadPage("home")
                            }
                        })
                    }
                    else if(page === "lesson"){
                       showLessonList();
                    }
                }
                else
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    function loadNav (){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if (this.readyState == 4) {
                if (this.status != 200) return;
                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });
       
            // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", function(event) {
                    // Tutup sidenav
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
        
                    // Muat konten halaman yang dipanggil
                    const page = event.target.getAttribute("href").substr(1);
                    if (page === 'logout'){
                        logout()
                    }
                    else
                        loadPage(page);
                    });
                });
            }
        };
        if (localStorage.getItem('token') !== null)
            xhttp.open("GET", "loggedInNav.html", true);
        else
            xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

})