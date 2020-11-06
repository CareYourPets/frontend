import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import {
  fetchAvailabilityInfo,
  createAvailabilityInfo,
  deleteAvailabilityInfo
} from 'utils/work.service';
import { toast } from 'react-toastify';
import { CARE_TAKER_PART_TIMER, CARE_TAKER_FULL_TIMER } from 'utils/roleUtil';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

const FullTimeWorkingDates = ({ type }) => {
  // const today = new Date();
  const startOfYear = moment()
    .startOf('year')
    .subtract(1, 'day')
    .toDate();
  const endOfYear = moment()
    .endOf('year')
    .toDate();
  const [heatmap, setHeatMap] = React.useState({});

  const fetchDates = async () => {
    const data = await fetchAvailabilityInfo({ type });
    const reducedData = data.reduce((prev, item) => {
      const { date } = item;
      const formatedDate = moment(date).format('"YYYY/MM/DD"');
      return { ...prev, [formatedDate]: -1 };
    }, {});

    const dates = getRange(366).map(index => {
      const date = shiftDate(startOfYear, index);
      const formatedDate = moment(date).format('"YYYY/MM/DD"');
      return {
        date,
        count: formatedDate in reducedData ? -1 : 0
      };
    });
    const reducedDates = dates.reduce((prev, date) => {
      return { ...prev, [date.date]: date.count };
    }, {});
    setHeatMap(reducedDates);
  };
  React.useEffect(() => {
    fetchDates();
    // eslint-disable-next-line
  }, []);

  if (heatmap === {}) {
    return <div />;
  }

  const values = Object.keys(heatmap).map(item => ({
    date: item,
    count: heatmap[item]
  }));

  const handleDate = async ({ date, count }) => {
    try {
      if (count === 0) {
        await createAvailabilityInfo({
          date: moment(date).format('YYYY/MM/DD'),
          type
        });
        await fetchDates();
      } else if (count === -1) {
        await deleteAvailabilityInfo({
          date: moment(date).format('YYYY/MM/DD'),
          type
        });
        await fetchDates();
      } else {
        toast.error('Cannot apply leave');
      }
    } catch {
      return;
    }
  };

  return (
    <div>
      <CalendarHeatmap
        startDate={startOfYear}
        endDate={endOfYear}
        values={values}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count < 0) {
            return 'color-github-neg';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={value => {
          if (value.count === -1) {
            return {
              'data-tip': `${moment(value.date).format('YYYY/MM/DD')}: Leave`
            };
          }
          return {
            'data-tip': `${moment(value.date).format('YYYY/MM/DD')}: NA`
          };
        }}
        showWeekdayLabels={true}
        onClick={value => handleDate(value)}
      />
      <ReactTooltip />
    </div>
  );
};

const PartTimeWorkingDates = ({ type }) => {
  const startOfYear = moment()
    .startOf('year')
    .subtract(1, 'day')
    .toDate();
  const [heatmap, setHeatMap] = React.useState({});

  const fetchDates = async () => {
    const data = await fetchAvailabilityInfo({ type });
    const reducedData = data.reduce((prev, item) => {
      const { date } = item;
      const formatedDate = moment(date).format('"YYYY/MM/DD"');
      return { ...prev, [formatedDate]: 0 };
    }, {});

    const dates = getRange(731).map(index => {
      const date = shiftDate(startOfYear, index);
      const formatedDate = moment(date).format('"YYYY/MM/DD"');
      return {
        date,
        count: formatedDate in reducedData ? 0 : -1
      };
    });
    const reducedDates = dates.reduce((prev, date) => {
      return { ...prev, [date.date]: date.count };
    }, {});
    setHeatMap(reducedDates);
  };
  React.useEffect(() => {
    fetchDates();
    // eslint-disable-next-line
  }, []);

  if (heatmap === {}) {
    return <div />;
  }

  const values = Object.keys(heatmap).map(item => ({
    date: item,
    count: heatmap[item]
  }));

  const handleDate = async ({ date, count }) => {
    try {
      if (count === -1) {
        await createAvailabilityInfo({
          date: moment(date).format('YYYY/MM/DD'),
          type
        });
        await fetchDates();
      } else if (count === 0) {
        await deleteAvailabilityInfo({
          date: moment(date).format('YYYY/MM/DD'),
          type
        });
        await fetchDates();
      } else {
        toast.error('Cannot apply leave');
      }
    } catch {
      return;
    }
  };

  return (
    <div>
      <CalendarHeatmap
        startDate={startOfYear}
        endDate={shiftDate(startOfYear, 730)}
        values={values}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count < 0) {
            return 'color-github-0';
          }
          return `color-github-3`;
        }}
        tooltipDataAttrs={value => {
          if (value.count === 0) {
            return {
              'data-tip': `${moment(value.date).format(
                'YYYY/MM/DD'
              )}: Available`
            };
          }
          return {
            'data-tip': `${moment(value.date).format('YYYY/MM/DD')}: NA`
          };
        }}
        showWeekdayLabels={true}
        onClick={value => handleDate(value)}
      />
      <ReactTooltip />
    </div>
  );
};

const WorkingDates = ({ type }) => {
  if (type === CARE_TAKER_FULL_TIMER) {
    return <FullTimeWorkingDates type={type} />;
  } else if (type === CARE_TAKER_PART_TIMER) {
    return <PartTimeWorkingDates type={type} />;
  } else {
    return <div />;
  }
};

export default WorkingDates;
