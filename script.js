window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") || "all";
    fetchMenuItems(cat);
});

async function fetchMenuItems(category) {
    let url = "http://localhost:8080/merger";
    if (category !== "all") {
        url += `/${category}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMenuItems(data);
    } catch (error) {
        console.error("Error fetching menu items:", error);
    }
}

function displayMenuItems(items) {
    const container = document.getElementById("menuItems");
    container.innerHTML = ""; // clear previous content
    if (items.length === 0) {
        container.innerHTML = "<p>No items found.</p>";
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        `;
        container.appendChild(div);
    });
}
