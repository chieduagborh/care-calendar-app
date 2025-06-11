import React from "react";

export type ViewMode = "month" | "week" | "day";

type ViewToggleProps = {
  viewMode: ViewMode;
  setViewMode: (view: ViewMode) => void;
};

const buttons: { label: string; value: ViewMode }[] = [
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => (
  <div className="flex gap-2 justify-center">
    {buttons.map((btn) => (
      <button
        key={btn.value}
        className={`px-3 py-1 rounded-md font-medium transition border cursor-pointer
          ${
            viewMode === btn.value
              ? "bg-[#e6b8a2] text-white border-[#e6b8a2]"
              : "bg-[#f7f6f3] text-[#6c757d] border-[#dedbd2] hover:bg-[#dedbd2]"
          }
        `}
        onClick={() => setViewMode(btn.value)}
        aria-pressed={viewMode === btn.value}
      >
        {btn.label}
      </button>
    ))}
  </div>
);

export default ViewToggle;
