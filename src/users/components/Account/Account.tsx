import React from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectUser} from "../../store/selectors";
import {updateUser} from "../../store/actions";
import {User} from "../../types/user";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    fullName: yup
        .string(),
    username: yup
        .string(),
    avatarUrl: yup
        .string()
});

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },
    buttonsContainer: {
        marginTop: 10
    }
}));

const useFormStyles = makeStyles(() => ({
    root: {
        width: '50%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
}));

export const Account: React.FC = () => {
    const classes = useStyles();
    const formClasses = useFormStyles();
    const currentUser = useSelector(selectUser);
    const formik = useFormik({
        initialValues: {
            email: currentUser?.email || '',
            fullName: currentUser?.fullName || '',
            username: currentUser?.username || '',
            avatarUrl: currentUser?.avatarUrl || '',
        },
        validationSchema: validationSchema,
        onSubmit: (user) => {
            updateUser({...currentUser, ...user} as User);
        },
    });

    return (
        <Grid className={classes.root}
              container
              alignItems={"center"}
              justifyContent={"center"}
              direction={"column"}>
            <form className={formClasses.root} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="Full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    fullWidth
                    id="avatarUrl"
                    name="avatarUrl"
                    label="Avatar url"
                    value={formik.values.avatarUrl}
                    onChange={formik.handleChange}
                    error={formik.touched.avatarUrl && Boolean(formik.errors.avatarUrl)}
                    helperText={formik.touched.avatarUrl && formik.errors.avatarUrl}
                />
                <Grid className={classes.buttonsContainer} container justifyContent="space-around">
                    <Button color="primary" variant="contained"  type="submit">
                        Update
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
};
