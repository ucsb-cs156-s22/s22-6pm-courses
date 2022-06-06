import React from "react";
import OurTable from "main/components/OurTable";
import { location, enroll, time, instructor, section } from "main/utils/CoursesWithSectionsUtilities";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Course ID',
            accessor: 'courseInfo.courseId',
        },
        {
            Header: 'Section',
            accessor: (row) => section(row.section),
            id: 'section',
        },
        {
            Header: 'Section',
            accessor: (row) => section(row.classSections),
            id: 'section',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.section),
            id: 'location',
        },
        {
            Header: 'Enrollment',
            accessor: (row) => enroll(row.section),
            id: 'enrollment',
        },
        {
            Header: 'Time',
            accessor: (row) => time(row.section),
            id: 'time',
        },
        {
            Header: 'Instructor',
            accessor: (row) => instructor(row.section),
            id: 'instructor',
        }
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
}; 

