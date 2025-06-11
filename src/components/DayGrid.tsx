import React from "react";
import { formatDate } from "@/utils/calendarHelpers";
import { CalendarEvent } from "@/context/EventContext";

type DayGridProps = {
  today: Date;
  currentYear: number;
  currentMonth: number;
  selectedDay: number;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
};

const DayGrid: React.FC<DayGridProps> = ({
  today,
  currentYear,
  currentMonth,
  selectedDay,
  events = [],
  onEventClick,
}) => {
  const date = new Date(currentYear, currentMonth, selectedDay);
  const dayEvents = events.filter((ev) => ev.date === formatDate(date));

  return (
    <div className="bg-white rounded-lg p-4 shadow border border-[#dedbd2] w-full max-w-lg mx-auto">
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-lg font-bold text-[#6c757d]">
          {date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear() && (
            <span className="ml-2 bg-[#e6b8a2] text-white text-xs px-2 py-0.5 rounded">
              Today
            </span>
          )}
      </div>
      {dayEvents.length === 0 ? (
        <div className="text-[#b7c9e2] text-sm">No events.</div>
      ) : (
        <ul className="space-y-2">
          {dayEvents.map((event) => (
            <li
              key={event.id}
              className="bg-[#b7c9e2] text-white rounded px-4 py-2 flex flex-col cursor-pointer hover:bg-[#e6b8a2]"
              title={event.title}
              onClick={() => {
                if (onEventClick) onEventClick(event);
              }}
            >
              <div className="font-bold">
                {event.startTime}–{event.endTime}
              </div>
              <div className="truncate">{event.title}</div>
              {event.description && (
                <div className="text-xs opacity-80 mt-1">
                  {event.description}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayGrid;
