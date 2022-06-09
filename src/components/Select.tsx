import { FormSelectProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

interface SelectProps extends FormSelectProps {
    label: string;
    options: string[];
}

const Select = ({label, options, ...props} : SelectProps) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Select {...props}>
                {options.map(option => <option>{option}</option>)}
            </Form.Select>
        </Form.Group>
    )
}

export default Select;