"use client";
import React from "react";
import GridCell from "./GridCell";
import {
  buildMonthGrid,
  formatDate,
  monthNames,
  dayNames,
} from "@/utils/calendarHelpers";
import { CalendarEvent } from "@/context/EventContext";

type MonthGridProps = {
  today: Date;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  events?: CalendarEvent[];
  onCellClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
};

const MonthGrid: React.FC<MonthGridProps> = ({
  today,
  currentYear,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  selectedDay,
  setSelectedDay,
  events = [],
  onCellClick,
  onEventClick,
}) => {
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  const monthCells = buildMonthGrid(currentYear, currentMonth);

  return (
    <div className="w-full">
      {/* Days of Week */}
      <div className="grid grid-cols-7 border-b border-[#dedbd2] bg-white sticky top-0 z-10">
        {dayNames.map((day) => (
          <div
            key={day}
            aria-label={day}
            role="columnheader"
            className="py-2 px-1 text-center font-semibold text-[#444746] border-r border-[#dedbd2] last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Days Grid */}
      <div
        className="grid grid-cols-7 grid-rows-6 bg-white border-l border-r border-b border-[#dedbd2]"
        role="row"
      >
        {monthCells.map((date, idx) => {
          const isToday =
            !!date &&
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const isSelected =
            !!date &&
            date.getDate() === selectedDay &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear;

          const cellEvents =
            date && events.filter((ev) => ev.date === formatDate(date));

          return (
            <GridCell
              key={idx}
              date={date}
              isToday={isToday}
              isSelected={isSelected}
              onClick={
                date
                  ? () => {
                      setSelectedDay(date.getDate());
                      onCellClick && onCellClick(date);
                    }
                  : undefined
              }
            >
              {cellEvents && cellEvents.length > 0 && (
                <div className="mt-5 flex flex-col gap-1">
                  {cellEvents.map((event) => (
                    <div
                      key={event.id}
                      role="button"
                      tabIndex={0}
                      className="rounded px-1 py-0.5 text-xs text-white truncate cursor-pointer"
                      style={{ background: event.color || "#b7c9e2" }}
                      title={`${event.title} (${event.startTime}-${event.endTime})`}
                      aria-label={`Event: ${event.title}, ${event.startTime}–${event.endTime}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                    >
                      <span className="font-bold">
                        {event.startTime}–{event.endTime}
                      </span>{" "}
                      {event.title}
                    </div>
                  ))}
                </div>
              )}
            </GridCell>
          );
        })}
      </div>
    </div>
  );
};

export default MonthGrid;
