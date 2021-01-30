const fetchContent = require('../utils/fetch-content')
const formatEpisodeContent = require('../utils/format-episode-content')

module.exports = async function episodes() {
  const { episodeCollection } = await fetchContent(`{
    episodeCollection(order: publishedOn_DESC) {
      items {
        title
        description {
          json
        }
        publishedOn
        listenLink
      }
    }
  }`)

  return {
    episodes: formatEpisodeContent(episodeCollection?.items),
  }
}
