import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import useAssignments from '@/hooks/useAssignments';
import useStudentInfos from '@/hooks/useStudentInfos';
import StudentRow from './StudentRow';




const GradeTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {assignments} = useAssignments()
  const {studentInfos} = useStudentInfos()

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
                <TableCell style={{ width:200 }}>{'Total grade'}</TableCell>
                {assignments.map((assignment) => (
                    <TableCell
                        key={assignment.id}
                        align='left'
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
              .map((info) => <StudentRow studentInfo={info} assignments={assignments}/>)}
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
