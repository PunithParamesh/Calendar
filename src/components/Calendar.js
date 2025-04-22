import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddEventForm from "./AddEventForm";
import CalendarHeader from "./CalendarHeader";
import DayCell from "./DayCell";
import styles from "../styles/calendar.module.css";
import initialEvents from "../data/events.json";
import PopUP from "./popUp";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [eventList, setEventList] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const [showForm, setShowForm] = useState(false);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventList));
  }, [eventList]);

  useEffect(() => {
    setShowIntro(true);
  }, []);

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day();

  const daysArray = [];

  for (let i = 0; i < startDay; i++) {
    daysArray.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(dayjs(currentDate).date(day));
  }

  const handlePrev = () => {
    setShowIntro(false);
    return setCurrentDate(currentDate.subtract(1, "month"))
  };
  const handleNext = () =>{
    setShowIntro(false);
    return setCurrentDate(currentDate.add(1, "month"));
  };

  const handleNewEventButton = ()=>{
      setShowForm(true);
  };

  const handleAddEvent = (newEvent) => {
    const [hours, minutes] = newEvent.startTime.split(":").map(Number);
    const start = dayjs().hour(hours).minute(minutes);
    const end = start.add(newEvent.duration, "minute");

    const eventWithEndTime = {
      ...newEvent,
      endTime: end.format("HH:mm"),
    };

    setEventList((prev) => [...prev, eventWithEndTime]);
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={styles.calendar}>
      <CalendarHeader
        currentDate={currentDate}
        onPrev={handlePrev}
        onNext={handleNext}
        showIntro={showIntro}
        setShowIntro={setShowIntro}
        showForm={showForm}
        setShowForm={setShowForm}
        handleNewEventButton={handleNewEventButton}
      />

        {showForm && (
          <div className={styles.popupOverlay} onClick={()=>setShowForm(false)}>
            <div className={styles.popup} onClick={(e)=>e.stopPropagation()}>
            <button className={styles.formCloseButton} onClick={() => setShowForm(false)}>×</button>
              <AddEventForm onAdd={(event) => {
                handleAddEvent(event);
                setShowForm(false); // Close popup after adding
              }} />
            </div>
          </div>
        )}


      <div className={styles.weekHeader}>
        {weekdays.map((day, idx) => (
          <div key={idx} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {showPopup && selectedDate && <PopUP eventList={eventList} setShowPopup={setShowPopup} selectedDate={selectedDate}/>}

      <div className={styles.grid}>
        {daysArray.map((day, index) => (
          <DayCell
            key={index}
            date={day}
            events={eventList}
            onClick={() => {
                if (day) {
                  setSelectedDate(day);
                  setShowPopup(true);
                }
              }}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
