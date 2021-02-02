const fetchContent = require('../utils/fetch-content')

module.exports = async function liveBroadcasts() {
  const { upcomingBroadcastCollection } = await fetchContent(`{
    upcomingBroadcastCollection: liveBroadcastCollection(where: {upcoming: true}, limit: 1) {
      items {
        rsvpLink
      }
    }
  }`)

  const upcomingBroadcasts = upcomingBroadcastCollection?.items ?? []

  return {
    // grab the RSVP link from the first upcoming broadcast
    // there should only be 1 upcoming at a time!
    rsvpLink: upcomingBroadcasts[0]?.rsvpLink,
  }
}
