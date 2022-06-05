import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import PersonalSchedulesTable from 'main/components/PersonalSchedules/PersonalSchedulesTable';
import { useCurrentUser } from 'main/utils/currentUser'
import { useParams } from 'react-router-dom'

export default function PersonalScheduleInfoPage() {
    const {scheduleID} = useParams();
    const currentUser = useCurrentUser();
    
    const { data: personalSchedule, error: _error, status: _status } =
        useBackend(
            // Stryker disable all : don't make sense to mutation test here
            ["/api/personalschedules", `${scheduleID}` ],
            { method: "GET", url: `/api/personalschedules?id=${scheduleID}` },
            []
            // Stryker enable all
        );

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>PersonalScheduleInfo</h1>
                { // Stryker disable next-line all: we only want to check against empty array
                (personalSchedule !== []) && <PersonalSchedulesTable personalSchedules={[personalSchedule]} currentUser={currentUser} />}
            </div>
        </BasicLayout>
    )
}