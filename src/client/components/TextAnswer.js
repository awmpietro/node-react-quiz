import React from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';


const TextAnswer = ({handleChange}) => {
    return(
    <Row form>
        <Col md={6}>
        <FormGroup>
            <Input type="text" name="answer" onChange={handleChange} />
        </FormGroup>
        </Col>
    </Row>
    )
}

export default TextAnswer