const allSheetContainerDB = [];
let sheetDB = [];

{
  addSheet.click();
}

bold.addEventListener("click", () => {
  const [cell, cellProps] = getActiveCell();
  cellProps.bold = !cellProps.bold;
  cell.style.fontWeight = cellProps.bold ? "bold" : "normal";
  bold.style.backgroundColor = cellProps.bold ? activeColor : inActiveColor;
});
italic.addEventListener("click", () => {
  const [cell, cellProps] = getActiveCell();
  cellProps.italic = !cellProps.italic;
  cell.style.fontStyle = cellProps.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProps.italic ? activeColor : inActiveColor;
});
underline.addEventListener("click", () => {
  const [cell, cellProps] = getActiveCell();
  cellProps.underline = !cellProps.underline;
  cell.style.textDecoration = cellProps.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProps.underline
    ? activeColor
    : inActiveColor;
});

fontFamily.addEventListener("change", (event) => {
  const [cell, cellProps] = getActiveCell();
  cell.style.fontFamily = event.target.value;
  cellProps.fontFamily = event.target.value;
});

fontSize.addEventListener("change", (event) => {
  const [cell, cellProps] = getActiveCell();
  cell.style.fontSize = `${event.target.value}px`;
  cellProps.fontSize = event.target.value;
});

backgroundColor.addEventListener("input", (event) => {
  const [cell, cellProps] = getActiveCell();
  cell.style.backgroundColor = backgroundColor.value;
  cellProps.backgroundColor = backgroundColor.value;
});
fontColor.addEventListener("input", (event) => {
  const [cell, cellProps] = getActiveCell();
  cell.style.color = fontColor.value;
  cellProps.color = fontColor.value;
});

alignRight.addEventListener("click", () => {
  const [cell, cellProps] = getActiveCell();
  const alignment =
    cellProps.textAlign !== "right" ? "right" : defaultFontAlignment;
  cell.style.justifyContent = alignment;
  cellProps.textAlign = alignment;
  alignRight.style.backgroundColor =
    cellProps.textAlign === "right" ? activeColor : inActiveColor;
  alignLeft.style.backgroundColor = inActiveColor;
  alignCenter.style.backgroundColor = inActiveColor;
});
alignCenter.addEventListener("click", () => {
  const [cell, cellProps] = getActiveCell();
  const alignment =
    cellProps.textAlign !== "center" ? "center" : defaultFontAlignment;
  cell.style.justifyContent = alignment;
  cellProps.textAlign = alignment;
  alignCenter.style.backgroundColor =
    cellProps.textAlign === "center" ? activeColor : inActiveColor;
  alignLeft.style.backgroundColor = inActiveColor;
  alignRight.style.backgroundColor = inActiveColor;
});

cellGrid.addEventListener("click", (event) => {
  const [cell, cellProps] = getActiveCell();
  highlightActiveCellProperties(cell, cellProps);
});
function getActiveCell(cellAdd = addressBar.value) {
  const [rowId, colId] = decodeCellLocation(cellAdd);
  const cell = document.querySelector(
    `.input-cell[rid="${rowId}"][cid="${colId}"]`
  );
  const cellProps = sheetDB[rowId][colId];
  return [cell, cellProps];
}

function decodeCellLocation(address) {
  let colId = address.split(/[0-9]+/)[0];
  let rowId = Number(address.split(colId)[1] - 1);
  // convert colId to index
  colId = Number(colId.charCodeAt(0) - 65);
  return [rowId, colId];
}

function highlightActiveCellProperties(cell, cellProps) {
  cell.style.fontWeight = cellProps.bold ? "bold" : "normal";
  cell.style.fontColor = cellProps.fontColor;
  cell.style.fontFamily = cellProps.fontFamily;
  cell.style.fontSize = cellProps.fontSize;
  cell.style.textAlign = cellProps.textAlign;
  cell.style.textDecoration = cellProps.underline ? "underline" : "none";
  cell.style.backgroundColor = cellProps.backgroundColor;
  cell.value = cellProps.value;
  cell.innerText = cellProps.value;

  // hight the active properties
  bold.style.backgroundColor = cellProps.bold ? activeColor : inActiveColor;
  italic.style.backgroundColor = cellProps.italic ? activeColor : inActiveColor;
  underline.style.backgroundColor = cellProps.underline;
  fontFamily.value = cellProps.fontFamily;
  fontColor.value = cellProps.color;
  backgroundColor.value = cellProps.backgroundColor;
  fontSize.value = cellProps.fontSize;

  formulaBar.value = cellProps.formula;
  switch (cellProps.textAlign) {
    case "left":
      alignLeft.style.backgroundColor = activeColor;
      alignRight.style.backgroundColor = inActiveColor;
      alignCenter.style.backgroundColor = inActiveColor;
      break;
    case "right":
      alignRight.style.backgroundColor = activeColor;
      alignLeft.style.backgroundColor = inActiveColor;
      alignCenter.style.backgroundColor = inActiveColor;
      break;
    default:
      alignCenter.style.backgroundColor = activeColor;
      alignRight.style.backgroundColor = inActiveColor;
      alignLeft.style.backgroundColor = inActiveColor;
  }

  //highlight cell row and column also
  highlightActiveCellRowAndColumn(addressBar.value, "rgba(180, 212, 255, 0.5)");
}

function highlightActiveCellRowAndColumn(address, color = "#ffffff") {
  const [rowId, colId] = decodeCellLocation(address);
  const rowCell = document.querySelector(`.address-cell[rowId="${rowId}"]`);
  const colCell = document.querySelector(`.address-cell[colId="${colId}"`);
  rowCell.style.backgroundColor = color;
  colCell.style.backgroundColor = color;
}
