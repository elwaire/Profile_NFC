import { Button, Modal } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Loading } from "~/core/components";
import { useCheckData } from "~/core/hooks";
import { getDataFirebaseById } from "~/core/services";
import { Contact } from "~/core/types";
import log from "~/core/utils/log";

type DetailContactProps = {
    id: string;
};

const DetailContact: React.FC<DetailContactProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { checkSnapshot } = useCheckData();
    const [detailBlog, setDetailBlog] = useState<Contact>();

    const getDetailContact = async () => {
        setLoading(true);
        try {
            const docSnap = await getDataFirebaseById("contacts", `${props.id}`);

            checkSnapshot(docSnap);

            if (docSnap.exists()) {
                const data = docSnap.data() as Contact;

                setDetailBlog(data);
            }
        } catch (error) {
            log("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (props.id) {
            getDetailContact();
        }
    }, [props.id]);

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Open Modal
            </Button>
            <Modal title="Detail Contact" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="bg-white">
                        <div className="h-[8rem] rounded-lg overflow-hidden">
                            <img src="https://i.pinimg.com/736x/f0/8c/97/f08c97a374f5c8fff7acd2f85c4572c0.jpg" alt="" className="w-full h-full object-cover"/>
                        </div>
                    <div className="mb-4 mt-8">
                      <p className="text-lg font-medium text-gray-800">Email:</p>
                      <p className="text-lg text-gray-600">{detailBlog?.email}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg font-medium text-gray-800">Company:</p>
                      <p className="text-lg text-gray-600">{detailBlog?.company}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-lg font-medium text-gray-800">Details:</p>
                      <p className="text-lg text-gray-600">{detailBlog?.details}</p>
                    </div>
                  </div>
                )}
            </Modal>
        </>
    );
};

export default memo(DetailContact);
