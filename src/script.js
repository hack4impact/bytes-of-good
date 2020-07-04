const floatingIcons = document.querySelectorAll('svg.home-graphic-accent')

const wait = (callback, timeout) =>
  new Promise((resolve) => {
    setTimeout(() => {
      callback()
      resolve()
    }, timeout)
  })

for (let [index, floatingIcon] of floatingIcons.entries()) {
  wait(() => {
    floatingIcon.classList.add('animate')
  }, index * 100 + 500)
}
