export const timeToMinutes = (time) => {
    if (!time || typeof time !== "string") return 0;
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };
  