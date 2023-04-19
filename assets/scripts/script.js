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
confirm_order.href = '/pages/form/index.html';
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
