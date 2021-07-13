import React, {forwardRef, useState} from "react";
import {Autocomplete} from "@material-ui/lab";
import {User} from "../../../../users/types/user";
import {Button, makeStyles, TextField} from "@material-ui/core";

type Props = {
    users: User[];
    createConversation: (user: User[]) => void;
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        left: '35%',
        top: '50%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

const CreateConversationModalBodyComponent: React.FC<Props> = ({users, createConversation}) => {
    const classes = useStyles();
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const options = users.filter(user => !selectedUsers.includes(user));

    return (
        <div className={classes.paper}>
            <Autocomplete
                multiple
                value={selectedUsers}
                onChange={(event, users) => {
                    setSelectedUsers(users);
                }}
                options={options}
                getOptionLabel={(user: User) => user.fullName || ''}
                openOnFocus
                renderInput={(params) => <TextField {...params} margin="normal"/>}
            />
            <Button color="primary" variant="contained" onClick={() => createConversation(selectedUsers)}>
                Create conversation
            </Button>
        </div>
    );
};

export const CreateConversationModalBody = forwardRef<typeof CreateConversationModalBodyComponent, Props>((props: Props, ref) => (
    <CreateConversationModalBodyComponent {...props}/>
));

