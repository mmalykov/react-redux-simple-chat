import firebase from "firebase";

const FieldPath = firebase.firestore.FieldPath;

type FieldPathType = firebase.firestore.FieldPath;
type OrderBy = { fieldPath: string | FieldPathType, directionStr?: 'asc' | 'desc' };
type Collection = 'users' | 'conversations' | 'messages';

export const fetchAllDocuments = async (collection: Collection) => {
    return firebase.firestore()
        .collection(collection)
        .get();
};

export const fetchDocumentsByIds = async (collection: Collection, documentIds: string[], fieldName: FieldPathType | string = FieldPath.documentId()) => {
    return firebase.firestore()
        .collection(collection)
        .where(fieldName, 'in', documentIds)
        .get()
};

export const fetchDocumentsNotInIds = async (collection: Collection, documentIds: string[]) => {
    return firebase.firestore()
        .collection(collection)
        .where(firebase.firestore.FieldPath.documentId(), 'not-in', documentIds)
        .get()
};

export const fetchDocumentsByFieldValue = async (collection: Collection, fieldName: string, fieldValue: any, orderBy: OrderBy | null = null) => {
    const collectionRef = firebase.firestore()
        .collection(collection)
        .where(fieldName, '==', fieldValue);

    if (orderBy) {
        return collectionRef.orderBy(orderBy.fieldPath, orderBy.directionStr).get();
    }

    return collectionRef.get();
};

export const addDocumentToCollection = async <T>(collection: Collection, documentModel: T) => {
    return firebase.firestore()
        .collection(collection)
        .add(documentModel);
};

export const updateDocumentInCollection = async <T>(collection: Collection, documentId: string, updatedData: Partial<T>) => {
    await firebase.firestore()
        .collection(collection)
        .doc(documentId)
        .update(updatedData);
};
