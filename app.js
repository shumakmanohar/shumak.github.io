import { projectData } from "./data.js";
import { serviceData } from "./servicedata.js";

const projectContainer = document.querySelector(".project-card-container");
const loaderScreen = document.querySelector(".loader-screen");
const searchBar = document.querySelector(".searchbar");
const serviceContainer = document.querySelector(".service-card-container");
console.log(loaderScreen);

// --- Event Listeners--
searchBar.addEventListener("keyup", (e) => {
	const searchValue = e.target.value.toString().toLowerCase().toLowerCase();
	const filteredData = projectData.filter((data) => {
		return (
			data.description.toString().toLowerCase().includes(searchValue) ||
			data.name.toString().toLowerCase().includes(searchValue) ||
			data.techUsed.toString().toLowerCase().includes(searchValue)
		);
	});
	console.log(filteredData);
	displayProject(filteredData);
});

// window.onbeforeunload = function () {
// 	window.scrollTo(0, 0);
// };

// ---- Functions ---

const clearLoader = () => {
	loaderScreen.remove();
	document.body.style.overflow = "auto";
	AOS.init();
};

const displayProject = (projectData) => {
	const htmlString = projectData
		.map((d) => {
			return `<div class="project-card" 
					>
						<img src=${d.img} alt="" />
						<h2>${d.name}</h2>
						<p>
							${d.description}
						</p>
						<p class="project-title"><b>Tech Used</b></p>
						<ul class="techstack">
                        ${d.techUsed
													.map((d) => {
														return `<li>${d}</li>`;
													})
													.join("")}
						</ul>
						<ul class="source">
							${
								d.github &&
								`<li>
							<i
									class="fab fa-github"
									data-link="${d.github}"
									onclick="reDirect(this.dataset)"
								></i></li>`
							}
							${
								d.demo &&
								`<li>
							<i
									class="fas fa-external-link-alt"
									data-link="${d.demo}"
									onclick="reDirect(this.dataset)"
								></i></li>`
							}
							
						</ul>
					</div>`;
		})
		.join("");
	projectContainer.innerHTML = htmlString;
};

const displayServices = (serviceDate) => {
	let htmlString = serviceDate
		.map((d) => {
			return `<div
						class="service-card"
						data-aos="fade-left"
						data-aos-duration="1000"
					>
						<i class="${d.icon}"></i>
						<h3>${d.title}</h3>
						<p>
							${d.description}
						</p>
					</div>`;
		})
		.join("");

	serviceContainer.innerHTML = htmlString;
};

// --- Function Call --
setTimeout(clearLoader, 3000);
displayProject(projectData);
displayServices(serviceData);
