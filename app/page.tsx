"use client";

import { useEffect, useState, Suspense } from "react";
import ScreenStart from "./components/ScreenStart";
import MainContent from "./components/MainContent";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => clearTimeout(contentTimer);
  }, []);

  return (
    <div className="h-screen">
      <Suspense fallback={null}>
        <ScreenStart />
      </Suspense>
      {showContent && (
        <Suspense fallback={null}>
          <MainContent />
        </Suspense>
      )}
    </div>
  );
}
