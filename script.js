// 랜덤번호 지정
// 유저가 번호를 입력, go 버튼 누름
// 만약에 유저가 랜덤번호 맞추면, 맞췄습니다 출력
// 랜덤번호 < 유저번호 Down 출력
// 랜덤번호 > 유저번호 Up 출력
// Reset 버튼 누르면 처음부터 시작
// 5번의 기회를 소진하면 게임오버(더이상 번호 추측 불가, 버튼 = disabled)
// 유저가 1~100 범위밖의 숫자 입력하면 안내멘트 출력, 기회 소진안함
// 유저가 이미 입력한 숫자 재입력하면 안내멘트 출력, 기회 소진안함

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5; // 번호선택 기회 총 5번 설정
let gameOver = false; // 처음 설정 = false - 처음엔 게임이 진행 중 이므로
let chanceArea = document.getElementById("chance-area");
let history = []; // 여러개의 값을 가지는 배열 생성 - 유저가 어떤 번호를 입력했는지 저장하는 용도

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  // 익명의 함수 사용: userInput에서 잠깐 쓰고 끝날 함수. 굳이 함수이름을 선언하지 않아도 되는 경우(메모리 소모 아낌)
  userInput.value = "";
}); // focus: 인풋창에 마우스 클릭 시 유저가 입력한 숫자를 지워주어 편리하게 이용가능

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // 1~100 사이의 난수 생성
  console.log("숫자??", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100 사이의 숫자를 입력해주세요.";
    return; // return만 입력할 경우 함수 종료하는 기능
  }

  if (history.includes(userValue)) {
    // 만약 history에 이미 userValue 값이 있다면
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return; // return만 입력할 경우 함수 종료하는 기능
  }

  chances--; // chances = chances - 1
  chanceArea.textContent = `남은 기회: ${chances}번`; // `${}` = 동적 요소 삽입
  console.log("남은 기회??", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "UP";
    console.log("Up");
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN";
    console.log("Down");
  } else {
    resultArea.textContent = "BANGGG";
    gameOver = true;
  }

  history.push(userValue); // push = 값 입력
  console.log(history);

  if (chances < 1) {
    gameOver = true; // chances < 1 일 경우, 게임이 종료되므로
  }

  if (gameOver == true) {
    // 게임이 종료된다면,
    playButton.disabled = true; // play button  = disabled 상태로 변경
  }
}

function reset() {
  // user input 창이 정리
  userInput.value = ""; // userInput의 value (값 = 여기서는 유저가 입력한 숫자)를 비운다
  // 새 번호 생성
  pickRandomNum(); // 이미 생성한 함수 재사용

  playButton.disabled = false; // reset 버튼 누르면 Go 버튼 활성화되어 다시 게임 가능하게 해줌

  resultArea.textContent = "Reeeeeset";
}

pickRandomNum();
