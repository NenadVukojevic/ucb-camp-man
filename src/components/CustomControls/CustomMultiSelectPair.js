import React, { useState } from 'react'
import './CustomControls.css';
import ControlTitle from '../Header/ControlTitle';

function CustomMultiSelectPair(props) {
    const { data, usedList, setUsed, id, label } = props;

    const [toAdd, setToAdd] = useState([]);
    const [toRemove, setToRemove] = useState([]);

    function resetTemp() {
        // it is  necessary to clear toAdd and toRemove arrays and selected values
        // upon moving some items from left to right pane 
        setToAdd([]);
        setToRemove([]);
        document.getElementById('available').selectedIndex = -1;
        document.getElementById('selected').selectedIndex = -1;
    }

    function onAdd(event) {
        var temp = [...usedList];
        temp.push(...toAdd);
        setUsed(temp);
        resetTemp();
    }

    function onAddAll(event) {
        const temp = data.map((opt) => opt[id]);
        setUsed(temp);
        resetTemp();
    }

    function onRemove(event) {
        const temp = [...usedList].filter((i) => !toRemove.includes(i));
        setUsed(temp);
        resetTemp();
    }

    function onRemoveAll(event) {
        setUsed([]);
        resetTemp();
    }

    const handleChange = (e) => {
        const selected = [...e.target.options].map(
            (opt, index) => opt.selected ? parseInt(opt.value, 10) : false
        ).filter(((i) => i !== false));
        setToAdd(selected);
    };

    const handleDoubleClick = (e) => {
        if (toAdd.length <= 1) {
            setToAdd([e.target.value]);
            onAdd(e);
        }
    }

    const handleDoubleClickRemove = (e) => {
        if (toRemove.length <= 1) {
            setToRemove([e.target.value]);
            onRemove(e);
        }
    }

    const handleChangeRemove = (e) => {
        const selected = [...e.target.options].map(
            (opt, index) => opt.selected ? parseInt(opt.value, 10) : false
        ).filter(((i) => i !== false));
        setToRemove(selected);
    };

    return (
        <>
            <div className="col-md-5">
                <ControlTitle
                    title="Available"
                />
                <select
                    id="available"
                    className="form-control"
                    multiple={true}
                    onChange={handleChange}
                    size={10}
                >
                    {data.filter(rec => !usedList.includes(rec[id])).map((rec, index) => {
                        return <option className="option-tag" key={index} value={rec[id]} onDoubleClick={handleDoubleClick}>{rec[label]}</option>
                    })}
                </select>
            </div>
            <div className="col-md-2">
                <div className="mt-4">
                    <div className="mb-3 row">
                        <button className="form-control" onClick={onAdd}>Add</button>
                    </div>
                    <div className="mb-3 row">
                        <button className="form-control" onClick={onAddAll}>Add All</button>
                    </div>
                    <div className="mb-3 row">
                        <button className="form-control" onClick={onRemove}>Remove</button>
                    </div>
                    <div className="mb-3 row">
                        <button className="form-control" onClick={onRemoveAll}>Remove All</button>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <ControlTitle
                    title="Selected"
                />
                <select id="selected"
                    className="form-control"
                    multiple={true}
                    onChange={handleChangeRemove}
                    size={10}
                >
                    {data.filter(rec => usedList.includes(rec[id])).map((rec, index) => {
                        return <option className="option-tag" key={index} value={rec[id]} onDoubleClick={handleDoubleClickRemove}>{rec[label]}</option>
                    })}
                </select>
            </div>
        </>
    )
}

export default CustomMultiSelectPair
