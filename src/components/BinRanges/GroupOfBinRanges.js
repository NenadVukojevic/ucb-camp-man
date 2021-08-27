import React, { useState, useEffect } from 'react'
import CustomTable from '../CustomControls/CustomTable';
import BinRangeService from "../../services/BinRangeService";
import ControlTitle from '../Header/ControlTitle';
import { useHistory } from 'react-router-dom';

function GroupOfBinRanges() {
    const history = useHistory();

    const [data, setData] = useState([{
        "binRangeGroupId": 0,
        "terminalGroupName": ""
    }]);

    const headers = [
        {
            "id": "binRangeGroupId",
            "label": "ID",
            "type": "text"
        },
        {
            "id": "binRangeName",
            "label": "Group Name",
            "type": "text"
        },
        {
            "id": "binRangeGroupId",
            "label": "Akcija",
            "type": "edit"
        }
    ];


    const getData = () => {
        BinRangeService.getBinRangeGroups().then((res) => {
            setData(res.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);


    const onEdit = (id) => {
        console.log("onEdit", id);
        history.push("/edit-binRangeGroup/" + id);
    }

    const onAddNew = () => {
        console.log("add New")
        history.push("/edit-binRangeGroup/")
    }

    return (
        <div>
            <div>
                <ControlTitle
                    title="List of Bin Range Groups"
                />
            </div>
            <div className="text-right">
                <button type="button" className="btn btn-secondary btn-sm mb-2" onClick={onAddNew}>Add New</button>
            </div>
            <div className="mb-3 row">
                <CustomTable
                    headers={headers}
                    data={data}
                    edit={onEdit}
                />
            </div>
        </div>
    )
}

export default GroupOfBinRanges
