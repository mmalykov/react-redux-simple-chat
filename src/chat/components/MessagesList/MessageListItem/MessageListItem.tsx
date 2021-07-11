import React, {useMemo} from "react";
import {ListItemText, makeStyles, Typography} from "@material-ui/core";
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
        textAlign: 'right',
    }
}));

export const MessageListItem: React.FC<Props> = ({message, user, isOwn = false, inMultiUserConversation = false}) => {
    const classes = useStyles();
    const appliedClasses = isOwn ? classes.root : '';
    const secondaryText = useMemo(() => {
        const date = new Date(message.timestamp);

        return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    }, [message.timestamp]);

    return (
        <ListItemText
            className={appliedClasses}
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
    );
};
