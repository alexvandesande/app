import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import Attendee from './Attendee'
import GetMarkedAttendedQuery from './GetMarkedAttendedQuery'
import { H3 } from '../Typography/Basic'

const EventAttendeesContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-bottom: 40px;
`

const NoAttendees = styled('div')``

class EventAttendees extends Component {
  render() {
    const { attendees, search, party } = this.props

    const searchTerm = search.toLowerCase()

    attendees.sort((a, b) => {
      return a.index < b.index ? -1 : 1
    })

    return (
      <GetMarkedAttendedQuery variables={{ contractAddress: party.address }}>
        {markAttendedSingle => (
          <Fragment>
            <H3>Attendees</H3>
            <EventAttendeesContainer>
              {attendees.length > 0 ? (
                attendees
                  .filter(
                    attendee => attendee.user.address.toLowerCase().includes(searchTerm)
                  )
                  .map((attendee, i) => (
                    <Attendee
                      attendee={attendee}
                      party={party}
                      key={attendee.address + i}
                      markedAttendedList={markAttendedSingle || []}
                    />
                  ))
              ) : (
                <NoAttendees>No one is attending.</NoAttendees>
              )}
            </EventAttendeesContainer>
          </Fragment>
        )}
      </GetMarkedAttendedQuery>
    )
  }
}

export default EventAttendees
