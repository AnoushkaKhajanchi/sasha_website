
import React from "react";

const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: "Liquid Ether Visual",
    role: "Lead prototyper + visual designer; ran user tests and built motion system.",
    summary:
      "A shader-driven fluid background built with canvas + React. This card shows how a wide image sits on the left with a flexible text area on the right.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
    tags: ["WebGL", "React", "Canvas"],
  },
  {
    id: 2,
    title: "Ergonomics Jig",
    summary:
      "Rapid prototype for driver-fit testing. Includes adjustable hard points, quick clamps, and repeatable measurement references.",
    image:
      "https://images.unsplash.com/photo-1581093588401-16ec8a6a57c0?q=80&w=1200&auto=format&fit=crop",
    tags: ["MechE", "Prototyping", "Testing"],
  },
  {
    id: 3,
    title: "P-Pod Cushion",
    summary:
      "Wheelchair-friendly cushion concept with integrated pump/tube system for comfort and hygiene. Iterated via silicone + resin prints.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    tags: ["HCD", "Silicone", "Manufacturing"],
  },
];

export default function ProjectsPage({ projects = SAMPLE_PROJECTS }) {
  return (
    <div className="App" style={{ backgroundColor: '#f7f7ff7e' }}>
    <div className="page">
      <header className="header">
        <h1 className="title">Projects</h1>
      </header>

      <main className="stack">
        {projects.map((p) => (
          <article key={p.id} className="card" role="region" aria-label={p.title}>
            <div className="imageWrap">
              <img src={p.image} alt={p.title} className="image" />
            </div>

            <div className="content">
              <h2 className="cardTitle">{p.title}</h2>
              {p.role ? <p className="role">{p.role}</p> : null}
              <p className="summary">{p.summary}</p>

              {p.tags && p.tags.length > 0 ? (
                <div className="tags">
                  {p.tags.map((t, i) => (
                    <span key={i} className="tag">{t}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </main>

      <style>{`
        :root {
          --bg: #0b0b0c;
          --card: #111216;
          --ink: #102247ff;
          --muted: #a3a7ad;
          --ring: rgba(255,255,255,0.08);
          --border: rgba(255,255,255,0.12);
        }

        * { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }

        /* Page + scroll container */
        .page { max-width: 1100px; margin: 0 auto; padding: 24px; min-height: 100vh; display: flex; flex-direction: column;  }
        .header { display: flex; align-items: center; justify-content: flex-start; margin-bottom: 20px; }
        .title { font-size: 28px; letter-spacing: 0.02em; font-weight: 700; margin: 0; }
        .stack { display: grid; gap: 16px; flex: 1; overflow-y: auto; padding-right: 6px; overscroll-behavior: contain; }

        /* Scrollbar styling (safe no-ops if unsupported) */
        .stack::-webkit-scrollbar { width: 10px; }
        .stack::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 8px; }
        .stack::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 8px; }
        .stack { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) rgba(255,255,255,0.03); }

        /* Cards */
        .card {
          display: flex;
          background: #efe6efff;       
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
          min-height: 180px;
        }
        .card:hover { transform: translateY(-2px); border-color: var(--ring); box-shadow: 0 12px 40px rgba(0,0,0,0.45); }

        .imageWrap { flex: 0 0 260px; max-width: 260px; position: relative; background: #0e0f12; }
        .image { width: 100%; height: 100%; object-fit: cover; display: block; }

        .content { flex: 1; padding: 18px; display: flex; flex-direction: column; gap: 10px; }
        .cardTitle { font-size: 20px; font-weight: 700; margin: 0; line-height: 1.2; }
        .role { margin: 0; color: var(--muted); font-size: 14px; opacity: 0.9; }
        .summary { margin: 0; color: var(--muted); line-height: 1.6; }

        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .tag { font-size: 12px; padding: 6px 10px; border: 1px solid var(--border); border-radius: 999px; background: rgba(255,255,255,0.03); }

        /* Responsive */
        @media (max-width: 720px) {
          .card { flex-direction: column; }
          .imageWrap { flex-basis: auto; max-width: none; }
        }
      `}</style>
    </div>
    </div>
  );
}
