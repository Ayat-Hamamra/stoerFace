const geCategories = async () => {
    const { data } = await axios.get(
        `https://dummyjson.com/products/category-list`
    );
    return data;
};

const displayCategories = async (data) => {
    const loader= document.querySelector(".loader-container");
    loader.classList.add("activ");
  try{
    const categories = await geCategories();
    
    const result = categories
        .map((category) => {
            return `
<div class="Category">
<a href='./categoriesDetels.html?category=${category}'>${category}</a>
</div>
`;
        })
        .join(" ");

    document.querySelector(".categories  ").innerHTML += result;
   }
   catch(error){
    document.querySelector(".categories  ").innerHTML = "<div>error</div>";
   }

   finally{
    loader.classList.remove("activ");
   }
    }


displayCategories();
const getProducts = async (page) => {
    const Skip=(page-1)*28;
    const { data } = await axios.get(`https://dummyjson.com/products?limit=28&skip=${Skip}`);
    return data;
};
const displayProducts = async ( page =1) => {
    const loader= document.querySelector(".loader-container");
    loader.classList.add("activ");
  try{
    const data = await getProducts(page);
    const numberOfPages=Math.ceil(data.total/28);
    const result = data.products
    .map( (product)=> {
        return `
<div class="product">
<img src="${product.thumbnail}" alt="${product.description}"/>
<h2>${product.title}</h2>
</div>
`
    }).join(' ');

    document.querySelector(".Products  .row").innerHTML = result;

    let pigination=`<li class="page-item"><a class="page-link" href="#">&laquo;</a></li>`;
    for(let i=1;i<=numberOfPages;i++){
        pigination+=` <li class="page-item"><button onclick=displayProducts('${i}') class="page-link">${i}</button></li>`;
    }
    pigination+=` <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>`;
    document.querySelector(".pagination").innerHTML=pigination;
}
catch(error){
 document.querySelector(".categories  ").innerHTML = "<div>error</div>";
}

finally{
 loader.classList.remove("activ");
}
};
displayProducts();
 window.onscroll=function(){
const navbar=document.querySelector(".header" );
const section1=document.querySelector(".main .container .categories" );
if( window.scrollY > section1.offsetTop ) {
    console.log("test");
    navbar.classList.add("navscroll");
}
else{
    navbar.classList.remove("navscroll");
}}