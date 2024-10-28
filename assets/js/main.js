const geCategories = async () => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/category-list`
  );
  return data;
};

const displayCategories = async (data) => {
  const loader = document.querySelector(".loader-container");
  loader.classList.add("activ");
  try {
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
  } catch (error) {
    document.querySelector(".categories  ").innerHTML = "<div>error</div>";
  } finally {
    loader.classList.remove("activ");
  }
};

displayCategories();
const getProducts = async (page) => {
  const Skip = (page - 1) * 28;
  const { data } = await axios.get( `https://dummyjson.com/products?limit=28&skip=${Skip}`);
  return data;
};
const displayProducts = async (page = 1) => {
  const loader = document.querySelector(".loader-container");
  loader.classList.add("activ");
  try {
    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 28);
    const result = data.products
      .map((product) => {
        return `
<div class="product">
<img class="imges" src="${product.thumbnail}" alt="${product.description}"/>
<h2>${product.title}</h2>
</div>
`;
      })
      .join(" ");

    document.querySelector(".Products  .row").innerHTML = result;



    let pigination=``;

if (page==1){
  pigination+=`<li class="page-item"><button class="page-link" >&laquo;</button></li>`;

}else{

 pigination+=`<li class="page-item"><button onclick=displayProducts('${page-1}')  class="page-link" >&laquo;</button></li>`;
}

   for(let i=1;i<=numberOfPages;i++){
    pigination+=`<li class="page-item ${i==page?'active':''}"><button onclick=displayProducts('${i}') class="page-link">${i}</button></button></li>`;

   }

   if (page== numberOfPages){
    pigination+=`<li class="page-item"><button  class="page-link" >&raquo;</button></li>`;
  
  }else{
pigination+=`<li class="page-item"><button onclick=displayProducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`;
  }
document.querySelector(".pagination").innerHTML = pigination;






    model();

  } 
  
  catch (error) {
    document.querySelector(".categories  ").innerHTML = "<div>error</div>";
  } finally {
    loader.classList.remove("activ");
  }
};
displayProducts();
window.onscroll = function () {
  const navbar = document.querySelector(".header");
  const section1 = document.querySelector(".main .container .categories");
  if (window.scrollY > section1.offsetTop) {
    console.log("test");
    navbar.classList.add("navscroll");
  } else {
    navbar.classList.remove("navscroll");
  }
};
 function model(){
    const model= document.querySelector(".my-model");
    const closebtn= document.querySelector(".close-btn");
    const rightbtn= document.querySelector(".right-btn");
    const leftbtn= document.querySelector(".left-btn");
    const images=Array.from( document.querySelectorAll(".imges"));
    let cureentIndex=0;
    images.forEach(function(img){
        img.addEventListener("click",function(e){
            model.classList.remove("d-none");
            model.querySelector("img").setAttribute("src",e.target.src);
           const cureentImg=e.target;

           cureentIndex = images.indexOf(cureentImg);
    })
})
    closebtn.addEventListener("click",function(){
        model.classList.add("d-none");})
       

       
        
        leftbtn .addEventListener("click",function(){
            cureentIndex--;
            if(cureentIndex<0){
                cureentIndex=images.length-1;
            }
            const src =images[cureentIndex].src;
            model.querySelector("img").setAttribute("src",src);
        });
    rightbtn.addEventListener("click",function(){
        cureentIndex++;
        if(cureentIndex>= images.length){
            cureentIndex=0;
        }
        const src =images[cureentIndex].src;
        model.querySelector("img").setAttribute("src",src);

    });
   
    document.addEventListener("keydown",function(e){
        console.log(e);
        if(e.code=="ArrowRight"){
            cureentIndex++;
            if(cureentIndex>= images.length){
                cureentIndex=0;
            }
            const src =images[cureentIndex].src;
            model.querySelector("img").setAttribute("src",src);
    
        }
       
        else if(e.code=="ArrowLeft"){
            cureentIndex--;
            if(cureentIndex<0){
                cureentIndex=images.length-1;
            }
            const src =images[cureentIndex].src;
            model.querySelector("img").setAttribute("src",src);
        }
        else if(e.code=="Escape"){

            model.classList.add("d-none");

        }
    });


 }
