import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import StudentRow from './StudentRow';
import { GradeTableProps } from '@/@types/props';
import usePointsSum from '@/hooks/usePointsSum';

const GradeTable: React.FC<GradeTableProps> = ({studentInfos, assignments}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const totalMaxGrade = usePointsSum()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight:500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell style={{ width:200 }}>{'Student'}</TableCell>
                <TableCell style={{ width:200 }} align='center'>{'Total grade'}</TableCell>
                {assignments.map((assignment) => (
                    <TableCell
                        key={assignment.id}
                        align='center'
                        style={{ width:100 }}
                    >
                    {assignment.name}
                    </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentInfos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((info) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={info.studentId}>
                  <StudentRow
                    studentInfo={info} 
                    assignments={assignments}
                    totalMaxGrade={totalMaxGrade}
                  />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={studentInfos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default GradeTable;
