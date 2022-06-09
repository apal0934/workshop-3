import { FormControlProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface InputProps extends FormControlProps {
    label: string;
}

const Input = ({label, ...props} : InputProps) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control placeholder={`Enter ${label}`} {...props}/>
        </Form.Group>
    )
}

export default Input;