const fetchContent = require('../utils/fetch-content')
const formatEpisodeContent = require('../utils/format-episode-content')

module.exports = async function liveBroadcasts() {
  const { liveBroadcastCollection } = await fetchContent(`{
    liveBroadcastCollection {
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

  return {
    liveBroadcasts: formatEpisodeContent(liveBroadcastCollection?.items),
  }
}
