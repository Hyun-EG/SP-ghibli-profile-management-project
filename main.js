if (!localStorage.ghibliMembers) {
  localStorage.setItem("ghibliMembers", JSON.stringify([]));
}

const storagedMembers = JSON.parse(localStorage.getItem("ghibliMembers"));

document.getElementById("inputCharacter").style.display = "none";
document.getElementById("add-btn").addEventListener("click", function () {
  document.getElementById("inputCharacter").style.display = "block";
});

document.getElementById("cancelButton").addEventListener("click", function () {
  document.getElementById("inputCharacter").style.display = "none";
});

let updatingIndex = -1;
const table = document.getElementById("table");
const data = document.createElement("tbody");
data.id = "data";
table.appendChild(data);

const searchBox = document.getElementsByClassName("character-search")[0];
searchBox.addEventListener("input", (event) => {
  const searchString = event.target.value;
  const storagedMembers = JSON.parse(localStorage.getItem("ghibliMembers"));
  data.innerHTML = "";
  storagedMembers.forEach((v) => {
    if (v.name.includes(searchString)) {
      const tableRow = document.createElement("tr");
      const trId = Math.random() + Date.now();
      tableRow.id = trId;
      const trowInnerString = `
          <td><img src="${v.img}" alt="img" id="img"></td>
          <td>${v.name}</td>
          <td>${v.age}</td>
          <td>${v.gender}</td>
          <td>${v.MBTI}</td>
          <td>
            <button id="update-button">편집</button>
            <button id="delete-button">삭제</button>
          </td>
        `;
      tableRow.innerHTML = trowInnerString;
      const deleteButton = tableRow.querySelector("#delete-button");
      const updateButton = tableRow.querySelector("#update-button");
      data.appendChild(tableRow);
      deleteButton.addEventListener("click", () => deleteMember(trId));
      updateButton.addEventListener("click", () => updateMember(trId));
    }
  });
});

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL;
}

function applyLocalStorage() {
  const tableRows = Array.from(data.children);
  Promise.all(
    tableRows.map(async (v) => {
      const tds = Array.from(v.children);
      const imgSrc = tds[0].children[0].src;
      const imgBlob = await fetch(imgSrc).then((v) => v.blob());
      return {
        img: getBase64Image(tds[0].children[0]),
        name: tds[1].innerHTML,
        age: tds[2].innerHTML,
        gender: tds[3].innerHTML,
        MBTI: tds[4].innerHTML,
      };
    })
  ).then((v) => {
    localStorage.setItem("ghibliMembers", JSON.stringify(v));
  });
}

function deleteMember(trId) {
  const target = Array.from(data.children).find((v) => {
    return Number(v.getAttribute("id")) === trId;
  });

  const targetIndex = Array.from(data.children).findIndex((v) => {
    return Number(v.getAttribute("id")) === trId;
  });

  if (targetIndex === updatingIndex) {
    const updateRow = Array.from(data.children)[targetIndex + 1];
    data.removeChild(updateRow);
  }

  data.removeChild(target);
  applyLocalStorage();
}

function updateMember(trId) {
  const prevUpdateInput = document.getElementById("update-inputs");
  if (prevUpdateInput) {
    data.removeChild(prevUpdateInput);
    updatingIndex = -1;
  }

  const childrens = Array.from(data.children);
  const target = childrens.find((v) => {
    return Number(v.getAttribute("id")) === trId;
  });
  const targetIndex = childrens.findIndex((v) => {
    return Number(v.getAttribute("id")) === trId;
  });
  updatingIndex = targetIndex;

  const tableRow = document.createElement("tr");
  tableRow.id = "update-inputs";
  const inputs = Array.from(target.children)
    .filter((_, i) => {
      return i !== 0;
    })
    .map((v) => v.innerHTML);
  inputs.pop();
  const updateInnerString = `
    <td><input class="input-image" type="file" id="file-input"></td>
    <td><input value="${inputs[0]}" class="search" type="text" placeholder="이름"></td>
    <td><input value="${inputs[1]}" class="search" type="text" placeholder="나이"></td>
    <td><input value="${inputs[2]}" class="search" type="text" placeholder="성별"></td>
    <td><input value="${inputs[3]}" class="search" type="text" placeholder="MBTI"></td>
    <td><button id="patch-button">수정</button></td>
`;

  tableRow.innerHTML = updateInnerString;

  childrens.forEach((v) => data.removeChild(v));
  childrens.splice(targetIndex + 1, 0, tableRow);
  childrens.forEach((v) => data.appendChild(v));

  const patchButton = tableRow.querySelector("#patch-button");
  patchButton.addEventListener("click", () =>
    onClickUpdateButton(tableRow, target)
  );
}

function onClickUpdateButton(tableRow, target) {
  const updateData = Array.from(tableRow.children).map((v) => v.children[0]);
  const inputImg = URL.createObjectURL(updateData[0].files[0]);
  const inputTexts = updateData.splice(1, 4).map((v) => v.value);
  const targetArr = Array.from(target.children);
  const targetImg = targetArr.shift().children[0];
  const targetTexts = targetArr.splice(0, 4);
  targetImg.src = inputImg;
  targetTexts.forEach((v, i) => {
    v.innerHTML = inputTexts[i];
  });
  data.removeChild(tableRow);
  updatingIndex = -1;
  applyLocalStorage();
}

function saveMember() {
  const tableRow = document.createElement("tr");
  const trId = Math.random() + Date.now();
  tableRow.id = trId;

  const form = document.getElementsByClassName("input-character-content");
  const datas = Array.from(form[0]).map((v) => {
    return v.value;
  });
  const inputImg = document.querySelector(".input-image").files[0];
  const imgBlob = URL.createObjectURL(inputImg);

  const trowInnerString = `
    <td><img src="${imgBlob}" alt="img" id="img"></td>
    <td>${datas[1]}</td>
    <td>${datas[2]}</td>
    <td>${datas[3]}</td>
    <td>${datas[4]}</td>
    <td>
      <button id="update-button">편집</button>
      <button id="delete-button">삭제</button>
    </td>
 `;

  storagedMembers.push({
    img: imgBlob,
    name: datas[1],
    age: datas[2],
    gender: datas[3],
    MBTI: datas[4],
  });
  localStorage.setItem("ghibliMembers", JSON.stringify(storagedMembers));

  tableRow.innerHTML = trowInnerString;
  const deleteButton = tableRow.querySelector("#delete-button");
  const updateButton = tableRow.querySelector("#update-button");
  data.appendChild(tableRow);
  deleteButton.addEventListener("click", () => deleteMember(trId));
  updateButton.addEventListener("click", () => updateMember(trId));

  applyLocalStorage();
}

function storageToTable() {
  const storagedMemberData = JSON.parse(localStorage.getItem("ghibliMembers"));
  storagedMemberData.forEach((v) => {
    const tableRow = document.createElement("tr");
    const trId = Math.random() + Date.now();
    tableRow.id = trId;
    const trowInnerString = `
      <td><img src="${v.img}" alt="img" id="img"></td>
      <td>${v.name}</td>
      <td>${v.age}</td>
      <td>${v.gender}</td>
      <td>${v.MBTI}</td>
      <td>
        <button id="update-button">편집</button>
        <button id="delete-button">삭제</button>
      </td>
    `;
    tableRow.innerHTML = trowInnerString;
    const deleteButton = tableRow.querySelector("#delete-button");
    const updateButton = tableRow.querySelector("#update-button");
    data.appendChild(tableRow);
    deleteButton.addEventListener("click", () => deleteMember(trId));
    updateButton.addEventListener("click", () => updateMember(trId));
  });
}

storageToTable();

const saveButton = document.getElementsByClassName("save-button")[0];
saveButton.addEventListener("click", saveMember);
