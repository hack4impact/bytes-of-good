const { documentToHtmlString } = require('@contentful/rich-text-html-renderer')

module.exports = function formatEpisodeContent(episodes = []) {
  return episodes.map((episode) => ({
    ...episode,
    // Contentful sends "rich text" (text with links, bolding, italics, etc)
    // As a JSON object. Use this helper to turn it into a string of HTML
    description: documentToHtmlString(episode.description.json),
    publishedOn: {
      date: episode.publishedOn,
      // Contentful sends an ISO string back to us, which isn't human readable!
      // Use toLocaleDateString to format this
      formattedDate: new Date(episode.publishedOn).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  }))
}
