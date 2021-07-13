import firebase from "firebase";
import {firebaseContextValue} from "../contexts/firebaseContext";

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);

        return user;
    } catch (e) {
        throw e;
    }
};

export const signInUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await firebaseContextValue.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        const {user} = await firebaseContextValue.auth.signInWithEmailAndPassword(email, password);

        return user;
    } catch(e) {
        throw e;
    }
};
