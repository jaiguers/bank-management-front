import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { Navbar } from '../../calendar/components/Navbar';
import { useCardStore, useAuthStore, useForm } from '../../hooks';


const cardFormFields = {
    cardType: '',
    accountType: '',
    nameOnCard: '',
    provider: '',
}

export const CardsPage = () => {

    const { user } = useAuthStore();
    const { statusCode, startCreateCard } = useCardStore();
    const { nameOnCard, onInputChange: onRegisterInputChange } = useForm(cardFormFields);
    const [provider, setCardProvider] = useState("");
    const [accountType, setCardAccount] = useState("");
    const [cardType, setCardType] = useState("");

    const selectProviderChange = (event) => {
        setCardProvider(event.target.value);
    }
    const selectCardTypeChange = (event) => {
        setCardType(event.target.value);
    }
    const selectCardAccChange = (event) => {
        setCardAccount(event.target.value);
    }

    const createSubmit = (event) => {
        event.preventDefault();

        if (provider === "") {
            Swal.fire('Error en registro', 'Selecciona un proveedor', 'error');
            return;
        }
        if (accountType === "") {
            Swal.fire('Error en registro', 'Selecciona un tipo de cuenta', 'error');
            return;
        }
        if (cardType === "") {
            Swal.fire('Error en registro', 'Selecciona un tipo de tarjeta', 'error');
            return;
        }


        startCreateCard({ cardType, accountType, nameOnCard, provider, userId: user.uid });
    }

    useEffect(() => {
        if (statusCode) {
            if (statusCode.status == 200) {
                Swal.fire('Crear tarjeta', statusCode.msg, 'success');
            }
            else
                Swal.fire('Error', statusCode.msg, 'error');
        }

    }, [statusCode])

    return (
        <>
            <Navbar />
            <Container fluid="md">
                <Row>
                    <Col>
                        <Form onSubmit={createSubmit}>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="nameOnCard">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre que aparecerá en la tarjeta"
                                        name="nameOnCard"
                                        value={nameOnCard}
                                        onChange={onRegisterInputChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} name={provider} onChange={selectProviderChange} controlId="provider">
                                    <Form.Label>Proveedor</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        <option value="Visa">Visa</option>
                                        <option value="MasterCard">MasterCard</option>
                                        <option value="Diners">Diners</option>
                                        <option value="AmericanExpress">AmericanExpress</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} name={accountType} onChange={selectCardAccChange} controlId="accountType">
                                    <Form.Label>Tipo de cuenta</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        <option value="Saving">Saving</option>
                                        <option value="Credit">Credit</option>
                                        <option value="Debit">Debit</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} name={cardType} onChange={selectCardTypeChange} controlId="cardType">
                                    <Form.Label>Tipo de tarjeta</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        <option value="Virtual">Virtual</option>
                                        <option value="Physical">Fisica</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Crear
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}