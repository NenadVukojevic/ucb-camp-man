import React, { useState, useEffect } from 'react';
import TableHeader from '../TableHead/TableHeader';
import { Table, TableBody, TableRow, TableCell, TablePagination, TableContainer, Paper } from '@material-ui/core'


const rowInformation = [{
    "name": "Lodovico Rubrow",
    "age": 24
}, {
    "name": "Jose Anstiss",
    "age": 61
}, {
    "name": "Dennet Bartalin",
    "age": 20
}, {
    "name": "Peirce Kingswoode",
    "age": 54
}, {
    "name": "Bing Berdale",
    "age": 38
}, {
    "name": "Henrietta Shropsheir",
    "age": 69
}, {
    "name": "Maggi Duchesne",
    "age": 94
}, {
    "name": "Clayson Croxon",
    "age": 92
}, {
    "name": "Gayler Tawn",
    "age": 97
}, {
    "name": "Jorrie Pretious",
    "age": 35
}, {
    "name": "Leelah Howis",
    "age": 86
}, {
    "name": "Burr Bantham",
    "age": 66
}, {
    "name": "Robinia Earley",
    "age": 89
}, {
    "name": "Renato Stather",
    "age": 48
}, {
    "name": "Arvin Rehor",
    "age": 51
}, {
    "name": "Jemie Corhard",
    "age": 43
}, {
    "name": "Garrott Bertram",
    "age": 19
}, {
    "name": "Fleurette Biskup",
    "age": 39
}, {
    "name": "Nicky Dewberry",
    "age": 100
}, {
    "name": "Fee Spittle",
    "age": 95
}, {
    "name": "Roddie Crellim",
    "age": 42
}, {
    "name": "Claiborn Hunnam",
    "age": 46
}, {
    "name": "Juieta Crowcum",
    "age": 60
}, {
    "name": "Rebecca Hexum",
    "age": 74
}, {
    "name": "Penelope Bradnam",
    "age": 80
}, {
    "name": "Sibelle Gyorgy",
    "age": 98
}, {
    "name": "Windham Waddams",
    "age": 98
}, {
    "name": "Jesus Farman",
    "age": 42
}, {
    "name": "Ximenes Larratt",
    "age": 76
}, {
    "name": "Guy Cavet",
    "age": 41
}, {
    "name": "Alia Harrigan",
    "age": 86
}, {
    "name": "Valina Rubenov",
    "age": 28
}, {
    "name": "Reilly Meegin",
    "age": 79
}, {
    "name": "Ainslee M'Quharg",
    "age": 48
}, {
    "name": "Lem Philipot",
    "age": 26
}, {
    "name": "Dalli Dyhouse",
    "age": 25
}, {
    "name": "Alex Burchmore",
    "age": 74
}, {
    "name": "Doloritas Espine",
    "age": 65
}, {
    "name": "Denise Muskett",
    "age": 51
}, {
    "name": "Dix Mintrim",
    "age": 38
}, {
    "name": "Quill Friett",
    "age": 89
}, {
    "name": "Kelly Errichelli",
    "age": 97
}, {
    "name": "Marena Lowy",
    "age": 93
}, {
    "name": "Lynnette Crichmere",
    "age": 69
}, {
    "name": "Brittne Frotton",
    "age": 92
}, {
    "name": "Shurwood Redsall",
    "age": 38
}, {
    "name": "Richmound Carwithim",
    "age": 48
}, {
    "name": "Deanna Isack",
    "age": 65
}, {
    "name": "Raviv Broadbury",
    "age": 68
}, {
    "name": "Cinnamon Oakeshott",
    "age": 19
}]

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
    { "name": "name", "label": "Name" },
    { "name": "age", "label": "Age" },
]

export default function TableContent(props) {

    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('name')

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
                                    <TableRow key={index} style={index%2 ? { background : "#f5f5f5" }:{ background : "white" }}>
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
    );
}

