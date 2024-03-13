import React from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Button,
  Checkbox,
  Icon,
  Table,
  Form,
} from "semantic-ui-react";

const AdminEditUser = () => (
  <Table compact celled definition>
    <TableHeader>
      <TableRow>
        <TableHeaderCell />
        <TableHeaderCell>First Name</TableHeaderCell>
        <TableHeaderCell>Last Name</TableHeaderCell>
        <TableHeaderCell>E-mail address</TableHeaderCell>
        <TableHeaderCell>Adoption Status</TableHeaderCell>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell collapsing>
          <Checkbox slider />
        </TableCell>
        <TableCell>
          <Form.Input placeholder="Enter First Name" />
        </TableCell>
        <TableCell>
          <Form.Input placeholder="Enter Last Name" />
        </TableCell>
        <TableCell>
          <Form.Input placeholder="Enter Email" />
        </TableCell>
        <TableCell>
          <Form.Input placeholder="Enter Adoption Status" />
        </TableCell>
      </TableRow>
      {/* Add Form.Input components for other rows similarly */}
    </TableBody>

    <TableFooter fullWidth>
      <TableRow>
        <TableHeaderCell />
        <TableHeaderCell colSpan="4">
          <Button size="small">Approve</Button>
          <Button disabled size="small">
            Approve All
          </Button>
        </TableHeaderCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export default AdminEditUser;
