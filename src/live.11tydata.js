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
      }
    }
  }`)

  const upcomingBroadcasts = upcomingBroadcastCollection?.items ?? []
  const pastBroadcasts = pastBroadcastCollection?.items ?? []

  console.log(upcomingBroadcasts)

  return {
    rsvpLink: upcomingBroadcasts[0]?.rsvpLink,
    pastBroadcasts: formatEpisodeContent(pastBroadcasts),
    youtubeEmbedLink:
      pastBroadcasts[0]?.youtubeEmbedLink ??
      'https://www.youtube.com/watch?v=vzMcV9JTgMw',
  }
}
