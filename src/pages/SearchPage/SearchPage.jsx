
import React, { useState } from 'react';
import ModalSearch from './ModalSearch';
import {
  Search, CardGroup, Card, CardContent, CardDescription, Container
} from 'semantic-ui-react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchChange = (e, { value }) => {
    setSearchQuery(value);

    // Perform your actual search logic here (e.g., fetching data from an API)
    // For simplicity, we'll just update the search results in the state.
    setSearchResults([
      { title: 'Result 1', description: 'Description for Result 1' },
      { title: 'Result 2', description: 'Description for Result 2' },
      { title: 'Result 3', description: 'Description for Result 3' },
    ]);
  };

  const src = {
    dog: '../../../public/DogPortrait.jpg', // Replace with your actual image URLs
    sheltersRescues: '../../../public/OrganizationOutline.jpg',
    otherAnimal: '../../../public/otherAnimal.png',
    cat: '../../../public/Untitled (1).jpeg'

  };

  const handleCardClick = (imageKey) => {
    setSelectedImage(imageKey);
    setIsModalOpen(true);
  };
  return (
    <Container >
      <div>
        <Search style={{ marginTop: 20 }}
          input={{ icon: 'search', iconPosition: 'left' }}
          placeholder="Search..."
          onSearchChange={handleSearchChange}
          value={searchQuery}
          results={searchResults}
        />
        <CardGroup itemsPerRow={4}>
          <Card style={{ marginTop: 40 }} onClick={() => handleCardClick('dog')}>
            <img src={src.dog} alt="Dog" style={{ height: '200px', objectFit: 'cover' }} />
            <CardContent>
              <CardDescription>Dogs</CardDescription>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40 }} onClick={() => handleCardClick('sheltersRescues')}>
            <img src={src.sheltersRescues} alt="Shelters & Rescues" style={{ height: '200px', objectFit: 'cover' }} />
            <CardContent>
              <CardDescription>Shelters & Rescues</CardDescription>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40 }} onClick={() => handleCardClick('Cat')}>
            <img src={src.cat} alt="Cat" style={{ height: '200px', objectFit: 'cover' }} />
            <CardContent>
              <CardDescription>Cat</CardDescription>
            </CardContent>
          </Card>
          <Card style={{ marginTop: 40 }} onClick={() => handleCardClick('otherAnimal')}>
            <img src={src.otherAnimal} alt="otherAnimal" style={{ height: '200px', objectFit: 'cover' }} />
            <CardContent>
              <CardDescription>Other Animal</CardDescription>
            </CardContent>
          </Card>
        </CardGroup>
      </div>
      <ModalSearch selectedImage={selectedImage}
        src={src} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Container >
  );
};

export default SearchComponent;
