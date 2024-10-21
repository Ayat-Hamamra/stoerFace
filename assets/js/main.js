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
const getProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products");
    return data;
};
const displayProducts = async () => {
    const data = await getProducts();
    const result = data.products
    .map( (product)=> {
        return `
<div class="product">

<img src="${product.thumbnail}" alt="${product.description}"/>

<h2>${product.title}</h2>
</div>
`
    }).join(' ');

    document.querySelector(".Products  .row").innerHTML += result;
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