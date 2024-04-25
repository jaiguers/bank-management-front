import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const TableHistorical = ({ cards }) => {

    return (
        <>
            <Container fluid="md">
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tarjeta</th>
                                    <th>Descripcion</th>
                                    <th>Fecha</th>
                                    <th>Valor</th>
                                    <th>Referencia</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cards.map((card) => (
                                    card.amounts.map((item, index) => (
                                        <tr key={index}>
                                            <td>{card.cardNumber}</td>
                                            <td>{item.description}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.amountType == "Withdrawal" ?
                                                <Button variant="outline-danger">{"-"+item.totalValue}</Button> :
                                                <Button variant="outline-success">{item.totalValue}</Button>}</td>
                                            <td>{item.reference}</td>
                                        </tr>
                                    ))

                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container >
        </>
    );
}