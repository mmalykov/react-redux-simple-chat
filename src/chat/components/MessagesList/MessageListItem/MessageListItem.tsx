import React, {useMemo} from "react";
import {
    alpha,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Message} from "../../../types/message";
import {User} from "../../../../users/types/user";

type Props = {
    message: Message;
    user: User;
    editMessage: (message: Message) => void;
    deleteMessage: (message: Message) => void;
    isOwn?: boolean;
    inMultiUserConversation?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: (props: Partial<Props>) => props.isOwn ? '100%' : 'fit-content',
        justifyContent: (props: Partial<Props>) => props.isOwn ? 'flex-end' : 'flex-start',
        paddingRight: theme.spacing(2),
    },
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        '&:hover': {
            '& .MuiListItemSecondaryAction-root': {
                display: 'inline-flex',
            }
        }
    }
}));

const useTextStyles = makeStyles((theme) => ({
    root: {
        flex: '0 0 auto',
        background: (props: Partial<Props>) => alpha(props.isOwn ? theme.palette.info.light : theme.palette.primary.light, 0.5),
        borderRadius: theme.shape.borderRadius * 2,
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        whiteSpace: 'pre-line',
    },
}));

const useSecondaryActionsStyles = makeStyles(() => ({
    root: {
        position: 'initial',
        display: 'none',
    },
}));

export const MessageListItem: React.FC<Props> = ({message, user, editMessage, deleteMessage, isOwn = false, inMultiUserConversation = false}) => {
    const listItemClasses = useStyles({isOwn});
    const listItemTextClasses = useTextStyles({isOwn});
    const secondaryActionsClasses = useSecondaryActionsStyles({isOwn});
    const secondaryText = useMemo(() => {
        const date = new Date(message.editedAt);

        return [date.getHours(), date.getMinutes()].join(':')
    }, [message.editedAt]);

    return (
        <ListItem classes={{root: listItemClasses.root, container: listItemClasses.container}}>
            <ListItemText
                className={listItemTextClasses.root}
                primary={
                    <React.Fragment>
                        {!isOwn && inMultiUserConversation && (
                            <Typography color="secondary">
                                {user.username}
                            </Typography>
                        )}
                        {message.content}
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        {message.edited && (
                            <Typography component="span">
                                edited
                            </Typography>
                        )}
                        <Typography component="span">
                            {secondaryText}
                        </Typography>
                    </React.Fragment>
                }/>
            <ListItemSecondaryAction className={secondaryActionsClasses.root}>
                <IconButton edge="end" aria-label="edit" onClick={() => editMessage(message)}>
                    <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton edge="end" aria-label="delete"  onClick={() => deleteMessage(message)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
