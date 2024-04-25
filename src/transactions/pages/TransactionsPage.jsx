import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';


import { Navbar } from '../../calendar/components/Navbar';
import { useCardStore, useForm } from '../../hooks';

const amountFormFields = {
    cardId: '',
    totalValue: '',
    amountType: '',
    description: '',
    concept: '',
    bankId: '',
    recipientBankAccount: ''
}


export const TransactionsPage = () => {
    const {
        statusCode,
        startTransactionDeposit,
        startTransactionWithdrawal
    } = useCardStore();

    const { totalValue, recipientBankAccount, description, concept, onInputChange: onRegisterInputChange } = useForm(amountFormFields);
    const { banks, cards } = useSelector(state => state.card);
    const [cardId, setCardId] = useState("");
    const [amountType, setAmountType] = useState("");
    const [bankId, setBankId] = useState("");


    const selectCardChange = (event) => {
        setCardId(event.target.value);
    }
    const selectAmountTypeChange = (event) => {
        setAmountType(event.target.value);
    }
    const selectsetBankIdChange = (event) => {
        setBankId(event.target.value);
    }

    const createSubmit = (event) => {
        event.preventDefault();

        if (cardId === "") {
            Swal.fire('Error en registro', 'Selecciona tarjeta', 'error');
            return;
        }
        if (amountType === "") {
            Swal.fire('Error en registro', 'Selecciona un tipo de transacciòn', 'error');
            return;
        }
        if (bankId === "") {
            Swal.fire('Error en registro', 'Selecciona un banco', 'error');
            return;
        }

        const transaction = {
            cardId,
            bankId,
            recipientBankAccount,
            totalValue,
            currency: 'COP',
            amountType,
            description,
            reference: '',
            concept,
            taxRate: '0.03',
            createdAt: new Date(),
            Status: 'Pending'
        }

        if (amountType === 'Withdrawal') {
            const exists = cards.find((card) => card.id === cardId && card.status === 'Active');
            console.log("exists");
            console.log(exists);
            if (!exists) {
                Swal.fire('Retiros', 'Si la tarjeta esta inactiva, dirigite opcion prodcutos para activarla', 'error');
                return;
            }
            const balance = parseFloat(exists.balance);
            const value = parseFloat(totalValue);
            if (balance < value) {
                Swal.fire('Retiros', 'Fondos insuficientes', 'error');
                return;
            }
            
            //startTransactionWithdrawal(transaction)
            return;
        }
        else if (amountType === 'Deposit')
            startTransactionDeposit(transaction)
    }

    useEffect(() => {
        if (statusCode) {
            if (statusCode.code == 200) {
                Swal.fire('Transaccion', statusCode.msg, 'success');
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
                                <Form.Group as={Col} name={cardId} onChange={selectCardChange} controlId="cardId">
                                    <Form.Label>Tarjeta origen</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        {cards.map((item) => (
                                            <option value={item.id}>{item.cardNumber}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} name={bankId} onChange={selectsetBankIdChange} controlId="bankId">
                                    <Form.Label>Banco del destinatario</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        {banks.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="nameOnCard">
                                    <Form.Label>Cuenta del destinatario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Número de la cuenta destino"
                                        name="recipientBankAccount"
                                        value={recipientBankAccount}
                                        onChange={onRegisterInputChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} name={amountType} onChange={selectAmountTypeChange} controlId="amountType">
                                    <Form.Label>Tipo de transferencia</Form.Label>
                                    <Form.Select defaultValue="">
                                        <option value="">Choose...</option>
                                        <option value="Deposit">Deposito</option>
                                        <option value="Withdrawal">Retiro</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="totalValue">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor de la transacción"
                                        name="totalValue"
                                        value={totalValue}
                                        onChange={onRegisterInputChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="concept">
                                    <Form.Label>Concepto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor de la transacción"
                                        name="concept"
                                        value={concept}
                                        onChange={onRegisterInputChange} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Descripción"
                                        name="description"
                                        value={description}
                                        onChange={onRegisterInputChange} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Procesar
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}