const content = document.querySelector(".content__inner");
const preview = document.querySelector(".form__image")
const formImageDescr = document.querySelector(".form__image-descr")
const nextBtn = document.getElementById("next-btn");
const form = document.getElementById("form");
const formImage = document.getElementById("form-image")
const formTitle = document.getElementById("form-title")
const formText = document.getElementById("form-text")
const formLink = document.getElementById("form-link")
const fileReader = new FileReader()

formTitle.addEventListener("input", () => {
    formTitle.value = formTitle.value.replace(/[a-z0-9]/gi, '');
    if (formTitle.value.length >= 20) {
        alert("Длина заголовка не может быть больше 20 симвловов")
        formTitle.value = formTitle.value.substr(0, 20)
        formTitle.style.border = "red 2px solid"
    }
    else formTitle.style.border = "none"
})
formText.addEventListener("input", () => {
    formText.value = formText.value.replace(/[a-z0-9]/gi, '');
    if (formText.value.length >= 250) {
        formText.value = formText.value.substr(0, 250)
        alert("Длина описания не должна превышать 250 симвловов")
        formText.style.border = "red 2px solid"
    }
    else formText.style.border = "none"
})
formImage.addEventListener('change', () => {
    if (formImage.files[0]) {
        fileReader.onload = (event) => {
            preview.style.backgroundImage = 'url(' + event.target.result + ')'
        }
        fileReader.readAsDataURL(formImage.files[0])
        formImageDescr.style.display = "none"
    }
})
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formImage.value && formTitle.value && formText.value && formLink.value) {
        fileReader.onload = (event) => {
            let image = event.target.result
            document.querySelector(".product__image").setAttribute("src", image)
        }
        fileReader.readAsDataURL(formImage.files[0])
        const productBox = `<div class="product__box">
                    <a class="product__link" href="${formLink.value}">
                        <img class="product__image" src= alt="some-product">
                        <h3 class="product__title">${formTitle.value}</h3>
                        <p class="product__text">${formText.value}</p>
                    </a>
                    </div>`
        content.insertAdjacentHTML("afterbegin", productBox)
        form.reset()
        preview.style.backgroundImage = null
        formImageDescr.style.display = "block"
    }
})
content.addEventListener('DOMNodeInserted', () => {
    if (content.children.length > 9) {
        nextBtn.style.display = "block"
        for (let i = 9; i < content.children.length; i++) {
            content.children[i].style.display = "none"
        }
        nextBtn.addEventListener("click", () => {
            for (let i = 9; i < content.children.length; i++) {
                content.children[i].style.display = "flex"
            }
            nextBtn.style.display = "none"
        })
    }

})



