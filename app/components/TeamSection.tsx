"use client";

import React, { useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
}

export default function TeamSection({ teamData }: { teamData: TeamMember[] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="row g-5">
        {teamData.map((member) => (
          <div key={member.id} className="col-xl-4 col-lg-4 col-md-6">
            <div 
              className="team-card"
              onClick={() => setSelectedMember(member)}
            >
              <div className="team-card-image">
                <img src={member.image} alt={member.name} />
                <div className="team-card-overlay">
                  <span className="view-profile-text">View Profile</span>
                </div>
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{member.name}</h3>
                <span className="team-card-position">{member.position}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedMember && (
        <div 
          className="team-modal-overlay"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="team-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="team-modal-close"
              onClick={() => setSelectedMember(null)}
            >
              ×
            </button>
            <div className="team-modal-body">
              <div className="team-modal-image">
                <img src={selectedMember.image} alt={selectedMember.name} />
              </div>
              <div className="team-modal-details">
                <h2 className="team-modal-name">{selectedMember.name}</h2>
                <span className="team-modal-position">{selectedMember.position}</span>
                <div className="team-modal-description">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedMember.description
                        .split("\n")
                        .map((paragraph: string) => `<p>${paragraph}</p>`)
                        .join(""),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
