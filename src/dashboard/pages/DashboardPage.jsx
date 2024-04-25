import { useEffect } from 'react';

import { useCardStore } from '../../hooks';
import { Navbar } from '../../calendar/components/Navbar';
import { CardsAccordion } from '../';

export const DashboardPage = () => {
    const { cards, startLoadingProducts } = useCardStore();

    useEffect(() => {
        startLoadingProducts()
    }, [])

    return (
        <>
            <Navbar />
            <CardsAccordion cards={cards}/>
        </>
    );
}