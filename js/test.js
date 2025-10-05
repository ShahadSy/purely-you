
// === Skin Test ===
document.getElementById('skinTestForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selects = this.querySelectorAll('select');
    const results = {};

    selects.forEach(select => {
        const val = select.value;
        if (val) {
            results[val] = (results[val] || 0) + 1;
        }
    });

    let diagnosis = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b, "");
    let message = "";

    switch (diagnosis) {
        case "Dryness":
            message = "You may have dry skin. Keep it hydrated and use gentle moisturizers.";
            break;
        case "Oily skin":
            message = "You may have oily skin. Consider oil-free products and regular cleansing.";
            break;
        case "Sensitive":
            message = "You may have sensitive skin. Stick to fragrance-free and calming products.";
            break;
        default:
            message = "Please answer all questions to get a diagnosis.";
    }

    document.getElementById('skinDiagnosticResult').textContent = message;
});

// === Hair Test ===
document.getElementById('hairTestForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selects = this.querySelectorAll('select');
    const results = {};

    selects.forEach(select => {
        const val = select.value;
        if (val) {
            results[val] = (results[val] || 0) + 1;
        }
    });

    let diagnosis = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b, "");
    let message = "";

    switch (diagnosis) {
        case "Dry Hair":
            message = "You may have dry hair. Try hydrating masks and sulfate-free shampoos.";
            break;
        case "Oily Hair":
            message = "You may have oily hair. Use clarifying shampoos and avoid heavy conditioners.";
            break;
        case "Balanced":
            message = "Your hair seems well-balanced. Maintain your routine!";
            break;
        default:
            message = "Please answer all questions to get a diagnosis.";
    }

    document.getElementById('hairDiagnosticResult').textContent = message;
});

