import React from "react";
import styles from "../styles/calendar.module.css";

const EventItem = ({ event }) => {
    
  
    return (
        <div
          className={styles.event}
          title={`${event.title} (${event.startTime} - ${event.endTime})`}
        >
          {`${event.title}`}
          <br></br>
          {`${event.startTime}--${event.endTime}`}
          <hr></hr>
        </div>
      );
      
  };
  

export default EventItem;
