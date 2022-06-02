import { render, screen } from "@testing-library/react";
import { newsectionFixtures } from "fixtures/newsectionFixtures";
import CoursesWithSectionsTable from "main/components/Courses/CoursesWithSectionsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("CourseTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={[]} />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("Has the expected column headers and content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={newsectionFixtures.oneSection} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const expectedHeaders = ["Course ID", "Title", "Enroll Code", "Location", "Enrollment", "Time and Date", "Instructor"];
    const expectedFields = ["courseId", "title", "section", "location", "enrollment", "time", "instructor"];
    const testId = "CoursesWithSectionsTable";

    expectedHeaders.forEach((headerText) => {
        const header = screen.getByText(headerText);
        expect(header).toBeInTheDocument();
      });

      expectedFields.forEach((field) => {
        const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
        expect(header).toBeInTheDocument();
      });
    expect(screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`)).toHaveTextContent("CMPSC 5A");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-section`)).toHaveTextContent("LECTURE");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-location`)).toHaveTextContent("ELLSN 2617");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-enrollment`)).toHaveTextContent("85/90");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-time`)).toHaveTextContent("17:00--18:15 T R");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-instructor`)).toHaveTextContent("SOLIS S W, NOBODY, ANYBODY");
  });

});
