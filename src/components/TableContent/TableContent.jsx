import React, { useState, useEffect } from 'react';
import TableHeader from '../TableHead/TableHeader';
import { Table, TableBody, TableRow, TableCell, TablePagination, TableContainer } from '@material-ui/core'

const rowInformation = [
    { "name": "Bob Johnson", "age": 69 },
    { "name": "Donald Duck", "age": 55 },
    { "name": "Mickey Mouse", "age": 99 },
    { "name": "Jenny Johnson", "age": 25 }

]

const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}

const columns =[
    {"name": "name", "label":"Name"},
    {"name": "age", "label":"Age"},
]

export default function TableContent(props) {

    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(1)

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

    return (
        <>
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
                                    <TableRow key={index}>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.age}
                                        </TableCell>
                                    </TableRow>

                                )
                                )
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[1, 2]}
                    components="div"
                    count={rowInformation.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                >

                </TablePagination>
            </TableContainer>
        </>
    );
}

