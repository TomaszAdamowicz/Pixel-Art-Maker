const erease = document.getElementById('button_erease');
const canvas = document.getElementById('pixel_canvas');
let height = document.getElementById('input_height');
let width =  document.getElementById('input_width');
let cells = document.getElementsByTagName('td');


// Grid object

let grid = {
  w : width.value,
  h : height.value,
  rulers: true,
  makeGrid : (height,width) => {
    let i = 1;
    canvas.innerHTML = "";

    while (i <= height){
      const tr = document.createElement('tr');
      for (let column = 1; column <= width; column++) {
        const tc = document.createElement('td');
        tr.appendChild(tc);
      };
      canvas.appendChild(tr);
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
  changeColor : (item) => {
    if (erease.classList.contains('active') === true) {
      item.style.backgroundColor = '';
    } else {
      const picker = document.getElementById('colorPicker');
      item.style.backgroundColor = picker.value;
    }
  },
  drawRulers : () => {
    if (grid.rulers === true) {
      canvas.classList.remove('rulers-on');
      canvas.className += ' rulers-off';
      grid.rulers = false;
    } else {
      canvas.classList.remove('rulers-off');
      canvas.className += ' rulers-on';
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

// Load new grid from user inputs, test its size ( clear old grid, update grid object values and pass them to grid method).

document.getElementById('input_submit').addEventListener('click', (e) => {
  grid.h = height.value;
  grid.w = width.value;
  e.preventDefault();
  testGrid(grid.h, grid.w);
});

function testGrid(h,w) {
  if ((h >= 20) || (w >= 35)) {
    toggleModal(modal);
  } else {
    grid.makeGrid(grid.h,grid.w);
  }
}

// Close modal

document.getElementById('close_modal').addEventListener('click', () => {
  toggleModal(modal);
});

// Toggle modal

function toggleModal(e){
  if ( isNotVisible(e)) {
    e.className += ' modal-active';
  } else {
    e.classList.remove('modal-active');
  };
}

//Check visibility of an element

let isNotVisible = (e) => {
  return (e.offsetWidth == 0 && e.offsetHeight == 0);
}

// Clear grid using grid method

document.getElementById('button_clear').addEventListener('click' , (e) => {
  e.preventDefault();
  grid.clearGrid();
});

// Toggle class 'active' on erease button

erease.addEventListener('click', () => {
  event.target.classList.toggle('not-active');
  event.target.classList.toggle('active');
});

// Hide grid rulers using grid method

document.getElementById('hide_grid').addEventListener('click', () => {
  grid.drawRulers();
});

// Reset grid to starer position

document.getElementById('reset_grid').addEventListener('click', () => {
  grid.makeGrid(10,10);
});

