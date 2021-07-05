export function cardElement(product) {
return ` <div class="col-md-4">
<div class="card mb-3">
   <img src="${product.img}" class="card-img-top">
   <form data-pid="${product.id}" class="add-item-form card-body">
       <h5 class="card-title">
           ${product.title}
       </h5>
       <p class="card-text">
           商品價格: $${product.price}
       </p>
       <div class="form-group">
           <label>購買數量</label>
           <input id="amountInput${product.id}" class="form-control" type="number" min="1" max="20" required>
       </div>
       <div class="form-group">
           <button class="btn btn-primary" type="submit">
               <i class="fas fa-cart-plus"></i> 
               加入購物車
           </button>
       </div>
   </form>
</div>
</div>
`;
};


export const productList = [
    {
        id: '1',
        title: 'Edifier A100',
        price: 18900,
        img: './img/001.jpg',
    },
    {
        id: '2',
        title: 'Edifier A200',
        price: 24900,
        img: './img/002.jpg',
    },
    {
        id: '3',
        title: 'Edifier A80',
        price: 18900,
        img: './img/003.jpg',
    },
    {
        id: '4',
        title: 'Edifier S350DB',
        price: 8500,
        img: './img/004.jpg',
    },
    {
        id: '5',
        title: 'Edifer e255',
        price: 22900,
        img: './img/005.jpg',
    },
    {
        id: '6',
        title: 'Klipsch The Fives',
        price: 18360,
        img: './img/006.jpg',
    },
    {
        id: '7',
        title: 'Klipsch The Sixes',
        price: 29200,
        img: './img/007.jpg',
    },
    {
        id: '8',
        title: 'KEF LSX',
        price: 42000,
        img: './img/008.jpg',
    },
    {
        id: '9',
        title: 'LS50 Wireless II',
        price: 98000,
        img: './img/009.jpg',
    }
];

export function tr(item, idx, time, itemValue) {
    return `<tr>
<td>
    <div class="d-flex">
        <button data-index="${idx}" class="delete-btn btn btn-danger btn-sm"> 
            &times;
        </button>
        <div>
            <p class="m-0">${item.title}</p>
            <p class="m-0 text-gray">${time}</p>
        </div>
    </div>
</td>
<td class="text-right">$ ${item.price}</td>
<td class="text-right">${item.amount}</td>
<td class="text-right">$ ${itemValue}</td>
</tr>` ;};