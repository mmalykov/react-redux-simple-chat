import React, {forwardRef, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {User} from "../../../../users/types/user";
import {Button, makeStyles, TextField} from "@material-ui/core";

type Props = {
    users: User[];
    createConversation: (user: User | null) => void;
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        left: '35%',
        top: '50%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const CreateConversationModalBodyComponent: React.FC<Props> = ({users, createConversation}) => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <div className={classes.paper}>
            <Autocomplete
                value={selectedUser}
                onChange={(event, newUser) => {
                    setSelectedUser(newUser);
                }}
                options={users}
                getOptionLabel={(user: User) => user.fullName || ''}
                openOnFocus
                renderInput={(params) => <TextField {...params} margin="normal"/>}
            />
            <Button color="primary" variant="text" onClick={() => createConversation(selectedUser)}>
                Create conversation
            </Button>
        </div>
    );
};

export const CreateConversationModalBody = forwardRef<typeof CreateConversationModalBodyComponent, Props>((props: Props, ref) => (
    <CreateConversationModalBodyComponent {...props}/>
));

