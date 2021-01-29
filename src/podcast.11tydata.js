const fetchContent = require('../utils/fetch-content')
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

module.exports = async function episodes() {
  const { episodeCollection } = await fetchContent(`{
    episodeCollection {
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

  const episodes = episodeCollection?.items ?? []

  return {
    episodes: episodes.map((episode) => ({
      ...episode,
      // Contentful sends "rich text" (text with links, bolding, italics, etc)
      // As a JSON object. Use this helper to turn it into a string of HTML
      description: documentToHtmlString(episode.description.json),
      publishedOn: {
        date: episode.publishedOn,
        // Contentful sends an ISO string back to us, which isn't human readable!
        // Use toLocaleDateString to format this
        formattedDate: new Date(episode.publishedOn).toLocaleDateString(
          'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' }
        ),
      },
    })),
  }
}
