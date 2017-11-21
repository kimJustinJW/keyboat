(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function grid(state) {
  const grid = document.createElement('div');
  grid.style.display = `grid`;
  grid.style.width = `${state.gridWidth}`;
  grid.style.height = `${state.gridHeight}`;
  grid.style.gridTemplateRows = `${state.rows.join(' ')}`;
  grid.style.gridTemplateColumns = ` ${state.columns.join(' ')}`;

  let count = 0;
  while(count < state.rows.length * state.columns.length) {
    const child = document.createElement('div');
    grid.appendChild(child);
    count++;
  }

  return grid;
}

module.exports = grid;

},{}],2:[function(require,module,exports){
const grid = require('./grid.js');

const daZone = document.querySelector(`#da-zone`);
const rowsControls = document.querySelector(`#rows-control`);
const columnsControls = document.querySelector(`#columns-control`);

const globalState = {
  rows: ['1fr', '1fr'],
  columns: ['1fr', '1fr'],
  gridWidth: '800px',
  gridHeight: '450px',
};

render(globalState);

function dispatch(event) {
  let count = 0;

  switch(event.type) {

    case 'UPDATE_ROWS':
      const rowSize = event.payload.size || '1fr';
      globalState.rows = [];

      while (count < event.payload.number) {
        globalState.rows.push(rowSize);
        count++;
      }
      break;
    case 'UPDATE_COLUMNS':
      const columnSize = event.payload.size || '1fr';
      globalState.columns = [];

      while (count < event.payload.number) {
        globalState.columns.push(columnSize);
        count++;
      }
      break;
    case 'UPDATE_ROW':
      // should check for valid values
      globalState.rows[event.payload.id] = event.payload.value;
      break;
    case 'UPDATE_COLUMN':
      // should check for valid values
      globalState.columns[event.payload.id] = event.payload.value;
      break;
    case 'SET_GRID_WIDTH':
      // should check for valid values
      globalState.gridWidth = event.payload.value;
      break;
    case 'SET_GRID_HEIGHT':
      // should check for valid values
      globalState.gridHeight = event.payload.value;
      break;

    default:

      break;
  }
  render(globalState);
}

function render(state) {
  daZone.innerHTML = '';
  rowsControls.innerHTML = '';
  columnsControls.innerHTML = '';


  // Render Grid
  // const grid = document.createElement('div');
  // grid.style.display = `grid`;
  // grid.style.width = `${state.gridWidth}`;
  // grid.style.height = `${state.gridHeight}`;
  // grid.style.gridTemplateRows = `${state.rows.join(' ')}`;
  // grid.style.gridTemplateColumns = ` ${state.columns.join(' ')}`;
  //
  // let count = 0;
  // while(count < state.rows.length * state.columns.length) {
  //   const child = document.createElement('div');
  //   grid.appendChild(child);
  //   count++;
  // }
  const gridDiv = grid(state);

  daZone.appendChild(gridDiv);

  // Render Row Controls
  state.rows
    .map(rowControl)
    .forEach(x => {
      rowsControls.appendChild(x);
    });

  // Render Column Controls
  state.columns
    .map(columnControl)
    .forEach(x => {
      columnsControls.appendChild(x);
    });
}

function rowControl(row, id) {
  const div = document.createElement('div');
  div.innerHTML = `
    <label for="row-control-${id}">Row ${id}:
      <input type="text"
             name="row-${id}"
             onblur="dispatch({type:'UPDATE_ROW', payload: {id: ${id}, value}})"
             placeholder="${row}">
    </label>
  `;
  return div;
}

function columnControl(column, id) {
  const div = document.createElement('div');
  div.innerHTML = `
    <label for="column-control-${id}">Column ${id}:
      <input type="text"
             name="column-${id}"
             onblur="dispatch({type:'UPDATE_COLUMN', payload: {id: ${id}, value}})"
             placeholder="${column}">
    </label>
  `;
  return div;
}

},{"./grid.js":1}]},{},[2]);
