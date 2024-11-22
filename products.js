import {BASE_URL} from "./main.js";

let productsId = 0;
const productTableEle = document.getElementById("product_table")
const productTableBodyEle = productTableEle.querySelector("tbody");



const getAllProducts = async () => {

    try{
        const response = await fetch(BASE_URL + "/products")

        const data = await response.json();

        data.forEach(product => {
            createProductTableRow(product);
        })
    } catch (e) {
        productTableBodyEle.innerHTML = `
            <tr>
            <td class="text-center text-bg-danger" colspan="4">
            Something went wrong! Please try again later!
            </td>
            </tr>
        `
    }


}

getAllProducts()

function createProductTableRow(product) {

    const tr = document.createElement("tr");


    const fields = ["title","price","quantity_in_stock"]

    productsId++
    const td = document.createElement("td");
    const text = document.createTextNode(productsId);
    td.appendChild(text)
    tr.appendChild(td)

    for (const value of fields){
        const td = document.createElement("td");
        const text = document.createTextNode(product[value]);

        td.appendChild(text)
        tr.appendChild(td)
    }

    productTableBodyEle.appendChild(tr)
}