import React, {_Component} from "react";
import OurTable from "main/components/OurTable";
import { courseID, title, location, enroll, time, instructor, section } from "main/utils/CoursesWithSectionsUtilities";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Course ID',
            accessor: (row) => courseID(row),
            id: 'courseId',
        },
        {
            Header: 'Title',
            accessor: (row) => title(row),
            id: 'title',
        },
        {
            Header: 'Enroll Code',
            accessor: (row) => section(row.section),
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
            Header: 'Time and Date',
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
