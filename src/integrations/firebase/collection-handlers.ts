import firebase from "firebase";
import {docToModel} from "../../chat/store/helpers";

const FieldPath = firebase.firestore.FieldPath;

type FieldPathType = firebase.firestore.FieldPath;
type OrderBy = { fieldPath: string | FieldPathType, directionStr?: 'asc' | 'desc' };
type Collection = 'users' | 'conversations' | 'messages';

export const fetchAllDocuments = async (collection: Collection) => {
    return firebase.firestore()
        .collection(collection)
        .get();
};

export const fetchDocumentsByIds = async <T>(collection: Collection, documentIds: string[], fieldName: FieldPathType | string = FieldPath.documentId()) => {
    const querySnapshot = await firebase.firestore()
        .collection(collection)
        .where(fieldName, 'in', documentIds)
        .get();

    return querySnapshot.docs.map(doc => docToModel<T>(doc));
};

export const fetchDocumentsNotInIds = async <T>(collection: Collection, documentIds: string[]) => {
    const querySnapshot = await firebase.firestore()
        .collection(collection)
        .where(firebase.firestore.FieldPath.documentId(), 'not-in', documentIds)
        .get();

    return querySnapshot.docs.map(doc => docToModel<T>(doc));
};

export const fetchDocumentsByFieldValue = async <T>(collection: Collection, fieldName: string, fieldValue: any, orderBy: OrderBy | null = null) => {
    const collectionRef = firebase.firestore()
        .collection(collection)
        .where(fieldName, '==', fieldValue);

    const querySnapshot = orderBy ?
        await collectionRef.orderBy(orderBy.fieldPath, orderBy.directionStr).get() :
        await collectionRef.get()

    return querySnapshot.docs.map(doc => docToModel<T>(doc));
};

export const fetchOneDocumentByFieldValue = async <T>(collection: Collection, fieldName: string, fieldValue: any, orderBy: OrderBy | null = null): Promise<T> => {
    const models = await fetchDocumentsByFieldValue<T>(collection, fieldName, fieldValue, orderBy);
    const [firstModel] = models;

    return firstModel;
};

export const addDocumentToCollection = async <T>(collection: Collection, documentModel: Partial<T>, overrides?: Partial<T>): Promise<T> => {
    const docRef = await firebase.firestore()
        .collection(collection)
        .add(documentModel);
    const doc = await docRef.get();

    return docToModel<T>(doc, overrides);
};

export const updateDocumentInCollection = async <T>(collection: Collection, documentId: string, updatedData: Partial<T>) => {
    await firebase.firestore()
        .collection(collection)
        .doc(documentId)
        .update(updatedData);
};

export const onCollectionSnapshot = <T>(collection: Collection, fieldName: string, fieldValue: any, orderBy: OrderBy | null = null, callback: (models: T[]) => void) => {
    let collectionRef = firebase.firestore()
        .collection(collection)
        .where(fieldName, '==', fieldValue);

    if (orderBy) {
        collectionRef = collectionRef.orderBy(orderBy.fieldPath, orderBy.directionStr)
    }

    collectionRef.onSnapshot(querySnapshot => {
        const models = querySnapshot.docs.map(doc => docToModel<T>(doc));

        callback(models);
    });
};
