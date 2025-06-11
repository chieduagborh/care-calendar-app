"use client";
import React, { createContext, useContext, useState } from "react";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  color?: string;
};

type EventContextType = {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const ctx = useContext(EventContext);
  if (!ctx)
    throw new Error("useEventContext must be used within EventProvider");
  return ctx;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // Simple auto-increment id for demo purposes
  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    setEvents((prev) => {
      const newEvent = {
        ...event,
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
      };
      const all = [...prev, newEvent];
      // Sort by date then startTime
      return all.sort((a, b) =>
        a.date === b.date
          ? a.startTime.localeCompare(b.startTime)
          : a.date.localeCompare(b.date)
      );
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
