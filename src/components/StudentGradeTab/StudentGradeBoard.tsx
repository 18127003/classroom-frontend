import useGradeManage from '@/hooks/useGradeManage';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';

type StudentGradeBoardProps = {
    student: string
}

const StudentGradeBoard: React.FC<StudentGradeBoardProps> = ({student})=>{
    const {grades, totalGrade, totalMaxGrade} = useGradeManage()

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight:500 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width:200 }}>{'Student'}</TableCell>
                        <TableCell style={{ width:200 }} align='center'>{'Total grade'}</TableCell>
                        {grades.map((grade) => (
                            <TableCell
                                key={grade.assignmentId}
                                align='center'
                                style={{ width:100 }}
                            >
                            {grade.assignmentName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow hover role="data" tabIndex={-1} key={0}>
                        <TableCell style={{ width:200 }}>{student}</TableCell>
                        <TableCell style={{ width:200 }} align='center'>{`${totalGrade}/${totalMaxGrade}`}</TableCell>
                        {grades.map((grade) => (
                            <TableCell
                                key={grade.id}
                                align='center'
                                style={{ width:100 }}
                            >
                            {grade.grade}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default StudentGradeBoard;