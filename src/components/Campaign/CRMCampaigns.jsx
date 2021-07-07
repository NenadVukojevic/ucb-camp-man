import React, { useState, useEffect } from 'react';
import CRMCampaignsService from '../../services/CRMCampaignsService';
import ControlTitle from '../Header/ControlTitle';
import TableHeader from '../TableHead/TableHeader';
import { Table, TableBody, TableRow, TableCell, TablePagination, TableContainer, Paper } from '@material-ui/core'

import Active from '../../images/0.png'
import Inactive from '../../images/2.png'


const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}

const columns = [
    { "name": "campaignId", "label": "ID" },
    { "name": "campaignName", "label": "Naziv" },
    { "name": "campaignDesc", "label": "Opis" },
    { "name": "startDate", "label": "Datum Početka" },
    { "name": "endDate", "label": "Datum Kraja" },
    { "name": "active", "label": "Aktivna" },

    
]

const CRMCampaigns = (props) => {
    
    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')
    
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    
    const [campaigns, setCampaigns] = useState([]);
    const [rowInformation, setRowInformation] = useState([]);

    const [showStatus, setShowStatus ] = useState("Active");

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)

    }

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value), 10)
        setPage(0)
    }


    useEffect(() => {
        CRMCampaignsService.getCampaigns().then((res) => {
            setCampaigns(res.data);
            console.log(res.data);
            setRowInformation(res.data.filter(campaign => campaign.active === true));
        });
     }, []);

    const filterByStatus = (event) =>{
        setShowStatus(event.target.value);
        
        if (event.target.value === 'Active') {
            setRowInformation(campaigns.filter(campaign => campaign.active === true));
        }
        else if (event.target.value === 'Inactive'){
            setRowInformation(campaigns.filter(campaign => campaign.active === false));
        }
        else{
            setRowInformation(campaigns);
        }
        setPage(0);
    }

    function handleClick (id) {
        props.history.push(`/campaigns-edit/${id}`);
    }

    return (
        <div>

            <div>
                <ControlTitle title="On US Campaigns"/>
            </div>
            <div>
                <select onChange={filterByStatus} value={showStatus}>
                    <option value="Active">Aktivne</option>
                    <option value="Inactive">Neaktivne</option>
                    <option value="All">Sve</option>
                </select>
            </div>
            <React.Fragment>
            <TableContainer>
                <Table>
                    <TableHeader
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handleRequestSort={handleRequestSort}
                        columns={columns}
                    />
                    <TableBody>
                        {
                            sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index} 
                                    style={index%2 ? { background : "#f5f5f5" }:{ background : "white" }} 
                                    onClick={()=>handleClick(row.campaignId)} >
                                        <TableCell>
                                            {row.campaignId}
                                        </TableCell>
                                        <TableCell>
                                            {row.campaignName}
                                        </TableCell>
                                        <TableCell>
                                            {row.campaignDesc}
                                        </TableCell>
                                        <TableCell>
                                            {row.startDate}
                                        </TableCell>
                                        <TableCell>
                                            {row.endDate}
                                        </TableCell>
                                        <TableCell>
                                            <img src={row.active===true? Active: Inactive} alt="status"></img>
                                        </TableCell>
                                    </TableRow>

                                )
                                )
                        }
                    </TableBody>

                </Table>

                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rowInformation.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>



        </React.Fragment>

        </div>
    );
}

export default CRMCampaigns;