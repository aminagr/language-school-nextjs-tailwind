"use client";

import { useState, useEffect } from "react";
import { getNotifications } from "@/utils/api"; // Importer des notifications fictives

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simuler l'appel API pour récupérer les notifications
    const notificationsData = getNotifications();
    setNotifications(notificationsData);
  }, []);

  // Fonction pour marquer la notification comme lue
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Fonction pour supprimer une notification
  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Vos Notifications</h1>
      </header>

      <div className="mt-8">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Aucune notification pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 bg-white rounded-lg shadow-md ${
                  notification.isRead ? "border-l-4 border-gray-300" : "border-l-4 border-blue-500"
                }`}
              >
                <h3 className="text-lg font-semibold">{notification.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{notification.message}</p>
                <div className="flex justify-between items-center">
                  <button
                    className={`${
                      notification.isRead ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
                    } text-white py-2 px-4 rounded-lg text-sm`}
                    onClick={() => markAsRead(notification.id)}
                    disabled={notification.isRead}
                  >
                    {notification.isRead ? "Marquée comme lue" : "Marquer comme lue"}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
