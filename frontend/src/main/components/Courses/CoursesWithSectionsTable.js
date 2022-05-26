import React from "react";
import OurTable from "main/components/OurTable";

//import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Course ID',
            accessor: 'courseId',

        },
        
        {
            Header: 'Sections Eneroll Code',
            accessor: (row, _rowIndex) => row.classSections[1].enrollCode,
            id: 'classSections.enrollCode',
        },
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};