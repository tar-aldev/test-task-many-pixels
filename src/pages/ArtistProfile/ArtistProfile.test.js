import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { render, wait, waitForElement, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MockedProvider } from '@apollo/react-testing'
import ArtistProfile from './ArtistProfile'
import { GET_ARTIST_DETAILS } from 'graphql/artists/queries'
import { act } from 'react-dom/test-utils'

const mocks = [
  {
    request: {
      query: GET_ARTIST_DETAILS
    },
    result: {
      data: {
        artist: {
          id: 'francis-bacon',
          name: 'Francis Bacon',
          formatted_artworks_count: '261 works, 129 for sale',
          formatted_nationality_and_birthday: 'British, 1909–1992',
          bio: 'British, 1909-1992, Dublin, Ireland',
          biography: null,
          artworks: [
            {
              id: 'francis-bacon-triptyque-1983-right-panel',
              imageUrl:
                'https://d32dm0rphc51dk.cloudfront.net/bzE_iUy5YiLUW1fFelPcjQ/square.jpg',
              image_title:
                'Francis Bacon, ‘Triptyque 1983 - Right Panel’, 1983',
              image_rights: null
            },
            {
              id: 'francis-bacon-metropolitan-5',
              imageUrl:
                'https://d32dm0rphc51dk.cloudfront.net/AUyb6BUW7PgjT8t95XI9jg/square.jpg',
              image_title: 'Francis Bacon, ‘Metropolitan’, 1975',
              image_rights: null
            }
          ]
        }
      }
    }
  }
]

describe('<ArtistProfile />', () => {
  let container
  let history
  beforeEach(() => {
    history = createMemoryHistory()
    container = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ArtistProfile />
      </MockedProvider>,
      { wrapper: MemoryRouter, history }
    )
  })

  it('Nav button working', async () => {
    expect(container.queryByText('Back to artists')).toBeInTheDocument()
  })

  it('Renders loading indicator initially', () => {
    expect(container.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  it('Renders artist bio and navButton correctly', async () => {
    await wait(() => {
      expect(container.queryByTestId('loading-indicator')).toBeNull()
    })
  })
})
