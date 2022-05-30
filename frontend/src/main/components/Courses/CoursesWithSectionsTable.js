import React from "react";
import OurTable from "main/components/OurTable";
import { _yyyyqToQyy, location, days, start, end, instructor } from "main/utils/quarterUtilities.js";

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
            Header: 'Enroll Code',
            accessor: 'classSections[0].enrollCode',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.classSections[0].timeLocations),
            id: 'location',
        },
        {
            Header: 'Total enrolled',
            accessor: 'classSections[0].enrolledTotal',
        },
        {
            Header: 'Max Students',
            accessor: 'classSections[0].maxEnroll',
        },
        {
            Header: 'Days',
            accessor: (row) => days(row.classSections[0].timeLocations),
            id: 'days',
        },
        {
            Header: 'Start Time',
            accessor: (row) => start(row.classSections[0].timeLocations),
            id: 'start',
        },
        {
            Header: 'End Time',
            accessor: (row) => end(row.classSections[0].timeLocations),
            id: 'end',
        },
        {
            Header: 'Instructor',
            accessor: (row) => instructor(row.classSections[0].instructors),
            id: 'instructor',
        }
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};