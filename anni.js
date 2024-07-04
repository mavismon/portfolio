document.addEventListener('DOMContentLoaded', function() {
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function addAnimationClass() {
        const elements = document.querySelectorAll('.content-wrapper, .cotopic-wrapper, .container-contact');
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('fly-in'); // Add a class for fly-in animation
            }
        });
    }

    // Initial check on page load
    addAnimationClass();

    // Add scroll event listener
    window.addEventListener('scroll', function() {
        addAnimationClass();
    });
});

