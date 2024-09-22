import { memo, useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { Contact } from "~/core/types";
import { getDataFirebase } from "~/core/services";
import log from "~/core/utils/log";
import { message } from "antd";
import TableContacts from "./components/TableContacts";
import { Title } from "~/core/components";

const Statisticals: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = useCallback(async () => {
        try {
            setLoading(true);
            const snapShot = await getDataFirebase("contacts");
            if (snapShot) {
                setContacts(snapShot as Contact[]);
            }
        } catch (error) {
            log("Failed to load contacts", error);
            message.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    return (
        <div className="statisticals__container">
            <Title title="Contacts" />
            <TableContacts data={contacts || []} loading={loading} />
        </div>
    );
};

export default memo(Statisticals);
