// Асинхронна функція для отримання списку продуктів з API
async function fetchProducts(){
  // Виконуємо HTTP-запит до fakestoreapi.com
  const response = await fetch('https://fakestoreapi.com/products');
  // відповідь неуспішна — кидаємо помилку
  if(!response.ok){
    throw new Error('Failed to fetch products');
  }
  // Парсимо відповідь у формат JSON
  const data = await response.json();
  // Повертаємо масив продуктів
  return data;
}

function normalizeName (name){
  // Обрізаємо пробіли та видаляємо "the" на початку (нечутливо до регістру)
  const value = name?.trim().replace(/^the\s+/i,'');  
  // Якщо ім'я порожнє — повертаємо 'unknown'
  return value || 'unknown';
}

// Функція для нормалізації імен у масиві об'єктів
function normalizeDate(data) {
  // Для кожного елемента масиву нормалізуємо поле name
  return data.map((item)=> {
    return {
      ...item, // копіюємо всі властивості
      name:normalizeName(item.name) // нормалізуємо ім'я
    };
  });
}

// Функція для визначення цінового діапазону для ціни продукту
function getRange(price){
  // Якщо ціна від 1 до 100
  if(price>=1 && price <=100) return '1-100';
  // Якщо ціна до 200
  if(price<=200) return '101-200';
  // Якщо ціна до 300
  if(price<=300) return '201-300';
  // Якщо ціна до 400
  if(price<=400) return '301-400';
  // Якщо ціна до 500
  if(price <=500) return '401-499';
  // Якщо ціна 500 і більше
  if(price >=500) return '500+';
  // Якщо не підходить жоден діапазон
  return null;
}

// Функція для групування масиву продуктів за ціновими діапазонами
function groupByPrice(data){
  // Створюємо об'єкт з порожніми масивами для кожного діапазону
  const buckets = {
    '1-100': [],
    '101-200': [],
    '201-300': [],  
    '301-400': [],
    '401-500': [],
    '500+': []
  };
  // Проходимо по кожному продукту
  for (let i = 0; i <data.length; i++){
    const item = data[i]; // поточний продукт
    const range = getRange(item.price); // визначаємо діапазон ціни
    if(range){
      buckets[range].push(item); // додаємо продукт у відповідний масив
    }  
  }
  // Повертаємо об'єкт з групами
  return buckets;
}

// Функція для підрахунку статистики по кожній групі (кількість і середня ціна)
function calculateStats(buckets){
  // Для кожного ключа (діапазону) рахуємо count і average
  return Object.keys(buckets).reduce((acc, key) => {  
    const items = buckets[key]; // масив продуктів у групі
    const count = items.length; // кількість продуктів
    const total = items.reduce((sum, item)=> sum +item.price, 0); // сума цін
    const average = count > 0 ? total / count : 0; // середня ціна

    // Додаємо статистику у результат
    return {...acc, [key]:{count, average}};
  }, {});
}

async function getProcessedProducts(){
  const rawData = await fetchProducts();
  const normalizedData = normalizeDate(rawData);
  const buckets = groupByPrice(normalizedData);
  const stats = calculateStats(buckets);
  return stats;
}