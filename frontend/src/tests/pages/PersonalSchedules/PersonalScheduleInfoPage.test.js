import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

import PersonalScheduleInfoPage from "main/pages/PersonalSchedules/PersonalScheduleInfoPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { personalSchedulesFixtures } from "fixtures/personalSchedulesFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom'); // use actual for all non-hook parts
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            scheduleID: 1
        })
    };
});

describe("PersonalScheduleInfoPage tests", () => {


    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "PersonalSchedulesTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };
    
    test("renders without crashing for regular user", async() => {
        
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules?id=1").reply(200, personalSchedulesFixtures.onePersonalSchedule);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"1"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );
        
        await waitFor(() => {
            expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3);
        });
        
        expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1);
        expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("TestName");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-description`)).toHaveTextContent("TestDescription");
    });

    test("renders without crashing for admin user", async() => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules?id=1").reply(200, personalSchedulesFixtures.onePersonalSchedule);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"1"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(3);
        });
        
        expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent(1);
        expect(screen.getByTestId(`${testId}-cell-row-0-col-name`)).toHaveTextContent("TestName");
        expect(screen.getByTestId(`${testId}-cell-row-0-col-description`)).toHaveTextContent("TestDescription");

    });

    test("returns 404 when regular user tries to get info page of invalid id", () => {
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => null);

        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules?id=5").reply(404);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"5"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );

        console.error.mockRestore()

    });

    test("returns 404 when admin tries to get info page of invalid id", () => {
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => null);

        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules?id=5").reply(404);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"5"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );

        console.error.mockRestore()

    });
});