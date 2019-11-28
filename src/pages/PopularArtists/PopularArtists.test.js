import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import PopularArtists from './PopularArtists'
import { GET_POPULAR_ARTISTS } from 'graphql/artists/queries'

const artists = [
  {
    id: 'pablo-picasso',
    name: 'Pablo Picasso',
    formatted_nationality_and_birthday: 'Spanish, 1881–1973',
    formatted_artworks_count: '3739 works, 1709 for sale',
    imageUrl:
      'https://d32dm0rphc51dk.cloudfront.net/i3rCA3IaKE-cLBnc-U5swQ/square.jpg'
  },
  {
    id: 'banksy',
    name: 'Banksy',
    formatted_nationality_and_birthday: 'British',
    formatted_artworks_count: '2164 works, 672 for sale',
    imageUrl:
      'https://d32dm0rphc51dk.cloudfront.net/X9vVvod7QY73ZwLDSZzljw/square.jpg'
  },
  {
    id: 'andy-warhol',
    name: 'Andy Warhol',
    formatted_nationality_and_birthday: 'American, 1928–1987',
    formatted_artworks_count: '4910 works, 2398 for sale',
    imageUrl:
      'https://d32dm0rphc51dk.cloudfront.net/E-k-uLoQADM8AjadsSKHrA/square.jpg'
  }
]
const mocks = [
  {
    request: {
      query: GET_POPULAR_ARTISTS
    },
    result: {
      data: {
        popular_artists: { artists }
      }
    }
  }
]

describe('<ArtworkInfo />', () => {
  let container
  beforeEach(() => {
    container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PopularArtists />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    )
  })

  it('Renders loading indicator initially', () => {
    expect(container.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  it('Renders list when loaded', async () => {
    await wait(() => {
      expect(container.queryByTestId('loading-indicator')).toBeNull()
      expect(container.getAllByTestId('card')).toHaveLength(artists.length)
      artists.forEach(artist => {
        expect(container.getByText(artist.name)).toBeInTheDocument()
        expect(
          container.getByText(artist.formatted_nationality_and_birthday)
        ).toBeInTheDocument()
        expect(
          container.getByText(artist.formatted_artworks_count)
        ).toBeInTheDocument()
      })
    })
  })
})
