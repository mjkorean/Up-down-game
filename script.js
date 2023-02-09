// 구현로직 간단정리//
// 랜덤번호 지정
// 유저 번호 입력 후 GO 버튼 누름
// 만약 유저가 랜덤번호 맞추면, 정답 출력
// 만약 랜덤번호 < 유저번호 DOWN 출력
// 만약 랜덤번호 > 유저번호 UP 출력
// 리셋 버튼을 누르면 게임 리셋
// 5번의 기회 다쓰면 게임 끝남, 더이상 진행 불가, 버튼 비활성화
// 유저가 1~100 밖의 숫자 입력하면 알려준다, 기회 깎지 않는다
// 유저가 이미 입력한 숫자 재입력하면 알려준다, 기회 깎지 않는다

// HTML, CSS //
// header, main, footer
// 정답 맞추면 modal 효과 발생
// 부트스트랩 이용 버튼 등 효과 구현
// 미디어쿼리 이용 반응형 웹 구현

// querySelector: id = '#button-play' / class = '.button-play'
let number = 0;
let chance = 5; // 총 입력기회 5번
let history = []; // 유저가 입력한 숫자들 리스트 생성
let chanceLeft = document.querySelector("#chance-left");
let buttonPlay = document.querySelector("#button-play");
let buttonReset = document.querySelector("#button-reset");
let input = document.querySelector("#input");
let inputMsg = document.querySelector("#input-msg");
let gameOver = false;

// 버튼 클릭 시 이벤트 발생 기능
buttonPlay.addEventListener("click", play);
buttonReset.addEventListener("click", reset);
input.addEventListener("focus", function () {
  input.value = "";
});

// Math.random = 0~1 사이의 숫자를 무작위 반환 (0 포함, 1 미포함)
// Math.floor = 소수점 이하 숫자 삭제
function randomNumber() {
  number = Math.floor(Math.random() * 100) + 1;
  console.log("정답", number);
}

function play() {
  let userValue = input.value;

  if (userValue < 1 || userValue > 100) {
    inputMsg.textContent = "1~100 사이의 숫자를 입력해주세요.";
    return;
  }

  if (history.includes(userValue)) {
    inputMsg.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }

  chance--;
  // 백틱(backtick) = 동적 + 정적 값 동시출력 가능
  chanceLeft.textContent = `남은 기회: ${chance}번!`;
  console.log("기회", chance);

  if (userValue < number) {
    inputMsg.textContent = "UP!!";
  } else if (userValue > number) {
    inputMsg.textContent = "DOWN!!";
  } else {
    inputMsg.textContent = "정답!!!";
    gameOver = true;
  }

  history.push(userValue);
  console.log(history);

  if (chance < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    buttonPlay.disabled = true;
  }
}

function reset() {
  input.value = ""; // input 초기화
  randomNumber(); // 새로운 번호 생성
  inputMsg.textContent = "처음부터 다시 입력해보세요!";
}

randomNumber();
