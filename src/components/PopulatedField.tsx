import { FormControlProps } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

interface PopulatedFieldProps extends FormControlProps {
    label: string;
    value: string;
}

const PopulatedField = ({ label, value, ...props }: PopulatedFieldProps) => {
    return (
        <Form.Group>
            <FloatingLabel label={label}>
                <Form.Control readOnly value={value} {...props} />
            </FloatingLabel>
        </Form.Group>
    );
};

export default PopulatedField;
