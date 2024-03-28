import React, { useState } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Container,
} from "semantic-ui-react";
import UserDetails from "./userDetails";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsOpenUserModal(true);
  };

  return (
    <div>
      <Container>
        <Table compact celled definition>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>First Name</TableHeaderCell>
              <TableHeaderCell>Last Name</TableHeaderCell>
              <TableHeaderCell>E-mail address</TableHeaderCell>
              <TableHeaderCell>Phone Number</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} onClick={() => handleUserClick(user)}>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
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
