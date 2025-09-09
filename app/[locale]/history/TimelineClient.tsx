"use client";

import React from "react";

type Item = {
  year: string;
  title?: string;
  desc: string;
};

export default function TimelineClient({ timeline }: { timeline: Item[] }) {
  return (
    <ul className="timeline">
      {timeline.map((item, idx) => (
        <li key={idx}>
          <div className={idx % 2 === 0 ? "direction-r" : "direction-l"}>
            <div className="flag-wrapper">
              <span className="hexa"></span>
              <span className="time-wrapper">
                <span className="time">{item.year}</span>
              </span>
            </div>
            <div className="desc">{item.desc}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
