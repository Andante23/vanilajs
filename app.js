let userName = document.getElementById("userName");
let userAge = document.getElementById("userAge");
let userTeam = document.getElementById("userTeam");
let userCountry = document.getElementById("userContry");
let userInputForm = document.getElementById("userInputForm");
let playerDisplay = document.getElementById("insertDisplay");
let playerDB = [];

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

  playerDB.push(playerInfo);

  // localStorage에 선수정보저장
  // playerInfo 그대로 저장시에 이전 데이터가 덮어씌어짐
  // 그래서 배열 playerDB로 저장
  localStorage.setItem("player", JSON.stringify(playerDB));

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
  // i. 로컬 스토리지에서 선수 데이터 가져오기
  let playerDatas = JSON.parse(localStorage.getItem("player"));

  /* 
     ii. playerDatas 에서  삭제된 데이터 id 제외한 배열 반환 
         localStorage 내부 갱신 
  */
  playerDatas = playerDatas.filter((player) => player.id !== id);
  localStorage.setItem("player", JSON.stringify(playerDatas));

  // iii. 등록한 선수 정보 보여주는 부분 리셋 후 업로드
  playerDisplay.innerHTML = "";
  playerDatas.forEach((player) => {
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
  // i 로컬스토리지에서 player관련 데이터를 가져옵니다.
  let playerDatas = JSON.parse(localStorage.getItem("player"));

  // ii 수정이 반영된 배열을 만듭니다.
  playerDatas = playerDatas.map((item) => {
    if (item.id === id) {
      item.name = window.prompt("이름을 입력해주세요");
      item.age = Number(window.prompt("나이를 입력해주세요"));
      item.team = window.prompt("팀을 입력해주세요");
      item.country = window.prompt("국가를 입력해주세요");
    }
    return item;
  });

  // iii. 등록한 선수 정보 보여주는 부분 리셋 후 업로드
  playerDisplay.innerHTML = "";
  playerDatas.forEach((player) => {
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

// 로컬 스토리지에 저장된 선수 데이터를 보여주기

// i 로컬 스토리지에서 선수관련된 데이터를 가져옵니다.
let storageData = JSON.parse(localStorage.getItem("player"));

// ii 선수 정보를 하나씩 보여줍니다.
storageData.forEach((player) => {
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
