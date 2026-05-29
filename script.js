async function loadBooks() {
  const res = await fetch('data/books.json');
  const books = await res.json();
  renderShelf(books);
}

function stars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(dateStr) {
  const [year, month] = dateStr.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function renderShelf(books) {
  const shelf = document.getElementById('bookshelf');

  books.forEach(book => {
    const bookEl = document.createElement('div');
    bookEl.className = 'book';

    // Spine width varies slightly per book for realism
    const width = 28 + Math.floor(Math.random() * 16);
    const height = 180 + Math.floor(Math.random() * 40);
    bookEl.style.width = width + 'px';
    bookEl.style.height = height + 'px';

    bookEl.innerHTML = `
      <div class="book-inner">
        <div class="book-spine">
          ${book.spineImage
            ? `<img src="${book.spineImage}" alt="${book.title} spine">`
            : `<div style="width:100%;height:100%;background:${book.spineColor || '#8B4513'};"></div>`
          }
        </div>
        <div class="book-cover">
          ${book.coverImage
            ? `<img src="${book.coverImage}" alt="${book.title} cover">`
            : `<div style="width:100%;height:100%;background:#ddd;display:flex;align-items:center;justify-content:center;font-size:0.6rem;padding:4px;text-align:center;">${book.title}</div>`
          }
        </div>
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-meta">
          <span class="stars">${stars(book.rating)}</span> · ${formatDate(book.dateRead)}
        </div>
      </div>
    `;

    shelf.appendChild(bookEl);
  });
}

loadBooks();
