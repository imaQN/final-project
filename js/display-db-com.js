//menampilkan semua materi
function displayLesson(lessons){
    const div = document.createElement('div');
    let lesson = "";
    for (let i = 0; i<lessons.length; i++){
        lesson +=  `<h5>Lesson - ${lessons[i].hari_id}</h5>`; break;
    }
    lesson += `<ul class = "collapsible" data-collapsible = "expandable">`
    for (let i = 0; i<lessons.length; i++){
        lesson += `
        <li>
        <div class = "collapsible-header">${lessons[i].grammar}</div>
        <div class = "collapsible-body">
        <p>Uses : ${lessons[i].explanation}</p>
        <p>Example : </p>
        <ol>
            <li>${lessons[i].ex1}
            <p>${lessons[i].trans1}</p></li>
            <li>${lessons[i].ex2}
            <p>${lessons[i].trans2}</p></li>
        </ol>
        </div>
        </li>`
    }
    lesson += `</ul>`
    div.innerHTML = lesson
    document.getElementById("quizList").appendChild(div);
    var elem = document.querySelectorAll('.collapsible');
        var instance = M.Collapsible.init(elem, {
        accordion: false
    });
}
//menampilkan list materi
function displayList(listlesson){
    console.log(listlesson)
    console.log(listlesson[1].fields.judul)
    for (let i = 0; i<listlesson.length; i++){
        content(listlesson[i].pk)
        .then(a => {
            displayLesson(a);
        })
        console.log()
    }    
}
//menampilkan kuis (perbab)
function displayQuiz(quizz){
    console.log(quizz)
    const div = document.createElement('div');
    let quiz = "";
    quiz += `<ol>`
    for (let i = 0; i<quizz.length; i++){
        quiz += `
            <li>${quizz[i].fields.text}</p></li>
            <label>
                <input type="radio" id="${quizz[i].fields.c1}" value="${quizz[i].fields.c1}">
                <span>${quizz[i].fields.c1}</span>
            </label>
            <label>
                <input type="radio" id="${quizz[i].fields.c2}" value="${quizz[i].fields.c2}">
                <span>${quizz[i].fields.c1}</span>
            </label>
        </ol>`
    }
}
//mengetahui button mana (kuis mana) yang dipilih, lalu mengirim
//id kuis ke showQuiz lalu ditampilkan dengan displayQuiz(quiz)
function displayListQuizzes(){ 
    var buttons = document.getElementsByClassName('QuizButton');

    for(var i = 0; i < buttons.length; i++){  
        buttons[i].addEventListener('click', function(a){
            console.log(a.target.id);
            showQuiz(a.target.id)
            .then(quiz =>{
                displayQuiz(quiz)
            })
        })
        //buttons[i].click();
        //console.log(buttons[i].id)
    }
}