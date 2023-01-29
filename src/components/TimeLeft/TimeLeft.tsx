import * as React from 'react';
import { formatDuration, intervalToDuration, isAfter } from 'date-fns';
import './TimeLeft.css';

type TimeLeftType = {
  endTime: string;
};

function TimeLeft({ endTime }: TimeLeftType) {
  if (isAfter(new Date(), new Date(endTime))) {
    return <div className='TimeLeft TimeLeft--time-ended'>Time is out</div>;
  }
  const [timeLeft, setTimeLeft] = React.useState(
    intervalToDuration({ start: new Date(), end: new Date(endTime) }),
  );
  const differenceInDates = () =>
    setTimeLeft(intervalToDuration({ start: new Date(), end: new Date(endTime) }));
  setTimeout(differenceInDates, 60000);
  return (
    <div className='TimeLeft'>
      Time left:
      {formatDuration(timeLeft, {
        delimiter: ', ',
        format: ['months', 'days', 'hours', 'minutes'],
      })}
    </div>
  );
}

export default TimeLeft;
