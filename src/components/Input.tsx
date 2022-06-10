import { FormControlProps } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface InputProps extends FormControlProps {
    label: string;
}

const Input = ({ label, ...props }: InputProps) => {
    return (
        <Form.Group>
            <FloatingLabel label={label}>
                <Form.Control placeholder={`Enter ${label}`} {...props} />
            </FloatingLabel>
        </Form.Group>
    );
};

export default Input;
