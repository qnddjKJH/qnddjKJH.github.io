const form = document.querySelector(".js-form");
const input = document.querySelector("input");
const greeting = document.querySelector(".js-greetings");

// local storage 에 저장 될 Key 값
const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    // local storage
    // key = currentUser, value = text (User Input value) save
    localStorage.setItem(USER_LS, text);
}

// 입력 이벤트 발생 입력값 처리
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);    
    saveName(currentValue);
}

// form 을 띄우고 입력값을 받아오는 이벤트 함수
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

// form 을 지우고 인삿말을 띄우는 함수
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = 'Hello ' + text; 
}

// local storage 방법을 쓴다.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser == null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init () {
    loadName();
}

init();