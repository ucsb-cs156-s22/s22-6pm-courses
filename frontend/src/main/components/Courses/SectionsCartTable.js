import React, {_Component} from "react";
import { useBackendMutation } from "main/utils/useBackend";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { cellToAxiosParamsDelete, onSomeSuccess } from "main/utils/CoursesWithSectionsMoreUtils";
import { hasRole } from "main/utils/currentUser";

export default function SectionsCartTable({ aSection, currentUser }) {

    // Stryker disable all : hard to test for query caching
    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onSomeSuccess },
        ["/api/sectionscart/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'Course ID',
            accessor: 'courseId',
        },
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Enroll Code',
            accessor: 'section',
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Enrollment',
            accessor: 'enrollment',
        },
        {
            Header: 'Time and Date',
            accessor: 'time',
        },
        {
            Header: 'Instructor',
            accessor: 'instructor',
        }

    ];

    const testid = "SectionsCartTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Delete", "danger", deleteCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={aSection}
        columns={columnsToDisplay}
        testid={testid}
    />;
}; 