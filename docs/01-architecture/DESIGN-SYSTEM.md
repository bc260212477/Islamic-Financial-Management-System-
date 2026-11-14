# DESIGN-SYSTEM.md — Design System v4.0 (Directive Part 5; extends UI-DESIGN.md)

Philosophy: **Quiet Confidence** — private bank, not crypto startup. Restraint over decoration; numbers as heroes (Fraunces display serif); whitespace as trust.

## Anti-childish checklist (reject before review — Part 1.4)
≤3 font weights/screen · ≤2 accents/screen · no pure black/white · shadows fall downward only · radius ≥8px on interactive elements · icons one stroke family · UI animation ≤400ms · every animation has a stated purpose · every chart has legend + timestamp · every empty state has a primary action.

## Tokens
Elevation 0–5 (warm-tinted shadows, from none to command-palette depth) — values in the directive §5.1, mirrored in `apps/web/styles.css`.
Color: surface base #F7F3EA / raised #FFFDF8 / sunken #EFEAD9 / overlay rgba(26,24,20,.4); text #1A1814 / #4A443A / #8A8274 / inverse #F4EFE3; success #2D6A4F, warning #B8902E, danger #B23A2D, info #3A6EA5 (each with 10% tint backgrounds); gold accent + deep green remain the product accents.
Typography: fluid `clamp()` scale xs→4xl (§5.1); Fraunces for numerals/headings, Inter body.
Breakpoints: 375 / 768 / 1024 / 1280 / 1536. Mobile: single column, bottom nav, tables→card lists, charts simplified.

## Components (27 — each: props, 8 states per MOTION-SYSTEM.md, dark + RTL + reduced-motion, preview page)
Button, Card, Badge, Input, Select, Toggle, Checkbox, Radio, Modal, Drawer, Toast, Tooltip, Dropdown, Tabs, Accordion, Avatar, Skeleton, Empty State, Progress (bar/ring), Chart wrapper (line/bar/area/donut/heatmap), KPI Circle (real % only), Table, Pagination, Breadcrumb, Command Palette, Sidebar, Topbar.
Math the founder should hold us to: 27 × 8 states × 3 modes = **648 visual test cases** before the library is "done" (v0.2 scope).

## Page inventory (~60, Part 5.3)
Auth (5) · Onboarding (7) · Dashboard · Money (6) · Family (5) · Habits (4) · Routine (3) · Tasks (3) · Learning (4) · Business (4) · Investments (5) · Markets (3) · Worship (5) · Health (4) · Legacy (4) · Community (3) · AI (3) · Platform (7) · Public (4). Existing web app pages map to this inventory in DAILY-V4-V01 audit.
