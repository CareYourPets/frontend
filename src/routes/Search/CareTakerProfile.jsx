import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from 'react-avatar';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import { createBid } from 'utils/bid.service';
import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '5px',
    minHeight: '500px',
    padding: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  model: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: 'None'
  },
  createBid: {
    marginTop: theme.spacing(2)
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const CareTakerProfile = ({
  email,
  gender,
  contact,
  name,
  area,
  location,
  bio,
  pets
}) => {
  const classes = useStyles();
  const { user } = useUser();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [bid, setBid] = React.useState({
    petName: '',
    startDate: null,
    endDate: null
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createPetBid = async () => {
    try {
      await createBid({
        ...bid,
        petOwnerEmail: user.email,
        careTakerEmail: email
      });
      setOpen(false);
    } catch {
      setOpen(true);
    }
  };
  const body = (
    <div style={modalStyle} className={classes.model}>
      <Typography component="h1" variant="h5">
        Bid CareTaker Service
      </Typography>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Pet Name
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Pet Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={bid.petName}
              onChange={e => setBid({ ...bid, petName: e.target.value })}
              label="Pet Name"
            >
              {pets.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            Start Date
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="demo-simple-select-outlined"
            label="Start Date"
            fullWidth
            type="date"
            defaultValue={bid.startDate}
            onChange={e => setBid({ ...bid, startDate: e.target.value })}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Typography component="p" variant="h6">
            End Date
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <TextField
            id="demo-simple-select-outlined"
            label="End Date"
            fullWidth
            type="date"
            defaultValue={bid.endDate}
            onChange={e => setBid({ ...bid, endDate: e.target.value })}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-end" className={classes.spacer}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={createPetBid}
        >
          Create
        </Button>
      </Grid>
    </div>
  );

  return (
    <div className={classes.paper}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Grid container justify="flex-end" className={classes.createBid}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Bid
        </Button>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Grid container justify="center" className={classes.spacer}>
            <Avatar round={true} className={classes.large} name={name} />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h5">
              {name === null ? 'Anonymous' : name}
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h5">
              {email === null ? 'Anonymous' : email}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Grid container justify="center">
            <Typography component="h1" variant="h7">
              Bio
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography component="p" variant="h6">
            {bio === null
              ? 'This user likes to keep an air of mystery around him.'
              : bio}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Grid container justify="center">
            <Typography component="h1" variant="h7">
              Gender
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography component="p" variant="h6">
            {gender === null ? 'NA' : gender}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Grid container justify="center">
            <Typography component="h1" variant="h7">
              Contact
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography component="p" variant="h6">
            {contact === null ? 'NA' : contact}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Grid container justify="center">
            <Typography component="h1" variant="h7">
              Area
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography component="p" variant="h6">
            {area === null ? 'NA' : area}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.spacer}>
        <Grid item xs={3}>
          <Grid container justify="center">
            <Typography component="h1" variant="h7">
              Location
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Typography component="p" variant="h6">
            {location === null ? 'NA' : location}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default CareTakerProfile;
