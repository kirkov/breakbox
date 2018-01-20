/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import {Provider, Container, Box} from '.'
import {resetStyles} from './breakbox'

const matchSnapshot = (name, rendered) => {
  resetStyles()
  expect(renderer.create(rendered).toJSON()).toMatchSnapshot(name)
}

beforeEach(() => {
  resetStyles()
})

it('skips breakpoints', () => {
  matchSnapshot('skips middle value',
    <Container flexDirection={['row', null, 'column']} />
  )

  matchSnapshot('skips multiple values',
    <Container flexDirection={['row', null, 'column', null]} />
  )

  matchSnapshot('skips null',
    <Container flexDirection={[null]} />
  )

  matchSnapshot('skips undefined',
    <Container flexDirection={[undefined]} />
  )

  matchSnapshot('skips empty string',
    <Container flexDirection={['']} />
  )

  matchSnapshot('skips empty',
    <Container flexDirection={[]} />
  )
})

it('handle single values', () => {
  matchSnapshot('single value',
    <Container flexDirection='row' />
  )

  matchSnapshot('null value',
    <Container flexDirection={null} />
  )
})

it('can provide custom breakpoints', () => {
  matchSnapshot('uses custom breakpoints',
    <Provider breakpoints={['100px', '200px', '300px']}>
      <Container width={[50, 150, 250]} />
    </Provider>
  )
})

it('can provide custom spaces', () => {
  matchSnapshot('uses custom spaces',
    <Provider spaces={['100px', '200px', '300px']}>
      <Container marginRight={['50', '150', '250']} />
    </Provider>
  )

  matchSnapshot('looks up the custom space values',
    <Provider spaces={['10px', '20px', '30px']}>
      <Box paddingRight={[1, 2, 3]} />
    </Provider>
  )

  matchSnapshot('handle unknowns space',
    <Provider spaces={['10px', '20px']}>
      <Box paddingRight={[1, 2, 3]} />
    </Provider>
  )
})
