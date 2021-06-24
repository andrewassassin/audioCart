
    // 產品列表
    // [{}, {}, {}, {},...]
    const productList = [
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

    // 設計渲染商品的函數
    function renderProductList() {
        // 透過迴圈將produstList內的資料一一取出
        productList.forEach(product => {
            // 取得一張卡片的HTML
            const card = createProductCardElement(product);
            $("#productRow").append(card);
        });
    }

    // 設計建立單一商品卡片HTML標籤的函數
    function createProductCardElement(product) {
        const cardElement = `
        <div class="col-md-4">
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
        return cardElement;
    }

    // 渲染商品列表至畫面上
    renderProductList();

    // 建構式
    function Cart() {
        this.key = 'example-cart';
        // 購物車的品項
        this.itemList = [];
        // 初始化購物車
        this.initCart = function () {
            const itemListStr = localStorage.getItem(this.key);
            const defaultList = JSON.parse(itemListStr);
            this.itemList = defaultList || [];
            this.render();
        }
        // 傳入商品id與數量並新增商品至購物車
        this.addItem = function (pid, amount) {
            console.log(pid, amount);
            // 取得商品的詳細資料
            // 陣列.find()
            const product = productList.find(product => {
                // console.log("pid~~~",product.id)
                // 找到產品的id == pid 的資料
                return product.id == pid;
            });
            console.log("[商品詳情]", product);
          
            const item = {
                ...product,
                amount,
                createdAt: new Date().getTime()
            };
            console.log("購物車品項", item);
            this.itemList.push(item);
            this.render();
        }
        // 至購物車刪除於購物車內指定索引商品
        this.deleteItem = function (i) {
            this.itemList.splice(i, 1);
            this.render();
        }
        // 清空購物車
        this.emptyCart = function () {
            this.itemList = [];
            this.render();
        }
        // 更新資料到localStorage
        this.updateDataToStorage = function () {
            const itemListStr = JSON.stringify(this.itemList);
            localStorage.setItem(this.key, itemListStr);
        }
        // 渲染購物車
        this.render = function () {
             $("#cartNumber").text(this.itemList.length);
            // 更新資料到localStorage
            this.updateDataToStorage();
            const $tbody = $('#cartTableBody');
            const $tfoot = $('#cartTableFoot');
            // 清空 $tbody 內的HTML
            $tbody.empty();
            // 預設購物車總金額為0
            let cartValue = 0;
            // 將目前購物車的項目逐項取出
            this.itemList.forEach((item, idx) => {
                // 定義一個品項的總價值
                const itemValue = item.price * item.amount;
                // 把一個品項的總價值加入購物車總價
                cartValue += itemValue;
                // 創建時間
                const time = moment(item.createdAt).format("YYYY年MM月DD日 HH:mm:ss");
                // 描述一個表格的橫排
                    const tr = `<tr>
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
                </tr>`;
                // 將tr放到畫面上的 $tbody 內
                $tbody.append(tr);
            })
            // 刪除單一品項按鈕
            $(".delete-btn").click(function () {
                console.log("要移除的按鈕", this);
                console.log("idx",this.dataset.index)
                cart.deleteItem(this.dataset.index);
            
            });
            // 將內容渲染至tfoot內
            $tfoot.html(`<tr>
            <th>總金額</th>
            <td colspan="3" class="text-right">$ ${cartValue}</td>
            </tr>`);
           
        }
    }

    // 建立一個購物車的實例
    const cart = new Cart();
    // 初始購物車
    cart.initCart();
    console.log("購物車", cart);

   
    // 綁定新增商品至購物車的表單送出事件
    // 選擇class="add-item-form"的元素
    $(".add-item-form").submit(function (e) {
        e.preventDefault();
        const form = this;
        const pid = form.dataset.pid;
        let amount = $(`#amountInput${pid}`).val();
        amount = parseInt(amount);
        cart.addItem(pid, amount);
    });

    // 綁定清空購物車按鈕的點擊事件
    $("#clearCartBtn").click(function () {
        console.log("[準備清空購物車]");
        cart.emptyCart();
    });


const navbar = document.getElementById("navBar");
const section = document.getElementById("productSection");

// 綁定視窗(window)的滾動事件(scroll)
// 滑動到產品列表會有動畫效果
window.addEventListener('scroll', function () {
    console.log("enter scroll")
    const y = window.scrollY + navbar.offsetHeight;
        const top = section.offsetTop-550;
        if (y > top ) {
            section.classList.add("active");
        };
});

// 回到最上層按鈕
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

 
// 分頁切換效果
// let tabLink ==> 宣告按鈕 a tabContents
let tabLink = document.getElementById("tabs").querySelectorAll("img");
// let tabContents ==> 宣告面板內容為 tabContents
let tabContents = document.getElementById("tab-inner").querySelectorAll('.form-content');
const tabInner = document.getElementById("tab-inner");
const btn = document.getElementById("tabs").querySelectorAll(".card-btns");
console.log("btn",btn)

    tabInner.classList.add("turnon")
     arrowDisplay(btn[0]);
     panelDisplay(tabLink[0]);
     for(let i = 0; i < tabLink.length; i++){
        tabLink[i].addEventListener('click',function(e){
        e.preventDefault();
        panelDisplay(this);      
        arrowDisplay(btn[i]);
       });     
    };
   

// 建立一個 function 名稱為 panelDisplay
// 賦予判斷條件為 class 有 active  時下面的面板會顯示，反之其他會隱藏內容

    function panelDisplay(activePanel){
          // Do something...
        for(let i =0;i<tabLink.length;i++){    
            if(tabLink[i] == activePanel) {
                tabLink[i].classList.add("active");         
                tabContents[i].style.display="block";            
            }else {
                tabLink[i].classList.remove("active");     
                tabContents[i].style.display="none";
            }
        }
    }
  
    // 黃色箭頭啟動函式
    function arrowDisplay(activeArrow){
        for(let i =0;i<btn.length;i++){          
                if(btn[i] == activeArrow) {              
                    btn[i].classList.add("showup");                
                }else {
                    btn[i].classList.remove("showup");
                }
            }
    }


   
