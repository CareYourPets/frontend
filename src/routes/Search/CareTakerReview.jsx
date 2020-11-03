import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from 'react-avatar';

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
  reviewPanel: {
    borderBottom: '1px solid grey',
    minWidth: '400px',
    padding: theme.spacing(1)
  },
  spacer: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  large: {
    width: theme.spacing(1),
    height: theme.spacing(1)
  }
}));

const CareTakerReviews = ({ reviews = [] }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography component="h1" variant="h5">
        {reviews.length} Reviews
      </Typography>
      {reviews.map((review, i) => (
        <Grid container key={i} className={classes.reviewPanel}>
          <Grid item xs={2}>
            <Grid container className={classes.spacer}>
              <Avatar
                size="50"
                round={true}
                className={classes.large}
                name={review.name}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="center" className={classes.spacer}>
              <Typography component="h4" variant="h7">
                {review.name}
              </Typography>
            </Grid>
            <Grid container justify="center" className={classes.spacer}>
              <Typography component="h4" variant="h7">
                Rating: {parseFloat(review.rating).toFixed(1)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.spacer}>
            <Typography component="h4" variant="h7">
              {review.review}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default CareTakerReviews;
