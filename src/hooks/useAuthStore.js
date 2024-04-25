import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar, onLogoutCards, onRegister } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage, statusCode } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ userName, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/login', { userName, password });
            if (data.status != 200) {
                dispatch(onLogout(data.msg));
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 10);
            } else {
                localStorage.setItem('token', data.result.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(onLogin({ name: data.result.fullName, uid: data.result.id }));
            }

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ email, password, fullName, documentType, docNumber, phone }) => {
        dispatch(onChecking());
        try {
            const postData = {
                userName: email,
                password,
                person: {
                    fullName,
                    documentType,
                    docNumber,
                    phone,
                    addressList: []
                }
            };
            const { data } = await calendarApi.post('/auth/register', postData);
            // localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onRegister({ code: data.status, msg: data.msg }));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogoutCards())
        dispatch(onLogout());
    }



    return {
        //* Propiedades
        errorMessage,
        statusCode,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

}