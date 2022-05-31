import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

import PersonalScheduleInfoPage from "main/pages/PersonalSchedules/PersonalScheduleInfoPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { personalScheduleFixtures } from "fixtures/personalScheduleFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
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
    
    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules/1").reply(200, personalScheduleFixtures.onePersonalSchedules);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"1"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules/1").reply(200, null);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <PersonalScheduleInfoPage scheduleID={"1"}/>
                </MemoryRouter>
            </QueryClientProvider>
        );


    });

    test("returns 404 when regular user tries to get info page of invalid id", () => {
        jest.spyOn(console, 'error')
        console.error.mockImplementation(() => null);

        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/personalschedules/5").reply(404, personalScheduleFixtures.onePersonalSchedules);

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
        axiosMock.onGet("/api/personalschedules/5").reply(404, personalScheduleFixtures.onePersonalSchedules);

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