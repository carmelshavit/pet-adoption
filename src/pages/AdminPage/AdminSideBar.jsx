import React from "react";
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
          <Icon name="paw" />
          Pets
        </MenuItem>
        <MenuItem as="a">
          <Icon name="user outline" />
          Users
        </MenuItem>
      </Sidebar>
      ;
    </div>
  );
}
