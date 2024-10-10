const geCategories = async () => {
    const { data } = await axios.get(
        "https://dummyjson.com/products/category-list"
    );
    return data;
};

const displayCategories = async (data) => {
    const categories = await geCategories();
    const result = categories.map((category) => {
        return `
<div claas="Category">${category}</div>
`;
    }).join(" ");

    document.querySelector(".categories  .row").innerHTML = result;
};

displayCategories();
