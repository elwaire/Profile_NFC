// hooks/useResource.ts
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const useResource = (id: string | undefined) => {
    const [isValidId, setIsValidId] = useState(true);

    useEffect(() => {
        const validateResource = async () => {
            if (!id) {
                setIsValidId(false);
                return;
            }

            try {
                const docRef = doc(db, "resources", id);
                const docSnap = await getDoc(docRef);
                setIsValidId(docSnap.exists());
            } catch (error) {
                console.error("Error validating resource:", error);
                setIsValidId(false);
            }
        };

        validateResource();
    }, [id]);

    return { isValidId };
};