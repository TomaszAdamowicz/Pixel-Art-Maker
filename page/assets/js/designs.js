const erease = document.getElementById('button-erease');
const pixelCanvas = document.getElementById('pixel-canvas');
const height = document.getElementById('input-height');
const width =  document.getElementById('input-width');
const modalAlert = document.querySelector('#modal .alert');
let cells = document.getElementsByTagName('td');

// Grid object

let grid = {
  w : width.value,
  h : height.value,
  rulers: true,
  makeGrid : (height,width) => {
    let i = 1;
    pixelCanvas.innerHTML = "";

    while (i <= height){
      const tr = document.createElement('tr');
      for (let column = 1; column <= width; column++) {
        const tc = document.createElement('td');
        tr.appendChild(tc);
      };
      pixelCanvas.appendChild(tr);
      i++;
    };
    grid.selectCell();
  },
  selectCell : () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', (e) => {
        grid.changeColor(e.target);
      });
    };
  },
  changeColor : (elem) => {
    if (erease.classList.contains('active') === true) {
      elem.style.backgroundColor = '';
    } else {
      const picker = document.getElementById('color-picker');
      elem.style.backgroundColor = picker.value;
    }
  },
  drawRulers : () => {
    if (grid.rulers === true) {
      pixelCanvas.classList.remove('rulers-on');
      pixelCanvas.className += ' rulers-off';
      grid.rulers = false;
    } else {
      pixelCanvas.classList.remove('rulers-off');
      pixelCanvas.className += ' rulers-on';
      grid.rulers = true;
    };
  },
  clearGrid : () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = '';
    };
  }
};

// Load sample grid on start.

window.onload = () => {
  grid.makeGrid(grid.h,grid.w);
};

// Load new grid

document.getElementById('input-submit').addEventListener('click', (e) => {
  grid.h = height.value;
  grid.w = width.value;
  e.preventDefault();
  testGrid(grid.h, grid.w);
});

// Test if grid size doesn't exceed container. Fire modal if, it doesn't.

function testGrid(h,w) {
  const controlsW = document.querySelector('.controls-wrapper').offsetWidth;
  const canvasH = document.querySelector('.canvas-wrapper').offsetHeight;
  const winW = window.innerWidth;
  let cellsX =  countCellsY(canvasH);
  let cellsY = countCellsX(winW, controlsW);
  
  if ((h > cellsX) || (w > cellsY)) {
    updateModalMessage(cellsY,cellsX);
    toggleModal(modal);
  } else {
    grid.makeGrid(grid.h,grid.w);
  }
}

// Calculate maximum number of cells in grid

let countCellsY = (num) => {
  return Math.floor(num/20);
};

let countCellsX = (num,num1) => {
  return Math.floor((num-num1)/20);
};

// Display modal message with calculated amount of cells

let updateModalMessage = (num,num1) => {
  let button = document.getElementById('close-modal');
  let p = document.createElement('p');
  let message = document.createTextNode('For better experience grid shouldn\'t be bigger than ' + num1 + ' columns height and ' + num + ' columns width.');
  
  p.setAttribute('id','modal-message');
  p.appendChild(message);
  
  modalAlert.insertBefore(p,button);
};

// Close modal

document.getElementById('close-modal').addEventListener('click', () => {
  toggleModal(modal);
});

// Toggle modal

function toggleModal(elem){
  if ( isNotVisible(elem)) {
    elem.className += ' modal-active';
  } else {
    elem.classList.remove('modal-active');
  };
}

//Check visibility of an element

let isNotVisible = (elem) => {
  return (elem.offsetWidth == 0 && elem.offsetHeight == 0);
};

// Clear grid using grid method

document.getElementById('button-clear').addEventListener('click' , (e) => {
  e.preventDefault();
  grid.clearGrid();
});

// Toggle class 'active' on erease button

erease.addEventListener('click', () => {
  event.target.classList.toggle('not-active');
  event.target.classList.toggle('active');
});

// Hide grid rulers using grid method

document.getElementById('hide-grid').addEventListener('click', () => {
  grid.drawRulers();
});

// Reset grid to starer position

document.getElementById('reset-grid').addEventListener('click', () => {
  grid.makeGrid(10,10);
});
