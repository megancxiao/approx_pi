function drawShape(centerX, centerY, radius, numSides, color) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    var x = centerX + radius * Math.cos(0);
    var y = centerY + radius * Math.sin(0);
    ctx.moveTo(x, y);
    for (var i = 1; i <= numSides; i += 1) {
        x = centerX + radius * Math.cos(i * 2 * Math.PI / numSides);
        y = centerY + radius * Math.sin(i * 2 * Math.PI / numSides);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}

function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var numSides = parseInt(document.getElementById("numSides").value, 10);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var actualRadius = Math.min(canvas.width, canvas.height) / 4;
    var inscribedRadius = actualRadius;
    var circumscribedRadius = actualRadius / Math.cos(Math.PI / numSides);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the inscribed shape
    drawShape(centerX, centerY, inscribedRadius, numSides, "blue");

    // Draw the circumscribed shape
    drawShape(centerX, centerY, circumscribedRadius, numSides, "red");

    // Draw the outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, actualRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Calculate and display the approximate values of π
    var [pi_inscribed, pi_circumscribed, pi_average] = approximate_pi(numSides);
    document.getElementById("inscribed_pi").innerText = pi_inscribed.toFixed(10);
    document.getElementById("circumscribed_pi").innerText = pi_circumscribed.toFixed(10);
    document.getElementById("average_pi").innerText = pi_average.toFixed(10);
}

function validateForm() {
    var numSides = document.getElementById("numSides").value;
    var errorText = document.getElementById("errorText");
    
    if (numSides < 3) {
        errorText.style.display = "block";
    } else {
        errorText.style.display = "none";
        draw(); // Update the visualization if the form is submitted successfully
        
    }
    
    return false;

    
    
}

draw(); // Initial draw when the page loads