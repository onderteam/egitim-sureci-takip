document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const form = document.querySelector('form');
    const tableBody = document.querySelector('tbody');
    const viewDataBtn = document.getElementById('viewDataBtn');
    let trainingData = JSON.parse(localStorage.getItem('trainingData')) || [];
    let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    let editIndex = localStorage.getItem('editEntryIndex'); // Edit index'i localStorage'dan alın
    let editEntryData = JSON.parse(localStorage.getItem('editEntryData')); // Editlenecek veriyi localStorage'dan alın

    const dateInput = document.getElementById('date');
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), 11, 31);

    function formatDate(date) {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    dateInput.value = formatDate(today);

    // Eğer editlenecek veri varsa formu doldurun
    if (editEntryData) {
        const dateParts = editEntryData.date.split('.');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        dateInput.value = formattedDate;
        document.getElementById('module').value = editEntryData.module;
        document.getElementById('topics').value = editEntryData.topics;
        document.getElementById('practiceTime').value = editEntryData.practiceTime;
        document.getElementById('progress').value = editEntryData.progress;
        document.getElementById('resources').value = editEntryData.resources;
        document.getElementById('projects').value = editEntryData.projects;
        document.getElementById('importanceLevel').value = editEntryData.importanceLevel;

        // Edit işlemi tamamlandığında localStorage'dan veriyi silin
        localStorage.removeItem('editEntryData');
        localStorage.removeItem('editEntryIndex');
    }

    form.onsubmit = (event) => {
        event.preventDefault();

        const dateParts = dateInput.value.split(".");
        const enteredDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        if (enteredDate < new Date('2024-01-01') || enteredDate > maxDate) {
            alert('Geçersiz tarih. Lütfen geçerli bir tarih giriniz.');
            return;
        }

        const newEntry = {
            date: dateInput.value,
            module: document.getElementById('module').value,
            topics: document.getElementById('topics').value,
            practiceTime: document.getElementById('practiceTime').value,
            progress: document.getElementById('progress').value,
            resources: document.getElementById('resources').value,
            projects: document.getElementById('projects').value,
            importanceLevel: document.getElementById('importanceLevel').value
        };

        if (editIndex !== null) {
            trainingData[editIndex] = newEntry;
            editIndex = null;
        } else {
            trainingData.push(newEntry);
        }

        localStorage.setItem('trainingData', JSON.stringify(trainingData));
        form.reset();
        dateInput.value = formatDate(today);
        updateTable();
    };

    function updateTable() {
        tableBody.innerHTML = '';
        const previewData = trainingData.slice(0, 5);
        previewData.forEach(entry => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = entry.date;
            row.appendChild(dateCell);

            const moduleCell = document.createElement('td');
            moduleCell.textContent = entry.module;
            row.appendChild(moduleCell);

            const topicsCell = document.createElement('td');
            topicsCell.textContent = entry.topics;
            row.appendChild(topicsCell);

            tableBody.appendChild(row);
        });
        synchronizeDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        synchronizeDarkMode();
    });

    function synchronizeDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        document.querySelectorAll('th, td').forEach(element => {
            if (isDarkMode) {
                element.classList.add('dark-mode');
            } else {
                element.classList.remove('dark-mode');
            }
        });
    }

    viewDataBtn.addEventListener('click', () => {
        if (trainingData.length > 0) {
            window.location.href = 'data.html';
        } else {
            alert('Veri bulunmamaktadır!');
        }
    });

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.container').classList.add('dark-mode');
    }

    updateTable();
    synchronizeDarkMode();
});
