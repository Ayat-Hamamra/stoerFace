const getProduct = async () => {
    const params=new URLSearchParams(window.location.search);
    const Category=params.get('category');
    const { data } = await axios.get(`https://dummyjson.com/products/category/${Category}`);
    return data;

};

const params=new URLSearchParams(window.location.search);
    const name=params.get('category');
    document.querySelector(".Products .container h2").textContent=name;



const displayProducts = async () => {
    const loader= document.querySelector(".loader-container");
    loader.classList.add("activ");
  try{
    const data = await getProduct();
    const result = data.products
    .map( (product)=> {
        return `
<div class="product">
<img src="${product.thumbnail}" alt="${product.description}"/>
<h2>${product.title}</h2>
<span>${product.price}</span>

</div>
`
    }).join(' ');

    document.querySelector(".Products  .row").innerHTML += result;}
    catch(error){
        document.querySelector(".Products  ").innerHTML = "<div>error</div>";
       }
    
       finally{
        loader.classList.remove("activ");
       }
};
displayProducts();

