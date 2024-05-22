for (let i = 0; i < noOfRows; i++) {
  for (let j = 0; j < noOfCols; j++) {
    const cell = document.querySelector(`.input-cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", () => {
      // evalute the expression
      console.log("MAKE IT UNBLUR");
      highlightActiveCellRowAndColumn(addressBar.value);
      const [cell, cellProps] = getActiveCell();
      cellProps.value = cell.innerText;
      updateDependentCellValues(cellProps);
    });
  }
}

formulaBar.addEventListener("keydown", (event) => {
  const inputFormula = formulaBar.value;
  // compare the inputFormula and get the current formula on cell by using the cell Address Bar

  if (event.key === "Enter" && inputFormula) {
    const formula = decodeExpression(inputFormula);
    const [cell, cellProps] = getActiveCell();
    const prevFormula = cellProps.formula;

    if (detectCycle(addressBar.value)) {
      alert("Cycled Reference  Detected");
      return;
    }

    if (prevFormula !== inputFormula) {
      removeChildParentRelation(prevFormula); // we will remove all the node and new nodes will be added
    }
    try {
      const value = evaluateFormula(formula);
      cell.innerText = value;
      cellProps.formula = inputFormula;
      cellProps.value = value;
    } catch (err) {
      cell.innerText = "#ERROR";
      cellProps.formula = inputFormula;
      cellProps.value = value;
    }
    addChildrenToParent(inputFormula);
  }
});

function removeChildParentRelation(formula) {
  const decodeFormula = formula.split(" ");
  for (let i = 0; i < decodeFormula.length; i++) {
    const asciiVal = decodeFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      const [rowId, colId] = decodeCellLocation(decodeFormula[i]);
      const cellProps = sheetDB[rowId][colId];
      const indx = cellProps.children.indexOf(addressBar.value);
      if (indx !== -1) {
        cellProps.children = cellProps.children.splice(indx, 1);
      }
    }
  }
}
function addChildrenToParent(formula) {
  const decodeFormula = formula.split(" ");
  for (let i = 0; i < decodeFormula.length; i++) {
    const asciiVal = decodeFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      const [rowId, colId] = decodeCellLocation(decodeFormula[i]);
      const cellProps = sheetDB[rowId][colId];
      if (!cellProps.children.includes(addressBar.value)) {
        cellProps.children.push(addressBar.value);
      }
    }
  }
}
// evaluate expression

function decodeExpression(formula) {
  const decodeFormula = formula.split(" ");
  for (let i = 0; i < decodeFormula.length; i++) {
    const asciiVal = decodeFormula[i].charCodeAt(0);
    if (asciiVal >= 65 && asciiVal <= 90) {
      const [rowId, colId] = decodeCellLocation(decodeFormula[i]);
      const cellProps = sheetDB[rowId][colId];
      decodeFormula[i] = cellProps.value || 0;
    }
  }
  return decodeFormula.join("");
}

function updateDependentCellValues(cellProps) {
  for (let child of cellProps.children) {
    const [rowId, colId] = decodeCellLocation(child);
    const childCellProps = sheetDB[rowId][colId];
    const childCell = document.querySelector(
      `.input-cell[rid="${rowId}"][cid="${colId}"]`
    );
    const value = evaluateFormula(decodeExpression(childCellProps.formula));
    childCell.innerText = value;
    childCellProps.value = value;
    updateDependentCellValues(childCellProps);
  }
}

function evaluateFormula(formula) {
  return eval(formula);
}

function detectCycle(node) {
  const visitedArr = new Array();
  const queue = new Array();
  queue.push(node);

  while (queue.length !== 0) {
    const cellAddress = queue.shift();
    visitedArr.push(cellAddress);
    const [cell, cellProps] = getActiveCell(cellAddress);
    for (let child of cellProps.children) {
      if (visitedArr.includes(child)) {
        return true;
      }
      queue.push(child);
    }
  }
  return false;
}
