import React from "react";
import ViewToggle from "./ViewToggle";
import { monthNames } from "@/utils/calendarHelpers";
import { useTheme } from "@/context/ThemeContext";

type TopBarProps = {
  today: Date;
  currentYear: number;
  setCurrentYear: (year: number) => void;
  currentMonth: number;
  setCurrentMonth: (month: number) => void;
  setSelectedDay: (day: number) => void;
  selectedDay: number;
  viewMode: "month" | "week" | "day";
  setViewMode: (mode: "month" | "week" | "day") => void;
  createEventClick: () => void;
};

const TopBar: React.FC<TopBarProps> = ({
  today,
  currentYear,
  setCurrentYear,
  currentMonth,
  setCurrentMonth,
  setSelectedDay,
  viewMode,
  setViewMode,
  selectedDay,
  createEventClick,
}) => {
  const { theme, toggleTheme } = useTheme();

  function setCurrentDate(date: Date) {
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
    setSelectedDay(date.getDate());
  }

  const goToPrev = () => {
    if (viewMode === "month") {
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (viewMode === "week") {
      const current = new Date(currentYear, currentMonth, selectedDay);
      current.setDate(current.getDate() - 7);
      setCurrentDate(current);
    } else if (viewMode === "day") {
      const current = new Date(currentYear, currentMonth, selectedDay);
      current.setDate(current.getDate() - 1);
      setCurrentDate(current);
    }
  };

  const goToNext = () => {
    if (viewMode === "month") {
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (viewMode === "week") {
      const current = new Date(currentYear, currentMonth, selectedDay);
      current.setDate(current.getDate() + 7);
      setCurrentDate(current);
    } else if (viewMode === "day") {
      const current = new Date(currentYear, currentMonth, selectedDay);
      current.setDate(current.getDate() + 1);
      setCurrentDate(current);
    }
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  return (
    <header className="flex flex-col gap-2 md:flex-row md:justify-evenly md:items-center px-2 py-2 sm:px-4 bg-white dark:bg-[#23272b] shadow border-b border-[#e9ece5] dark:border-[#363a43] w-full">
      {/* Top row: buttons & navigation */}
      <div className="flex flex-wrap gap-2 md:gap-6 items-center justify-center">
        <button
          className="px-3 py-2 bg-[#e6b8a2] dark:bg-[#b7c9e2] text-white rounded font-semibold shadow hover:bg-[#b7c9e2] dark:hover:bg-[#e6b8a2] cursor-pointer text-sm sm:text-base"
          onClick={createEventClick}
        >
          + Create
        </button>
        <button
          className="px-2 py-1 rounded bg-[#e9ece5] dark:bg-[#363a43] text-[#6c757d] dark:text-[#f7f6f3] hover:bg-[#dedbd2] dark:hover:bg-[#23272b] cursor-pointer text-sm sm:text-base"
          onClick={goToPrev}
          aria-label="Previous"
        >
          &#8592;
        </button>
        <button
          className="px-2 py-1 rounded bg-[#dedbd2] dark:bg-[#363a43] text-[#6c757d] dark:text-[#f7f6f3] hover:bg-[#e6b8a2] dark:hover:bg-[#b7c9e2] hover:text-white cursor-pointer text-sm sm:text-base"
          onClick={goToToday}
        >
          Today
        </button>
        <button
          className="px-2 py-1 rounded bg-[#e9ece5] dark:bg-[#363a43] text-[#6c757d] dark:text-[#f7f6f3] hover:bg-[#dedbd2] dark:hover:bg-[#23272b] cursor-pointer text-sm sm:text-base"
          onClick={goToNext}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>

      <span className="font-bold text-center text-base sm:text-lg text-[#6c757d] dark:text-[#f7f6f3] my-2 md:my-0 justify-center">
        {monthNames[currentMonth]} {currentYear}
      </span>

      <div className="flex items-center gap-2 md:gap-4 justify-center">
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        <button
          className="p-2 rounded border border-[#dedbd2] dark:border-[#363a43] hover:bg-[#e9ece5] dark:hover:bg-[#23272b] text-xs sm:text-base"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
