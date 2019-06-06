import React from 'react';


function Cell(props) {
  return (
    <div className={`cell cell-${props.col ? 'alive' : 'dead'}`}>
    </div>
  )
}

function Row(props){
  return (
    <div className="row">
      { props.row.map((cell, id) =>  <Cell key={`${props.rid} ${id}`} col={cell} />) }
    </div>
  )
}

function Grid(props) {
  return (
    <div>
      { props.matrix.map((row, id) => <Row key={id} rid={id} row={row} />) }
    </div>
  )
}

function Board(props) {
  return ( 
    <Grid matrix={props.matrix} /> 
  );
}

export default Board;
