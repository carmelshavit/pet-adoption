import React, { useState } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Checkbox,
  Table,
} from "semantic-ui-react";
import UserPreview from "./UserPreview";
import UserDetails from "./userDetails";
import { petService } from "../service/pet.service";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsOpenUserModal(true); // Open the modal when a user is clicked
  };

  // useEffect(() => {
  // petService.getPetsBySearch()
  // }, []);

  return (
    <div>
      <Table compact celled definition>
        <TableHeader>
          <TableRow>
            <TableHeaderCell />
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>E-mail address</TableHeaderCell>
            <TableHeaderCell>Phone Number</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index} onClick={(e) => handleUserClick(user)}>
              <TableCell collapsing>
                <Checkbox slider />
              </TableCell>
              <TableCell>
                <UserPreview user={user} field="first_name" />
              </TableCell>
              <TableCell>
                <UserPreview user={user} field="last_name" />
              </TableCell>
              <TableCell>
                <UserPreview user={user} field="email" />
              </TableCell>
              <TableCell>
                <UserPreview user={user} field="phone_number" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          isOpenUserModal={isOpenUserModal}
          setIsOpenUserModal={setIsOpenUserModal}
        />
      )}
    </div>
  );
};

export default UserList;
