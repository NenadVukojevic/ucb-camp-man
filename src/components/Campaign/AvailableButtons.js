import React from 'react';
import AtmButton from './AtmButton';

function AvailableButtons(props) {
    const { responses, used, drag } = props;
    return (
        <div>
            <div>
                Available responses
            </div>
            <div className="atm_button_group">

                {responses.map((response, index) => (
                    !used.has(response.responseId) && (
                        <AtmButton
                        response={response}
                        drag={drag}
                        key={index}
                        />

                       /*   <div key={index} id={response.responseId} className="atm_button" draggable="true" onDragStart={drag}>
                             {response.responseName}
                        </div>                      
                        
                        <div className="atm_button_id">{response.responseId}</div>
                        <div className="atm_button_text">{response.responseName}</div>
                        */
                    )
                )
                )}
            </div>
        </div>
    );
}

export default AvailableButtons;