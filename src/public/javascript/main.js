//Tạo hàm nhấp vào input search hiện ra lịch sử
var inputSearch=document.querySelector('.header-search__input');
var searchHistory=document.querySelector('.header-search__history-list');

inputSearch.onclick=function(e){
    searchHistory.style.display="block"
};

inputSearch.onblur=function(e){
    searchHistory.style.display="none";
};

//Tạo hàm click vào lịch sử tìm kiếm hiện lên input Search
var listSearchHistory=document.querySelector('.header-search__history-list');
listSearchHistory.onmousedown=function(e){
    e.preventDefault();
};

//Detail Image Click
var imgSubs=document.getElementsByClassName('detail-image__sub');
for(var i=0; i < imgSubs.length; i++){
    imgSubs[i].onclick=function(e){
        var imgMain=document.getElementById('imgMain');
        imgMain.src=e.target.src;
    }
};

//Amount responsive JS
$('input.input-qty').each(function() {
    var $this = $(this),
        qty = $this.parent().find('.is-form'),
        min = Number($this.attr('min')),
        max = Number($this.attr('max'))
    if (min == 0) {
        var d = 0
    } else d = min
    $(qty).on('click', function() {
        if ($(this).hasClass('minus')) {
        if (d > min) d += -1
        } else if ($(this).hasClass('plus')) {
        var x = Number($this.val()) + 1
        if (x <= max) d += 1
        }
        $this.attr('value', d).val(d)
    })
});

//Add Product Cart
var formatMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
var btnCarts = document.querySelectorAll('.addCart');
var count = 0, total =0;
var hasCart = document.querySelector('.header-cart__list--has-cart');
var noCart = document.querySelector('.header-cart__list--no-cart');
var countCartItem = document.querySelector('.header-cart__notice');
var cartTotal = document.querySelector('.header-cart__total-price');
var productPrice;
var giohang = new Array();
var sp = new Object();
if(!countCartItem.innerText){
    countCartItem.innerHTML = 0;
}
btnCarts.forEach(function(btnCart, index){
    btnCart.addEventListener('click', function(e){
        hasCart.style.display = 'block';
        noCart.style.display = 'none';
        var btnItem = e.target;
        var product = btnItem.parentElement.parentElement;
        var productName = product.querySelector('.product__heading').innerText;
        var productImg = product.querySelector('.product__image').src;
        var productHasNew = product.querySelector('.has--old');
        var productID = product.querySelector('.product__link').id;
        if(productHasNew) {
            productPrice = product.querySelector('.product__price--new').innerText;
        }else{
            productPrice = product.querySelector('.product__price').innerText;
        }
        addCart(productName, productImg, productPrice, productID);
        localStorage.setItem("giohang", JSON.stringify(giohang));
    });
});


function addCart(productName, productImg, productPrice, productID){
    var cartList = document.querySelector('.header-cart__list-item');
    var cartItems = document.querySelectorAll('.header-cart__item');
    var nameCompare = 0, productQuantity = 1;
    var numerial, quantityCurrent, quantity, sp;
    var cartContent = "<li class='header-cart__item'>"+
                            "<a href='/detail/"+productID+"' class='header-cart__item-img'>"+
                                "<img src='"+productImg+"' alt='' class='header-cart__img'>"+
                            "</a>"+
                            "<div class='header-cart__item-info'>"+
                                "<a href='/detail/"+productID+"' id='"+productID+"' class='header-cart__item-name'>"+
                                    productName+
                                "</a>"+
                                "<div class='header-cart__item-detail'>"+
                                    "<span class='header-cart__item-quantity'>1</span>"+
                                    "<span class='header-cart__item-multiply'>×</span>"+
                                    "<span class='header-cart__item-price'>"+productPrice+"</span>"+
                                "</div>"+
                            "</div>"+
                            "<div class='header-cart__item-delete'>"+
                                "<span class='header-cart__delete-icon'>x</span>"+
                            "</div>"+
                        "</li>";
    if(cartItems.length==0){
        count = count + 1;
        cartList.innerHTML += cartContent;
        countCartItem.innerHTML = count;
        total = total + (parseInt(productPrice)*1);
        cartTotal.innerText = total + '₫';
        sp = ({
            id : productID,
            img : productImg,
            name : productName,
            quantity : productQuantity,
            price : productPrice,
        });
        giohang.push(sp);
        deleteCart();
    }else{
        for(var i = 0; i < cartItems.length; i++){
            if(cartItems[i].querySelector('.header-cart__item-name').innerText == productName){
                nameCompare = 1;
                numerial = i;
            }else{
                nameCompare = 0;
            }
        }
        if(nameCompare > 0){
            quantity = cartItems[numerial].querySelector('.header-cart__item-quantity').innerText;
            quantityCurrent = parseInt(quantity) + 1;
            cartItems[numerial].querySelector('.header-cart__item-quantity').innerText = quantityCurrent;
            total = total + (parseInt(productPrice));
            cartTotal.innerText = total + '₫';
            count = count;
            for(var i = 0; i< giohang.length; i++){
                if(giohang[i].name == productName){
                    giohang[i].quantity++;
                }
            }
        }else{
            count = count + 1;
            cartList.innerHTML += cartContent;
            countCartItem.innerHTML = count;
            total = total + (parseInt(productPrice)*1);
            cartTotal.innerText = total + '₫';
            sp = ({
                id : productID,
                img : productImg,
                name : productName,
                quantity : productQuantity,
                price : productPrice,
            });
            giohang.push(sp);
            deleteCart();
        };
    };
};

//Delete Cart item
function deleteCart(){
    var cartItem = document.querySelectorAll('.header-cart__item');
    var sum = document.querySelector('.header-cart__notice');
    var totalmoney = document.querySelector('.header-cart__total-price');
    var productDel = document.querySelectorAll('.header-cart__delete-icon');
    for(var i = 0; i < cartItem.length; i++){
        productDel[i].addEventListener('click', function(e){
            var cartEvent = e.target;
            var cartParent = cartEvent.parentElement.parentElement;
            var currentQuantity = cartParent.querySelector('.header-cart__item-quantity').innerText;
            var currentPrice = cartParent.querySelector('.header-cart__item-price').innerText;
            var currentID = cartParent.querySelector('.header-cart__item-name');
            sum.innerText = (parseInt(sum.innerText)-1);
            totalmoney.innerText = (parseInt(totalmoney.innerText)-(parseInt(currentQuantity)*parseInt(currentPrice)));
            cartParent.remove();
            if(parseInt(totalmoney.innerText)==0){
                hasCart.style.display = 'none';
                noCart.style.display = 'block';
            }
        });
    };
};

//Show Cart Icon
function showCartIcon(){
    var gh = localStorage.getItem("giohang");
    if(gh){
        var cart = JSON.parse(gh);
        var tongtien = 0, myCart = "";
        var cartIcon = document.querySelector('.header-cart__list-item');
        if(cart.length>0){
            for(var i = 0; i < cart.length; i++){
                var thanhtien = cart[i].quantity * parseInt(cart[i].price);
                var price  = formatMoney.format(parseInt(cart[i].price));
                myCart += "<li class='header-cart__item'>"+
                                "<a href='/detail/"+cart[i].id+"' class='header-cart__item-img'>"+
                                    "<img src='"+cart[i].img+"' alt='' class='header-cart__img'>"+
                                "</a>"+
                                "<div class='header-cart__item-info'>"+
                                    "<a href='/detail/"+cart[i].id+"' id='"+cart[i].id+"' class='header-cart__item-name'>"+
                                        cart[i].name+
                                    "</a>"+
                                    "<div class='header-cart__item-detail'>"+
                                        "<span class='header-cart__item-quantity'>"+cart[i].quantity+"</span>"+
                                        "<span class='header-cart__item-multiply'>×</span>"+
                                        "<span class='header-cart__item-price'>"+price+"</span>"+
                                    "</div>"+
                                "</div>"+
                                "<div class='header-cart__item-delete'>"+
                                    "<span class='header-cart__delete-icon'>x</span>"+
                                "</div>"+
                            "</li>";
                tongtien += thanhtien;
            }
            var cartTotal = document.querySelector('.header-cart__total-price');
            var cartCount = document.querySelector('.header-cart__notice');
            cartCount.innerText = cart.length;
            cartTotal.innerText = formatMoney.format(tongtien);;
            cartIcon.innerHTML = myCart;
            var cartItem = document.querySelectorAll('.header-cart__item');
            if(cartItem){
                hasCart.style.display = 'block';
                noCart.style.display = 'none';
            }
            deleteCart();
        }
    }
}
showCartIcon();

//Show Cart Main
function showCart(){

    var gh = localStorage.getItem("giohang");
    var cart = JSON.parse(gh);
    var tongtien = 0, myHtml="";
    var viewCart = document.querySelector('.cartView');
    var cartSum = document.querySelector('.cartSum');
    if(cart.length>0){
        for(var i = 0; i < cart.length; i++){
            var thanhtien = cart[i].quantity * parseInt(cart[i].price);
            var money = formatMoney.format(thanhtien);
            var price = formatMoney.format(parseInt(cart[i].price));
            myHtml += "<tr>"+
                            "<td class='thumbnail-img'>"+
                                "<a href='#''>"+
                                    "<img class='img-fluid cartImg' src='"+cart[i].img+"' alt=''/>"+
                                "</a>"+
                            "</td>"+
                            "<td class='name-pr'>"+
                                "<a href='' class='cartName'>"+
                                    cart[i].name+
                                "</a>"+
                            "</td>"+
                            "<td class='price-pr'>"+
                                "<p class='cartPrice'>"+price+"</p>"+
                            "</td>"+
                            "<td class='quantity-box'>"+
                                "<input class='cartQuantity' type='number' size='4' data-id='' value='"+cart[i].quantity+"' min='0' step='1' style='width:80%'>"+
                            "</td>"+
                            "<td class='total-pr cartUnitMoney'>"+
                                "<p>"+money+"</p>"+
                            "</td>"+
                            "<td class='remove-pr'>"+
                                "<a href='#' data-id='' class='btn-delete'>"+
                                    "<i class='fas fa-trash cartRemove'></i>"+
                                "</a>"+
                            "</td>"+
                        "</tr>";
            tongtien += thanhtien;
        }
        cartSum.innerText = formatMoney.format(tongtien);;
        viewCart.innerHTML = myHtml;
        deleteCart();
        var cartMoney = document.querySelector('.cartMoney');
        cartMoney.innerText = cartSum.innerText;
    }
}

if(location.pathname == '/cart'){
    showCart();
}

//Show Payment
function showPayment(){

    var gh = localStorage.getItem("giohang");
    var cart = JSON.parse(gh);
    var tongtien = 0, myHtml="";
    if(cart.length>0){
        for(var i = 0; i < cart.length; i++){
            var thanhtien = cart[i].quantity * parseInt(cart[i].price);
            var prPrice = parseInt(cart[i].price);
            var money = formatMoney.format(thanhtien);
            var price = formatMoney.format(parseInt(cart[i].price));
            myHtml += "<div class='media mb-2 border-bottom information-product'>"+
                                "<div class='imagePayment'>"+
                                    "<img src='"+cart[i].img+"' alt='' class='paymentImg'>"+
                                "</div>"+
                                "<div class='media-body'>"+
                                    "<input type='text' name='productID' value='"+cart[i].id+"' hidden='true'>"+
                                    "<input type='text' name='productAmount' value='"+cart[i].quantity+"' hidden='true'>"+
                                    "<input type='text' name='productPrice' value='"+prPrice+"' hidden='true'>"+
                                    "<a href='' class='paymentName'>"+cart[i].name+"</a>"+
                                "<div class='small text-muted'>"+
                                    "<span class='paymentPrice' >Giá: "+price+"</span>"+
                                    "<span class='mx-2 paymentQuantity'>|</span> Số lượng: "+cart[i].quantity+" <span class='mx-2'>|</span> Thành tiền: "+money+
                                "</div>"+
                            "</div>"+
                        "</div>"
            tongtien += thanhtien;
        }
        var cartTT = document.querySelector('.paymentTT');
        var cartTong = document.querySelector('#totalprice');
        var tong = formatMoney.format(tongtien);
        cartTT.innerText = tong;
        cartTong.value = tongtien;
        var paymentCart = document.querySelector('.paymentCart');
        paymentCart.innerHTML = myHtml;
        var totalPrice = document.querySelector('.totalPrice');
        totalPrice.innerText = tong;
        var totalAmount = document.querySelector('#totalamount');
        totalAmount.value = cart.length;
        deleteCart();
    }
    var btnPay = document.querySelector('.btn-pay');
    btnPay.addEventListener('click', function(event){
        localStorage.removeItem("giohang");
    });
}

if(location.pathname == '/payment'){
    showPayment();
        
    var pay_live=document.getElementById('payment__live');
    var pay_online=document.getElementById('payment__online');
    var pay=document.getElementById('pay');
    var bank=document.getElementById('bank');
    
    function Live(){
        pay_live.classList.remove('pay-hidden');
        pay_online.classList.add('pay-hidden');
    }
    
    function Online(){
        pay_online.classList.remove('pay-hidden');
        pay_live.classList.add('pay-hidden');
    }
    
    pay.addEventListener('click', Live);
    bank.addEventListener('click', Online);
}
