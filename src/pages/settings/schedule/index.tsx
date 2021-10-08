import React from "react";
import SettingsPage from "..";

const SettingsGeneralPage: React.FC = () => {
  const people = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ];
  return (
    <SettingsPage title="Time Slots" description="Aca van los time slots">
      Hola
    </SettingsPage>
  );
};

export default SettingsGeneralPage;
