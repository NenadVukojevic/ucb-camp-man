import React from 'react'

function AtmButton(props) {
    const { response, index, drag } = props;
    return (
        <div className="atm_button container" id={response.responseId}  draggable="true" onDragStart={drag}>
            <div style={{padding:2}} className="row">{response.responseName}</div>
            <div style={{fontSize:12, fontWeight:'bold', color: 'white', padding: 2}} className="row justify-content-end">{response.responseId}</div>
            
        </div>
    )
}

export default AtmButton
