const fetchContent = require('../utils/fetch-content')
const formatEpisodeContent = require('../utils/format-episode-content')

module.exports = async function liveBroadcasts() {
  const {
    upcomingBroadcastCollection,
    pastBroadcastCollection,
  } = await fetchContent(`{
    upcomingBroadcastCollection: liveBroadcastCollection(where: {upcoming: true}, limit: 1) {
      items {
        rsvpLink
      }
    }
    pastBroadcastCollection: liveBroadcastCollection(where: {upcoming: false}, order: publishedOn_DESC) {
      items {
        title
        description {
          json
        }
        publishedOn
        youtubeLink
        guestsCollection(limit: 10) {
          items {
            image {
              url
              description
            }
            name
            linkedIn
            twitter
          }
        }
      }
    }
  }`)

  const upcomingBroadcasts = upcomingBroadcastCollection?.items ?? []
  const pastBroadcasts = pastBroadcastCollection?.items ?? []

  if (!upcomingBroadcasts.length || !pastBroadcasts.length) {
    throw 'There was a problem fetching episode data'
  }

  return {
    // grab the RSVP link from the first upcoming broadcast
    // there should only be 1 upcoming at a time!
    rsvpLink: upcomingBroadcasts[0]?.rsvpLink,
    pastBroadcasts: formatEpisodeContent(pastBroadcasts),
    youtubeEmbedLink:
      // format the YouTube link for a cookie-free embed
      pastBroadcasts[0]?.youtubeLink?.replace(
        '.com/watch?v=',
        '-nocookie.com/embed/'
      ) ?? 'https://www.youtube-nocookie.com/embed/rHE6YDMveRo',
  }
}
