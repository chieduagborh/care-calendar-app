import React, { useState, useEffect } from "react";
import { useEventContext } from "@/context/EventContext";

type AddEventModalProps = {
  open: boolean;
  onClose: () => void;
  defaultDate?: string; // e.g., "2025-06-11"
};

const AddEventModal: React.FC<AddEventModalProps> = ({
  open,
  onClose,
  defaultDate,
}) => {
  const { addEvent } = useEventContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate || "");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setDate(defaultDate || "");
      setStartTime("09:00");
      setEndTime("10:00");
    }
  }, [open, defaultDate]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !startTime || !endTime) return;
    addEvent({ title, date, startTime, endTime, description });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
      role="presentation"
      aria-hidden={!open}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-[#1f1f1f]"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="font-bold text-lg mb-4 ">Create Event</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border rounded px-2 py-1"
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="border rounded px-2 py-1"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border rounded px-2 py-1"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1 flex-1"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              className="border rounded px-2 py-1 flex-1"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-[#b7c9e2] text-white rounded px-4 py-2 hover:bg-[#6c757d] transition cursor-pointer"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-[#dedbd2] text-[#6c757d] rounded px-4 py-2 cursor-pointer"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
