# Project memory

## Product intent & audience

- Smart campus digital twin dashboard prototype for campus administrators, faculty, and students.
- Core features: 3D campus digital twin, real-time system health monitoring, cascading failure simulation, interactive recovery planner.
- Client-side only prototype — Zustand store manages all state, no backend or auth.
- Role-based views: Admin (full dashboard), Faculty (schedule + substitution requests), Student ("My Day" timetable highlighting affected sessions).

## Brand personality & voice

- Internal tool aesthetic: technical, authoritative, data-dense but clear.
- Branded as "TechNova" in UI copy.
- Status and alert language is concise and action-oriented (e.g., health percentages, alert counts, recovery trade-offs).

## Visual design & UX direction

- Dark theme throughout.
- Gradient stat cards (five in top row).
- 3D twin: low-poly campus — 3 buildings, running track, roads, trees, floating labels; click building to inspect; canvas lazy-loads with static SVG fallback.
- System health shown as ring/percentage with checklist and active alerts.
- Mid row: failure detection card, cascading impact mini-graph, recovery planner.
- Bottom row: resource bars, events feed, campus map with pulsing marker + zoom.
- Cascading simulation page: full React Flow graph, 3-hop failure spread, node hover explains impact.
- Inject Failure modal: 6 failure types, target selection, mock cascade results, 3 ranked recovery plans with trade-offs.
- Recovery animation: student count drops, building turns amber, health ring increases, alerts clear, success toast.
- Avatar dropdown contains role switcher.
- Responsive layout; three.js chunk-size advisory expected and accepted.

## Decisions, constraints & rationale

- State: Zustand (client-side, no backend/auth).
- 3D: three.js with lazy-loaded canvas + static SVG fallback (removed redundant lazy wrapper to fix dynamic/static import overlap).
- Graph viz: React Flow for cascade simulation.
- Font @import placed before Tailwind import to fix CSS import-order warning.
- Build passes cleanly; only remaining advisory is three.js chunk size (expected).
- README included with run instructions.

## Open questions & assumptions

- All cascade results and recovery plans are mock data — real simulation engine and backend integration are out of scope for this prototype.
- Role switching is UI-only; no actual auth or permissions enforcement.
- 3D scene is simplified low-poly; not a geographically accurate campus model.