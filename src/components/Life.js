import React, { Component } from 'react';

import Board from './Board'
import Controls from './Controls'


function correct(val, max) {
  if (val < 0) return max + val;
  if (val >= max) return val - max;
  return val;
}

function sumOfNeighbours(matrix, x, y, options) {
  const neighbours = [
    [-1,-1],
    [-1, 0],
    [-1, 1],
    [ 0,-1],
    [ 0, 1],
    [ 1,-1],
    [ 1, 0],
    [ 1, 1],
  ]

  let sum = 0;

  neighbours.forEach((val) => {
    let xx, yy;

    xx = correct(x + val[0], options.ROW_NUMBER);
    yy = correct(y + val[1], options.COL_NUMBER);

    sum += matrix[xx][yy];
  })

  return sum;
}

function processIteration(matrix, options) {
  let new_matrix = []
  matrix.forEach((row) => new_matrix.push(row.slice()));

  matrix.forEach((row, row_index) => {
    row.forEach((col, col_index) => {
      let cell_state = col,
        neighbours_count = sumOfNeighbours(matrix, row_index, col_index, options);

      if (cell_state) {
        if (neighbours_count < 2 || neighbours_count > 3) 
          new_matrix[row_index][col_index] = 0;
      } else {
        if (neighbours_count === 3)
          new_matrix[row_index][col_index] = 1;
      }
    })
  })

  return new_matrix;
}

function generateRandomMatrix(options) {
  let random_matrix = [];

  for (let i = 0; i < options.ROW_NUMBER; i++) {
    let temp_row = [];

    for(let j = 0; j < options.COL_NUMBER; j++) {
      let temp_cell = Math.floor(Math.random() * 100);
      temp_cell = +!(temp_cell > options.RANDOM_FILL_PERCENT);
      temp_row.push(temp_cell);
    }

    random_matrix.push(temp_row);
  }

  return random_matrix;
}

function clearMatrix(matrix, options) {
  let new_matrix = matrix;

  matrix.forEach((row) => {
    row.fill(0);
  })

  return new_matrix;
}

function toggleCellState(matrix, x, y) {
  matrix[x][y] = !matrix[x][y];
  return matrix;
}


class Life extends Component {
  constructor() {
    super();

    this.state = {
      matrix: [],

      options: {
        RANDOM_FILL_PERCENT: 25,
        ROW_NUMBER: 20,
        COL_NUMBER: 30,
        DELAY: 200,
        PAUSED: false,
      },

      actions: {
        setPaused: this.setPaused.bind(this),
        randomizeMatrix: this.randomizeMatrix.bind(this),
        clearMatrix: this.clearMatrix.bind(this),
        nextIteration: this.nextIteration.bind(this),
        toggleCellState: this.toggleCellState.bind(this),

        updateRowCount: this.updateRowCount.bind(this),
        updateColCount: this.updateColCount.bind(this),
        changeDelay: this.changeDelay.bind(this) 
      }
    }
  }


  setPaused(paused = true) {
    if (this.state.options.PAUSED === paused) return;

    if (!paused) {
      this.startGameLoop();
    }
    if (paused) this.stopGameLoop();

    this.setState(prevState => ({
      options: {
        ...prevState.options,
        PAUSED: paused
      }
    }));
  }

  randomizeMatrix() {
    this.stopGameLoop();
    this.setState({matrix: generateRandomMatrix(this.state.options)})
    if (!this.state.options.PAUSED) this.startGameLoop();
  }

  clearMatrix() {
    this.stopGameLoop();
    this.setState({matrix: clearMatrix(this.state.matrix)})
    if (!this.state.options.PAUSED) this.startGameLoop();
  }

  nextIteration() {
    this.stopGameLoop();
    this.setState({matrix: processIteration(this.state.matrix, this.state.options)})
    if (!this.state.options.PAUSED) this.startGameLoop();
  }

  updateRowCount(new_row_number) { 
    let options = this.state.options;
    new_row_number = +new_row_number;

    if (new_row_number === options.ROW_NUMBER) return;

    let new_matrix = this.state.matrix;
    new_matrix.length = new_row_number;

    if (new_row_number > options.ROW_NUMBER) {
      let row = [];
      row.length = options.COL_NUMBER;
      row.fill(0);

      new_matrix.fill(row, options.ROW_NUMBER, new_row_number);
    }

    this.setState((prevState) => ({
      matrix: new_matrix, 
      options: {
        ...prevState.options,
        ROW_NUMBER: new_row_number 
      }
    }))
  }

  updateColCount(new_col_number) {
    let options = this.state.options;
    new_col_number = +new_col_number;

    if (new_col_number === options.COL_NUMBER) return;

    let new_matrix = this.state.matrix;
    new_matrix.forEach((col) => col.length = new_col_number)

    if (new_col_number > this.state.options.COL_NUMBER) {
      new_matrix.forEach((col) => col.fill(0, options.COL_NUMBER, new_col_number))
    }

    this.setState((prevState) => ({
      matrix: new_matrix, 
      options: {
        ...prevState.options,
        COL_NUMBER: new_col_number 
      }
    }))
  }

  changeDelay(new_delay) {
    if (+new_delay < 10 || +new_delay > 9999) return;

    this.stopGameLoop();

    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        DELAY: +new_delay 
      }
    }))

    if (!this.state.options.PAUSED) this.startGameLoop(+new_delay);
  }


  toggleCellState(x, y) {
    this.setState({
      matrix: toggleCellState(this.state.matrix, x, y)
    })
  }


  startGameLoop(delay = this.state.options.DELAY) {
    this.gameLoop = setInterval(
      () => this.setState({matrix: processIteration(this.state.matrix, this.state.options)}),  
      delay
    );
  }

  stopGameLoop() {
    clearInterval(this.gameLoop);
  }


  componentWillMount() {
    this.setState({matrix: generateRandomMatrix(this.state.options)})
  }
  
  componentDidMount() {
    if (this.state.PAUSED) return;
  
    this.startGameLoop();
  }
  
  componentWillUnmount() {
    this.stopGameLoop();
  }


  render() {
    return ( 
      <>
        <Board matrix={this.state.matrix} toggleCellState={this.state.actions.toggleCellState}/> 
        <Controls options={this.state.options} actions={this.state.actions} />
      </>
    );
  }
}

export default Life;
