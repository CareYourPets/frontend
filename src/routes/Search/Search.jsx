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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const [isByLocation, setIsByLocation] = React.useState(false);

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
    // eslint-disable-next-line
  }, [isByLocation]);

  return (
    <Drawer>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h7">
              Swipe To Find Your CareTaker <TouchAppIcon />
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h6">
              {careTakers.length} Results
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.spacer}>
            <Typography component="h1" variant="h6">
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isByLocation}
                        onChange={() => setIsByLocation(!isByLocation)}
                        name="isByLocation"
                      />
                    }
                    label="Check for care takers near you"
                  />
                </FormGroup>
              </FormControl>
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
