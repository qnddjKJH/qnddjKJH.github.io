// 변수의 값이 변하지 않는 한 Javascript 에서는 const 상수로 선언한다.

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = 
        (hours < 10 ? '0'+hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);

    // 리터럴 문법
    // clockTitle.innerText = 
    // '' 작은 따옴표 아님 숫자키 1 옆 ` ` 이거임.
    //  `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init () {
    getTime();
    setInterval(getTime, 1000);
}

init();