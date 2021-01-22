const pluginSass = require('eleventy-plugin-sass')
const base = 'src/'

module.exports = function (eleventyConfig) {
  // treat styles.scss as the source of truth for styles across the site
  // this should import all other styles!
  eleventyConfig.addPlugin(pluginSass, {
    watch: `${base}_sass/*.{scss,sass}`,
  })
  // all _assets content are copied directly to the build/
  eleventyConfig.addPassthroughCopy({ [`${base}_assets`]: '/' })
  eleventyConfig.addWatchTarget(`${base}_sass/**`)

  return {
    dir: {
      input: base,
      output: 'build',
    },
  }
}
