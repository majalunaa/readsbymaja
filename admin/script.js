let books = JSON.parse(localStorage.getItem('readsbymaja-books') || '[]');
let selectedRating = 0;

const starPicker = document.getElementById('star-picker');
const ratingInput = document.getElementById('rating');
const jsonOutput = document.getElementById('json-output');

function updateStars(val) {
  selectedRating = val;
  ratingInput.value = val;
  [...starPicker.querySelectorAll('span')].forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val) <= val);
  });
}

starPicker.addEventListener('click', e => {
  if (e.target.dataset.val) updateStars(parseInt(e.target.dataset.val));
});

starPicker.addEventListener('mouseover', e => {
  if (e.target.dataset.val) {
    [...starPicker.querySelectorAll('span')].forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.val) <= parseInt(e.target.dataset.val));
    });
  }
});

starPicker.addEventListener('mouseleave', () => updateStars(selectedRating));

function fileToFilename(file, prefix) {
  const safe = file.name.replace(/[^a-z0-9.]/gi, '-').toLowerCase();
  return `images/${prefix}/${safe}`;
}

document.getElementById('book-form').addEventListener('submit', async e => {
  e.preventDefault();

  const spineFile = document.getElementById('spineImage').files[0];
  const coverFile = document.getElementById('coverImage').files[0];

  const book = {
    id: Date.now(),
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    dateRead: document.getElementById('dateRead').value,
    rating: selectedRating || 3,
    spineColor: document.getElementById('spineColor').value,
    spineImage: spineFile ? fileToFilename(spineFile, 'spines') : null,
    coverImage: coverFile ? fileToFilename(coverFile, 'covers') : null,
  };

  books.push(book);
  localStorage.setItem('readsbymaja-books', JSON.stringify(books));
  updateOutput();
  e.target.reset();
  updateStars(0);

  if (spineFile || coverFile) {
    alert(`Book added! Remember to copy these image files to your project:\n${spineFile ? '→ ' + book.spineImage : ''}\n${coverFile ? '→ ' + book.coverImage : ''}`);
  }
});

document.getElementById('copy-btn').addEventListener('click', () => {
  jsonOutput.select();
  navigator.clipboard.writeText(jsonOutput.value);
  document.getElementById('copy-btn').textContent = 'Copied!';
  setTimeout(() => document.getElementById('copy-btn').textContent = 'Copy JSON', 2000);
});

function updateOutput() {
  jsonOutput.value = JSON.stringify(books, null, 2);
}

updateOutput();
