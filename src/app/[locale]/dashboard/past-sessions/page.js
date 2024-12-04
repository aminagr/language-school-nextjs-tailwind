// src/app/past-sessions/page.js

import PastSessions from "@/components/dashboard/PastSessions";
import { getPastSessions } from "@/utils/api"; // Données fictives

const PastSessionsPage = () => {
  const pastSessions = getPastSessions(); // Récupérer les sessions passées fictives

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Sessions Passées</h1>
      <PastSessions pastSessions={pastSessions} />
    </div>
  );
};

export default PastSessionsPage;
