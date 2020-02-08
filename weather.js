const weather = document.querySelector(".js-weather");

// open weather map 서버에 접속하기 위해 필요한 키.
// open weather map 홈페이지에서 회원가입 후 받을 수 있다.
const API_KEY = "37d815965ab57009e7b4603dfaee4aca";
const COORDS = "coords";

// open weather map
// geographic coordinates API 를 사용하기 위해 만든 함수
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
// lat = latitude, lon = longitude
function getWeather(lat, lng) {
    // 자바스크립트에서 url 호출하여 데이터를 얻는 방법은 fetch() 를 쓰면 된다.
    // 마지막 ~/&units=metirc 뜻하는 바는 포멧이다. 기본 설정 켈빈법으로 표기되어있다.
    // 포멧 같은 경우 API 홈페이지에서 Other Format 과 같은 안내페이지가 따로 마련 되어 있으니 잘 찾아 볼것.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            // response 에는 network 정보만 보인다.
            return response.json();
        }).then(function(json) {
            // 위 then 함수가 끝나면 현재 then 함수가 호출
            const temp = json.main.temp;
            const location = json.name;

            weather.innerText = `${location}\n${temp}℃`;
        });
    // then() 함수는 기본적으로 함수를 호출하는 것 하지만, 데이터가 완전히 들어온 다음 함수를 실행하는 것.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    // 위도
    const latitude = position.coords.latitude;
    // 경도
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    getWeather(latitude, longitude);
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

// navigator API 를 사용하여 사용자의 위치를 얻는다.
function  askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords == null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        // KEY 값 "weather" 에 날씨 정보가 저장되어 있다.

    }
}

function init() {
    loadCoords();
}

init();