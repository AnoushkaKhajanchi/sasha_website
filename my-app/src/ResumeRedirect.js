
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResumeRedirect() {
  const aRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const publicBase =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) ||
    (typeof process !== "undefined" && process.env?.PUBLIC_URL) ||
    "/";

  const pdfUrl = `/resume/Sasha_Khajanchi_DesignResume.pdf`;

  useEffect(() => {
    const key = `opened:${location.key}`; // unique per navigation
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1"); // mark as opened once for this nav
      aRef.current?.click();            // trigger new tab
    }
    navigate("/", { replace: true });   // bounce current tab
  }, [navigate, location]);

  return (
    <a
      ref={aRef}
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "none" }}
    >
      Open Resume
    </a>
  );
}
