import { CardActions } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useUser } from 'contexts/UserContext';
import moment from 'moment';
import React from 'react';
import { fetchUserInfo } from 'utils/profile.service';
import { ADMINISTRATOR, CARE_TAKER } from 'utils/roleUtil';
import {
  fetchCareTakerExpectedSalary,
  fetchCareTakerTotalSalary,
  fetchMonthWithHighestJobs,
  fetchTotalNumberOfPetDaysForCareTakerThisMonth,
  fetchTotalNumOfUniquePetsTakenCareOf
} from 'utils/summaryinfo.service';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {},
  card: {
    margin: theme.spacing(2),
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '5px',
    minHeight: '100px',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  clickable: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center'
  }
}));

const InfoCard = ({ text, data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h3">
          {data ? data : 0}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {text}
        </Typography>
      </CardActions>
    </Card>
  );
};

const SummaryInfo = () => {
  const classes = useStyles();
  const {
    user: { role }
  } = useUser();

  React.useEffect(() => {
    fetchProfile();
    generateGreetings();
    fetchSummaryInfo();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserInfo();
      setProfileInfo(data);
    } catch {
      setProfileInfo(profileInfo);
    }
  };

  const [profileInfo, setProfileInfo] = React.useState({
    area: '',
    bio: '',
    contact: '',
    email: '',
    gender: '',
    location: '',
    name: ''
  });

  const fetchSummaryInfo = async () => {
    try {
      if (role === CARE_TAKER) {
        const [monthlyTotalPetDays, expectedSalary] = await Promise.all([
          fetchTotalNumberOfPetDaysForCareTakerThisMonth(),
          fetchCareTakerExpectedSalary()
        ]);
        setCareTakerSummaryInfo({
          monthlyTotalPetDays,
          expectedSalary
        });
      } else if (role === ADMINISTRATOR) {
        const [
          careTakerSalaries,
          monthWithHighestNumOfJobs,
          totalNumOfUniquePetsTakenCareOf
        ] = await Promise.all([
          fetchCareTakerTotalSalary(),
          fetchMonthWithHighestJobs(),
          fetchTotalNumOfUniquePetsTakenCareOf()
        ]);
        setAdminSummaryInfo({
          careTakerSalaries,
          monthWithHighestNumOfJobs,
          totalNumOfUniquePetsTakenCareOf
        });
      }
    } catch {
      setCareTakerSummaryInfo(careTakerSummaryInfo);
      setAdminSummaryInfo(adminSummaryInfo);
    }
  };

  const [careTakerSummaryInfo, setCareTakerSummaryInfo] = React.useState({
    monthlyTotalPetDays: [],
    expectedSalary: 0
  });

  const processExpectedSalary = () => {
    return {
      text: 'Expected Salary',
      data: careTakerSummaryInfo.expectedSalary
    };
  };

  const processMonthlyPetDays = () => {
    if (careTakerSummaryInfo.monthlyTotalPetDays[0]) {
      return {
        text: 'Pet days this month',
        data: careTakerSummaryInfo.monthlyTotalPetDays[0].sum
      };
    }
    return {
      text: 'Pet days this month',
      data: 0
    };
  };

  const processCareTakerInfo = () => {
    return [processExpectedSalary(), processMonthlyPetDays()];
  };

  const [adminSummaryInfo, setAdminSummaryInfo] = React.useState({
    careTakerSalaries: [],
    monthWithHighestNumOfJobs: [],
    totalNumOfUniquePetsTakenCareOf: []
  });

  const adminInfoMapping = {
    careTakerSalaries: 'Salary to be paid this month',
    monthWithHighestNumOfJobs:
      'Month with highest number of accepted bids this year',
    totalNumOfUniquePetsTakenCareOf:
      'Number of unique pets taken care of this month'
  };

  const processCareTakerSalaries = () => {
    let obj = { text: adminInfoMapping.careTakerSalaries, data: 0 };
    if (adminSummaryInfo.careTakerSalaries[0]) {
      obj.data = adminSummaryInfo.careTakerSalaries[0].total;
    }
    return obj;
  };

  const processMonthWithHighestNumOfJobs = () => {
    let obj = { text: adminInfoMapping.monthWithHighestNumOfJobs, data: 0 };
    if (adminSummaryInfo.monthWithHighestNumOfJobs[0]) {
      obj.data = adminSummaryInfo.monthWithHighestNumOfJobs[0].total;
    }
    return obj;
  };

  const processTotalNumOfUniquePetsTakenCareOf = () => {
    let obj = {
      text: adminInfoMapping.totalNumOfUniquePetsTakenCareOf,
      data: 0
    };
    if (adminSummaryInfo.totalNumOfUniquePetsTakenCareOf[0]) {
      obj.data = adminSummaryInfo.totalNumOfUniquePetsTakenCareOf[0].count;
    }
    return obj;
  };

  const processAdminInfo = () => {
    return [
      processCareTakerSalaries(),
      processMonthWithHighestNumOfJobs(),
      processTotalNumOfUniquePetsTakenCareOf()
    ];
  };

  const [greeting, setGreeting] = React.useState('');

  const generateGreetings = () => {
    var currentHour = moment().format('HH');
    let greeting = '';
    if (currentHour >= 3 && currentHour < 12) {
      greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 15) {
      greeting = 'Good Afternoon';
    } else if (currentHour >= 15 && currentHour < 20) {
      greeting = 'Good Evening';
    } else if (currentHour >= 20 && currentHour < 3) {
      greeting = 'Good Night';
    } else {
      greeting = 'Welcome';
    }
    setGreeting(greeting);
  };

  return (
    <Grid>
      <Typography component="h1" variant="h2" align="center">
        {greeting}, {profileInfo.name}
      </Typography>
      <Grid container className={classes.paper}>
        {role === CARE_TAKER
          ? processCareTakerInfo().map((item, i) => (
              <InfoCard key={i} {...item} />
            ))
          : role === ADMINISTRATOR
          ? processAdminInfo().map((item, i) => <InfoCard key={i} {...item} />)
          : null}
      </Grid>
    </Grid>
  );
};

export default SummaryInfo;
