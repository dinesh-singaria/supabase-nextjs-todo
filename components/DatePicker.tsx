import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/schema";

type Props = {
  todoId: number;
  initialDate?: string | null; // Initial date from the database (if available)
};

const Datepick = ({ todoId, initialDate }: Props) => {
  const supabase = useSupabaseClient<Database>();

  // Parse the initial date if provided, otherwise default to today
  const [startDate, setStartDate] = useState<Date | null>(
    initialDate ? new Date(initialDate) : new Date()
  );

  // Update the `due_date` in Supabase
  const updateDueDate = async (date: Date | null) => {
    if (!date) return;

    try {
      const { error } = await supabase
        .from("todos")
        .update({ due_date: date.toISOString().split("T")[0] }) // Format as YYYY-MM-DD
        .eq("id", todoId);

      // console.log(date)

      if (error) {
        console.error("Error updating due_date:", error);
      } else {
        console.log("Due date updated successfully.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="relative pr-2 px-1">
      <DatePicker
        wrapperClassName="input-attribute"
        className="bg-white appearance-none px-4 py-4 rounded-lg shadow border-black text-black"
        showIcon
        withPortal
        selected={startDate}
        onChange={(date) => {
          setStartDate(date); // Update local state
          updateDueDate(date); // Save to Supabase
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
              className="react-datepicker__navigation react-datepicker__navigation--previous"
              style={
                customHeaderCount === 1 ? { visibility: "hidden" } : undefined
              }
              onClick={decreaseMonth}
            >
              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
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
              className="react-datepicker__navigation react-datepicker__navigation--next"
              style={
                customHeaderCount === 1 ? { visibility: "hidden" } : undefined
              }
              onClick={increaseMonth}
            >
              <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
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
