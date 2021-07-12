import {Conversation} from "../types/conversation";
import {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../../contexts/firebase-context";
import firebase from "firebase";

type Snapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;

export const useConversationMessagesSnapshot = (conversation: Conversation | null) => {
    const {firestore} = useContext(FirebaseContext);
    const [messagesSnapshot, setMessagesSnapshot] = useState<Snapshot[]>([]);

    useEffect(() => {
        if (!conversation) {
            return;
        }

        return firestore
            .collection('messages')
            .where('conversationId', '==', conversation?.id)
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                setMessagesSnapshot(querySnapshot.docs);
            });
    }, [firestore, conversation]);

    return messagesSnapshot;
};
