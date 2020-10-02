import React from 'react';
import Button from '@material-ui/core/Button';
import { useUser } from 'contexts/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PetsIcon from '@material-ui/icons/Pets';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { createUser } from 'utils/auth.service';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import { LOGIN } from 'constants/routes';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  circle: {
    strokeLinecap: 'round'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const { user, handleUser } = useUser();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  });

  const rolesMapping = {
    'Care Taker': CARE_TAKER,
    'Pet Owner': PET_OWNER
  };

  const handleChangeForm = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = () => {
    handleUser({ ...user, isFetching: true });
    return createUser(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.role
    )
      .then(() => {
        /** user will be redirected to dashboard, @see Authenticated.js */
        handleUser({ ...user, email: values.email, isAuth: true });
      })
      .catch(() => {
        // show snackbar
        handleUser({ ...user, isAuth: false });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PetsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Care Your Pets Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            id="firstName"
            autoFocus
            onChange={handleChangeForm('firstName')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            id="lastName"
            autoFocus
            onChange={handleChangeForm('lastName')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChangeForm('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangeForm('password')}
          />
          <InputLabel id="roleLabel" className="inputLabel">
            Select Your Role
          </InputLabel>
          <Select
            variant="outlined"
            labelId="roleLabel"
            id="controlled-open-select"
            defaultValue=""
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChangeForm('role')}
            margin="normal"
            fullWidth
          >
            {Object.entries(rolesMapping).map(roleData => {
              return (
                <MenuItem key={roleData[1]} value={roleData[1]}>
                  {roleData[0]}
                </MenuItem>
              );
            })}
          </Select>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => onSubmit()}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href={LOGIN} variant="body2">
                {'Alread have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
