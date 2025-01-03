document.addEventListener('DOMContentLoaded', function () {
    const tablinks = document.getElementsByClassName('tablink');
    const tabcontents = document.getElementsByClassName('tab-content');

    function opentab(event, tabname) {
        // Hide all tab contents
        for (const tabcontent of tabcontents) {
            tabcontent.style.display = 'none';
        }
        // Remove active-link class from all tab links
        for (const tablink of tablinks) {
            tablink.classList.remove('active-link');
        }
        // Add active-link class to the clicked tab and show the corresponding content
        event.currentTarget.classList.add('active-link');
        const activeTabContent = document.getElementById(tabname);
        if (activeTabContent) {
            activeTabContent.style.display = 'block';
        }
    }

    // Attach click event listeners to tablinks
    for (const tablink of tablinks) {
        tablink.addEventListener('click', function (event) {
            opentab(event, tablink.dataset.tabname); // Use a data attribute to specify the tab name
        });
    }

    // Initialize: Show the first tab by default
    if (tablinks.length > 0 && tabcontents.length > 0) {
        tablinks[0].classList.add('active-link');
        tabcontents[0].style.display = 'block';
    }
});

const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-50rem";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbx8U2mJ-JR2XfkN58IKrjbkmFSXXDwb3VrFnD5Dw1pTnezwl0agundtFPh9teeTwBS5lw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message Sent Successfully";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
