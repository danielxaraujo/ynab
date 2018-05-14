import React, { Component } from 'react';
import { Form, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import AuthService from '../../components/authService'

const authService = new AuthService('http://127.0.0.1:3000');

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { username: null, password: null }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        authService.login(this.state.username, this.state.password).then(res => {
            this.props.history.replace('/');
        }).catch(err => {
            alert(err);
        })
    }
    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value }
        )
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" name="username" onChange={this.handleChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="fas fa-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" type="submit" onClick={this.handleSubmit}>Login</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0">Forgot password?</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.</p>
                                            <Button color="primary" className="mt-3" active>Register Now!</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login