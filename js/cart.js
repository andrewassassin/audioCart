import {productList} from './format-element.js';

import {cardElement} from './format-element.js';

import {tr} from './format-element.js';
    
    // 設計渲染商品的函數
    function renderProductList() {
        // 透過迴圈將produstList內的資料一一取出
        productList.forEach(product => {
            // 取得一張卡片的HTML
            const card = cardElement(product);
            $("#productRow").append(card);
        });
    }

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
                let trr = tr(item, idx, time, itemValue)
                   
                // 將tr放到畫面上的 $tbody 內
                $tbody.append(trr);
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
    document.getElementById('goBackBtn').addEventListener('click', topFunction)
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


   
