## Getting Started

First, install the packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Responsive Calendar: Switch between month, week, and day views.
- Create & View Events: Click any day or use the "+ Event" button to add events. Click on events to view details.
- Dark/Light Mode: Easily toggle between light and dark theme from the top bar.

## Usage

- Switch Views: Use the toggle in the top bar to change calendar views.
- Add an Event: Click on a calendar cell or the "+ Event" button.
- Toggle Theme: Click the sun/moon button in the top bar to switch between dark and light mode.

## Architecture & Design Decisions

- State Management:

  - The app uses React context (EventProvider) for global event state (add/view events).

- Component Structure:

  - Calendar is the main container.
  - TopBar (navigation, view toggles, "+ Event" button, dark/light switch button).
  - MonthGrid, WeekGrid, DayGrid for different calendar views (each takes events, handlers, and current date state).
  - AddEventModal and EventDetailModal for event creation/viewing.
  - GridCell for a reusable, event-aware day cell with accessibility and keyboard navigation support.

- Styling:

  - Tailwind CSS.
  - Dark mode using a ThemeProvider and dark class on <html>, with user preference saved in localStorage.

- Accessibility:
  - Modal dialogs have correct roles and aria-modal .
  - Event grid cells support aria-selected.

## Known Issues & Limitations

- Toggle Theme:

  - The dark/light mode toggle is currently not working. While the toggle button is present in the UI and theme logic implemented, switching between themes does not update the app as intended.

- Event Features:

  - Basic validation (e.g start < time ) is not enforced.

- Date/Time Handling:
  - Simple string format for date/time (no time zone logic).
