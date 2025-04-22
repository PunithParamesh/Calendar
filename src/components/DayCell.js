import React from "react";
import dayjs from "dayjs";
import EventItem from "./EventItem";
import styles from "../styles/calendar.module.css";
import { timeToMinutes } from "../utils/time";

const sortEventsByTime = (events) => {
  return [...events].sort((a, b) => {
    const aStart = timeToMinutes(a.startTime);
    const bStart = timeToMinutes(b.startTime);
    const aEnd = timeToMinutes(a.endTime);
    const bEnd = timeToMinutes(b.endTime);

    if (aStart !== bStart) {
      return aStart - bStart;
    } else {
      return aEnd - bEnd;
    }
  });
};


const DayCell = ({ date, events, onClick }) => {
  if (!date) return <div className={styles.emptyCell}></div>;

  const isToday = dayjs().isSame(date, "day");

  const todayEvents = events.filter((e) =>
    dayjs(e.date).isSame(date, "day")
  );

  const positionedEvents = sortEventsByTime(todayEvents);

  return (
    <div className={`${styles.dayCell} ${isToday ? styles.today : ""}`} onClick={onClick}>
      <div className={styles.dayNumber}>{date.date()}</div>
      <div className={styles.events}>
        {positionedEvents.map((event, idx) => (
        <EventItem key={idx} event={event} totalColumns={3} />
        ))}
      </div>
    </div>
  );
};

export default DayCell;
