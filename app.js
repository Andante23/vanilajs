let userName = document.getElementById("userName");

let userTeam = document.getElementById("userTeam");
let userCountry = document.getElementById("userContry");
let userInputForm = document.getElementById("userInputForm");
let playerDisplay = document.getElementById("insertDisplay");
let playerDB = [];

// 축구선수 정보를 등록하는 함수
userInputForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let playerInfo = {
    id: crypto.randomUUID(),
    name: userName.value,
    team: userTeam.value,
    country: userCountry.value,
  };

  playerDB.push(playerInfo);

  playerDisplay.innerHTML += `
 <figure>
  <h1>${playerInfo.name}</h1>
  <span>${playerInfo.team}</span>
  <span>${playerInfo.country}</span>
  <button onclick=deleteButton("${playerInfo.id}")>delete</button>
  <button onclick=editButton("${playerInfo.id}")>edit</button>
  </figure>
 
 `;

  localStorage.setItem("player", JSON.stringify(playerDB));

  userInputForm.reset();

  // 3개의 input중 하나라도 공백이 있다면
  if (
    playerInfo.country.trim() == "" ||
    playerInfo.name.trim() == "" ||
    playerInfo.team.trim() == ""
  ) {
    window.alert("잘못된 입력이에요");

    return;
  }
});

// 축구선수 정보를 삭제하는 함수
function deleteButton(id) {
  let playerDatas = JSON.parse(localStorage.getItem("player"));

  playerDatas = playerDatas.filter((player) => player.id !== id);
  localStorage.setItem("player", JSON.stringify(playerDatas));

  playerDisplay.innerHTML = "";
  playerDatas.forEach((player) => {
    playerDisplay.innerHTML += `
       <figure>
        <h1>${player.name}</h1>
        <span>${player.team}</span>
        <span>${player.country}</span>
        <button onclick=deleteButton("${player.id}")>delete</button>
        <button onclick=editButton("${player.id}")>edit</button>
       </figure>
       
       `;
  });
}

// 축구선수 정보를 수정하는 함수
function editButton(id) {
  let playerDatas = JSON.parse(localStorage.getItem("player"));

  playerDatas = playerDatas.map((item) => {
    if (item.id === id) {
      item.name = window.prompt("이름을 입력해주세요");
      item.age = Number(window.prompt("나이를 입력해주세요"));
      item.team = window.prompt("팀을 입력해주세요");
      item.country = window.prompt("국가를 입력해주세요");
    }
    return item;
  });

  localStorage.setItem("player", JSON.stringify(playerDatas));

  playerDisplay.innerHTML = "";

  playerDatas.forEach((player) => {
    playerDisplay.innerHTML += `
       <figure>
        <h1>${player.name}</h1>
        
        <span>${player.team}</span>
        <span>${player.country}</span>
        <button onclick=deleteButton("${player.id}")>delete</button>
        <button onclick=editButton("${player.id}")>edit</button>
       </figure>
    
       `;
  });
}

let storageData = JSON.parse(localStorage.getItem("player")) || [];

if (storageData.length !== 0) {
  playerDisplay.innerHTML = "";
  storageData.forEach((player) => {
    playerDisplay.innerHTML += `
  <figure>
   <h1>${player.name}</h1>
   
   <span>${player.team}</span>
   <span>${player.country}</span>
   <button onclick=deleteButton("${player.id}")>delete</button>
    <button onclick=editButton("${player.id}")>edit</button>
  </figure>

  `;
  });
} else if (storageData.length === 0) {
  playerDisplay.innerHTML += `<div>
    등록된 데이터가 없습니다.
  </div>
  `;
}
