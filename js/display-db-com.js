function displayLesson(lessons){
    const div = document.createElement('div');
    let lesson = "";
    for (let i = 0; i<lessons.length; i++){
        lesson +=  `<h3>Lesson - ${lessons[i].hari_id}</h3>`; break;
    }
    lesson += `<ul class = "collapsible" data-collapsible = "expandable">`
    for (let i = 0; i<lessons.length; i++){
        lesson += `
        <li>
        <div class = "collapsible-header">${lessons[i].grammar}</div>
        <div class = "collapsible-body"><p>${lessons[i].explanation}</p></div>
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
function displayList(listlesson){
    console.log(listlesson)
    console.log(listlesson[1].fields.judul)
    for (let i = 0; i<listlesson.length; i++){
        content(listlesson[i].pk);
        console.log(listlesson[i].pk)
    }
   
}