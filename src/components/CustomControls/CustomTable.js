import React, { useState } from 'react'
import { Table, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, TableContainer, Paper} from '@material-ui/core'
import { TableHeader } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core/styles'
import "./CustomControls.css"
import Active from '../../images/0.png'
import Inactive from '../../images/2.png'
import AntSwitch from './AntSwitch';

const useStyles = makeStyles(() => ({
    table: {
        backgroundColor: "gray",
        color: "white",
        textAlign: 'left',
        paddingLeft: 5,
        fontWeight: 500,
    }
}))

const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}

function CustomTable(props) {

    const classes = useStyles();

    const { headers, data, edit, onDelete, switchFunction } = props;

    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }

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


    const head = headers.map((col, index) => <TableCell key={index}>
        <TableSortLabel
            active={valueToOrderBy === col.id}
            direction={valueToOrderBy === col.id ? orderDirection : 'asc'}
            onClick={createSortHandler(col.id)}
        >
            {col.label}
        </TableSortLabel>
    </TableCell>)

    const mapCell = (row, col) => {
        switch (col.type) {
            case "text": return row[col.id];
            case "bool": return row[col.id] === true ? "Y" : "N";
            case "edit": return <button type="button" className="btn btn-secondary btn-sm" onClick={() => edit(row[col.id])}>edit</button>;
            case "edit_delete": return <>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => edit(row[col.id])}>edit</button>
                &nbsp;
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => onDelete(row[col.id])}>delete</button>
            </>;
            case "light": return <img src={row[col.id] === 1 ? Active : Inactive} alt="status"></img>;
            case "switch": return <AntSwitch checked={row[col.id]}
                onChange={() => switchFunction(row[col.param])}
            ></AntSwitch>;

            default: return null
        }
    }

    const mapRow = (row) => {
        const result = headers.map((col, index) => <TableCell key={index}>{
            mapCell(row, col)
        }</TableCell>)
        return result;
    }

    const rows = sortedRowInformation(data, getComparator(orderDirection, valueToOrderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => <TableRow key={index} className={index % 2 === 0 ? "even" : "odd"}>{mapRow(row)}</TableRow>)

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHeader>
                        <TableRow>
                            {head}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10]}//{[5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </TableContainer>
        </React.Fragment>
    )
}

export default CustomTable