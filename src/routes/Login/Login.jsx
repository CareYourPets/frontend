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
import { login } from 'utils/auth.service';
import { PET_OWNER, CARE_TAKER } from 'utils/roleUtil';
import { SIGN_UP } from 'constants/routes';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
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

const SignIn = () => {
  const classes = useStyles();
  const { user, handleUser } = useUser();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: PET_OWNER
  });

  const rolesMapping = {
    'Care Taker': CARE_TAKER,
    'Pet Owner': PET_OWNER
  };

  const handleChangeForm = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = async () => {
    handleUser({ ...user, isFetching: true });
    try {
      await login(values.email, values.password, values.role);
      handleUser({ ...user, isAuth: true, isFetching: false });
    } catch {
      handleUser({ ...user, isAuth: false, isFetching: false });
    }
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
          Care Your Pets Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
            defaultValue={PET_OWNER}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href={SIGN_UP} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
