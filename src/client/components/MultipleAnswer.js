import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import {escapeHtml} from '../utils'

const MultipleAnswer = ({answers, handleChange}) => {
    const children = [];
    let idx = 0;
    for(let answer of answers){
        children.push(
            <FormGroup key={idx}>
                <div className="form-check">
                    <Input className="form-check-input" value={escapeHtml(answer)} type="radio" name="answer" onChange={handleChange} />
                    <label className="form-check-label" htmlFor={idx}>
                    {escapeHtml(answer)}
                    </label>
                </div>
            </FormGroup>
        );
        idx++
    }
    return children;
}

export default MultipleAnswer