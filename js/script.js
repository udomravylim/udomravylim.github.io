    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
        };

        try {
            const response = await fetch("https://your-render-app-url.onrender.com/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
