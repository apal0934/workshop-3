import { FormSelectProps } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface SelectProps extends FormSelectProps {
    label: string;
    options: string[];
}

const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <Form.Group>
            <FloatingLabel label={label}>
                <Form.Select {...props}>
                    {options.map(option => (
                        <option key={option}>{option}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
        </Form.Group>
    );
};

export default Select;
