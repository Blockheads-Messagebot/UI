export default function polyfill() {
    if (!('open' in document.createElement('details'))) {
        let style = document.createElement('style')
        style.textContent += `details:not([open]) > :not(summary) { display: none !important } details > summary:before { content: "▶" display: inline-block font-size: .8em width: 1.5em font-family:"Courier New" } details[open] > summary:before { transform: rotate(90deg) }`
        document.head.appendChild(style)

        window.addEventListener('click', function (event) {
            let target = event.target as HTMLElement

            if (target.tagName == 'SUMMARY') {
                let details = target.parentNode as HTMLDetailsElement

                if (!details) {
                    return
                }

                if (details.getAttribute('open')) {
                    details.open = false
                    details.removeAttribute('open')
                } else {
                    details.open = true
                    details.setAttribute('open', 'open')
                }
            }
        })
    }
}
