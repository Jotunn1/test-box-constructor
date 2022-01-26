const content = document.querySelector(".content__inner");
const preview = document.querySelector(".form__image");
const formImageDescr = document.querySelector(".form__image-descr");
const form = document.getElementById("form");
const formImage = document.getElementById("form-image");
const formTitle = document.getElementById("form-title");
const formText = document.getElementById("form-text");
const formLink = document.getElementById("form-link");
const nextBtn = document.getElementById("next-btn");
const fileReader = new FileReader();
const elemPerPage = 9;
let currentPage = 1;

const validateInput = (elem, limit) => {
    elem.value = elem.value.replace(/[a-z0-9]/gi, '');
    if (elem.value.length >= limit) {
        document.querySelector(`.${elem.id}-invalid`).style.display = "block"
        elem.value = elem.value.substr(0, limit)
    }
    else document.querySelector(`.${elem.id}-invalid`).style.display = "none"
}
const previewImage = (elem) => {
    fileReader.readAsDataURL(elem.files[0])
    if (elem.files[0]) {
        fileReader.onload = (event) => {
            preview.style.backgroundImage = 'url(' + event.target.result + ')'
        }
        formImageDescr.style.display = "none"
    }
}
const createBox = () => {
    const productBox = `<div class="product__box">
                    <a class="product__link" href="${formLink.value}">
                        <img class="product__image" alt="some-product">
                        <h3 class="product__title">${formTitle.value}</h3>
                        <p class="product__text">${formText.value}</p>
                    </a>
                    </div>`
    content.insertAdjacentHTML("beforeend", productBox)
}
const addImageToBox = () => {
    fileReader.readAsDataURL(formImage.files[0])
    fileReader.onload = (e) => {
        let images = document.querySelectorAll(".product__image");
        images[images.length - 1].setAttribute("src", e.target.result)
    }
    preview.style.backgroundImage = null
    formImageDescr.style.display = "block"
}
const submitHandler = (e) => {
    e.preventDefault()
    const data = [
        formImage.value,
        formTitle.value,
        formText.value,
        formLink.value
    ]
    if (data.length == 4) {
        createBox()
        addImageToBox()
        form.reset()
    }
}
const hideElements = () => {
    if (content.children.length > elemPerPage * currentPage) {
        nextBtn.style.display = "block";
        for (let i = elemPerPage * currentPage; i < content.children.length; i++) {
            content.children[i].style.display = "none"
        }
    }
}
const showMoreElements = () => {
    nextBtn.style.display = "none"
    for (let i = elemPerPage * currentPage; i < elemPerPage * (currentPage + 1); i++) {
        if (content.children[i]) content.children[i].style.display = "flex"
        else return
    }
    currentPage += 1
    if (content.children.length > elemPerPage * currentPage) nextBtn.style.display = "block"
}
formTitle.addEventListener("input", () => validateInput(formTitle, 20));
formText.addEventListener("input", () => validateInput(formText, 250));
formImage.addEventListener('change', () => previewImage(formImage));
form.addEventListener('submit', () => submitHandler(event));
content.addEventListener('DOMNodeInserted', () => hideElements());
nextBtn.addEventListener("click", () => showMoreElements());
