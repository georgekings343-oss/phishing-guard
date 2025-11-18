import React, { useState, useContext } from "react";
import { PopupContext } from "../contexts/PopupContext";

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { popupsEnabled, togglePopups } = useContext(PopupContext);

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const sections = [
    {
      id: "ui",
      title: "User Interface & Interaction",
      content: (
        <div className="flex items-center gap-4">
          <span>Enable Popups:</span>
          <button
            onClick={togglePopups}
            className={`px-3 py-1 rounded-md ${
              popupsEnabled ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {popupsEnabled ? "ON" : "OFF"}
          </button>
        </div>
      ),
    },
    {
      id: "theme",
      title: "Theme Settings",
      content: (
        <div className="flex items-center gap-4">
          <span>Current Theme: {theme}</span>
          <button onClick={toggleTheme} className="px-3 py-1 rounded-md bg-gray-600">
            Switch Theme
          </button>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      content: <p>Configure notification sounds, email alerts, and reminders.</p>,
    },
    {
      id: "account",
      title: "Account Settings",
      content: <p>Update password, profile info, and auth preferences.</p>,
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      content: <p>Manage data privacy, logs, and security policies.</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="border rounded-xl p-4 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`w-full text-left p-2 rounded-md ${
                activeSection === s.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 border rounded-xl p-4">
          {activeSection ? (
            sections.find((s) => s.id === activeSection).content
          ) : (
            <p className="opacity-50">Select a section to edit settings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
