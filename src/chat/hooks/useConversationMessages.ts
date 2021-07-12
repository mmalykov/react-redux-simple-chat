import {Conversation} from "../types/conversation";
import {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../../contexts/firebase-context";
import firebase from "firebase";
import {useChatActions} from "../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectMessages} from "../store/selectors";

type Snapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;

export const useConversationMessages = (conversation: Conversation | null) => {
    const {firestore} = useContext(FirebaseContext);
    const [messagesSnapshot, setMessagesSnapshot] = useState<Snapshot[]>([]);
    const {fetchConversationMessagesSuccessful} = useChatActions();
    const {messages} = useSelector(selectMessages);

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

    useEffect(() => {
        fetchConversationMessagesSuccessful(messagesSnapshot);
    }, [messagesSnapshot]);

    return [messages];
};
