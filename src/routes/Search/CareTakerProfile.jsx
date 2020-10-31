import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from 'react-avatar';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '5px',
    minHeight: '500px'
  },
  spacer: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

// email, gender, contact
const CareTakerProfile = ({ name, area, location, bio }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid container justify="center" className={classes.spacer}>
        <Avatar round={true} className={classes.large} name={name} />
      </Grid>
      <Grid container justify="center" className={classes.spacer}>
        <Typography component="p" variant="h4">
          {name === null ? 'Anonymous' : name}
        </Typography>
      </Grid>
      <Grid container justify="center" className={classes.spacer}>
        <Typography component="h1" variant="h5">
          Bio
        </Typography>
      </Grid>
      <Grid container justify="center" className={classes.spacer}>
        <Typography component="p" variant="h6">
          {bio === null
            ? 'This user likes to keep an air of mystery around him.'
            : bio}
        </Typography>
      </Grid>
      <Grid container justify="center" className={classes.spacer}>
        <Typography component="h1" variant="h5">
          Location
        </Typography>
      </Grid>
      <Grid container justify="center" className={classes.spacer}>
        <Typography component="p" variant="h6">
          {area === null && location === null
            ? 'Not specified'
            : area === null
            ? `${location}`
            : location === null
            ? `${area}`
            : `${area}: ${location}`}
        </Typography>
      </Grid>
      <Grid container className={classes.spacer}></Grid>
    </div>
  );
};

export default CareTakerProfile;
