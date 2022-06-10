import { FloatingLabel, FormControlProps } from "react-bootstrap";
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
