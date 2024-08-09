document.addEventListener('DOMContentLoaded', () => { 
    const trainingTable = document.getElementById('trainingTable').getElementsByTagName('tbody')[0];
    const darkModeToggle = document.getElementById('darkModeToggle');
    const backBtn = document.getElementById('backBtn');
    let trainingData = JSON.parse(localStorage.getItem('trainingData')) || [];
    let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

    // Verileri yükleyen fonksiyon
    function loadTrainingData() {
        trainingTable.innerHTML = ''; // Önce tabloyu temizler

        trainingData.forEach((entry, index) => { // Her bir veri girişi için
            const row = trainingTable.insertRow();

            row.insertCell(0).innerText = entry.date;
            row.insertCell(1).innerText = entry.module;
            row.insertCell(2).innerText = entry.topics;
            row.insertCell(3).innerText = entry.practiceTime;
            row.insertCell(4).innerText = entry.progress;
            row.insertCell(5).innerText = entry.resources;
            row.insertCell(6).innerText = entry.projects;

            const importanceCell = row.insertCell(7);
            importanceCell.innerText = entry.importanceLevel;

            const actionsCell = row.insertCell(8);
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Düzenle';
            editBtn.onclick = () => editEntry(index); // Düzenle düğmesi işlevi
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Sil';
            deleteBtn.onclick = () => deleteEntry(index); // Sil düğmesi işlevi
            actionsCell.appendChild(deleteBtn);

            actionsCell.style.display = 'flex';
            actionsCell.style.gap = '10px';

            // Önem seviyesine göre hücre rengini ayarlama
            switch (entry.importanceLevel) {
                case 'Önemli':
                    importanceCell.style.backgroundColor = '#ff4c4c'; // Kırmızı
                    break;
                case 'Orta Derece':
                    importanceCell.style.backgroundColor = '#ffd700'; // Sarı
                    break;
                case 'Normal':
                    importanceCell.style.backgroundColor = '#90ee90'; // Yeşil
                    break;
                default:
                    importanceCell.style.backgroundColor = '#90ee90'; // Varsayılan yeşil
                    break;
            }
        });
    }

    // Veriyi düzenleme fonksiyonu
    function editEntry(index) {
        const entry = trainingData[index];
        localStorage.setItem('editEntryData', JSON.stringify(entry)); // Veriyi localStorage'a kaydedin
        localStorage.setItem('editEntryIndex', index); // Düzenlenen verinin indeksini kaydedin
        window.location.href = 'index.html#edit';
    }

    // Veriyi silme fonksiyonu
    function deleteEntry(index) {
        trainingData.splice(index, 1);
        localStorage.setItem('trainingData', JSON.stringify(trainingData));
        loadTrainingData();
    }

    // Gece modu işlevi
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        isDarkMode = !isDarkMode;
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        synchronizeDarkMode();
    });

    // Gece modunu eşitleme fonksiyonu
    function synchronizeDarkMode() {
        const tableRows = document.querySelectorAll('tr');
        tableRows.forEach(row => {
            if (isDarkMode) {
                row.classList.add('dark-mode');
            } else {
                row.classList.remove('dark-mode');
            }
        });
    }

    // Geri düğmesi işlevi
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Gece modu ayarını yükler
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.container').classList.add('dark-mode');
    }

    // Verileri yükler ve gece modunu eşitler
    loadTrainingData();
    synchronizeDarkMode();
});
