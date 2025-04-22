import React from "react";
import styles from "../styles/calendar.module.css";

const CalendarHeader = ({ currentDate, onPrev, onNext,showIntro, setShowIntro, handleNewEventButton}) => {
  return (
    <>
    {showIntro && (
            <div className={styles.description}>
            <button
            className={styles.closeBtn}
            onClick={() => setShowIntro(false)}
            >
            ×
            </button>
            <h2>📆Calendar Scheduler</h2>
            <p>
            Welcome to the <strong>Calendar Scheduler App</strong> — your simple and
            effective tool for managing daily events!
            </p>
            <ul>
            <li><strong>Add Events</strong>: Create events with title, date, and time.</li>
            <li><strong>Sorted View</strong>: Events are neatly organized by day and time.</li>
            <li><strong>Persistent Storage</strong>: Your events are saved even after refreshing!</li>
            </ul>
            <p><u>Start organizing your time better, one event at a time. 🕒</u></p>
        </div>
        )}
    <div className={styles.header}>
        <button className={styles.navButton} onClick={onPrev}>←</button>
        <h2>{currentDate.format("MMM YYYY")}</h2>
        <button className={styles.navButton} onClick={onNext}>→</button>

    </div>
    <div >
      <button className={styles.addEventButton} onClick={()=>handleNewEventButton()}>Add Event</button>
    </div>
    
    
    </>
    

  );
};

export default CalendarHeader;
