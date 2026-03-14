// Product data
let products=[
{
id:1,
title:"Laptop",
price:600,
category:"electronics",
rating:4.5,
image:"https://via.placeholder.com/200"
},
{
id:2,
title:"Headphones",
price:120,
category:"electronics",
rating:4.2,
image:"https://via.placeholder.com/200"
},
{
id:3,
title:"T-Shirt",
price:25,
category:"clothing",
rating:4.0,
image:"https://via.placeholder.com/200"
},
{
id:4,
title:"Shoes",
price:80,
category:"clothing",
rating:4.3,
image:"https://via.placeholder.com/200"
}
];

let cart=JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list){

let container=document.getElementById("productList");
container.innerHTML="";

list.forEach(product=>{

let card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${product.image}">
<h3>${product.title}</h3>
<p>Price: $${product.price}</p>
<p>Rating: ${product.rating}</p>
<button onclick="addToCart(${product.id})">Add to Cart</button>
`;

container.appendChild(card);

});

}

function addToCart(id){

let product=products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

function updateCart(){

let cartDiv=document.getElementById("cart");
cartDiv.innerHTML="";

cart.forEach((item,index)=>{

cartDiv.innerHTML+=`
<p>${item.title} - $${item.price}
<button onclick="removeFromCart(${index})">Remove</button>
</p>
`;

});

document.getElementById("cartCount").innerText=cart.length;

}

function removeFromCart(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

// Filter category
document.getElementById("categoryFilter").addEventListener("change",function(){

let category=this.value;

if(category==="all"){
renderProducts(products);
}
else{
let filtered=products.filter(p=>p.category===category);
renderProducts(filtered);
}

});

// Sort price
document.getElementById("sortPrice").addEventListener("change",function(){

let value=this.value;

let sorted=[...products];

if(value==="low"){
sorted.sort((a,b)=>a.price-b.price);
}
else if(value==="high"){
sorted.sort((a,b)=>b.price-a.price);
}

renderProducts(sorted);

});

// Initial render
renderProducts(products);
updateCart();