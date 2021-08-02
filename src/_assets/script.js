/* Trigger the floating icon animations in the home section */
const floatingIcons = document.querySelectorAll('#home svg.floating-icon')
const navElement = document.getElementById('main-nav')
const headerElement = document.querySelector('header')
const mobileDropdownToggleElement = document.getElementById(
  'mobile-dropdown-toggle'
)

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
    headerElement.classList.add('white')
  } else {
    headerElement.classList.remove('white')
  }
})

document.addEventListener('click', (event) => {
  if (
    mobileDropdownToggleElement === event.target ||
    mobileDropdownToggleElement.contains(event.target)
  ) {
    // when we click our button, toggle a CSS class!
    console.log({ navElement })
    navElement.classList.toggle('dropdown-opened')
  }
})
