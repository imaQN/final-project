function signup(nameInput, usernameInput, passInput, confPass){
    fetch("http://localhost:3000/api/register",{
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            fullname: nameInput,
            username: usernameInput,
            password: passInput,
            password2: confPass
        })
    })
    .then(res =>{
        return res.json()
    })
    .then(responseJson  =>{
        if(responseJson.success)
            console.log("data added")
        else
            console.log(responseJson.message)
    })
}
function login(usernameInput, passInput){
    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: usernameInput,
            password: passInput
        })
    })
    .then(res =>{
        return res.json()
    })
    .then(responseJson  =>{
        if(responseJson.isAuth){
            localStorage.setItem('token', responseJson.token);
            M.toast({html: 'Login success'})
        }
        else{
            M.toast({html: `${responseJson.message}`})

        }
    })
}
function profile(){
    fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: 'include',
        headers: {'x-access-token' : localStorage.getItem('token')}
    })
    .then(res =>{
        return res.json()
    })
    .then(responseJson  =>{
        if(responseJson.isAuth)
            console.log(responseJson)
        else
            console.log(responseJson)
    })
}
function logout(){
    fetch("http://localhost:3000/api/logout", {
        method: "GET",
        headers: {'x-access-token' : localStorage.getItem('token')}
    })
    .then(res =>{
        if (res.status == 200){
            localStorage.removeItem('token');
            return true;
        }
        else{
            return false;
        }
    })
}
function showLessonList(){
    return fetch("http://localhost:8000/kuis/",{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        displayList(responseJson);
        return Promise.resolve(responseJson);
    })
    .catch ( error => {
        return Promise.reject(error);
    })
}
function showQuiz(id){
    fetch(`http://localhost:8000/kuis/soal?id=${id}`,{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        console.log(responseJson)
    })
}
function answer(id, username, a1, a2, a3, a4, a5){
    fetch("http://localhost:8000/kuis/ans/", {
        method: "POST",
        headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: id,
            username: username,
            q1: a1,
            q2: a2,
            q3: a3,
            q4: a4,
            q5: a5
        })
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        console.log(responseJson)
    })
}
function content(id){
    return fetch(`http://localhost:4000/materi/${id}`,{
        method: "GET",
    })
    .then(res =>{
        return res.json();
    })
    .then(responseJson =>{
        displayLesson(responseJson);
        //return Promise.resolve(responseJson);
    })
    .catch ( error => {
        return Promise.reject(error);
    })
}