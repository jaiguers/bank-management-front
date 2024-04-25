import { useEffect } from 'react';

import { Navbar } from '../../calendar/components/Navbar';
import { TableHistorical } from '../';
import { useCardStore } from '../../hooks';

export const HistoricalPage = () => {
    const { cards, startLoadingProducts } = useCardStore();

    useEffect(() => {
        startLoadingProducts()
    }, [])

    return (
        <>
            <Navbar />
            <TableHistorical cards={cards} />

        </>
    );
}