import React from 'react';


function ControlInputList(props) {
  function handleRowNumberChange(event) {
    props.actions.updateRowCount(event.target.value);
  }

  function handleColNumberChange(event) {
    props.actions.updateColCount(event.target.value);
  }

  function handleDelayChange(event) {
    props.actions.changeDelay(event.target.value);
  }

  return (
    <div id="control-input-list">
      <div>
        <label htmlFor="dimension-row">ROW</label>
        <input 
          id="dimension-row" 
          type="number" 
          value={ props.options.ROW_NUMBER } 
          onChange={handleRowNumberChange}
        ></input>
      </div>
      <div>
        <label htmlFor="dimension-col">COL</label>
        <input 
          id="dimension-col" 
          type="number" 
          value={ props.options.COL_NUMBER } 
          onChange={handleColNumberChange}
        ></input>
      </div>
      <div>
        <label htmlFor="dimension-col">DELAY</label>
        <input 
          id="dimension-col" 
          type="number" 
          value={ props.options.DELAY }
          onChange={handleDelayChange}
        ></input>
      </div>
    </div>
  )
}

function ControlButtonList(props) {
  return (
    <div id="control-button-list">
    <button onClick={() => props.actions.setPaused(false)}>Start</button>
    <button onClick={() => props.actions.setPaused()}>Pause</button>
    <button onClick={() => props.actions.randomizeMatrix()}>Random</button>
    <button onClick={() => props.actions.nextIteration()}>Next</button>
    </div>
  )
}

function Controls(props) {
  return (
    <div id="control-panel">
      Controls

      <ControlInputList actions={props.actions} options={props.options}/>  
      <ControlButtonList actions={props.actions}/>  
    </div> 
  )
}

export default Controls;
