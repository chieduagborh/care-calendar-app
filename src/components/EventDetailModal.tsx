import React from "react";
import { CalendarEvent } from "@/context/EventContext";

type EventDetailModalProps = {
  event: CalendarEvent | null;
  onClose: () => void;
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
}) => {
  if (!event) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="font-bold text-lg mb-4">{event.title}</h2>
        <div className="mb-2">
          <span className="font-semibold">Date:</span> {event.date}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Time:</span> {event.startTime} -{" "}
          {event.endTime}
        </div>
        {event.description && (
          <div className="mb-2">
            <span className="font-semibold">Description:</span>{" "}
            {event.description}
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 rounded bg-[#b7c9e2] text-white font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventDetailModal;
