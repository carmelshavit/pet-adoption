import React from "react";
import AdminPage from "./AdminPageContent";
import { Menu, MenuItem, Icon, Sidebar } from "semantic-ui-react";

export default function AdminSideBar({ isVisibile }) {
  return (
    <div>
      <Sidebar
        as={Menu}
        animation={"push"}
        direction={"left"}
        icon="labeled"
        inverted
        vertical
        visible={isVisibile}
        width="thin"
      >
        <MenuItem as="a">
          <Icon name="home" />
          Pets
        </MenuItem>
        <MenuItem as="a">
          <Icon name="gamepad" />
          Users
        </MenuItem>
        {/* <MenuItem as="a">
          <Icon name="camera" />
          Channels
        </MenuItem> */}
      </Sidebar>
      ;
    </div>
  );
}
