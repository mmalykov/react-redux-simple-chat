import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IconButton, Modal} from "@material-ui/core";
import ForumIcon from '@material-ui/icons/Forum';
import {CreateConversationModalBody} from "./CreateConversationModalBody/CreateConversationModalBody";
import {useUsersForNewConversation} from "../../hooks/useUsersForNewConversation";
import {useConversationsActions, useMessagesActions} from "../../store/hooks";
import {selectUser} from "../../../users/store/selectors";
import {User} from "../../../users/types/user";

export const CreateConversation: React.FC = () => {
    const [open, setOpen] = useState(false);
    const users = useUsersForNewConversation(open);
    const currentUser = useSelector(selectUser);
    const {createConversation: createConversationAction} = useConversationsActions();
    const {clearConversationMessages} = useMessagesActions();

    const createConversation = (user: User | null) => {
        createConversationAction(user, currentUser);
        clearConversationMessages();
        handleClose();
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton aria-label="create conversation" color="inherit" onClick={handleOpen}>
                <ForumIcon/>
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <CreateConversationModalBody users={users} createConversation={createConversation} />
            </Modal>
        </React.Fragment>
    );
};
