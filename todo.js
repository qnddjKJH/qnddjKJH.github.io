// 중요한 개념 local storage 는 자바스크립트의 data 를 저장 할 수가 없다.
// 반대로 자바스크립트는 local storage 의 모든 것을 string 으로 저장 할려고 한다.
// 아주 좋은 트릭으로 JSON.stringify 를 사용하여 저장한다.

const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// toDos 는 local Storage 에도 저장하기 위해 만듬.
let toDos = [];

function deleteToDo(event) {
    // 지워지는 타겟 찾는 방법
    // consol.log(event.target) 으로 부모노드를 찾는다.
    // consol.log(event.target.parentNode) 으로 정확한 대상이 타겟팅되는지 확인
    const btn = event.target;
    // 콘솔에서 찾은 부모노드 li 를 타겟.
    const li = btn.parentNode;
    // toDoList 에서 해당 li 삭제.
    toDoList.removeChild(li);

    // filter 는 forEach() 와 같이 모든 item 들을 가지고 함수를 실행한다.
    // 주어진 함수에 만족하는 item 들로 구성된 새로운 배열을 만들어 반환한다.
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id != parseInt(li.id);
    });

    // 옛날 것을 새로운 것으로 변경. 변경이기 때문에 cost 를 let 으로 바꿔준다.
    // 변경 후 saveToDos() 를 호출 하여 local storage 에 저장.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    // JSON.stringify() 는 자바스크립트 Object
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {

    // li, button, span 태그 생성
    const li = document.createElement("li");

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "del";
    delBtn.classList = "btn";
    delBtn.addEventListener("click", deleteToDo); // 당연한 것, click 이벤트 발생 시 deleteToDo() 함수 실행.

    const span = document.createElement("span");
    span.innerText = text;
    
    // toDoObj 의 Id 값
    const newId = toDos.length + 1;

    // li 태그에 span, button 태그를 자식으로 넣음.
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; // 각각의 li 에도 id 값 부여.
    li.classList = "toDo"
    // 만들어진 리스트를 toDoList 에 추가하여 화면에 출력한다.
    toDoList.appendChild(li);

    // 이 오브젝트는 만들어진 리스트의 각각의 내용을 저장하여 toDos 배열에 저장.
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
    // save 는 반드시 push 한 후에 save 할 것 push 앞에 있으면 저장할것이 없기 때문
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos != null) {
        const parsedToDos = JSON.parse(loadedToDos);

        // local storage 에 저장된 리스트를 가져와서 하나씩 paintToDo(text) 실행
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();









function find(li) {
    const target = pendings.forEach(function(task) {
        return task.id === parseInt(li.id);
    });
}

function test() {
    const li = document.querySelector("li");
    const target = find(li);
}