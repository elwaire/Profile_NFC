import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { transitionPage } from "~/core/hoc";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "~/core/configs/firebase";
import PATHS from "~/core/constants/path";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { AuthActions } from "~/core/store";
import "./styles.scss";
import Images from "~/assets/imgs";

interface LoginFormValues {
    email: string;
    password: string;
}

const SignInScreen: React.FC = () => {
    const { t } = useTranslation("global");

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const SignInLoading = useAppSelector((state) => {
        return state.root.auth.loading;
    });

    const onFinish = async (values: LoginFormValues) => {
        dispatch(
            AuthActions.update({
                loading: true,
            }),
        );
        try {
            const user = await signInWithEmailAndPassword(auth, values.email, values.password);

            if (user.user) {
                const payload = {
                    displayName: user.user?.displayName || "",
                    email: user.user?.email || "",
                };

                dispatch(
                    AuthActions.update({
                        user: payload,
                    }),
                );

                message.success(t("signin.msg-login-success"));

                navigate(PATHS.HOME);
            }
        } catch (error) {
            console.log(error);
            message.error(t("signin.msg-login-fail"));
        } finally {
            dispatch(
                AuthActions.update({
                    loading: false,
                }),
            );
        }
    };

    return (
        <div className="sign_in__container">
            <div className="sign_in__container__image">
                <img src={Images.bgSignIn} alt="" />
            </div>
            <div className="sign_in__container__wrapper">
                <h1>{t("signin.title")}</h1>
                <Form
                    className="wrapper__form"
                    form={form}
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: `${t("signin.email-required")}` },
                            { type: "email", message: `${t("signin.email-email")}` },
                        ]}
                        initialValue={"minull1810@gmail.com"}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" disabled={SignInLoading} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: `${t("signin.password-required")}` },
                            { min: 6, message: `${t("signin.passowrd-max-length")}` },
                        ]}
                        initialValue={"123456"}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder={t("signin.password")}
                            disabled={SignInLoading}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={SignInLoading}>
                            {t("signin.btn-login")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default transitionPage({ OgComponent: SignInScreen });
