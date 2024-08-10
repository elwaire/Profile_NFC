import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";

async function getDataFirebase(collectionName: string) {
    const collectionFirebase = collection(db, collectionName);
    const snapshot = await getDocs(collectionFirebase);
    const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return fetchedData;
}

async function getDataFirebaseById(collectionName: string, id: string) {
    const collectionFirebase = collection(db, collectionName);
    const docRef = doc(collectionFirebase, id);
    const docSnap = await getDoc(docRef);

    return docSnap;
}


async function deleteDocument(collectionName: string, id: string) {
    const collectionFirebase = collection(db, collectionName);
    const docRef = doc(collectionFirebase, id);
    await deleteDoc(docRef);
}





export { getDataFirebase , getDataFirebaseById, deleteDocument};
