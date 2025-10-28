"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TeamListPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then(res => res.json())
      .then(data => {
        setTeam(data.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-10 rounded-xl shadow-2xl max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 drop-shadow-lg tracking-wide text-center">Management team</h1>
      <div className="flex justify-end mb-8">
        <Link href="/admin/team/create" className="btn btn-primary text-xl text-gray-800 font-bold px-8 py-3 shadow rounded-lg transition hover:bg-blue-700 hover:text-white">+ Add Team Member</Link>
      </div>
      {loading ? (
        <div className="text-2xl font-bold text-blue-700 animate-pulse text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-200 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-blue-200">
                <th className="text-xl font-bold text-gray-700 py-4 px-4 text-left">Name</th>
                <th className="text-xl font-bold text-gray-700 py-4 px-4 text-center">Image</th>
                <th className="text-xl font-bold text-gray-700 py-4 px-4 text-left">Position</th>
                <th className="text-xl font-bold text-gray-700 py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member: any) => (
                <tr key={member.id} className="hover:bg-blue-100 transition duration-200">
                  <td className="font-bold text-xl py-3 px-4 align-middle text-gray-700">{member.mn_name}</td>
                  <td className="py-3 px-4 text-center">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.mn_name} className="w-20 h-20 object-cover rounded-full border-4 border-blue-300 shadow-lg mx-auto" />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full border-4 border-gray-200 mx-auto text-sm">No Image</div>
                    )}
                  </td>
                  <td className="font-semibold text-lg py-3 px-4 align-middle text-gray-700">{member.mn_position}</td>
                  <td className="py-3 px-4 text-center">
                    <Link href={`/admin/team/edit/${member.id}`} className="btn btn-sm btn-secondary text-gray-700 font-bold px-6 py-2 shadow rounded-lg transition hover:bg-blue-600 hover:text-white">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
