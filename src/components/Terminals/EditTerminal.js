import React, { useState, useEffect } from 'react'
import { Paper, Box } from '@material-ui/core';
import ControlTitle from '../Header/ControlTitle';
import TerminalsService from '../../services/TerminalsService';
import { useParams } from 'react-router-dom';


function EditTerminal() {
    let { id } = useParams();
    const [newTerminal, setNewTerminal] = useState(true);
    const [terminal, setTerminal] = useState({
        "terminalId": 0,
        "tid": '',
        "cityId": 2,
        "description": '',
        "location": '',
    });

    const [cities, setCities] = useState([{
        "cityId": 0,
        "cityCode": "",
        "cityName": ""
    }]);

    const getTerminal = (id) => {
        TerminalsService.getTerminal(id).then((res) => {
            setTerminal(res.data);
            setNewTerminal(false);
        });
    }

    const saveTerminal = () => {
        let terminalForSave = {
            "terminalId": terminal.terminalId,
            "tid": terminal.tid,
            "cityId": terminal.cityId,
            "description": terminal.description,
            "location": terminal.location,
        }
        console.log(terminalForSave);
        TerminalsService.addTerminal(terminalForSave).then((res)=>{
            setTerminal(res.data);
        });
    }


    useEffect(() => {
        if(id !== undefined){
            getTerminal(id);
        }
    }, [id]);


    useEffect(() => {
        TerminalsService.getCities().then((res) => {
            setCities(res.data);
        });
    }, []);
    function handleChange(ev) {
        setTerminal({ ...terminal, [ev.target.id]: ev.target.value });
    }

    return (
        <div>
            <Paper      >
                <Box m={3} p={3}>
                    <div>
                        <ControlTitle
                            title={newTerminal ? "Add New Terminal" : "Edit Terminal"}
                        />
                    </div>
                    <div className="mb-3 row">
                        <label className="col-md-3 col-form-label">TID:</label>
                        <div className="col-md-4">
                            <input
                                id="tid"
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                                value={terminal.tid}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-md-3 col-form-label">Location:</label>
                        <div className="col-md-4">
                            <input
                                id="location"
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                                value={terminal.location}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-md-3 col-form-label">Description:</label>
                        <div className="col-md-9">
                            <input
                                id="description"
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                                value={terminal.description} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-md-3 col-form-label">Contact Collecting:</label>
                        <div className="col-md-4">

                            <div><select
                                id="cityId"
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Izaberite opciju"
                                value={terminal.cityId}
                            >
                                {
                                    // display options sorted by CityName
                                    cities.sort((a, b) => a.cityName > b.cityName ? 1 : -1)
                                        .map((city, index) => {
                                            return <option key={index} value={city.cityId}>{city.cityName}</option>
                                        })
                                }
                            </select>

                            </div>
                        </div>
                    </div>
                    <div className="mb-3  float-right row">
                        <div>
                            <button type="button" className="btn btn-secondary mr-2 mt-2" onClick={saveTerminal}>Save</button>
                        </div>
                    </div>
                </Box>
            </Paper>
        </div>
    )
}

export default EditTerminal
