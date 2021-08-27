import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import TerminalsService from '../../services/TerminalsService';
import { useParams } from 'react-router-dom';
import CustomMultiSelectPair from '../CustomControls/CustomMultiSelectPair';

function EditGroupOfTerminal() {
    const [newGroup, setNewGroup] = useState(true);

    let { id } = useParams();

    const [group, setGroup] = useState({
        "terminalGroupId": 0,
        "terminalGroupName": "",
        "members": []
    });

    const [terminals, setTerminals] = useState([]);

    useEffect(() => {
        if (id !== undefined) {
            console.log("EditGroupOfTerminal", id)
            TerminalsService.getTerminalGroup(id).then((res) => {
                setGroup(res.data);
                setNewGroup(false);
            });
        }

    }, [id]);

    useEffect(() => {
        TerminalsService.getTerminals().then((res) => {
            setTerminals(res.data);
        })
    }, []);

    function setUsed(used) {
        setGroup({ ...group, members: used });
    }

    const handleChange = (ev) => {
        setGroup({ ...group, [ev.target.id]: ev.target.value });
    }


    const onSave = (ev) => {
        let toSave = {
            "terminalGroupId": group.terminalGroupId,
            "terminalGroupName": group.terminalGroupName,
            "members": group.members
        };
        console.log("save response", toSave);

        if (newGroup) {
            TerminalsService.addTerminalGroup(toSave).then((res) => {
                console.log(res);
            })
        }
        else {
            TerminalsService.updateTerminalGroup(toSave).then((res) => {
                console.log(res);
            })
        }
    }

    return (
        <div>
            <Paper

            >
                <Box m={5} p={3}>
                    <div>
                        <ControlTitle
                            title={newGroup ? "Add New Terminal Group" : "Edit Terminal Group"}
                        />
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Group Name:</label>
                        <div className="col-sm-10">
                            <div><input type="text"
                                id="terminalGroupName"
                                className="form-control"
                                value={group.terminalGroupName}
                                onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <CustomMultiSelectPair
                            data={terminals}
                            usedList={group.members}
                            setUsed={setUsed}
                            id="terminalId"
                            label="tid"
                        />
                    </div>
                    <div className="mb-3 row">
                        <div className="btn-toolbar float-right">
                            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={onSave}>Save</button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    )
}

export default EditGroupOfTerminal
