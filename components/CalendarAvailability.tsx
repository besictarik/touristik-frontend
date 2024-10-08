"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Dictionary, SupportedLanguage } from "@/lib/types/definitions";
import { getAvailability } from "@/lib/data";
import { getDayBookingStatus } from "@/lib/utils";

const CalendarAvailability = ({
  title,
  lang,
  availabilityURL,
}: {
  title: Dictionary["Listing"]["availability"];
  lang: SupportedLanguage;
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
          return getDayBookingStatus(bookedRanges, date, view);
        }}
        locale={lang}
        showDoubleView={true}
        prev2Label={null}
        next2Label={null}
        minDetail="month"
      />
    </div>
  );
};

export default CalendarAvailability;
