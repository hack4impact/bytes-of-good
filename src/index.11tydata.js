const fetchContent = require('../utils/fetch-content')

module.exports = async function liveBroadcasts() {
  const { upcomingBroadcastCollection, teamSection } = await fetchContent(`{
    upcomingBroadcastCollection: liveBroadcastCollection(where: {upcoming: true}, limit: 1) {
      items {
        rsvpLink
      }
    }
    teamSection(id: "7FNNCibQRHyoyBH5QDvdhB") {
      profilesCollection {
        items {
          name
          jobTitle
          image {
            url
          }
          twitter
          linkedIn
        }
      }  
    }
  }`)

  const upcomingBroadcasts = upcomingBroadcastCollection?.items ?? []
  const teamMembers = teamSection?.profilesCollection?.items ?? []

  if (!teamMembers.length) {
    throw 'There was a problem finding profiles for the Team section'
  }

  return {
    // grab the RSVP link from the first upcoming broadcast
    // there should only be 1 upcoming at a time!
    rsvpLink: upcomingBroadcasts[0]?.rsvpLink,
    teamMembers,
  }
}
