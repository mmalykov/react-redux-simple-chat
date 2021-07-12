import firebase from "firebase";

export function docToModel<T extends { id: string | undefined }>(doc: firebase.firestore.QueryDocumentSnapshot | undefined): T {
    return {
        id: doc?.id,
        ...doc?.data(),
    } as T;
}
