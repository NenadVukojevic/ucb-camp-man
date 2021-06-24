import React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

export default function TableHeader(props) {

    const { valueToOrderBy, orderDirection, handleRequestSort, columns } = props

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((column) => (
                        <TableCell key={column.name}>
                            <TableSortLabel
                                active={valueToOrderBy ===  column.name }
                                direction={valueToOrderBy ===  column.name  ? orderDirection : 'asc'}
                                onClick={createSortHandler( column.name)}
                            >
                                {column.label}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
                
            </TableRow>
        </TableHead>
    );
}
