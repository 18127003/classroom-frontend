import { StudentRowProps } from "@/@types/props";
import useSubmissionData from "@/hooks/useSubmissionData";
import { TableCell, Typography } from "@mui/material";
import React from "react";
import GradeCell from "./GradeCell";

const StudentRow: React.FC<StudentRowProps> = ({ studentInfo, assignments, totalMaxGrade}) => {
  const { submissions, totalGrade } = useSubmissionData(studentInfo, assignments);
  return (
    <>
      <TableCell>
        {`${studentInfo.studentId} - ${studentInfo.name}`}
        <br />
        <Typography variant="body2" color="gray">
          {studentInfo.accountMail && `(${studentInfo.accountMail})`}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        {`${totalGrade}/${totalMaxGrade}`}
      </TableCell>
      {submissions
        .map((submission, index) => (
          <TableCell key={index} align="center">
            <GradeCell submission={submission}/>
          </TableCell>
        ))}
    </>
  );
};

export default StudentRow;
