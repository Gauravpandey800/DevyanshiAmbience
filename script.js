const basePrices = {
    kitchen: 1000, wardrobe: 800, dining: 600, tile: 500,
    living: 700, bathroom: 900, master_bedroom: 1200,
    kids_room: 1000, balcony: 500, pooja: 400
};

const kitchenStyleMultiplier = {
    l_shaped: 1.2, u_shaped: 1.5, parallel: 1.3, straight: 1.1
};

const wardrobeHeightMultiplier = {
    4: 1.0, 6: 1.2, 7: 1.5, 9: 1.8
};

const designQualityMultiplier = {
    basic: 1.0, standard: 1.3, premium: 1.6
};

function updateDesignOptions() {
    const selected = document.getElementById("designType").value;
    document.getElementById("kitchenOptions").classList.add("hidden");
    document.getElementById("wardrobeOptions").classList.add("hidden");
    
    if (selected === "kitchen") {
        document.getElementById("kitchenOptions").classList.remove("hidden");
    } else if (selected === "wardrobe") {
        document.getElementById("wardrobeOptions").classList.remove("hidden");
    }
    calculatePrice();
}

function updateSizeInputs() {
    const style = document.getElementById("kitchenStyle").value;
    const size2Label = document.getElementById("size2Label");
    const size2Input = document.getElementById("size2");
    const size3Label = document.getElementById("size3Label");
    const size3Input = document.getElementById("size3");
    
    if (style === "straight") {
        size2Label.style.display = "none";
        size2Input.style.display = "none";
        size3Label.classList.add("hidden");
        size3Input.classList.add("hidden");
    } else if (style === "u_shaped") {
        size2Label.style.display = "block";
        size2Input.style.display = "block";
        size3Label.classList.remove("hidden");
        size3Input.classList.remove("hidden");
    } else {
        size2Label.style.display = "block";
        size2Input.style.display = "block";
        size3Label.classList.add("hidden");
        size3Input.classList.add("hidden");
    }
    calculatePrice();
}

function calculatePrice() {
    let total = 0;
    const selectedType = document.getElementById("designType").value;
    const quality = document.getElementById("designQuality").value;
    const qualityMultiplier = designQualityMultiplier[quality] || 1;
    
    if (selectedType === "kitchen") {
        const style = document.getElementById("kitchenStyle").value;
        const size1 = parseFloat(document.getElementById("size1").value) || 0;
        const size2 = style === "straight" ? 1 : (parseFloat(document.getElementById("size2").value) || 0);
        const size3 = style === "u_shaped" ? (parseFloat(document.getElementById("size3").value) || 0) : 1;
        if (style && size1) {
            total = size1 * size2 * size3 * basePrices.kitchen * (kitchenStyleMultiplier[style] || 1) * qualityMultiplier;
        }
    } else if (selectedType === "wardrobe") {
        const height = document.getElementById("wardrobeHeight").value;
        total = basePrices.wardrobe * (wardrobeHeightMultiplier[height] || 1) * qualityMultiplier;
    } else if (basePrices[selectedType]) {
        total = basePrices[selectedType] * qualityMultiplier;
    }
    
    document.getElementById("totalPrice").innerText = total.toFixed(2);
}
