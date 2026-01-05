// ---------------- FOOD DATA ----------------
var foodData = {
    "samosa": { protein: 1, sugar: 0, goodFat: 0, badFat: 1 },
    "baji": { protein: 1, sugar: 0, goodFat: 0, badFat: 1 },
    "chips": { protein: 0, sugar: 0, goodFat: 0, badFat: 1 },
    "biscuits": { protein: 0, sugar: 1, goodFat: 0, badFat: 1 },
    "burger": { protein: 1, sugar: 0, goodFat: 0, badFat: 1 },
    "pizza": { protein: 1, sugar: 0, goodFat: 0, badFat: 1 },
    "fried chicken": { protein: 2, sugar: 0, goodFat: 0, badFat: 1 },
    "cake": { protein: 0, sugar: 2, goodFat: 0, badFat: 1 },

    "tea": { protein: 0, sugar: 1, goodFat: 0, badFat: 0 },
    "coffee": { protein: 0, sugar: 1, goodFat: 0, badFat: 0 },
    "milk": { protein: 1, sugar: 0, goodFat: 1, badFat: 0 },
    "buttermilk": { protein: 1, sugar: 0, goodFat: 1, badFat: 0 },

    "idli": { protein: 1, sugar: 0, goodFat: 0, badFat: 0 },
    "dosa": { protein: 1, sugar: 0, goodFat: 0, badFat: 1 },

    "rice": { protein: 1, sugar: 0, goodFat: 0, badFat: 0 },
    "dal": { protein: 2, sugar: 0, goodFat: 1, badFat: 0 },
    "biryani": { protein: 2, sugar: 0, goodFat: 0, badFat: 1 },

    "egg": { protein: 2, sugar: 0, goodFat: 1, badFat: 0 },
    "fish": { protein: 2, sugar: 0, goodFat: 1, badFat: 0 },

    "banana": { protein: 0, sugar: 1, goodFat: 0, badFat: 0 },
    "orange": { protein: 0, sugar: 1, goodFat: 0, badFat: 0 },
    "watermelon": { protein: 0, sugar: 1, goodFat: 0, badFat: 0 },
    "salad": { protein: 1, sugar: 0, goodFat: 0, badFat: 0 }
};

// ---------------- HEALTHY OPTIONS ----------------
var healthyOptions = [
    { name: "Boiled Egg", cost: 10 },
    { name: "Banana", cost: 10 },
    { name: "Curd", cost: 20 },
    { name: "Sprouts", cost: 30 },
    { name: "Dal", cost: 30 },
    { name: "Salad", cost: 20 },
    { name: "Buttermilk", cost: 15 },
    { name: "Milk", cost: 20 },
    { name: "Apple", cost: 25 },
    { name: "Oats", cost: 20 }
];

// ---------------- PAGE SWITCH FUNCTION ----------------
function showPage(pageId) {
    document.querySelectorAll(".page")
        .forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// ---------------- MAIN ANALYSIS FUNCTION ----------------
function analyzeFood() {

    var foodText = document.getElementById("foodInput").value.toLowerCase();
    var budget = parseInt(document.getElementById("budgetInput").value);

    if (foodText.trim() === "" || isNaN(budget)) {
        alert("Please enter food items and budget.");
        return;
    }

    var foods = foodText.split(",");

    var protein = 0, sugar = 0, goodFat = 0, badFat = 0;
    var junkCount = 0, healthyCount = 0, proteinCount = 0;

    for (var i = 0; i < foods.length; i++) {
        var item = foods[i].trim();
        if (!foodData[item]) continue;

        protein += foodData[item].protein;
        sugar += foodData[item].sugar;
        goodFat += foodData[item].goodFat;
        badFat += foodData[item].badFat;

        if (foodData[item].badFat > 0) junkCount++;
        if (foodData[item].protein > 0) proteinCount++;
        if (foodData[item].badFat === 0) healthyCount++;
    }

    var sugarStatus = (sugar > 2) ? "High" : "Good";
    var fatStatus = (badFat > 2) ? "High" : "Good";
    var proteinStatus = (protein <= 2) ? "Low" : "Good";

    var healthScore = 100;
    if (sugar > 2) healthScore -= 20;
    if (badFat > 2) healthScore -= 30;
    if (protein <= 2) healthScore -= 20;

    var scoreColor = (healthScore < 40) ? "red" :
                     (healthScore < 70) ? "orange" : "green";

    var dailyMessage =
        healthScore >= 70 ? "✅ Balanced diet today!" :
        healthScore >= 40 ? "⚠ Average diet, improve protein." :
        "❌ Too much junk food today.";

    var feedback =
        (sugar > 2 ? "<p class='warning'>High sugar intake.</p>" : "<p class='success'>Sugar intake good.</p>") +
        (badFat > 2 ? "<p class='warning'>Too much fried food.</p>" : "<p class='success'>Fat intake balanced.</p>") +
        (protein <= 2 ? "<p class='warning'>Low protein intake.</p>" : "<p class='success'>Good protein intake.</p>");

    var tomorrowSuggestion =
        "<h4>What to Eat Tomorrow</h4><ul>" +
        (protein <= 2 ? "<li>Dal or Eggs</li>" : "") +
        (badFat > 2 ? "<li>Fruits or Salad</li>" : "") +
        "</ul>";

    var suggestionHTML = "<h4>Healthy Suggestions</h4><ul>";
    var remainingBudget = budget;

    for (var j = 0; j < healthyOptions.length; j++) {
        if (healthyOptions[j].cost <= remainingBudget) {
            suggestionHTML += "<li>" + healthyOptions[j].name + "</li>";
            remainingBudget -= healthyOptions[j].cost;
        }
    }
    suggestionHTML += "</ul>";

    document.getElementById("summaryContent").innerHTML =
        "<div class='section'>" +
        "<h4 style='color:" + scoreColor + "'>Health Score: " + healthScore + "/100</h4>" +
        "</div>" +
        "<div class='section'><ul>" +
        "<li>Sugar: " + sugarStatus + "</li>" +
        "<li>Fat: " + fatStatus + "</li>" +
        "<li>Protein: " + proteinStatus + "</li>" +
        "</ul></div>";

    document.getElementById("feedbackContent").innerHTML =
        "<div class='section'>" +
        "<p>Junk foods: " + junkCount + "</p>" +
        "<p>Healthy foods: " + healthyCount + "</p>" +
        "<p>Protein foods: " + proteinCount + "</p>" +
        "<p>" + dailyMessage + "</p>" +
        feedback +
        "</div>";

    document.getElementById("suggestionContent").innerHTML =
        "<div class='section'>" + tomorrowSuggestion + suggestionHTML + "</div>";

    showPage("page-summary");
}

// ---------------- RESET FUNCTION ----------------
function resetApp() {
    document.getElementById("foodInput").value = "";
    document.getElementById("budgetInput").value = "";
    showPage("page-input");
}

