import React from "react";

function TimePicker({ selectedTime, setSelectedTime }) {
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute <= 45; minute += 15) {
        const time = new Date(0, 0, 0, hour, minute);
        options.push({
          value: formatTime(time),
          label: formatTimeLabel(time),
        });
      }
    }
    return options;
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatTimeLabel = (time) => {
    return time.toLocaleTimeString([], { hour12: true, hour: "numeric", minute: "2-digit" });
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="relative">
      <select
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">Select Time</option>
        {timeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TimePicker;
