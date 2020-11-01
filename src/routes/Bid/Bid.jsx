import React from 'react';
import Drawer from 'components/Drawer';
import { fetchBids } from 'utils/bid.service';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BidInfo from './BidInfo';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2)
  }
}));

const Bids = () => {
  const classes = useStyles();
  const [bids, setBids] = React.useState({});

  const fetchAllBids = async () => {
    try {
      const data = await fetchBids();
      const reducedData = data.reduce((prev, bid) => {
        return { ...prev, [bid.start_date]: { ...bid } };
      }, {});
      setBids(reducedData);
    } catch {
      setBids(bids);
    }
  };

  React.useEffect(() => {
    fetchAllBids();
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container className={classes.spacer}>
            <Grid item xs={3}>
              <Typography component="h1" variant="h7">
                Your Bids
              </Typography>
            </Grid>
          </Grid>
          {Object.keys(bids).map((date, i) => (
            <BidInfo fetchAllBids={fetchAllBids} {...bids[date]} key={i} />
          ))}
        </div>
      </Container>
    </Drawer>
  );
};

export default Bids;
