// get element in html
const productsContiner = document.getElementById('productsContiner')
const detailContiner = document.getElementById('detailContiner')
const selectElements = document.getElementById('selectElements')
const searching = document.getElementById('searching')
const spinner = document.getElementById('spinner')

// all product
let allProducts = []
const url = "https://dummyjson.com/products";



const fetchPoroducts = async (selected) => {
    console.log(selected);
    spinner.classList.remove("hidden")
    // string
    // object
    // get
    // post
    // patch
    // delete
    try {
        const resp = await fetch(selected==="all" ? url :`${url}/category/${selected}`)
        const data = await resp.json()
        allProducts = [...data.products]
        showProducts(allProducts)
        // let categories = []
        // allProducts.map(element=>{
        //     categories = [...categories,element.category]
        // })
        // categories = [...new Set(categories)]
        // console.log(categories);
        spinner.classList.add("hidden")
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPoroducts("all")
    fetchCategory()
})


// elements show on display
function showProducts(data) {
    productsContiner.innerHTML = ""
    data.map(element => {
        // console.log(element);
        const product = document.createElement("div")
        product.className = "flex flex-col border dark:border-white/10 border-black/10 transition-all rounded-md overflow-hidden bg-white dark:bg-slate-800"
        product.innerHTML = `
        <div class="aspect-[3/2] w-full overflow-hidden cursor-pointer">
        <img class="w-full h-full object-cover object-center" src="${element.thumbnail}" alt="">
        </div>
        <div class="flex flex-col flex-1 p-4 gap-2">
            <h1 class="text-lg font-bold text-slate-900 dark:text-white">${element.title}</h1>
            <p class="font-semibold text-cyan-500">${element.price} $</p>
            <p class='font-semibold text-slate-900 dark:text-white'><span class="font-semibold">Stock: </span>${element.stock}
            </p>
            <p class="text-base text-slate-500 dark:text-slate-400">
            ${element.description}
            </p>
            <button class="bg-cyan-500 text-white py-2 px-3 text-center rounded detail mt-auto">Deatils</button>
        </div>
        
        `
        productsContiner.appendChild(product)
    })

}


// fetch category

async function fetchCategory() {
    try {
        const resp = await fetch(url+"/categories")
        const data = await resp.json()
        const category = ["all", ...data]
        showCategory(category)
        // console.log(category);
    } catch (error) {

    }
}

function showCategory(category) {
    let res = ""
    category.map(elem=>{
        res+=`
        <option class="text-slate-500 dark:text-slate-400 dark:bg-slate-900" value="${elem}">${elem}</option>
        `
    })
    // console.log(res);
    selectElements.innerHTML = res
}

// filtering select
selectElements.addEventListener("change",()=>{
    fetchPoroducts(selectElements.value)
})

// search element
searching.addEventListener("input",(e)=>{

    let inputValue = e.target.value.toLowerCase()
    const searchingProducts = allProducts.filter(items=>{
        // console.log(items);
        if (items.title.toLowerCase().includes(inputValue)) {
            return items
        }
    })
    showProducts(searchingProducts)
})







