let userName = document.getElementById("userName");
let userAge = document.getElementById("userAge");
let userTeam = document.getElementById("userTeam");
let userCountry = document.getElementById("userContry");
let userInputForm = document.getElementById("userInputForm");
let playerDisplay = document.getElementById("insertDisplay");

let playerDB = [];

/*

  폼 입력시 테이블에 등록하기

  (1) 이름 , 나이 , 팀 , 나라 를 사용자로부터 입력받기
  
  (2) playerDB에 저장됩니다.

  (3) 선수 정보가 테이블에 등록됩니다. 

 */

// 폼 입력시 등록하는 이벤트
userInputForm.addEventListener("submit", function (event) {
  // 기본 동작 방지합니다.
  event.preventDefault();

  // 입력한 선수정보 데이터인 playerInfo
  const playerInfo = {
    id: crypto.randomUUID(),
    name: userName.value,
    age: userAge.value,
    team: userTeam.value,
    country: userCountry.value,
  };

  // 선수정보 저장하는 용도로 쓰임
  playerDB.push(playerInfo);

  // UI에 보여지는 것은 하나만
  playerDisplay.innerHTML += `
   <figure>
    <h1>${playerInfo.name}</h1>
    <span>${playerInfo.age}</span>
    <span>${playerInfo.team}</span>
    <span>${playerInfo.country}</span>
    <button onclick="deleteButton('${playerInfo.id}')">delete</button>
    <button onclick="editButton('${playerInfo.id}')">edit</button>
    </figure>
   
   `;

  // reset 메서드로 폼을 리셋합니다.
  userInputForm.reset();
});

// 선수 정보를 삭제하는 함수
function deleteButton(id) {
  // => 선수 정보가 담겨있는 배열 playerDB값을 삭제하고자 하는 아이디값이 없는 배열로 변경
  playerDB = playerDB.filter((item) => item.id !== id);

  playerDisplay.innerHTML = "";

  playerDB.forEach((player) => {
    playerDisplay.innerHTML += `
   <figure>
    <h1>${player.name}</h1>
    <span>${player.age}</span>
    <span>${player.team}</span>
    <span>${player.country}</span>
    <button onclick="deleteButton('${player.id}')">delete</button>
    <button onclick="editButton('${player.id})">edit</button>
   </figure>
   
   `;
  });
}

// 선수 정보를 수정하는 함수
function editButton(id) {
  // id와 일치하는 데이터만 수정
  playerDB = playerDB.map((item) => {
    if (item.id === id) {
      item.name = window.prompt("이름을 입력해주세요");
      item.age = Number(window.prompt("나이를 입력해주세요"));
      item.team = window.prompt("팀을 입력해주세요");
      item.country = window.prompt("국가를 입력해주세요");
    }
    return item;
  });

  console.log("playerDB:", playerDB);

  playerDisplay.innerHTML = "";

  playerDB.forEach((player) => {
    playerDisplay.innerHTML += `
   <figure>
    <h1>${player.name}</h1>
    <span>${player.age}</span>
    <span>${player.team}</span>
    <span>${player.country}</span>
    <button onclick="deleteButton('${player.id}')">delete</button>
    <button onclick="editButton('${player.id})">edit</button>
   </figure>

   `;
  });
}
