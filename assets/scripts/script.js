const container = document.querySelector('.container');

/*header*/
const header = document.createElement('header');
const h1 = document.createElement('h1');
const img_header = document.createElement('img');
img_header.src = '../../assets/img/books.svg';
h1.innerText = 'BookShop';
header.append(img_header);
header.append(h1);
container.append(header);

/*main*/
const main = document.createElement('div');
main.classList.add('main');
/*catalog*/
const catalog = document.createElement('div');
catalog.classList.add('catalog');

/*books*/
let data_books;

fetch('../../assets/scripts/books.json')
  .then(response => response.json())
  .then(data => {
    data_books = data;
    generateBooks(data);
  })
  .catch(error => console.error(error));

function generateBooks(data) {
  for (let i = 0; i < data.length; i++) {
    let book_card = document.createElement('div');
    book_card.classList.add('book_card');
    let img_book = document.createElement('img');
    img_book.src = data[i].imageLink;
    book_card.classList.add('book_card');
    img_book.classList.add('book_card_img');
    book_card.append(img_book);

    let h5_book = document.createElement('h5');
    h5_book.innerText = data[i].author;
    book_card.append(h5_book);

    let h3_book = document.createElement('h3');
    h3_book.classList.add('title_book');
    h3_book.innerText = data[i].title;
    book_card.append(h3_book);

    let p_book = document.createElement('p');
    p_book.innerText = `Price: ${data[i].price}$`;
    book_card.append(p_book);

    let button_show = document.createElement('button');
    button_show.classList.add('button_show');
    button_show.innerText = 'Show more';
    button_show.addEventListener('click', () => openPopup(data[i]))
    book_card.append(button_show);

    let button_add = document.createElement('button');
    button_add.innerText = 'Add to cart';
    button_add.addEventListener('click', () => addToBasket(data[i], i))
    book_card.append(button_add);

    catalog.append(book_card);
  }
}

main.append(catalog);

/*cart*/
const cart = document.createElement('div');
cart.classList.add('cart');
const h3 = document.createElement('h3');
h3.classList.add('title_cart');
h3.innerText = 'Cart';
cart.append(h3);

const cart_container = document.createElement('div');
cart_container.classList.add('cart_container');
cart.append(cart_container);

const info_cart = document.createElement('p');
info_cart.classList.add('info_cart');
info_cart.innerText = 'Your cart is empty'
cart.append(info_cart);

const total = document.createElement('p');
total.classList.add('total');
total.innerText = 'Total: 0$';
let total_sum = 0;
cart.append(total);

const confirm_order = document.createElement('a');
confirm_order.classList.add('confirm_order');
confirm_order.innerText = 'Confirm order';
confirm_order.href = '../../pages/form/index.html';
cart.append(confirm_order);

main.append(cart);
container.append(main);

/*footer*/
const footer = document.createElement('footer');
h3_footer = document.createElement('h3');
const img_footer = document.createElement('img');
img_footer.src = '../../assets/img/git-logo.png';
h3_footer.innerText = 'olesia-bliznuk';
footer.append(img_footer);
footer.append(h3_footer);
container.append(footer);


const popup = document.createElement('div');
popup.classList.add('popup');
container.append(popup);

/*popup*/
function openPopup(book) {
  popup.classList.add('open');
  document.body.classList.add('stop-scrolling');
  const popup_card = document.createElement('div');
  popup_card.classList.add('popup_card');
  popup_card.innerHTML = `
        <img src="${book.imageLink}">
        <div>
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <button class = "button_close">Close</button>
        </div>
  `;
  popup.append(popup_card);
}

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('button_close')) {
    document.body.classList.remove('stop-scrolling');
    popup.classList.remove('open');
  }
});

/* Drag and drop */


window.addEventListener('dragstart', function(event) {
  if (event.target.classList.contains('book_card')) {
      let book = event.target;
      book.classList.add('book_dragging');
  }
  if (event.target.classList.contains('book_card_img')) {
      let book = event.target.parentElement;
      book.classList.add('book_dragging');
  }
});

window.addEventListener('dragend', function(event) {
  if (event.target.classList.contains('book_card')) {
      let book = event.target;
      book.classList.remove('book_dragging');
  }
  if (event.target.classList.contains('book_card_img')) {
      let book = event.target.parentElement;
      book.classList.remove('book_dragging');
  }
});


window.addEventListener('dragover', function(event) {
      event.preventDefault();
});

window.addEventListener('drop', function(event) {
  if (event.target.classList.contains('cart') || event.target.parentElement.classList.contains('cart_container')
  || event.target.classList.contains('info_cart') || event.target.classList.contains('confirm_order')
  || event.target.classList.contains('total') || event.target.classList.contains('title_cart')
  || event.target.classList.contains('book_cart_info') || event.target.parentElement.classList.contains('book_cart')
  || event.target.classList.contains('book_cart_img') || event.target.classList.contains('book_cart_del')
  || event.target.parentElement.classList.contains('book_cart_info')) {
      const book_dragging = document.querySelector('.book_dragging');
      const title = book_dragging.querySelector('.title_book');
      const book_select = data_books.findIndex((el) => el.title == title.innerText);
      addToBasket(data_books[book_select], book_select);
  }

});


/*add book to cart*/
function addToBasket(book, i) {

  if (document.getElementById(i) == null) {
    info_cart.classList.add('hidden');
    total_sum += book.price;
    total.innerText = `Total: ${total_sum}$`;

    const book_cart = document.createElement('div');
    book_cart.classList.add('book_cart');
    book_cart.id = i;

    const cont = document.createElement('div');
    book_cart.append(cont);

    const book_cart_img = document.createElement('img');
    book_cart_img.classList.add('book_cart_img');
    book_cart_img.src = book.imageLink;
    cont.append(book_cart_img);

    const book_cart_info = document.createElement('div');
    book_cart_info.classList.add('book_cart_info');
    cont.append(book_cart_info);

    const book_cart_del = document.createElement('button');
    book_cart_del.innerText = 'X';
    book_cart_del.classList.add('book_cart_del');
    book_cart_del.addEventListener('click', () => deleteBook(book, i))
    book_cart_info.append(book_cart_del);
  

    const book_cart_price = document.createElement('p');
    book_cart_price.classList.add('book_cart_price');
    book_cart_price.innerText = `${book.price}$ x 1`;
    book_cart_info.append(book_cart_price);

    const book_cart_author = document.createElement('h5');
    book_cart_author.innerText = book.author;
    book_cart.append(book_cart_author);

    const book_cart_title = document.createElement('h4');
    book_cart_title.innerText = book.title;
    book_cart.append(book_cart_title);

    cart_container.append(book_cart);
  } else {
    const book_card = document.getElementById(i);
    total_sum += book.price;
    total.innerText = `Total: ${total_sum}$`;
    const book_cart_price = book_card.querySelector('.book_cart_price');

    let num = +book_cart_price.innerText[book_cart_price.innerText.length - 1];
    let num_second = book_cart_price.innerText[book_cart_price.innerText.length - 2];
    if (num_second !== ' ') {
      num += +num_second * 10;
    }
    num++;
    if (num > 99) {
      num = 99;
      total_sum -= book.price;
      total.innerText = `Total: ${total_sum}$`;
    }
    book_cart_price.innerText = `${book.price}$ x ${num}`;
  }
}


function deleteBook(book, i) {

  const book_card = document.getElementById(i);

  const book_cart_price = book_card.querySelector('.book_cart_price');
  let num = +book_cart_price.innerText[book_cart_price.innerText.length - 1];
  let num_second = book_cart_price.innerText[book_cart_price.innerText.length - 2];
  if (num_second !== ' ') {
    num += +num_second * 10;
  }
  total_sum -= book.price * num;
  total.innerText = `Total: ${total_sum}$`;

  document.getElementById(i).remove();

  if (!cart_container.firstChild)
  {
    info_cart.classList.remove('hidden');
  }
}

