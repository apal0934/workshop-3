import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

interface PopulatedFieldProps {
    label: string;
    value: string;
}

const PopulatedField = ({label, value} : PopulatedFieldProps) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control disabled value={value}/>
        </Form.Group>
    )
}

export default PopulatedField;