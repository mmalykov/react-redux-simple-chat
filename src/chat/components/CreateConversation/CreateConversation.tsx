import React, {useState} from "react";
import {IconButton, Modal} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {User} from "../../../users/types/user";
import {CreateConversationModalBody} from "./CreateConversationModalBody/CreateConversationModalBody";
import {useUsersForNewConversation} from "../../hooks/useUsersForNewConversation";
import {useChatActions} from "../../store/hooks/useChatActions";
import {useSelector} from "react-redux";
import {selectUser} from "../../../users/store/selectors";

export const CreateConversation: React.FC = () => {
    const [open, setOpen] = useState(false);
    const users = useUsersForNewConversation(open);
    const currentUser = useSelector(selectUser);
    const {createConversation: createConversationAction} = useChatActions();

    const createConversation = (user: User | null) => {
        createConversationAction(user, currentUser);
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
                <SendIcon/>
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <CreateConversationModalBody users={users} createConversation={createConversation} />
            </Modal>
        </React.Fragment>
    );
};
