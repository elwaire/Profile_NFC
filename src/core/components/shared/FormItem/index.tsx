import { Form, FormItemProps, Input } from "antd";
import { memo } from "react";

const FormItem: React.FC<FormItemProps> = ({ children, ...props }) => {
    return <Form.Item {...props}>{children || <Input />}</Form.Item>;
};

export default memo(FormItem);
