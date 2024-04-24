import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    docTypeSelected: '',
    registerPhone: '',
    registerDocNumber: '',
}



export const LoginPage = () => {

    const { startLogin, errorMessage, statusCode, startRegister } = useAuthStore();
    const [docTypeSelected, setDocType] = useState("");
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { registerEmail, registerName, registerPassword, registerDocNumber, registerPhone, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ userName: loginEmail, password: loginPassword });
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        if (docTypeSelected === "") {
            Swal.fire('Error en registro', 'Selecciona un tipo de documento', 'error');
            return;
        }

        startRegister({
            fullName: registerName,
            email: registerEmail,
            password: registerPassword,
            documentType: docTypeSelected,
            docNumber: registerDocNumber,
            phone: registerPhone
        });
    }

    const selectChange = (event) => {
        setDocType(event.target.value);
    }


    useEffect(() => {
        if (statusCode) {
            if (statusCode.code == 200) {
                Swal.fire('Crear usuario', statusCode.msg, 'success');
            }
            else
                Swal.fire('Error', statusCode.msg, 'error');
        }
        else if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage, statusCode])




    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group row mb-3">
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="registerName"
                                    value={registerName}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="registerEmail"
                                    value={registerEmail}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row g-3">
                            <div className="col-sm-6">
                                <select name={docTypeSelected} onChange={selectChange} className="form-select mb-2" aria-label="Default select example">
                                    <option value="">Tipo de documento</option>
                                    <option value="CC">Cédula de ciudadania</option>
                                    <option value="CE">Cédula de extranjería</option>
                                    <option value="TI">Tarjeta de identidad</option>
                                    <option value="NI">Nit</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Número de documento"
                                    name="registerDocNumber"
                                    value={registerDocNumber}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="registerPassword"
                                    value={registerPassword}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Teléfono"
                                    name="registerPhone"
                                    value={registerPhone}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}