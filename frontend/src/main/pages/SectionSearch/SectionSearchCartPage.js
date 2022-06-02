import React from "react";
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SectionsCartTable from 'main/components/Courses/SectionsCartTable';

export default function SectionSearchCartPage() {
  const { data: aSection, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/sectionscart/all"],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: "/api/sectionscart/all" },
      []
    );
  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Course Sections Cart!</h5>
        <SectionsCartTable aSection={aSection} />
      </div>
    </BasicLayout>
  );
}
