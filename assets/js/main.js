const geCategories = async () => {
    const { data } = await axios.get(
        `https://dummyjson.com/products/category-list`
    );
    return data;
};

const displayCategories = async (data) => {
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
};

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