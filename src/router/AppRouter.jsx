import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { HistoricalPage } from '../historical';
import { TransactionsPage } from '../transactions';
import { CardsPage } from '../account';
import { DashboardPage } from '../dashboard';
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])



    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }


    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/historical" element={<HistoricalPage />} />
                            <Route path="/transaction" element={<TransactionsPage />} />
                            <Route path="/cards" element={<CardsPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
}
