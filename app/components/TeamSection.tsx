
"use client";
import React, { useState, useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
}

export default function TeamSection({ lang }: { lang: any }) {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/team");
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setTeamData(result.data.map((member: any) => ({
            id: member.id,
            name: lang === "mn" ? member.mn_name : member.en_name,
            position: lang === "mn" ? member.mn_position : member.en_position,
            description: lang === "mn" ? member.mn_description : member.en_description,
            image: member.image_url,
          })));
        } else {
          setTeamData([]);
          setError("Team data not found");
        }
      } catch (err) {
        setTeamData([]);
        setError("Team API fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div><p className="mt-3">Team loading...</p></div>;
  }
  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

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
