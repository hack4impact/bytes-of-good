/* Trigger the floating icon animations in the home section */
const floatingIcons = document.querySelectorAll('svg.home-graphic-accent')
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

/* Trigger animations when scrolling to a new section of the page */
const observerOptions = {
  root: null,
  rootMargin: '-60% 0px -40% 0px', // trigger when 40% of the new section is visible on the page
  threshold: 0,
}

const observerCallback = (events) => {
  events.forEach((event) => {
    if (event.isIntersecting) {
      if (event.target.id === 'home') {
        navElement.classList.remove('white')
      } else {
        navElement.classList.add('white')
      }
    }
  })
}

let observer = new IntersectionObserver(observerCallback, observerOptions)

for (let sectionId of ['home', 'about', 'team', 'listen']) {
  observer.observe(document.getElementById(sectionId))
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})
