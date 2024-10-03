"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Dictionary } from "@/lib/types/definitions";
import { getAvailability, tileClassname } from "@/lib/data";

const CalendarAvailability = ({
  title,
  availabilityURL,
}: {
  title: Dictionary["Listing"]["availability"];
  availabilityURL: string;
}) => {
  const [bookedRanges, setBookedRanges] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAvailability(availabilityURL);
      setBookedRanges(data);
    })();
  }, [availabilityURL]);

  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <Calendar
        tileClassName={({ date, view }) => {
          return tileClassname(bookedRanges, date, view);
        }}
        showDoubleView={true}
        prev2Label={null}
        next2Label={null}
        minDetail="month"
      />
    </div>
  );
};

export default CalendarAvailability;
