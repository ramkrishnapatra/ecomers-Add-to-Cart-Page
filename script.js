document.addEventListener("DOMContentLoaded",()=>{
    let tp=0;
    const productList=document.getElementById("product-list")
    const cartItems=document.getElementById("cart-items")
    const emptyCart=document.getElementById("empty-cart")
    const totalPrice=document.getElementById("total-price")
    const cartTotal=document.getElementById("cart-total")
    const checkoutAll=document.getElementById("checkout-all-btn")

     const products = [
        { id: 1, name: "Product 1", price: 29 },
        { id: 2, name: "Product 2", price: 19 },
        { id: 3, name: "Product 3", price: 59 },
    ];
    let Carts=JSON.parse(localStorage.getItem("Carts")) || [];
    
     Carts.forEach((element)=>{
        renderCartItem(element)
     })
      products.forEach((element)=>{
       let div =document.createElement("div")
       div.classList.add("product")
       div.setAttribute("data-id",element.id)
       div.innerHTML=`<span>${element.name}-->$${element.price}</span>
       <button>add to cart</button>`
       div.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON"){
            Carts.push(element)
            saveCartItem()
            renderCartItem(element)

        }
       })
       productList.appendChild(div)
       
      })

      function renderCartItem(element){ 
          let div=document.createElement("div")
          div.classList.add("cart-item")
          div.innerHTML=`<span>${element.name}-->$${element.price.toFixed(2)}</span>
          <div>
          <button id="delete-btn" class="btnD">delete</button>
          <button id="checkout-btn" class="btn">checkout</button></div>
          </div>
          `
          updateTotalPriceAdd(element.price)
          div.addEventListener("click",(e)=>{
            if(e.target.id==="delete-btn"){
                div.remove()
                removeCartItem(element)
                alert("item deleted from cart")
              updateTotalPriceSub(element.price)
            }
            if(e.target.id==="checkout-btn"){
                div.remove();
                removeCartItem(element)
                alert("item checkout successfully")
                updateTotalPriceSub(element.price)
            }
           })
          cartItems.appendChild(div)
          cartTotal.classList.remove("hidden")
          cartItems.classList.remove("hidden")
          emptyCart.classList.add("hidden")
      }
      function removeCartItem(item,div) {
        Carts = Carts.filter((i) => i.id !== item.id);
       saveCartItem()
    }


    function updateTotalPriceAdd(price) {
        tp =tp + price;
        cartTotal.classList.remove("hidden");
        totalPrice.textContent = `$${tp}`;
    }
    
    function updateTotalPriceSub(price){
        tp = tp - price;
        if(tp==0){
            cartTotal.classList.add("hidden")
            emptyCart.classList.remove("hidden")
            cartItems.classList.add("hidden")
        }
        totalPrice.textContent=`$${tp}`
    }
    function saveCartItem(){
        localStorage.setItem("Carts",JSON.stringify(Carts))
    }
    checkoutAll.addEventListener("click",()=>{
        tp=0;

while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
}
Carts.length = 0;
saveCartItem()
        

        alert("all items checked out")
        cartTotal.classList.add("hidden")
        emptyCart.classList.remove("hidden")
        cartItems.classList.add("hidden")
    })
})