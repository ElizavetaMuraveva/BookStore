
const books = [
    {title: "Преступление и наказание", author: "Федор Достоевский", category: "Художественная литература", year: 1866, price: 250, status: "Доступна", rented: false},
    {title: "Граф Монте-Кристо", author: "Александр Дюма", category: "Художественная литература", year: 1846, price: 300, status: "Доступна", rented: false},
    {title: "Зов Кукушки", author: "Джулиан Роулинг", category: "Детектив", year: 2013, price: 480, status: "Доступна", rented: false},
    {title: "Мистер Мерседес", author: "Стивен Кинг", category: "Детектив", year: 2014, price: 425, status: "Доступна", rented: false},
    {title: "Лев, Колдунья и Платяной шкаф", author: "Клайв С. Льюис", category: "Художественная литература", year: 1950, price: 400, status: "Доступна", rented: false},
    {title: "Собачье Сердце", author: "Михаил Булгаков", category: "Художественная литература", year: 1925, price: 150, status: "Доступна", rented: false},
];


function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = "";
    books.forEach((book, index) => {
        bookList.innerHTML += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${book.title}</span>
                <p>Автор: ${book.author}<br>
                Категория: ${book.category}<br>
                Год: ${book.year}<br>
                Цена: ${book.price} руб.</p>
            </div>
            <div class="card-action">
                <div>
                    <label for="rentalPeriod${index}">Выберите срок аренды:</label>
                    <select id="rentalPeriod${index}" onchange="calculateReturnDate(${index})" ${book.rented ? 'disabled' : ''}>
                        <option value="2 недели">2 недели</option>
                        <option value="1 месяц">1 месяц</option>
                        <option value="3 месяца">3 месяца</option>
                    </select>
                    <div id="returnDate${index}" class="return-date"></div>
                </div>
                <div>
                    <button onclick="buyBook(${index})" ${book.rented ? 'disabled' : ''}>Купить</button>
                    <button onclick="rentBook(${index})" ${book.rented ? 'disabled' : ''}>Арендовать</button>
                </div>
            </div>
        </div>`;
    });
}


function rentBook(index) {
    const rentalPeriod = document.getElementById(`rentalPeriod${index}`).value;
    if (rentalPeriod) {
        const rentalDate = new Date();
        if (rentalPeriod === "2 недели") {
            rentalDate.setDate(rentalDate.getDate() + 14);
        } else if (rentalPeriod === "1 месяц") {
            rentalDate.setMonth(rentalDate.getMonth() + 1);
        } else if (rentalPeriod === "3 месяца") {
            rentalDate.setMonth(rentalDate.getMonth() + 3);
        }

        books[index].rented = true;
        alert(`Вы арендовали книгу "${books[index].title}" на срок ${rentalPeriod}. Дата возврата: ${rentalDate.toLocaleDateString()}`);
        displayBooks();
    }
}


function buyBook(index) {
    books[index].rented = true;  
    alert(`Вы купили книгу "${books[index].title}"!`);
    displayBooks();
}


function calculateReturnDate(index) {
    const rentalPeriod = document.getElementById(`rentalPeriod${index}`).value;
    const currentDate = new Date();
    let returnDate = new Date(currentDate);

    if (rentalPeriod === "2 недели") {
        returnDate.setDate(currentDate.getDate() + 14);
    } else if (rentalPeriod === "1 месяц") {
        returnDate.setMonth(currentDate.getMonth() + 1);
    } else if (rentalPeriod === "3 месяца") {
        returnDate.setMonth(currentDate.getMonth() + 3);
    }

    document.getElementById(`returnDate${index}`).textContent = `Дата возврата: ${returnDate.toLocaleDateString()}`;
}

function displayAdminBooks() {
    const adminBookList = document.getElementById('adminBookList');
    adminBookList.innerHTML = "";
    books.forEach((book, index) => {
        adminBookList.innerHTML += `
        <div class="card">
            <div class="card-content">
                <span class="card-title">${book.title}</span>
                <p>Автор: ${book.author}<br>
                Категория: ${book.category}<br>
                Год: ${book.year}<br>
                Цена: ${book.price} руб.<br>
                Статус: ${book.rented ? 'Недоступна' : 'Доступна'}</p>
            </div>
            <div class="card-action">
                <button onclick="updateBook(${index})">Редактировать</button>
                <button onclick="changeStatus(${index})">Изменить статус</button>
            </div>
        </div>`;
    });
}

function updateBook(index) {
    const bookToUpdate = books[index];
    bookToUpdate.title = prompt("Обновите название:", bookToUpdate.title);
    bookToUpdate.author = prompt("Обновите автора:", bookToUpdate.author);
    bookToUpdate.category = prompt("Обновите категорию:", bookToUpdate.category);
    bookToUpdate.year = parseInt(prompt("Обновите год:", bookToUpdate.year), 10);
    bookToUpdate.price = parseFloat(prompt("Обновите цену:", bookToUpdate.price));
    displayAdminBooks();
}


function addBook() {
    const title = prompt("Введите название книги:");
    const author = prompt("Введите автора книги:");
    const category = prompt("Введите категорию книги:");
    const year = parseInt(prompt("Введите год книги:"), 10);
    const price = parseFloat(prompt("Введите цену книги:"), 10);

    if (title && author && category && year && price) {
        const newBook = {
            title: title,
            author: author,
            category: category,
            year: year,
            price: price,
            status: "Доступна",
            rented: false
        };

        books.push(newBook);
        alert("Книга добавлена!");
        displayAdminBooks();  
    } else {
        alert("Пожалуйста, заполните все поля!");
    }
}


function deleteBook(index) {
    // Подтверждение удаления
    if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
        books.splice(index, 1); 
        alert('Книга удалена.');
        displayBooks(); 
    }
}


 function changeStatus(index) {
    const bookToUpdate = books[index];
    bookToUpdate.status = prompt("Обновите статус:", bookToUpdate.status);
    displayAdminBooks();
}

  function sendReminder() {
    alert("Напоминания отправлены!");
}

function sortBooks() {
    const sortOption = document.getElementById('sortOption').value;
    books.sort((a, b) => {
        if (sortOption === 'category') {
            return a.category.localeCompare(b.category);
        } else if (sortOption === 'author') {
            return a.author.localeCompare(b.author);
        } else {
            return a.year - b.year;
        }
    });
    displayBooks();
}


function showPanel(panelName) {
    const adminPanel = document.getElementById('adminPanel');
    const userPanel = document.getElementById('userPanel');

    if (panelName === 'admin') {
        adminPanel.style.display = 'block';
        userPanel.style.display = 'none';
        displayAdminBooks(); 
    } else {
        adminPanel.style.display = 'none';
        userPanel.style.display = 'block';
        displayBooks();  
    }
}