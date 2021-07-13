import React, {useMemo} from "react";
import {alpha, ListItem, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {Message} from "../../../types/message";
import {User} from "../../../../users/types/user";

type Props = {
    message: Message;
    user: User;
    isOwn?: boolean;
    inMultiUserConversation?: boolean;
}

const useStyles = makeStyles(() => ({
    root: {
        justifyContent: (props: Partial<Props>) => props.isOwn ? 'flex-end' : 'flex-start',
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

export const MessageListItem: React.FC<Props> = ({message, user, isOwn = false, inMultiUserConversation = false}) => {
    const listItemClasses = useStyles({isOwn});
    const listItemTextClasses = useTextStyles({isOwn});
    const secondaryText = useMemo(() => {
        const date = new Date(message.createdAt);

        return [date.getHours(), date.getMinutes()].join(':')
    }, [message.createdAt]);

    return (
        <ListItem className={listItemClasses.root}>
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
                secondary={secondaryText}/>
        </ListItem>
    );
};
