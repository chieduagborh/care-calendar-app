import React from "react";

type GridCellProps = {
  date: Date | null;
  isToday: boolean;
  isSelected: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const GridCell: React.FC<GridCellProps> = ({
  date,
  isToday,
  isSelected,
  onClick,
  children,
}) => {
  if (!date)
    return (
      <div
        role="presentation"
        aria-hidden="true"
        className="bg-[#fafaf7] min-h-[64px] border-r border-b border-[#dedbd2]"
      />
    );

  // Descriptive label for screen readers
  const ariaLabel = `Day ${date.getDate()}, ${date.toLocaleDateString(
    undefined,
    {
      month: "long",
      year: "numeric",
    }
  )}${isToday ? " (today)" : ""}`;

  return (
    <div
      role="gridcell"
      tabIndex={0}
      aria-selected={isSelected}
      aria-current={isToday ? "date" : undefined}
      aria-label={ariaLabel}
      className={`relative min-h-[64px] border-r border-b border-[#dedbd2] px-2 pt-1 cursor-pointer transition
        ${isToday ? "bg-[#e6b8a2]/30 ring-2 ring-[#e6b8a2]" : ""}
        ${isSelected ? "bg-[#b7c9e2]/20" : ""}
        hover:bg-[#c3c9bd]/10
      `}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span
        className={`absolute top-1 right-2 text-xs font-semibold select-none
          ${isToday ? "text-[#e6b8a2]" : "text-[#8a817c]"}
        `}
      >
        {date.getDate()}
      </span>
      <div className="mt-5 flex flex-col gap-1 max-h-16 overflow-y-auto overscroll-y-auto">
        {children}
      </div>
    </div>
  );
};

export default GridCell;
