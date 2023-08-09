//Master's List
let person = [
  {
    name: "name1",
    job: "santor and...",
  },
  {
    name: "name2",
    job: "santor and...",
  },
  {
    name: "name3",
    job: "santor and...",
  },
  {
    name: "name4",
    job: "santor and...",
  },
  {
    name: "name5",
    job: "santor and...",
  },
  {
    name: "name6",
    job: "santor and...",
  },
  {
    name: "name7",
    job: "santor and...",
  },
  {
    name: "name8",
    job: "santor and...",
  },
];


//Make a search bar
const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

//array for mapping users
let users = [];

//Get input and check it
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.job.toLowerCase().includes(value);
    user.Element.classList.toggle("hide", !isVisible);
  });
});

//Mapping users
users = person.map((user) => {
  const card = userCardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  header.textContent = user.name;
  body.textContent = user.job;
  userCardContainer.append(card);
  return { name: user.name, job: user.job, Element: card };
});
