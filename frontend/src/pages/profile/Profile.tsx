import React from "react";

import PageLayout from "../../components/Common/PageLayout";

const Profile: React.FC = () => {
  return (
    <PageLayout
      breadcrumbItems={[{ title: "Home" }, { title: "Profile" }]}
      pageTitle="Profile"
    >
      <p>This is your profile.</p>
    </PageLayout>
  );
};

export default Profile;
