// Similar to jQuery toggleClass function
function toggleClass(selector, tgclass) {
    nodeList = document.querySelectorAll(selector)
    for (let item of nodeList) {
      item.classList.toggle(tgclass)
    }
}

var toggleBtn = document.querySelector('.dots__nav')
  
toggleBtn.addEventListener('click', function() {
    toggleClass('.dots__content-wrapper', 'active')
}, false);

// tooltip

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl, {
  	'customClass': 'custom-tooltip'
  })
})

