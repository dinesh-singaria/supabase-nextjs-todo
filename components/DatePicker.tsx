import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

const Datepick = () => {
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 3)
  );
  return (
    <div className="relative pr-2 px-1">
      <DatePicker
        wrapperClassName="input-attribute"
        className="bg-white appearance-none px-4 py-4 rounded-lg shadow border-black text-black"
        showIcon
        withPortal
        excludeDateIntervals={[
          {
            start: new Date(),
            end: new Date(new Date().setDate(new Date().getDate())),
          },
        ]}
        selected={new Date(startDate)}
        onChange={(date) => {
          if (date !== null) {
            setStartDate(date.getTime());
          }
        }}
        monthsShown={1}
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--previous"
              }
              style={
                customHeaderCount === 1 ? { visibility: "hidden" } : undefined
              }
              onClick={decreaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                }
              >
                {"<"}
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              style={
                customHeaderCount === 1 ? { visibility: "hidden" } : undefined
              }
              onClick={increaseMonth}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                }
              >
                {">"}
              </span>
            </button>
          </div>
        )}
      />
      <i className="fas fa-calendar absolute top-1/4 right-4 text-black"></i>
    </div>
  );
};

export default Datepick;
