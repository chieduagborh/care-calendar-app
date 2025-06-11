import React from "react";
import GridCell from "./GridCell";
import { getWeekDates, formatDate, dayNames } from "../utils/calendarHelpers";
import { CalendarEvent } from "@/context/EventContext";

type WeekGridProps = {
  today: Date;
  currentYear: number;
  currentMonth: number;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onCellClick?: (date: Date) => void;
};

const WeekGrid: React.FC<WeekGridProps> = ({
  today,
  currentYear,
  currentMonth,
  selectedDay,
  setSelectedDay,
  events = [],
  onEventClick,
  onCellClick,
}) => {
  const weekDates = getWeekDates(currentYear, currentMonth, selectedDay);

  return (
    <div className="w-full" role="grid" aria-label="Calendar week" tabIndex={0}>
      {/* Day name header row */}
      <div
        className="grid grid-cols-7 border-b border-[#dedbd2] bg-white sticky top-0 z-10"
        role="row"
      >
        {weekDates.map((date, idx) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          return (
            <div
              key={idx}
              role="columnheader"
              className={`flex flex-col items-center py-2 border-r border-[#dedbd2] last:border-r-0 ${
                isToday ? "font-bold text-[#e6b8a2]" : "text-[#6c757d]"
              }`}
              aria-sort="none"
              aria-label={`${
                dayNames[date.getDay()]
              }, ${date.toLocaleDateString(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}${isToday ? " (today)" : ""}`}
            >
              <span className="text-xs font-semibold">
                {dayNames[date.getDay()]}
              </span>
              <span
                className={`text-base font-semibold mt-1 ${
                  isToday ? "bg-[#e6b8a2] text-white rounded px-2" : ""
                }`}
              >
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Week row of days */}
      <div
        className="grid grid-cols-7 bg-white border-l border-r border-b border-[#dedbd2]"
        role="row"
      >
        {weekDates.map((date, idx) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
          const isSelected =
            date.getDate() === selectedDay &&
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear;

          const cellEvents = events.filter(
            (ev) => ev.date === formatDate(date)
          );

          return (
            <GridCell
              key={idx}
              date={date}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => {
                setSelectedDay(date.getDate());
                onCellClick && onCellClick(date);
              }}
            >
              {cellEvents.length > 0 && (
                <div className="mt-5 flex flex-col gap-1">
                  {cellEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded px-1 py-0.5 text-xs text-white truncate cursor-pointer"
                      style={{ background: event.color || "#b7c9e2" }}
                      title={`${event.title} (${event.startTime}-${event.endTime})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick && onEventClick(event);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Event: ${event.title}, ${event.startTime}–${event.endTime}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onEventClick && onEventClick(event);
                        }
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

export default WeekGrid;
