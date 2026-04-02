"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import AnimatedSection from "./AnimatedSection";

// Standard way to detect hydration in React 18+ to avoid the strict 
// "no setState in useEffect" lint rule while still preventing hydration mismatch.
const subscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function GithubHeatmapSection({
  username,
}: {
  username: string;
}) {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const currentYear = new Date().getFullYear();

  // Neutral palette aligned with the portfolio's monochrome design language.
  const heatmapTheme = {
    light: ["#f1f1f1", "#dfdfdf", "#bfbfbf", "#8f8f8f", "#5c5c5c"],
    dark: ["#121212", "#2a2a2a", "#484848", "#7b7b7b", "#d1d1d1"],
  };

  return (
    <section className="section" id="github-contributions">
      <div className="container">
        <AnimatedSection variant="fade">
          <div className="section-header">
            <h2 className="section-title">GitHub activity</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="rise" delay={0.12}>
          <div className="card github-heatmap-card">
            <div className="heatmap-container">
              {mounted ? (
                <GitHubCalendar
                  username={username}
                  year={currentYear}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  theme={heatmapTheme}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  showColorLegend={true}
                  showWeekdayLabels={false}
                  labels={{
                    totalCount: "{{count}} contributions in " + currentYear,
                  }}
                />
              ) : (
                <div className="heatmap-skeleton" />
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
