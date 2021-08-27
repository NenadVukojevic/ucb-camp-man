import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import BinRangeService from '../../services/BinRangeService'
import { useParams } from 'react-router-dom';
import CustomMultiSelectPair from '../CustomControls/CustomMultiSelectPair';

function EditBinRangeGroup() {
    const [newGroup, setNewGroup] = useState(true);

    let { id } = useParams();

    const [group, setGroup] = useState({
        "binRangeGroupId": 0,
        "binRangeName": "",
        "members": []
    });

    const [binRanges, setBinRanges] = useState([]);

    useEffect(() => {
        if (id !== undefined) {
            console.log("EditGroupOfBinRanges", id)
            BinRangeService.getBinRangeGroup(id).then((res) => {
                setGroup(res.data);
                setNewGroup(false);
                console.log(res.data);
            }).catch((res)=>{
                console.log(res);
            });
        }

    }, [id]);

    useEffect(() => {
        BinRangeService.getBinRanges().then((res) => {
            setBinRanges(res.data);
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
            "binRangeGroupId": group.binRangeGroupId,
            "binRangeName": group.binRangeName,
            "members": group.members
        };
        console.log("save response", toSave);

        if (newGroup) {
            BinRangeService.addGroup(toSave).then((res) => {
                console.log(res);
            })
        }
        else {
            BinRangeService.updateGroup(toSave).then((res) => {
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
                title={newGroup ? "Add New Bin Range Group" : "Edit Bin Range Group"}
            />
        </div>
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Group Name:</label>
            <div className="col-sm-10">
                <div><input type="text"
                    id="binRangeName"
                    className="form-control"
                    value={group.binRangeName}
                    onChange={handleChange} /></div>
            </div>
        </div>
        <div className="mb-3 row">
            <CustomMultiSelectPair
                data={binRanges}
                usedList={group.members}
                setUsed={setUsed}
                id="binRangeId"
                label="binRangeName"
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

export default EditBinRangeGroup
