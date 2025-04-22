import dayjs from "dayjs";
import styles from "../styles/calendar.module.css"

const PopUP =({setShowPopup, selectedDate, eventList})=>{

    return(
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h3>Events on {selectedDate.format("MMMM D, YYYY")}</h3>
            <ul>
            {eventList
          .filter((event) => dayjs(event.date).isSame(selectedDate, "day"))
          .sort((a, b) =>
            a.startTime.localeCompare(b.startTime) || a.endTime.localeCompare(b.endTime)
          )
          .map((event, idx) => (
            <li key={idx}>
              <strong>{event.title}</strong><br />
              {event.startTime} — {event.endTime}
            </li>
          ))}
            </ul>
            <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
        </div>
    )
}
export default PopUP;

