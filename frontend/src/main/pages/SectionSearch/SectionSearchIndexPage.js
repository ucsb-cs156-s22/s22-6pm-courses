
import { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import BasicCourseSearchForm from "main/components/BasicCourseSearch/BasicCourseSearchForm";
// import BasicCourseTable from "main/components/Courses/BasicCourseTable";
import CoursesWithSectionsTable from "main/components/Courses/CoursesWithSectionsTable";
import { useBackendMutation } from "main/utils/useBackend";

export default function SectionSearchIndexPage() {
  // Stryker disable next-line all : Can't test state because hook is internal
  const [courseJSON, setCourseJSON] = useState([]);

  const objectToAxiosParams = (query) => ({
    url: "/api/public/basicsearch",
    params: {
      qtr: query.quarter,
      dept: query.subject,
      level: query.level,
    },
  });

  const onSuccess = (courses) => {
    setCourseJSON(courses.classes);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    []
  );

  async function fetchBasicCourseJSON(_event, query) {
    mutation.mutate(query);
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Courses Search App!</h5>
        <BasicCourseSearchForm fetchJSON={fetchBasicCourseJSON} />
        <CoursesWithSectionsTable courses={courseJSON} />
      </div>
    </BasicLayout>
  );
}
=======
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function SectionSearchIndexPage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSB Course Section Search Placeholder</h1>
        <p>
          This is where the index page will go
        </p>
      </div>
    </BasicLayout>
  )
} 

