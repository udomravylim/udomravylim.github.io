document.querySelector('#contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject),
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            const errorText = await response.text();
            alert(`An error occurred: ${errorText}`);
        }
    } catch (error) {
        alert(`An error occurred: ${error.message}`);
    }
});
