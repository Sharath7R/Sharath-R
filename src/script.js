document.addEventListener('DOMContentLoaded', function() {
    const tablinks = document.getElementsByClassName('tablink');
    const tabcontents = document.getElementsByClassName('tab-content');

    function opentab(event, tabname) {
        for (const tablink of tablinks) {
            tablink.classList.remove('active-link');
        }
        for (const tabcontent of tabcontents) {
            tabcontent.classList.remove('active-tab');
        }
        event.currentTarget.classList.add('active-link');
        document.getElementById(tabname).classList.add('active-tab');
    }

    // Attach click event listeners to tablinks
    for (const tablink of tablinks) {
        tablink.addEventListener('click', function(event) {
            opentab(event, tablink.dataset.tabname); // Use a data attribute to specify the tab name
        });
    }
});


const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-20rem";
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbx8U2mJ-JR2XfkN58IKrjbkmFSXXDwb3VrFnD5Dw1pTnezwl0agundtFPh9teeTwBS5lw/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById('msg')

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML = "Message Sent Successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        }, 5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})
