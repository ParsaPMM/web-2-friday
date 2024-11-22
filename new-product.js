import {BASE_URL} from "./main.js";
import Joi from "joi";

const productForm = document.getElementById("create_product_form")

productForm.addEventListener("submit", handleProductFormSubmit)

const schema = Joi.object({
    title:Joi.string().required().max(255),
    price:Joi.number().required().min(1),
    quantity_in_stock: Joi.string().required(),
    description: Joi.string().required().max(65000)
})

function handleProductFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(productForm);

    const data = {
        title: formData.get("title"),
        price: parseFloat(formData.get("price")),
        quantity_in_stock: formData.get("quantity"),
        description: formData.get("description")
    }

    const x = schema.validate(data)

    fetch(BASE_URL + "/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            productForm.reset()
            showToast()
        })
}


// <div class="myToast">
//     Saved Successfully! <i class="fa fa-check"></i>
// </div>

function showToast() {
    document.body.innerHTML += `
        <div id="toast" class="myToast">
    Saved Successfully! <i class="fa fa-check"></i>
        </div>
    `

    setTimeout(() => {
        document.getElementById("toast").remove()
    },5000)

}