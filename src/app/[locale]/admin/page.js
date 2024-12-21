

"use client";
import { useState, useEffect } from "react";
import {
  getTotalStudents, getConfirmedRegistrations, getUnconfirmedRegistrations, getTotalGroups, getOngoingSessions, getEndedSessions, getUpcomingSessions,
  getTotalRooms, getTotalLevels, getGroupsByLevel, getStudentsPerSession, getStudentAgeDistribution, getTopActiveStudents, getMostFrequentGroup,
  getMostPopularSession, getStudentsPerGroupChartData, getGroupsByLevelChartData
} from "@/utils/index";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaUsers, FaCheck, FaTimes, FaLayerGroup, FaCalendarAlt, FaBuilding, FaRegListAlt } from "react-icons/fa";
import { useLocale } from "next-intl";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminPage = () => {
  const locale = useLocale();


  const groupsByLevelChartData = getGroupsByLevelChartData();
  const studentsPerGroupChartData = getStudentsPerGroupChartData();


  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      
      const hue = Math.floor(Math.random() * 360); 
      const saturation = Math.floor(Math.random() * (50) + 50); 
      const lightness = Math.floor(Math.random() * (40) + 40); 
  

      colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tableau de bord</h1>
  
 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-blue-500 text-white rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Etudiants inscrits</h3>
            <p className="text-2xl font-bold">{getTotalStudents()}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-green-500 text-white rounded-full">
            <FaCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Inscriptions confirmées</h3>
            <p className="text-2xl font-bold">{getConfirmedRegistrations()}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-red-500 text-white rounded-full">
            <FaTimes size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Inscriptions non confirmées</h3>
            <p className="text-2xl font-bold">{getUnconfirmedRegistrations()}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-yellow-500 text-white rounded-full">
            <FaLayerGroup size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Nombre de groupes</h3>
            <p className="text-2xl font-bold">{getTotalGroups()}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-purple-500 text-white rounded-full">
            <FaBuilding size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Nombre de salles</h3>
            <p className="text-2xl font-bold">{getTotalRooms()}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-orange-500 text-white rounded-full">
            <FaRegListAlt size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Niveaux</h3>
            <p className="text-2xl font-bold">{getTotalLevels()}</p>
          </div>
        </div>
      </div>
    
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-indigo-500 text-white rounded-full">
            <FaCalendarAlt size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sessions en cours</h3>
            <p className="text-2xl font-bold">{getOngoingSessions()}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-gray-500 text-white rounded-full">
            <FaCalendarAlt size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sessions passées</h3>
            <p className="text-2xl font-bold">{getEndedSessions()}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <div className="p-4 bg-teal-500 text-white rounded-full">
            <FaCalendarAlt size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sessions à venir</h3>
            <p className="text-2xl font-bold">{getUpcomingSessions()}</p>
          </div>
        </div>
      </div>

 
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Répartition des groupes par niveau</h3>
          <Pie
            data={{
              labels: groupsByLevelChartData.map(item => item.level_name),
              datasets: [{
                label: 'Groupes par niveau',
                data: groupsByLevelChartData.map(item => item.groups_count),
                backgroundColor: generateColors(groupsByLevelChartData.length),
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Répartition des groupes par niveau',
                },
                tooltip: {
                  mode: 'index',
                },
              },
            }}
          />
        </div>


 <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Nombre d\'étudiants par groupe</h3>
          <Bar
            data={{
              labels: studentsPerGroupChartData.map(item => item.group_name),
              datasets: [{
                label: 'Étudiants par groupe',
                data: studentsPerGroupChartData.map(item => item.students_count),
                backgroundColor: generateColors(studentsPerGroupChartData.length),
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Étudiants par groupe',
                },
                tooltip: {
                  mode: 'index',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;