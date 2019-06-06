import React from 'react';


function Cell(props) {
  return (
    <div 
      className={`cell cell-${props.col ? 'alive' : 'dead'}`}
      onClick={() => props.toggleCellState()}
    >
    </div>
  )
}

function Row(props){
  return (
    <div className="row">
      { 
        props.row.map((cell, id) =>  
          <Cell 
            key={`${props.rid} ${id}`} 
            col={cell} 
            toggleCellState={() => (
              props.toggleCellState(id)
            )} />
        ) 
      }
    </div>
  )
}

function Grid(props) {
  return (
    <div>
      { 
        props.matrix.map((row, id) => 
          <Row 
            key={id} 
            rid={id} 
            row={row} 
            toggleCellState={(y) => (
              props.toggleCellState(id, y)) }/>
          ) 
      }
    </div>
  )
}

function Board(props) {
  return ( 
    <Grid matrix={props.matrix} toggleCellState={(x, y) => (props.toggleCellState(x, y))}/> 
  );
}

export default Board;
