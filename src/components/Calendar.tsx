"use client";
import React, { useState, useEffect, useMemo } from "react";
import { formatDate } from "@/utils/calendarHelpers";
import { useEventContext, CalendarEvent } from "@/context/EventContext";
import TopBar from "./TopBar";
import MonthGrid from "./MonthGrid";
import DayGrid from "./DayGrid";
import WeekGrid from "./WeekGrid";
import AddEventModal from "./AddEventModal";
import EventDetailModal from "./EventDetailModal";
type ViewMode = "month" | "week" | "day";

const Calendar: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string | undefined>(undefined);

  const { events } = useEventContext();

  const [eventDetail, setEventDetail] = useState<CalendarEvent | null>(null);
  useEffect(() => {
    if (viewMode === "month") {
      if (
        currentYear === today.getFullYear() &&
        currentMonth === today.getMonth()
      ) {
        setSelectedDay(today.getDate());
      } else {
        setSelectedDay(1);
      }
    } else if (viewMode === "week") {
      const current = new Date(currentYear, currentMonth, selectedDay);
      const sunday = new Date(current);
      sunday.setDate(current.getDate() - current.getDay());
      setSelectedDay(sunday.getDate());
    }
  }, [currentYear, currentMonth, today, viewMode, selectedDay]);

  const openEventModal = (date?: Date) => {
    setModalOpen(true);
    if (date) {
      setModalDate(formatDate(date));
    } else if (viewMode === "day") {
      setModalDate(formatDate(today));
    } else {
      setModalDate(undefined);
    }
  };

  const closeEventModal = () => {
    setModalOpen(false);
    setModalDate(undefined);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f7f6f3] dark:bg-[#23272b] transition-colors duration-300">
      <TopBar
        today={today}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        viewMode={viewMode}
        setViewMode={setViewMode}
        createEventClick={openEventModal}
      />

      {/* Use flex-col on mobile, row on md+ screens */}
      <div className="flex flex-col md:flex-row flex-1">
        <main className="flex-1 relative px-2 py-2 sm:px-4 sm:py-4 bg-white dark:bg-[#23272b] transition-colors duration-300">
          {viewMode === "month" && (
            <MonthGrid
              today={today}
              currentYear={currentYear}
              setCurrentYear={setCurrentYear}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onCellClick={openEventModal}
              onEventClick={setEventDetail}
              events={events}
            />
          )}
          {viewMode === "week" && (
            <WeekGrid
              today={today}
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onCellClick={openEventModal}
              onEventClick={setEventDetail}
              events={events}
            />
          )}
          {viewMode === "day" && (
            <DayGrid
              today={today}
              currentYear={currentYear}
              currentMonth={currentMonth}
              selectedDay={selectedDay}
              onEventClick={setEventDetail}
              events={events}
            />
          )}
        </main>
      </div>
      <AddEventModal
        open={modalOpen}
        onClose={closeEventModal}
        defaultDate={modalDate}
      />

      <EventDetailModal
        onClose={() => setEventDetail(null)}
        event={eventDetail}
      />
    </div>
  );
};

export default Calendar;
