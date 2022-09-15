let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books');

  booksWrapper.classList += ' books__loading'

  if (!books) {
    books = await getBooks();
  }
  booksWrapper.classList.remove('books__loading')



  if (filter === 'LOW_TO_HIGH') {
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
  }
  else if (filter === 'HIGH_TO_LOW') {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
  }
  else if (filter === 'RATING') {
    books.sort((a, b) => a.rating - b.rating);
  }


  const booksHTML = books.map((book) => {
    return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
    ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`
  })
    .join("");

  console.log(booksHTML)
  booksWrapper.innerHTML = booksHTML
}

setTimeout(() => {
  renderBooks();
});

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  else {
    return `<span class="book__price--normal"> $${originalPrice.toFixed(2)} </span> $${salePrice.toFixed(2)}`
  }
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value)
}

// FAKE DATA
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Release",
          url: "assets/book-1.jpg",
          originalPrice: 29.99,
          salePrice: null,
          rating: 4,
        },
        {
          id: 2,
          title: "Forgotten Magic",
          url: "assets/book-2.jpg",
          originalPrice: 24.99,
          salePrice: 19.99,
          rating: 4.5,
        },
        {
          id: 3,
          title: "Sorry For Your Loss",
          url: "assets/book-3.jpg",
          originalPrice: 29.99,
          salePrice: 14.99,
          rating: 3.5,
        },
        {
          id: 4,
          title: "Infinity Reaper",
          url: "assets/book-4.jpg",
          originalPrice: 34.99,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Green Angels",
          url: "assets/book-5.jpg",
          originalPrice: 24.99,
          salePrice: 19.99,
          rating: 5,
        },
        {
          id: 6,
          title: "Middle School: Get Me Out of Here!",
          url: "assets/book-6.jpg",
          originalPrice: 14.99,
          salePrice: 9.99,
          rating: 4,
        },
        {
          id: 7,
          title: "Deep Tides",
          url: "assets/book-7.jpg",
          originalPrice: 14.99,
          salePrice: 9.99,
          rating: 4.5,
        },
        {
          id: 8,
          title: "Throne of Glass",
          url: "assets/book-8.png",
          originalPrice: 39.99,
          salePrice: null,
          rating: 5,
        },
        {
          id: 9,
          title: "Assassin's Creed: Forsaken",
          url: "assets/book-9.jpg",
          originalPrice: 39.99,
          salePrice: 29.99,
          rating: 3.5,
        },
        {
          id: 10,
          title: "Assassin's Creed: The Secret Crusade",
          url: "assets/book-10.jpg",
          originalPrice: 39.99,
          salePrice: 29.99,
          rating: 4.5,
        },
        {
          id: 11,
          title: "Assassin's Creed: Brotherhood",
          url: "assets/book-11.jpg",
          originalPrice: 39.99,
          salePrice: 29.99,
          rating: 5,
        },
        {
          id: 12,
          title: "Auring's Wrath",
          url: "assets/book-12.jpg",
          originalPrice: 24.99,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 2500);
  })
}
