import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ArtistCard from './ArtistCard'

const artistInfoMock = {
  id: 1,
  name: 'test name',
  formatted_nationality_and_birthday: 'formatted_nationality_and_birthday',
  formatted_artworks_count: 'formatted_artworks_count',
  imageUrl: 'imageUrl'
}

const artistSelectedMockFn = jest.fn()

describe('<ArtistCard />', () => {
  let container
  beforeEach(() => {
    container = render(
      <ArtistCard
        artistInfo={artistInfoMock}
        onArtistSelected={artistSelectedMockFn}
      />
    )
  })

  test('Displays Artist info passed from props correctly', () => {
    expect(container.queryByText(artistInfoMock.name)).toBeInTheDocument()
    expect(
      container.queryByText(artistInfoMock.formatted_nationality_and_birthday)
    ).toBeInTheDocument()
    expect(
      container.queryByText(artistInfoMock.formatted_artworks_count)
    ).toBeInTheDocument()
    expect(container.getByTestId('card-image').getAttribute('src')).toBe(
      artistInfoMock.imageUrl
    )
  })

  test('Fires onArtistSelected when Card is clicked', () => {
    fireEvent.click(container.getByTestId('card'))
    expect(artistSelectedMockFn).toHaveBeenCalledWith(artistInfoMock.id)
  })
})
