'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { fetchStudentById } from '@/utils/index';
import { FaChevronLeft, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useLocale } from 'next-intl'; 
const StudentDataPage = () => {
     const locale = useLocale();
  const { studentid } = useParams();
  
  const parsedStudentId = studentid ? parseInt(studentid) : null;
  
  const student = useMemo(
    () => fetchStudentById(parsedStudentId), 
    [parsedStudentId]
  );

  if (!student) {
    return <div className="text-center text-xl text-gray-700">Étudiant non trouvé</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">{student.nom} {student.prenom}</h2>
       
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="flex items-center text-gray-800">
            <FaCalendarAlt className="text-indigo-600 mr-2" />
            <p><strong>Date de naissance:</strong> {student.date_naissance}</p>
          </div>
          <div className="flex items-center text-gray-800">
            <FaMapMarkerAlt className="text-indigo-600 mr-2" />
            <p><strong>Lieu de naissance:</strong> {student.lieu_naissance}</p>
          </div>
          <div className="flex items-center text-gray-800">
            <FaMapMarkerAlt className="text-indigo-600 mr-2" />
            <p><strong>Adresse:</strong> {student.adresse}</p>
          </div>
          <div className="flex items-center text-gray-800">
            <FaPhone className="text-indigo-600 mr-2" />
            <p><strong>Téléphone:</strong> {student.telephone}</p>
          </div>
          <div className="flex items-center text-gray-800">
            <FaEnvelope className="text-indigo-600 mr-2" />
            <p><strong>Email:</strong> {student.mail}</p>
          </div>
          <div className="flex items-center text-gray-800">
            <FaCalendarAlt className="text-indigo-600 mr-2" />
            <p><strong>Type:</strong> {student.type}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Groupes et Sessions</h3>
          <div className="space-y-4">
            {student.groups.map((group, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="text-lg font-medium text-gray-800 mb-2">
                  <strong>Groupe:</strong> {group.group_name}
                </div>
                <div className="text-gray-600">
                  <strong>Session:</strong> {group.session_name}
                </div>
                <div className="text-gray-600">
                  <strong>Niveau:</strong> {group.level_name}
                </div>
                <p className={`text-sm font-semibold mt-2 ${group.confirmed ? 'text-green-500' : 'text-red-500'}`}>
                  {group.confirmed ? 'Confirmé' : 'Non confirmé'}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default StudentDataPage;
