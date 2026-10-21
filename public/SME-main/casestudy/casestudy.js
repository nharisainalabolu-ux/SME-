// Food items and their prices
    const foodPrices = {
        "Burger": 80,
        "Sandwich": 60,
        "Pizza": 120,
        "French fries": 50,
        "Cold coffee": 70
    };

    // Function to calculate the total bill
    function calculateBill() {

        let budget = Number(document.getElementById("budget").value);
        let quantity = Number(document.getElementById("quantity").value);

        let result = document.getElementById("result");

        // Validate the number of items using a while loop
        while (quantity <= 0 || !Number.isInteger(quantity)) {

            result.innerHTML =
                "<p class='error'>Please enter a whole number greater than zero.</p>";

            return;
        }

        if (document.getElementById("budget").value === "" ||
            budget <= 0 || !Number.isFinite(budget)) {

            result.innerHTML =
                "<p class='error'>Please enter a valid budget greater than zero.</p>";

            return;
        }

        // Get selected food items
        let selectedItems = document.querySelectorAll(
            'input[name="food"]:checked'
        );

        // Check whether any food item is selected
        if (selectedItems.length === 0) {

            result.innerHTML =
                "<p class='error'>Please select at least one food item.</p>";

            return;
        }

        // Check whether quantity matches selected items
        if (quantity !== selectedItems.length) {

            result.innerHTML =
                "<p class='error'>Please enter the same quantity as the number of selected food items.</p>";

            return;
        }

        let totalBill = 0;
        let orderDetails = "";

        // Use a for loop to calculate the total bill
        for (let i = 0; i < selectedItems.length; i++) {

            let itemName = selectedItems[i].value;
            let price = foodPrices[itemName];

            totalBill = totalBill + price;

            orderDetails += itemName + " - ₹" + price + "<br>";
        }

        let discount = 0;

        // Apply a 10% discount if the bill exceeds ₹300
        if (totalBill > 300) {

            discount = totalBill * 0.10;
        }

        let finalBill = totalBill - discount;

        // Check affordability using if-else
        if (budget >= finalBill) {

            result.innerHTML =
                "<h2 class='success'>Order Summary</h2>" +
                "<b>Selected Items:</b><br>" +
                orderDetails +
                "<b>Number of Items:</b> " + quantity + "<br>" +
                "<b>Total Bill:</b> ₹" + totalBill + "<br>" +
                "<b>Discount:</b> ₹" + discount.toFixed(2) + "<br>" +
                "<b>Final Bill:</b> ₹" + finalBill.toFixed(2) + "<br>" +
                "<b>Your Budget:</b> ₹" + budget + "<br>" +
                "<h3 class='success'>You can afford this meal!</h3>";

        } else {

            result.innerHTML =
                "<h2 class='error'>Insufficient Budget!</h2>" +
                "<b>Total Bill:</b> ₹" + totalBill + "<br>" +
                "<b>Discount:</b> ₹" + discount.toFixed(2) + "<br>" +
                "<b>Final Bill:</b> ₹" + finalBill.toFixed(2) + "<br>" +
                "<b>Your Budget:</b> ₹" + budget + "<br>" +
                "<p class='error'>You need a larger budget to afford this meal.</p>";
        }
    }
