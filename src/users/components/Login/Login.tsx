import React, {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Button, Grid, makeStyles, TextField} from "@material-ui/core";
import {useUsersActions} from "../../store";
import { useHistory } from "react-router-dom";

type ActionType = 'register' | 'login';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
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
        height: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    }
}));

export const Login: React.FC = () => {
    const classes = useStyles();
    const formClasses = useFormStyles();
    const history = useHistory();
    const {registerUser, loginUser} = useUsersActions();
    const [actionType, setActionType] = useState<ActionType>('login');
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const {email, password} = values;
            if (actionType === 'register') {
                registerUser(email, password, history);
            }

            loginUser(email, password, history);
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
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Grid className={classes.buttonsContainer} container justifyContent="space-around">
                    <Button color="primary" variant="contained"  type="submit">
                        {actionType === 'login' ? 'Login' : 'Register'}
                    </Button>
                    {actionType === 'login' && (
                        <Button color="primary" variant="text" onClick={() => setActionType('register')}>
                            Create new user
                        </Button>
                    )}
                </Grid>
            </form>
        </Grid>
    );
};
