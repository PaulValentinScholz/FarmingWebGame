window.onload = function() {
    const dayLabel = document.getElementById("dayLabel");
    const energyLabel = document.getElementById("energyLabel");
    const coinsLabel = document.getElementById("coinsLabel");
    const logsLabel = document.getElementById("logsLabel");
    const stonesLabel = document.getElementById("stonesLabel");
    const rentLabel = document.getElementById("rentLabel");
    const objectiveLabel = document.getElementById("objectiveLabel");
    const nextDayButton = document.getElementById("nextDayButton");

    // Example initial values
    let day = 1;
    let energy = 100;
    let coins = 0;
    let logs = 0;
    let stones = 0;
    let rentAmount = 500;
    let daysDue = 7;
    let objective = "Complete the task";

    updateLabels();

    function updateLabels() {
        dayLabel.textContent = "Day: " + day;
        energyLabel.textContent = "Energy: " + energy;
        coinsLabel.textContent = "Coins: " + coins;
        logsLabel.textContent = "Logs: " + logs;
        stonesLabel.textContent = "Stones: " + stones;
        rentLabel.textContent = "Pay " + rentAmount + " rent within the next " + daysDue + " days.";
        objectiveLabel.textContent = "Objective: " + objective;
    }

    nextDayButton.addEventListener("click", function() {
        // Perform necessary actions to advance to the next day
        day++;
        energy = 100; // Reset energy to 100 for the new day
        updateLabels();
    });

    function centerBottomIcons() {
        const bottomIcons = document.querySelector('.bottom-icons');
        const buttons = bottomIcons.querySelectorAll('button');

        // Calculate the total width of all buttons
        let totalWidth = 0;
        buttons.forEach(button => {
            totalWidth += button.offsetWidth;
        });

        // Calculate the negative margin for centering
        const margin = (bottomIcons.offsetWidth - totalWidth) / 2;
        bottomIcons.style.marginLeft = margin + 'px';
    }

    centerBottomIcons();
    window.addEventListener('resize', centerBottomIcons);

    const seedButtons = document.querySelectorAll('.bottom-icons div');
    seedButtons.forEach(div => {
        div.classList.add('div-clickable');
    });

};
