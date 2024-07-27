import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";
import { deleteObject, StorageReference } from "firebase/storage";
import log from "../utils/log";

async function getDataFirebase(collectionName: string) {
    const collectionFirebase = collection(db, collectionName);
    const snapshot = await getDocs(collectionFirebase);
    const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return fetchedData;
}

async function removeImageFirebase(imageRef: StorageReference) {
    try {
        await deleteObject(imageRef);
    } catch (error) {
        log("Error when remove image from Firebase", error);
    }
}

export { getDataFirebase , removeImageFirebase};
