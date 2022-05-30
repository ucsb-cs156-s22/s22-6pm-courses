import React from "react";
import OurTable from "main/components/OurTable";
import { yyyyqToQyy, location, enroll, time, instructor } from "main/utils/quarterUtilities.js";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Quarter',
            accessor: (row, _rowIndex) => yyyyqToQyy(row.quarter),
            id: 'quarter',
        },
        {
            Header: 'Course ID',
            accessor: 'courseId',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.classSections),
            id: 'location',
        },
        {
            Header: 'Enrollment',
            accessor: (row) => enroll(row.classSections),
            id: 'enrollment',
        },
        {
            Header: 'Time',
            accessor: (row) => time(row.classSections),
            id: 'time',
        },
        {
            Header: 'Instructor',
            accessor: (row) => instructor(row.classSections),
            id: 'instructor',
        }
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};