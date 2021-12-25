import React from 'react';
import StudentRow from './StudentRow';
import { GradeTableProps } from '@/@types/props';
import usePointsSum from '@/hooks/usePointsSum';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import AssignmentHeaderCell from './AssignmentHeaderCell';


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
                    <AssignmentHeaderCell assignment={assignment} key={assignment.id}/>
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
