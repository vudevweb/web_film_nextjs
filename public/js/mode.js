// code by vudevweb

const navLink = document.querySelectorAll('.nav-link-vd');

// console.log(navLink);

// active link url
navLink.forEach((link) => {
    // console.log(link.attributes.href.value);
    if (link.attributes.href.value === window.location.pathname) {
        link.classList.add('active');
    }
});

//  in ra chữ màu đỏ trong console
console.log('%cCode by vudevweb.com', 'color: red; font-size: 40px;');