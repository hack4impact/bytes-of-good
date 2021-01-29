const fetchContent = require('../utils/fetch-content')
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

module.exports = async function liveBroadcasts() {
  const { liveBroadcastCollection } = await fetchContent(`{
    liveBroadcastCollection {
      items {
        title
        description {
          json
        }
        youtubeLink
      }
    }
  }`)

  const liveBroadcasts = liveBroadcastCollection?.items ?? []

  return {
    liveBroadcasts: liveBroadcasts.map((liveBroadcast) => ({
      ...liveBroadcast,
      // Contentful sends "rich text" (text with links, bolding, italics, etc)
      // As a JSON object. Use this helper to turn it into a string of HTML
      description: documentToHtmlString(liveBroadcast.description.json),
      publishedOn: {
        date: liveBroadcast.publishedOn,
        // Contentful sends an ISO string back to us, which isn't human readable!
        // Use toLocaleDateString to format this
        formattedDate: new Date(liveBroadcast.publishedOn).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        ),
      },
    })),
  }
}
