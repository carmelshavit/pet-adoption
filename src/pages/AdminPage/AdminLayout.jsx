import React from "react";
import AdminPageContent from "./AdminPageContent";
import AdminSideBar from "./AdminSideBar";
import { useState } from "react";
import {
  SidebarPushable,
  SidebarPusher,
  Segment,
  Button,
} from "semantic-ui-react";

export default function AdminLayout() {
  const [isVisibile, setIsVisibile] = useState(false);
  const [IsDimmed, setIsDimmed] = useState(false);

  return (
    <div>
      <Button active={true} onClick={() => setIsVisibile((prev) => !prev)}>
        Sidebar
      </Button>
      <SidebarPushable as={Segment} style={{ overflow: "hidden" }}>
        <AdminSideBar isVisibile={isVisibile} />
        <SidebarPusher dimmed={IsDimmed && isVisibile}>
          <Segment basic>
            <AdminPageContent />
          </Segment>
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
}
