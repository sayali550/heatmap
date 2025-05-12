const socket = io('http://localhost:5000');
const heatmapCanvas = document.getElementById('heatmapCanvas');
const ctx = heatmapCanvas.getContext('2d');
heatmapCanvas.width = window.innerWidth;
heatmapCanvas.height = window.innerHeight;

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    socket.emit('mouseMovement', { eventType: 'mousemove', page: window.location.pathname, x: clientX, y: clientY });
    drawHeatTrail(clientX, clientY);
});

document.addEventListener('click', (event) => {
    const { clientX, clientY } = event;
    socket.emit('clickEvent', { eventType: 'click', page: window.location.pathname, x: clientX, y: clientY });
    drawHeatPoint(clientX, clientY);
});

function drawHeatPoint(x, y) {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fill();
}

function drawHeatTrail(x, y) {
    ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

const products = [
    { name: "Smartphone", price: "₹699", image: "https://loremflickr.com/200/200?random=1" },
    { name: "Laptop", price: "₹999", image: "https://loremflickr.com/200/200?random=2" },
    { name: "Headphones", price: "₹199", image: "https://loremflickr.com/200/200?random=3" }
];


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <button>Add to Cart</button>
        `;
        div.querySelector('button').addEventListener('click', () => {
            socket.emit('clickEvent', { eventType: 'addToCart', page: product.name });
            alert(`${product.name} added to cart!`);
        });
        container.appendChild(div);
    });
});

