const addSheet = document.querySelector(".add-sheet-icon");
const sheetContainer = document.querySelector(".sheet-folder-container");

addSheet.addEventListener("click", () => {
  // make cell inactive
  // if (address?.value) {
  //   pipeFunction([getActiveCell, highlightActiveCellRowAndColumn])(
  //     addressBar.value
  //   );
  // }
  const sheetFolder = document.querySelectorAll(".sheet-folder");
  const newSheetName = "Sheet " + (sheetFolder.length + 1);

  const newSheet = document.createElement("div");
  newSheet.innerText = newSheetName;
  newSheet.setAttribute("class", "sheet-folder");
  newSheet.setAttribute("id", sheetFolder.length);

  sheetContainer.appendChild(newSheet);
  createNewSheetDB();
  handleSheetActiveness(newSheet);
  handleRemoveSheet(newSheet, sheetFolder.length);
  newSheet.click();
});

const createNewSheetDB = () => {
  let sheet = [];
  for (let i = 0; i < noOfRows; i++) {
    let sheetRow = [];
    for (let j = 0; j < noOfCols; j++) {
      let cellProps = {
        bold: false,
        italic: false,
        underline: false,
        textAlign: "left", // left, center, right
        color: "#000000",
        fontFamily: "Noto sans",
        fontSize: "12",
        backgroundColor: "#ffffff",
        value: "",
        children: [], //cells which will use these value
        formula: "",
      };
      sheetRow.push(cellProps);
    }
    sheet.push(sheetRow);
  }
  allSheetContainerDB.push(sheet);
};

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIndx = Number(sheet.getAttribute("id"));
    makeSheetActive(sheetIndx, sheet);
    updateSheetProperties();
    indicateActiveSheet(sheet);
    if (addressBar.value) {
      highlightActiveCellRowAndColumn(addressBar.value);
    }
    makeFirstCellActive();
  });
}
const makeSheetActive = (id, sheet) => {
  sheetDB = allSheetContainerDB[id];
  // make current cell Inactive once new sheet is created
  // A1 becomes the active cell
};

const mapCellWithCellProps = (cell, cellProps) => {
  cell.style.fontWeight = cellProps.bold ? "bold" : "normal";
  cell.style.fontColor = cellProps.fontColor;
  cell.style.fontFamily = cellProps.fontFamily;
  cell.style.fontSize = cellProps.fontSize;
  cell.style.textAlign = cellProps.textAlign;
  cell.style.textDecoration = cellProps.underline ? "underline" : "none";
  cell.style.backgroundColor = cellProps.backgroundColor;
  cell.value = cellProps.value;
  cell.innerText = cellProps.value;
};
const updateSheetProperties = () => {
  for (let i = 0; i < noOfRows; i++) {
    for (let j = 0; j < noOfCols; j++) {
      const cell = document.querySelector(
        `.input-cell[rid="${i}"][cid="${j}"]`
      );
      const cellProps = sheetDB[i][j];
      mapCellWithCellProps(cell, cellProps);
    }
  }
};

function pipeFunction(fns) {
  return function (initialProps) {
    return fns.reduce((props, fn) => fn(props), initialProps);
  };
}

// make sheet active
function indicateActiveSheet(clickedSheet) {
  // make all other sheet inactive
  const sheetContainer = document.querySelectorAll(".sheet-folder");
  for (let sheet of sheetContainer) {
    sheet.style.backgroundColor = "transparent";
  }
  clickedSheet.style.backgroundColor = "#B4D4FF";
}

function handleRemoveSheet(sheet, id) {
  sheet.addEventListener("mousedown", (event) => {
    if (event.button !== 2) return;

    const sheets = document.querySelectorAll(".sheet-folder");
    if (sheets.length === 1) {
      alert("There need to have atleast one sheet");
      return;
    }

    const response = confirm("Do you wish to delete the sheet");
    if (response) {
      // Remove the sheet from DB
      // and change the id of all other sheet
      // and activate the first sheet
      allSheetContainerDB.splice(id, 1);
      sheet.remove();
      for (let i = 0; i < sheets.length; i++) {
        sheets[i].setAttribute("id", i);
      }

      sheets[0].click();
    }
  });
}
