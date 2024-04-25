import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { onAddNewCard, onLoadTransaction, onLoadbanks, onUpdateCard, onDeleteCard, onSetActiveCard } from '../store';

export const useCardStore = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { cards, activeEvent, banks } = useSelector(state => state.card);

    const startLoadingProducts = async () => {
        try {
            const { data } = await calendarApi.get(`/cards/getCards/${user.uid}`);
            const cards = data.result;
            dispatch(onLoadTransaction(cards));
        } catch (error) {
            console.log(error)
            Swal.fire('Error cargando transacciones', error.response.data.msg, 'error');
        }
    }

    const startTransactionDeposit = async ({ postData }) => {
        try {
            // Reference,TaxRate, CreatedAt, Status, Description, AmountType, Currency, TotalValue, CardId
            const { data } = await calendarApi.post(`/amount/makedeposit`, postData);
            const card = data.result;
            dispatch(onAddNewCard(card));
        } catch (error) {
            console.log(error)
            Swal.fire('Error creando tarjeta', error.response.data.msg, 'error');
        }
    }

    const startTransactionWithdrawal = async ({ postData }) => {
        try {
            // Reference,TaxRate, CreatedAt, Status, Description, AmountType, Currency, TotalValue, CardId
            const { data } = await calendarApi.post(`/amount/withdrawal`, postData);
            const card = data.result;
            dispatch(onAddNewCard(card));
        } catch (error) {
            console.log(error)
            Swal.fire('Error creando tarjeta', error.response.data.msg, 'error');
        }
    }

    const startCreateCard = async ({ cardType, accountType, nameOnCard, provider, userId }) => {
        try {
            const dataPost = { cardType, accountType, nameOnCard, provider, userId };

            const { data } = await calendarApi.post(`/cards/createCard`, dataPost);
            const card = data.result;
            dispatch(onAddNewCard({ card }));
        } catch (error) {
            console.log(error)
            Swal.fire('Error creando tarjeta', error.response.data.msg, 'error');
        }
    }

    const startLoadingbanks = async () => {
        try {

            const { data } = await calendarApi.get(`/banks/getAll`);
            const banks = data.result;
            dispatch(onLoadbanks(banks));
        } catch (error) {
            console.log(error)
            Swal.fire('Error creando tarjeta', error.response.data.msg, 'error');
        }
    }

    const startActivateCard = async ({ id }) => {
        try {

            const { data } = await calendarApi.put(`/cards/ActivateCard/${id}`);
            const card = data.result;
            dispatch(onUpdateCard({ card }));
        } catch (error) {
            console.log(error)
            Swal.fire('Error creando tarjeta', error.response.data.msg, 'error');
        }
    }


    return {
        //* Propiedades
        activeEvent,
        cards,
        banks,

        //* Métodos
        startLoadingProducts,
        startCreateCard,
        startTransactionDeposit,
        startTransactionWithdrawal,
        startLoadingbanks,
        startActivateCard
    }
}