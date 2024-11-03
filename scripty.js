document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('but_add').onclick = ADD;
    document.getElementById('but_ser').onclick = SEARCH;
// localStorage.removeItem('todo');
let spysok_Storage = document.getElementById('lista');
let taskCountElement = document.getElementById('count');
let id_count = 0;

// var todo;
// function toLocal(){
//     todo = spysok_Storage.innerHTML;
//     localStorage.setItem('todo', todo );
// }

function toLocal() {
    let tasks = [];
    spysok_Storage.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('.text').innerText,
            date: li.querySelector('.date').innerText
        });
    });
    localStorage.setItem('todo', JSON.stringify(tasks));
}

function ADD(){
    let list = document.getElementById('lista');
    // console.log(list);
    
    let newLi = document.createElement('li');
    newLi.id=id_count;
    id_count++;

    let info_text = document.getElementById("value_add").value;
    let info_date = document.getElementById("data_add").value;

    if (info_text.length < 3 || info_text.length > 255) {
        alert('SYSTEM: co najmniej 3 znaki, nie więcej niż 255 znaków');
        return;
    }
    let textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.innerText = info_text;

    let dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.innerText = info_date;

    let deleteButton = document.createElement('button');
    deleteButton.id = 'but_del';
    let trashIcon = document.createElement('img'); 
    trashIcon.src = 'trash.jpg';
    trashIcon.style.height='20px';
    trashIcon.style.width='20px';
    deleteButton.appendChild(trashIcon);

    deleteButton.onclick = function() {
        deleteTask(newLi);
    };
    
    newLi.onclick = function() {
    editTask(newLi);
    };

    newLi.appendChild(textSpan);
    newLi.appendChild(dateSpan);
    newLi.appendChild(deleteButton);
    list.appendChild(newLi);

    toLocal();
    // newLi.innerText = info_text +"     "+ info_date;
    // list.appendChild(newLi);

    document.getElementById("value_add").value = null;
    document.getElementById("data_add").value = null;
}

function deleteTask(taskElement) {
    spysok_Storage.removeChild(taskElement);
    toLocal(); 
}

function SEARCH(){
    let dane_poszuk = document.getElementById("search").value.toLowerCase();
    let listItems = document.querySelectorAll('#lista li');

    listItems.forEach(item => {
    let text = item.querySelector('.text').innerText.toLowerCase();
    if (text.includes(dane_poszuk)) {
        let value = new RegExp(dane_poszuk, 'gi');
        let hl = text.replace(value, `<span class="hl">${dane_poszuk}</span>`);
        item.querySelector('.text').innerHTML = hl;
        item.style.display = "";
    } else {
        item.querySelector('.text').innerHTML = item.querySelector('.text').innerText;
        item.style.display = "none";
    }
    });
}


function editTask(taskElement) {
const textSpan = taskElement.querySelector('.text');
const dateSpan = taskElement.querySelector('.date');

if (!textSpan || !dateSpan) return; 
const textInput = document.createElement('input');
textInput.type = 'text';
textInput.value = textSpan.innerText;

const dateInput = document.createElement('input');
dateInput.type = 'date';
dateInput.value = dateSpan.innerText;

const saveButton = document.createElement('button');
saveButton.innerText = 'Save';

taskElement.innerHTML = ''; 
taskElement.appendChild(textInput);
taskElement.appendChild(dateInput);
taskElement.appendChild(saveButton);

saveButton.onclick = function() {
    textSpan.innerText = textInput.value;
    dateSpan.innerText = dateInput.value;

    taskElement.appendChild(textSpan);
    taskElement.appendChild(dateSpan);

toLocal();
location.reload();
};
}


if (localStorage.getItem('todo')) {
    let tasks = JSON.parse(localStorage.getItem('todo'));
    tasks.forEach(task => {
        let newLi = document.createElement('li');
        newLi.id = id_count++;
        let textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.innerText = task.text;

        let dateSpan = document.createElement('span');
        dateSpan.className = 'date';
        dateSpan.innerText = task.date;

        let deleteButton = document.createElement('button');
        deleteButton.id = 'but_del';
        let trashIcon = document.createElement('img'); 
    trashIcon.src = 'trash.jpg';
    trashIcon.style.height='20px';
    trashIcon.style.width='20px';
    deleteButton.appendChild(trashIcon);

    deleteButton.onclick = function() {
        deleteTask(newLi);
    };
    
    newLi.onclick = function() {
    editTask(newLi);
    };

        newLi.appendChild(textSpan);
        newLi.appendChild(dateSpan);
        newLi.appendChild(deleteButton);
        spysok_Storage.appendChild(newLi);
    });
}


// if(localStorage.getItem('todo')){
//     spysok_Storage.innerHTML = localStorage.getItem('todo');
//     Restore_funk();
// }

// function Restore_funk() {
// let listItems = document.querySelectorAll('#lista li');
// listItems.forEach(item => {
// let deleteButton = item.querySelector('button');
// deleteButton.onclick = function() {
//     spysok_Storage.removeChild(item); 
//     toLocal();};
// });
// }

// let id_count = spysok_Storage.children.length;
// console.log(id_count);

// document.getElementById('but_ser').addEventListener('click', SEARCH);

});