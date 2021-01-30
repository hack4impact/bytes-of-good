const fetchContent = require('../utils/fetch-content')
const formatEpisodeContent = require('../utils/format-episode-content')

module.exports = async function episodes() {
  const { episodeCollection } = await fetchContent(`{
    episodeCollection(order: publishedOn_DESC, limit: 50) {
      items {
        title
        description {
          json
        }
        publishedOn
        listenLink
        guestsCollection {
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

  if (!episodeCollection?.items?.length) {
    throw 'There was a problem fetching episode data'
  }

  return {
    episodes: formatEpisodeContent(episodeCollection?.items),
  }
}
