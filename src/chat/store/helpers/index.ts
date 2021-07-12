import firebase from "firebase";

type DocumentSnapshot = firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot | undefined;

export function docToModel<T extends { id?: string }>(doc: DocumentSnapshot, overrides?: Partial<T>): T {
    return {
        id: doc?.id,
        ...doc?.data(),
        ...overrides,
    } as T;
}
