import React, { useState } from "react";
import styles from "../styles/eventForm.module.css";

const AddEventForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.duration) return;

    const newEvent = {
      title: formData.title,
      date: formData.date,
      startTime: formData.time,
      duration: parseInt(formData.duration),
    };
    
    onAdd(newEvent);
    setFormData({ title: "", date: "", time: "", duration: "" }); // clear form
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add New Event</h3>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <input
        type="number"
        name="duration"
        placeholder="Duration (minutes)"
        value={formData.duration}
        onChange={handleChange}
      />
      <button type="submit" className={styles.button}>Add Event</button>
    </form>
  );
};

export default AddEventForm;
