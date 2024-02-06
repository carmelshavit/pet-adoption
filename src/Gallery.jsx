import React from 'react'
import _ from 'lodash'
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  GridColumn, Grid, Image
} from 'semantic-ui-react'

const Gallery = () => (
  <Grid columns={5} stackable centered verticalAlign='top' padded='vertically'>
    {data.map((item) => (
      <Grid.Column key={item.id}>
        <Card.Group>
          <Card
            fluid
            image={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            onClick={() => handleCardClick(item)}
          />
        </Card.Group>
      </Grid.Column>
    ))}
  </Grid>
)
export default Gallery