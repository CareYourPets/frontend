import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Drawer from 'components/Drawer';
import { fetchUserInfo } from 'utils/profile.service';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import { GENDERS, AREAS } from 'constants/variables';
import { updatePetOwnerInfo, updateCareTakerInfo } from 'utils/profile.service';
import { CARE_TAKER, PET_OWNER } from 'utils/roleUtil';
import { useUser } from 'contexts/UserContext';
import CareTakerSkills from './CareTakerSkills';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10)
  },
  spacer: {
    marginTop: theme.spacing(5)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Profile = () => {
  const classes = useStyles();
  const {
    user: { role }
  } = useUser();

  const [profileInfo, setProfileInfo] = React.useState({
    area: '',
    bio: '',
    contact: '',
    email: '',
    gender: '',
    location: '',
    name: ''
  });
  const [isEdit, setIsEdit] = React.useState(false);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserInfo();
      setProfileInfo(data);
    } catch {
      setProfileInfo(profileInfo);
    }
  };
  React.useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const updateProfile = async () => {
    try {
      if (role === PET_OWNER) {
        await updatePetOwnerInfo(profileInfo);
      } else if (role === CARE_TAKER) {
        await updateCareTakerInfo(profileInfo);
      }
      await fetchProfile();
      setIsEdit(false);
    } catch {
      setIsEdit(true);
    }
  };

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="h1" variant="h7">
                Profile
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Grid container justify="flex-end">
                {isEdit ? (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={updateProfile}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Email
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography component="p" variant="h6">
                {profileInfo.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Name
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  defaultValue={profileInfo.name}
                  fullWidth
                  onChange={e =>
                    setProfileInfo({ ...profileInfo, name: e.target.value })
                  }
                />
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Bio
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <TextField
                  id="outlined-basic"
                  label="Bio"
                  variant="outlined"
                  defaultValue={profileInfo.bio}
                  fullWidth
                  onChange={e =>
                    setProfileInfo({ ...profileInfo, bio: e.target.value })
                  }
                />
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.bio}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Gender
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={profileInfo.gender}
                    onChange={e =>
                      setProfileInfo({ ...profileInfo, gender: e.target.value })
                    }
                    label="Gender"
                  >
                    {GENDERS.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.gender}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Area
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Area
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={profileInfo.area}
                    onChange={e =>
                      setProfileInfo({ ...profileInfo, area: e.target.value })
                    }
                    label="Area"
                  >
                    {AREAS.map(item => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.area}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Location
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <TextField
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  defaultValue={profileInfo.location}
                  fullWidth
                  onChange={e =>
                    setProfileInfo({ ...profileInfo, location: e.target.value })
                  }
                />
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.location}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="p" variant="h6">
                Contact
              </Typography>
            </Grid>
            <Grid item xs={9}>
              {isEdit ? (
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  variant="outlined"
                  defaultValue={profileInfo.contact}
                  fullWidth
                  onChange={e =>
                    setProfileInfo({ ...profileInfo, contact: e.target.value })
                  }
                />
              ) : (
                <Typography component="p" variant="h6">
                  {profileInfo.contact}
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
        {role === CARE_TAKER ? <CareTakerSkills /> : <div />}
      </Container>
    </Drawer>
  );
};

export default Profile;
