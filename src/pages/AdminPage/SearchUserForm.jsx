import React, { useState } from "react";
import { Segment, Form, Container, Button } from "semantic-ui-react";

export default function SearchUserForm({ updateFilter, filterBy, searchUser }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };

  return (
    <Container className="form">
      <Form>
        <Segment>
          <Form.Group widths="equal">
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                name="first_name"
                value={filterBy.first_name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                placeholder="Last Name"
                name="last_name"
                value={filterBy.last_name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                name="email"
                value={filterBy.email}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input
                placeholder="Phone Number"
                name="phone_number"
                value={filterBy.phone_number}
                onChange={handleChange}
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <Button className="button" onClick={searchUser} primary compact>
                Search
              </Button>
            </Form.Field>
          </Form.Group>
        </Segment>
      </Form>
    </Container>
  );
}
