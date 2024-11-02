import styled from 'styled-components';
const Timeline = ({ flightData }) => {
  const { segments } = flightData;
  const { departure, arrival } = segments[0];

  const timelineEvents = [
    { label: 'Gate Departure', schedule: new Date(departure.time).toLocaleTimeString(), estimated: 'On Time', estimatedClass: 'on-time' },
    { label: 'Takeoff', schedule: 'N/A', estimated: 'N/A', estimatedClass: '' },
    { label: 'Landing', schedule: new Date(arrival.time).toLocaleTimeString(), estimated: 'N/A', estimatedClass: '' },
  ];

  return (
    <TimelineWrapper>
      <TimelineHeader>
        <TimelineTitle>
          <h2>Detailed Timeline</h2>
          <p>Scheduled, Estimated, and Actual</p>
        </TimelineTitle>
        <ProBadge>Pro</ProBadge>
      </TimelineHeader>
      <DepartureLabel>Depart</DepartureLabel>
      <TimelineEvents>
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index}>
            <EventLabel>{event.label}</EventLabel>
            <EventTimes>
              <TimeColumn>
                <TimeLabel>Schedule</TimeLabel>
                <TimeValue>{event.schedule}</TimeValue>
              </TimeColumn>
              <TimeColumn>
                <TimeLabel>Estimated</TimeLabel>
                <TimeValue className={event.estimatedClass}>{event.estimated}</TimeValue>
              </TimeColumn>
            </EventTimes>
          </TimelineEvent>
        ))}
      </TimelineEvents>
    </TimelineWrapper>
  );
};


const TimelineWrapper = styled.section`
  border-radius: 18px 18px 0 0;
  display: flex;
  margin-top: 18px;
  width: 100%;
  max-width: 847px;
  flex-direction: column;
  padding: 25px 25px 0;
  border: 2px solid #e7e7e7;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 25px 20px 0;
  }
`;

const TimelineHeader = styled.header`
  display: flex;
  width: 100%;
  max-width: 394px;
  align-items: flex-start;
  gap: 36px;
  justify-content: space-between;
`;

const TimelineTitle = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  font-weight: 500;

  h2 {
    color: #000;
    font-size: 30px;
    margin: 0;
  }

  p {
    color: #9d9eab;
    font-size: 20px;
    margin: 8px 0 0;
  }
`;

const ProBadge = styled.span`
  width: 54px;
  border-radius: 6px;
  background-color: #f5eaff;
  font-size: 20px;
  color: #63229e;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  padding: 2px;
`;

const DepartureLabel = styled.h3`
  color: #9d9eab;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 28px 0 0;
`;

const TimelineEvents = styled.div`
  display: flex;
  margin-top: 28px;
  width: 100%;
  max-width: 392px;
  flex-direction: column;
  font-weight: 400;
`;

const TimelineEvent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const EventLabel = styled.span`
  color: #000;
  font-size: 22px;
  align-self: stretch;
  margin: auto 0;
`;

const EventTimes = styled.div`
  align-self: stretch;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  justify-content: flex-start;
  margin: auto 0;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TimeLabel = styled.span`
  color: #9d9eab;
  font-size: 20px;
`;

const TimeValue = styled.span`
  color: #000;
  font-size: 22px;
  text-transform: uppercase;
  margin-top: 14px;

  &.on-time {
    color: #15c546;
  }

  &.delayed {
    color: #c51554;
  }
`;

export default Timeline;