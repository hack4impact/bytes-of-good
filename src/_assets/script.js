/* Trigger the floating icon animations in the home section */
const floatingIcons = document.querySelectorAll('#home svg.floating-icon')
const navElement = document.querySelector('nav')

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

document.addEventListener('scroll', (e) => {
  if (window.scrollY > 60) {
    navElement.classList.add('white')
  } else {
    navElement.classList.remove('white')
  }
})
