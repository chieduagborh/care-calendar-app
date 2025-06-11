export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const dayNames = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function pad(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}


export function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);
  const grid: (Date | null)[] = [];
 
  for (let i = 0; i < firstDayOfWeek; i++) grid.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(new Date(year, month, day));
  }

  while (grid.length < 42) grid.push(null);

  return grid;
}

export function getWeekDates(year: number, month: number, day: number): Date[] {
  const selectedDate = new Date(year, month, day);
 
  const sunday = new Date(selectedDate);
  sunday.setDate(selectedDate.getDate() - selectedDate.getDay());
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

export function formatDate(date: Date | string | undefined | null): string {
  if (!date) return ""; 
  const d = typeof date === "string" ? new Date(date) : date;
  if (!(d instanceof Date) || isNaN(d.getTime())) {
    return "";
  }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}