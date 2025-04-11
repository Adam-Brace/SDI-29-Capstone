import dayjs from "dayjs";
import { descriptionTypes } from "./constants";

// SETS DEFAULT COLOR TO BLACK
export const getEventColor = (description) => {
  if (!description) return "#000000"; 
  
  const type = descriptionTypes.find(type => type.value === description);
  return type ? type.color : "#000000"; 
};

// Format date for display
export const formatDate = (date) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};

// Format date for form input
export const formatDateForInput = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
};

// Get default dates for new events
export const getDefaultDates = () => {
  const now = dayjs();
  const oneHourLater = now.add(1, 'hour');
  
  return {
    startDate: formatDateForInput(now),
    endDate: formatDateForInput(oneHourLater)
  };
}; 