import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';

export const CardsAccordion = ({ cards }) => {

    return (
        <>
            <Container fluid="md">
                <Row>
                    <Col>
                        <Card className="bg-dark text-white text-center">
                            <Card.Header><h2>Productos</h2> </Card.Header>
                            <Card.Body>
                                <Accordion defaultActiveKey="1">
                                    {cards.map((item, index) => (
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header>{item.accountType + " - " + item.cardNumber}</Accordion.Header>
                                            <Accordion.Body>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Tipo</th>
                                                            <th>Numero</th>
                                                            <th>Saldo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{item.accountType}</td>
                                                            <td>
                                                                <Card.Link href="#">
                                                                    <NavLink to={"/product/" + item.id} className="nav-link" >
                                                                        <span className="label">{item.cardNumber}</span>
                                                                    </NavLink>
                                                                </Card.Link>
                                                            </td>
                                                            <td>{item.balance}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Card.Body>
                            <Card.Footer className="text-white">Selecicona un producto para ver los ultimos movimientos</Card.Footer>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
            </Container>
        </>
    );
}