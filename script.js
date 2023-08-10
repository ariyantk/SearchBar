let person;

//Make a search bar
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const categoryTemplate = document.querySelector("[category-template]");
const dataCategoryContainer = document.querySelector("[data-category-container]");

//array for mapping users
let users = [];
let categories = [];

//Get input and check it
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach((user) => {
        const isVisible = user.name.toLowerCase().includes(value) || user.job.toLowerCase().includes(value);
        user.Element.classList.toggle("hide", !isVisible);
    });
});

//mapping categories
fetch("./category.json")
    .then((res) => res.json())
    .then((data) => {
        categories = data.map((cat) => {
            const title = categoryTemplate.content.cloneNode(true).children[0];
            const dataList = title.querySelector("[data-list]");
            dataList.textContent = cat.instrumentName;
            title.addEventListener("click", () => {
                const options = document.querySelectorAll(".menu .innerlist li");
                const selected = document.querySelector(".selected");
                selected.innerText = cat.instrumentName;
                const newInstrument = cat.instrumentName;
                users.forEach((user) => {
                    if (newInstrument == "همه") {
                        location.reload();
                    }
                    const isVisible = user.job.includes(newInstrument);
                    user.Element.classList.toggle("hide", !isVisible);
                });
                options.forEach((opt) => {
                    opt.classList.remove("active");
                });
                title.classList.add("active");
            });
            dataCategoryContainer.append(title);
            return { title: cat.instrumentName, Element: title };
        });
    });

//DropDown menu
const dropDowns = document.querySelectorAll(".dropdown");

dropDowns.forEach((dropDown) => {
    const select = dropDown.querySelector(".select");
    console.log(select);
    const caret = dropDown.querySelector(".caret");
    const menu = dropDown.querySelector(".menu");
    //const options = dropDown.querySelectorAll(".menu li");
    const options = dropDown.querySelectorAll(".menu .innerlist li");
    console.log(options);
    const selected = dropDown.querySelector(".selected");
    console.log(selected);

    select.addEventListener("click", () => {
        select.classList.toggle("select-cliked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
    });

    options.forEach((option) => {
        option.addEventListener("click", () => {
            selected.innerText = option.innerText;

            //search person with selected job
            const newInstrument = selected.innerText;
            users.forEach((user) => {
                if (newInstrument == "همه") {
                    location.reload();
                }
                const isVisible = user.job.includes(newInstrument);
                user.Element.classList.toggle("hide", !isVisible);
            });

            select.classList.remove("select-cliked");
            caret.classList.remove("caret-rotate");
            menu.classList.remove("move-open");

            options.forEach((option) => {
                option.classList.remove("active");
            });

            option.classList.add("active");
        });
    });
});

//Mapping users
fetch("./masters.json")
    .then((res) => res.json())
    .then((data) => {
        users = data.map((user) => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const body = card.querySelector("[data-body]");
            header.textContent = user.name;
            body.textContent = user.job;
            userCardContainer.append(card);
            return { name: user.name, job: user.job, Element: card };
        });
    });

/* 
users = person.map((user) => {
  const card = userCardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = user.name;
  body.textContent = user.job;
  userCardContainer.append(card);
  return { name: user.name, job: user.job, Element: card };
});
*/
