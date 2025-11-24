import React from "react";
import PageLayout from "../../components/PageLayout";

const Settings: React.FC = () => {
  return (
    <PageLayout
      breadcrumbItems={[{ title: "Home" }, { title: "Settings" }]}
      pageTitle="Settings"
    >
      <p>This is your settings page.</p>
    </PageLayout>
  );
};

export default Settings;
