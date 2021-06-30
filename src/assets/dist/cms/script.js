const popover = document.querySelectorAll('.popovers');
popover.forEach(pop => {
    pop.setAttribute('data-bs-placement', "left")
    pop.setAttribute('data-bs-toggle', "popover")
    pop.setAttribute('data-bs-trigger', "hover")
    pop.setAttribute('tabindex', "0")
})
var popoverTriggerList = [].slice.call(document.querySelectorAll('.popovers'))
var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})