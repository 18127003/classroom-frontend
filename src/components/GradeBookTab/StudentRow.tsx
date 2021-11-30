import { Assignment, StudentInfo } from "@/@types/model";
import useSubmissionData from "@/hooks/useSubmissionData";
import { TableCell, TableRow, Typography } from "@mui/material";
import { info } from "console";
import React from "react";

interface StudentRowProps {
  studentInfo: StudentInfo;
  assignments: Assignment[];
}

const StudentRow: React.FC<StudentRowProps> = ({
  studentInfo,
  assignments,
}) => {
  const { submissions, totalGrade } = useSubmissionData(
    studentInfo,
    assignments
  );

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={studentInfo.studentId}>
      <TableCell>
        {`${studentInfo.studentId} - ${studentInfo.name}`}
        <br />
        <Typography variant="body2" color="gray">
          {studentInfo.accountMail && `(${studentInfo.accountMail})`}
        </Typography>
      </TableCell>
      {submissions
        .map((submission, index) => {
          return (
            <TableCell key={index} align="left">
              {`${submission.grade}/${submission.maxGrade}`}
            </TableCell>
          );
        })}
    </TableRow>
  );
};

export default StudentRow;
