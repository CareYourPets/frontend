import React from 'react';
import Drawer from 'components/Drawer';
import { fetchCareTakers } from 'utils/bid.service';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from 'react-slick';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import CareTakerProfile from './CareTakerProfile';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(10)
  },
  spacer: {
    marginTop: theme.spacing(5)
  }
}));

const Search = () => {
  const classes = useStyles();
  const isByLocation = false;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const [careTakers, setCareTakers] = React.useState([]);

  const searchCareTakers = async () => {
    try {
      const data = await fetchCareTakers({ isByLocation });
      setCareTakers(data);
    } catch {
      setCareTakers(careTakers);
    }
  };
  React.useEffect(() => {
    searchCareTakers();
  }, []);

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h5">
              Swipe To Find Your CareTaker <TouchAppIcon />
            </Typography>
          </Grid>
          <Slider {...settings}>
            {careTakers.map((careTaker, i) => (
              <CareTakerProfile key={i} {...careTaker} />
            ))}
          </Slider>
        </div>
      </Container>
    </Drawer>
  );
};

export default Search;
