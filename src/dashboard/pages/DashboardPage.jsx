import { useEffect } from 'react';

import { useCardStore } from '../../hooks';
import { Navbar } from '../../calendar/components/Navbar';
import { CardsAccordion } from '../';

export const DashboardPage = () => {
    const { cards, startLoadingProducts, startLoadingbanks } = useCardStore();

    useEffect(() => {
        startLoadingProducts()
        startLoadingbanks()
    }, [])

    return (
        <>
            <Navbar />
            <CardsAccordion cards={cards} />
        </>
    );
}