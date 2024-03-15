// get element in html
const productsContiner = document.getElementById('productsContiner')
const detailContiner = document.getElementById('detailContiner')
const selectElements = document.getElementById('selectElements')
const searching = document.getElementById('searching')
const spinner = document.getElementById('spinner')

// all product
let allProducts = []
const url = "https://dummyjson.com/product";



const fetchPoroducts = async () => {
    spinner.classList.remove("hidden")
    // string
    // object
    // get
    // post
    // patch
    // delete
    try {
        const resp = await fetch(url)
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
    fetchPoroducts()
})


// elements show on display
function showProducts(data) {
    // productsContiner.innerHTML = ""
    data.map(element => {
        console.log(element);
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

