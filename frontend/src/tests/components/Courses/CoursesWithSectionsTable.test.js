import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { newsectionFixtures } from "fixtures/newsectionFixtures";
import CoursesWithSectionsTable from "main/components/Courses/CoursesWithSectionsTable";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

const mockedMutate = jest.fn();

jest.mock('main/utils/useBackend', () => ({
    ...jest.requireActual('main/utils/useBackend'),
    useBackendMutation: () => ({mutate: mockedMutate})
}));

describe("CourseTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table with user not logged in", () => {
    const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("renders without crashing for empty table for admin", () => {
    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={[]} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={newsectionFixtures.oneSection} currentUser={currentUser} />
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
    expect(screen.getByTestId(`${testId}-cell-row-0-col-courseId`)).toHaveTextContent("CMPSC 5A");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-title`)).toHaveTextContent("INTRO DATA SCI 1");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-section`)).toHaveTextContent("59600");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-location`)).toHaveTextContent("ELLSN 2617");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-enrollment`)).toHaveTextContent("85/90");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-time`)).toHaveTextContent("17:00--18:15 T R");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-instructor`)).toHaveTextContent("SOLIS S W");
    
    const addButton = screen.getByTestId(`${testId}-cell-row-0-col-Add to cart-button`);
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveClass("btn-primary");
  });

  test("Has the expected column headers and content for ordinary user", () => {
    const currentUser = currentUserFixtures.userOnly;
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={newsectionFixtures.oneSection} currentUser={currentUser} />
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
    expect(screen.getByTestId(`${testId}-cell-row-0-col-courseId`)).toHaveTextContent("CMPSC 5A");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-title`)).toHaveTextContent("INTRO DATA SCI 1");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-section`)).toHaveTextContent("59600");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-location`)).toHaveTextContent("ELLSN 2617");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-enrollment`)).toHaveTextContent("85/90");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-time`)).toHaveTextContent("17:00--18:15 T R");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-instructor`)).toHaveTextContent("SOLIS S W");

    const addButton = screen.queryByTestId(`${testId}-cell-row-0-col-Add to cart-button`);
    expect(addButton).toBeNull()
  });

  test("Add button calls add callback for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesWithSectionsTable courses={newsectionFixtures.oneSection} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const testId = "CoursesWithSectionsTable";

    expect(await screen.findByTestId(`${testId}-cell-row-0-col-Add to cart-button`)).toHaveTextContent("Add to cart");

    const addButton = screen.getByTestId(`${testId}-cell-row-0-col-Add to cart-button`);
    expect(addButton).toBeInTheDocument();
    
    fireEvent.click(addButton);

    await waitFor(() => expect(mockedMutate).toHaveBeenCalledTimes(1));
  });
});
