import { Button, Form, Input, message } from "antd";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { Fragment, useEffect } from "react";
import { db } from "~/core/configs/firebase";
import { useAppDispatch, useAppSelector } from "~/core/hooks";
import { AboutUsActions } from "~/core/store";
import { AboutUsData } from "~/core/types";
import ImageUpload from "./components/UploadImage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { FormItem, Loading } from "~/core/components";

import "./styles.scss";

const AboutUsManager: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((state) => state.root.aboutUs);

    useEffect(() => {
        fetchAboutUsData();
    }, []);

    const fetchAboutUsData = async () => {
        dispatch(AboutUsActions.update({ loading: true }));
        try {
            const docRef = doc(db, "aboutUs", "main");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const fetchedData = docSnap.data() as AboutUsData;
                dispatch(AboutUsActions.update({ data: fetchedData }));
                form.setFieldsValue(fetchedData);
            }
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu About Us:", error);
            message.error("Đã xảy ra lỗi khi tải thông tin About Us");
        } finally {
            dispatch(AboutUsActions.update({ loading: false }));
        }
    };

    const onFinish = async (values: AboutUsData) => {
        try {
            await setDoc(doc(db, "aboutUs", "main"), {
                ...values,
                image: data?.image || "",
            });
            dispatch(AboutUsActions.update({ data: values }));
            message.success("Thông tin About Us đã được cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật About Us:", error);
            message.error("Đã xảy ra lỗi khi cập nhật thông tin About Us");
        }
    };

    const handleImageChange = (url: string) => {
        dispatch(AboutUsActions.update({ data: { ...(data as AboutUsData), image: url } }));
    };

    return (
        <Fragment>
            {loading && <Loading />}
            <Form form={form} onFinish={onFinish} layout="vertical" className="about_us_manager__container">
                <FormItem name="image" label="Hình ảnh">
                    <ImageUpload imageUrl={data?.image || ""} onImageChange={handleImageChange} />
                </FormItem>

                <div className="about_us_manager__container__wrapper">
                    <FormItem name="title" label="Tiêu đề" rules={[{ required: true }]} />

                    <div className="about_us_manager__container__wrapper__section">
                        <h1>Content Introduce</h1>
                        <Form.List name="sections" initialValue={[""]}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <FormItem required={false} key={`section-key-about-us-${index}`}>
                                            <FormItem
                                                {...field}
                                                validateTrigger={["onChange", "onBlur"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Vui lòng nhập section hoặc xóa trường này.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input style={{ width: "60%" }} placeholder="Section" />
                                            </FormItem>
                                            {fields.length > 1 && (
                                                <Button
                                                    onClick={() => remove(field.name)}
                                                    icon={<DeleteOutlined />}
                                                    style={{ marginLeft: 8 }}
                                                    danger
                                                />
                                            )}
                                        </FormItem>
                                    ))}
                                    <FormItem>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                            Add Section
                                        </Button>
                                    </FormItem>
                                </>
                            )}
                        </Form.List>
                    </div>

                    <FormItem name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                        <Input />
                    </FormItem>
                    <div className="about_us_manager__container__wrapper__section">
                        <h1>Skills</h1>
                        <Form.List name="skills" initialValue={[""]}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field, index) => (
                                        <FormItem required={false} key={`skills-key-about-us-${index}`}>
                                            <FormItem
                                                {...field}
                                                validateTrigger={["onChange", "onBlur"]}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Vui lòng nhập kỹ năng hoặc xóa trường này.",
                                                    },
                                                ]}
                                                noStyle
                                            >
                                                <Input style={{ width: "60%" }} placeholder="Kỹ năng" />
                                            </FormItem>
                                            {fields.length > 1 && (
                                                <Button
                                                    onClick={() => remove(field.name)}
                                                    icon={<DeleteOutlined />}
                                                    style={{ marginLeft: 8 }}
                                                    danger
                                                />
                                            )}
                                        </FormItem>
                                    ))}
                                    <FormItem>
                                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                            Add Skill
                                        </Button>
                                    </FormItem>
                                </>
                            )}
                        </Form.List>
                    </div>

                    <FormItem name="tagId" label="Tag ID" rules={[{ required: true }]}>
                        <Input />
                    </FormItem>

                    <div className="about_us_manager__container__wrapper__section">
                        <h1>Skills</h1>
                        <Form.List name="youtubeLinks" initialValue={["", ""]}>
                            {(fields) => (
                                <>
                                    {fields.map((field, index) => (
                                        <FormItem required={false} key={`url-key-about-us-${index}`}>
                                            <FormItem
                                                {...field}
                                                validateTrigger={["onChange", "onBlur"]}
                                                rules={[{ required: true, message: "Vui lòng nhập link YouTube." }]}
                                                noStyle
                                            >
                                                <Input style={{ width: "60%" }} placeholder="Link YouTube" />
                                            </FormItem>
                                        </FormItem>
                                    ))}
                                </>
                            )}
                        </Form.List>
                    </div>

                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </FormItem>
                </div>
            </Form>
        </Fragment>
    );
};

export default AboutUsManager;
