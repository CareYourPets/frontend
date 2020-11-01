import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { fetchAvailabilityInfo } from 'utils/work.service';

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

const WorkingDates = ({ type }) => {
  const today = new Date();
  const [heatmap, setHeatMap] = React.useState({});

  const fetchDates = async () => {
    const data = await fetchAvailabilityInfo({ type });
    const reducedData = data.reduce((prev, item) => {
      const { date } = item;
      const formatedDate = moment(date).format('"YYYY/MM/DD"');
      return { ...prev, [formatedDate]: -1 };
    }, {});

    const dates = getRange(366).map(index => {
      const date = shiftDate(today, index);
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

  return (
    <div>
      <CalendarHeatmap
        startDate={today}
        endDate={shiftDate(today, 365)}
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
            'data-tip': `${moment(value.date).format('YYYY/MM/DD')}: ${
              value.count
            } Jobs`
          };
        }}
        showWeekdayLabels={true}
        // onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
    </div>
  );
};

export default WorkingDates;
