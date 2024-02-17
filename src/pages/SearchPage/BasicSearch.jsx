import React, { useState } from "react";

import {
  FormGroup,
  Form,
  Input,
  Button,
  Icon,
  Container,
} from "semantic-ui-react";

export default function BasicSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e, { value }) => {
    setSearchQuery(value);

    setSearchResults([
      { title: "Result 1", description: "Description for Result 1" },
      { title: "Result 2", description: "Description for Result 2" },
      { title: "Result 3", description: "Description for Result 3" },
    ]);
  };

  return (
    <div>
      <Form size="large">
        <Container>
          <FormGroup widths="equal">
            <Input
              style={{ marginTop: 20 }}
              placeholder="Find your love pet..."
              value={searchQuery}
              results={searchResults}
            />
            <Input
              style={{ marginTop: 20 }}
              placeholder="Enter City, State or Zip..."
              value={searchQuery}
              results={searchResults}
            />
            <Button size="mini" style={{ marginTop: 20 }}>
              <Icon link name="search" />
            </Button>
          </FormGroup>
        </Container>
      </Form>
    </div>
  );
}
