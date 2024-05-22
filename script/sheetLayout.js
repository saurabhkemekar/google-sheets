let noOfRows = 100;
let noOfCols = 26;
const numberAddressCell = document.querySelector(".address-col");
const alphaAddressCell = document.querySelector(".address-row");
const cellContainer = document.querySelector(".cell-container");
const addressBar = document.querySelector(".address-bar");
const bold = document.querySelector(".bold");
const italic = document.querySelector(".italic");
const underline = document.querySelector(".underline");
const alignLeft = document.querySelector(".align-left");
const alignRight = document.querySelector(".align-right");
const alignCenter = document.querySelector(".align-center");
const fontFamily = document.querySelector(".font-family");
const fontSize = document.querySelector(".font-size");
const backgroundColor = document.querySelector(".format-background-color");
const fontColor = document.querySelector(".format-color");
const cellGrid = document.querySelector(".cell-container");
const formulaBar = document.querySelector(".formula-bar");
const activeColor = "rgba(180, 212, 255, 0.8)";
const inActiveColor = "rgba(180, 212, 255, 0)";
const defaultFontAlignment = "center";
function addListnerForCellEdit(cell, i, j) {
  cell.addEventListener("click", () => {
    const row = i + 1;
    const col = String.fromCharCode(65 + j);
    addressBar.value = `${col}${row}`;
  });
}
for (let i = 1; i <= noOfRows; i++) {
  const cellEle = document.createElement("div");
  cellEle.innerText = i;
  cellEle.classList.add("address-cell", "cell");
  cellEle.setAttribute("rowId", i - 1);
  numberAddressCell.appendChild(cellEle);
}

for (let i = 0; i < noOfCols; i++) {
  const cellEle = document.createElement("div");
  cellEle.innerText = String.fromCharCode(65 + i);
  cellEle.classList.add("address-cell", "cell", "big-cell");
  cellEle.setAttribute("colId", i);
  alphaAddressCell.appendChild(cellEle);
}

for (let i = 0; i < noOfRows; i++) {
  const row = document.createElement("div");
  row.classList.add("address-cell");
  for (let j = 0; j < noOfCols; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", "big-cell", "input-cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("rid", i); // row identification
    cell.setAttribute("cid", j); // column identification
    row.appendChild(cell);
    addListnerForCellEdit(cell, i, j);
  }
  cellContainer.appendChild(row);
}

// making the first cell as default one
const makeFirstCellActive = () => {
  const firstCell = document.querySelector(".input-cell");
  firstCell.click();
};
