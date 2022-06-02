import { render, screen } from "@testing-library/react";
import { sectionsFixtures } from "fixtures/sectionsFixtures";
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
          <CoursesWithSectionsTable courses={sectionsFixtures.sections} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const expectedHeaders = ["Course ID", "Location", "Enrollment", "Time", "Instructor", "Section"];
    const expectedFields = ["courseId", "location", "enrollment", "time", "instructor", "section"];
    const testId = "CoursesWithSectionsTable";

    expectedHeaders.forEach((headerText) => {
        const header = screen.getByText(headerText);
        expect(header).toBeInTheDocument();
      });
  
      expectedFields.forEach((field) => {
        const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
        expect(header).toBeInTheDocument();
      });
    expect(screen.getByTestId(`${testId}-cell-row-0-col-courseId`)).toHaveTextContent("CMPSC 5A");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-location`)).toHaveTextContent("ELLSN 2617PHELP 1530PHELP 1530PHELP 1530");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-enrollment`)).toHaveTextContent("85/9027/3029/3029/30");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-time`)).toHaveTextContent("17:00--18:15 T R 10:00--10:50 W 11:00--11:50 W 14:00--14:50 W");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-instructor`)).toHaveTextContent("SOLIS S WBATTULA NYANG XTANNA A A, NOBODY");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-section`)).toHaveTextContent("LECTURE");
  });

});

