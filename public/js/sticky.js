// Add 'sticky' class only for screens larger than 768px
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.innerWidth > 768) { // Check screen width
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    } else {
        header.classList.remove('sticky'); // Ensure no sticky class on small screens
    }
});
