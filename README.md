# TechNova Engineering College – Digital Twin · Smart Campus · Resilient Institution

A frontend-only prototype of a dark-themed admin dashboard for a smart campus digital twin. Built with React + Vite + TypeScript + Tailwind CSS. No backend, no auth, no environment variables — all data is mock data.

## Tech Stack

- **React 18** + **Vite 7** + **TypeScript**
- **Tailwind CSS 3** — dark navy theme with custom color system
- **lucide-react** — icons
- **Recharts** — chart library (available for future charts)
- **@react-three/fiber + drei + three.js** — 3D campus digital twin (lazy-loaded, falls back to isometric SVG)
- **React Flow** — cascading impact graph on the simulation page
- **Zustand** — client-side state management

## How to Run

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run typecheck # type check
```

The dev server starts automatically — just open the preview.

## Features

### Dashboard
- **5 stat cards** with gradient backgrounds (Buildings, Classrooms, Labs, Faculty, Students)
- **3D Campus Digital Twin** — rotate/zoom a low-poly campus with 3 buildings, track, roads, trees. Click a building to open a side panel with rooms, labs, power status, and subsystems. Falls back to isometric SVG if three.js can't load.
- **System Health Overview** — circular progress ring (92% → 96% after recovery) with a 6-item checklist and active alerts box
- **Failure Detection** — red "High" badge card with "View Impact" button
- **Cascading Impact Analysis** — mini node-graph with affected systems/students/faculty stats
- **Recovery Planner** — numbered recommended actions with "Approve Plan" button
- **Resource Availability** — progress bars for classrooms, labs, hostels, transport
- **Upcoming Events** — placement drive, cultural fest, internal exam
- **Campus Map** — top-down SVG with pulsing marker, zoom controls, live toggle

### Cascading Simulation Page
- Full React Flow graph with the failure at center and affected nodes spreading across 3 hops
- Hover any node to see why it was affected
- MiniMap, Controls, and a detail panel

### Inject Failure Modal (What-if)
- Choose failure type (faculty absent, power cut, lab equipment, bus breakdown, exam double-booked, network outage)
- Choose target (Block A/B/C or a faculty name)
- See mock cascade result and 3 ranked recovery plans with trade-offs (students affected, workload fairness score)
- Injecting navigates to the simulation page

### Recovery Animation
- "Approve Plan" triggers: affected students 520 → 40, Block A marker turns amber, health ring rises 92% → 96%, alerts clear, toast appears

### Role Switcher
- Switch between Admin / Faculty / Student via the avatar dropdown
- **Admin** — full dashboard
- **Faculty** — shows their schedule with relocated sessions and substitution requests
- **Student** — shows "My Day" timetable with only changes that affect them

### Other
- Notification center (bell icon) with Urgent/Important/FYI priority levels, filtered by role
- Live clock in the top bar
- Status pill changes between "All Systems Operational" (green) and "1 Active Failure" (red)
- Skeleton loading on first render
- Responsive: desktop first, stacks cleanly on tablet and mobile
- Sidebar collapses into a hamburger drawer on mobile

## Project Structure

```
src/
├── components/        # UI components (sidebar, topbar, cards, modals, 3D canvas)
├── pages/             # Route pages (dashboard, cascading simulation, page shells, role views)
├── data/mock.ts       # All mock data in one file
├── store/useStore.ts  # Zustand store (failure state, role, toasts, UI overlays)
├── App.tsx            # Main app with page router
└── index.css          # Tailwind + custom theme
```

## Notes

- The 3D canvas is lazy-loaded and code-split — it loads after the initial dashboard paint
- If three.js fails to load, an isometric SVG illustration with the same click behavior is shown as fallback
- All interactions are simulated in client state — no network calls, no persistence
