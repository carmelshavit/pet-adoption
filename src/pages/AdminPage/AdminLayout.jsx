import React, { useState } from "react";
import AdminPageContent from "./AdminPageContent";
import AdminSideBar from "./AdminSideBar";
import {
  SidebarPushable,
  SidebarPusher,
  Segment,
  Button,
} from "semantic-ui-react";

export default function AdminLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);

  const loggedInUser = { is_admin: true }; // Assuming you have a loggedInUser object

  return (
    <>
      {loggedInUser?.is_admin == true && (
        <div>
          <Button active={true} onClick={() => setIsVisible((prev) => !prev)}>
            Sidebar
          </Button>
          <SidebarPushable as={Segment} style={{ overflow: "hidden" }}>
            <AdminSideBar isVisible={isVisible} />
            <SidebarPusher dimmed={isDimmed && isVisible}>
              <Segment basic>
                <AdminPageContent />
              </Segment>
            </SidebarPusher>
          </SidebarPushable>
        </div>
      )}
    </>
  );
}
