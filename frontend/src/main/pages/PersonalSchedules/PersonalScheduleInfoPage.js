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
            // Stryker disable next-line all : don't test internal caching of React Query
            ["/api/personalschedules", `${scheduleID}` ],
            { method: "GET", url: `/api/personalschedules?id=${scheduleID}` },
            []
        );

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>PersonalScheduleInfo</h1>
                {(personalSchedule !== []) && <PersonalSchedulesTable personalSchedules={[personalSchedule]} currentUser={currentUser} />}
            </div>
        </BasicLayout>
    )
}