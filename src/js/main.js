let footerYear;
let navbar;
let heroImg;
let aboutUs;
let mainHero;
let offert;
let information;
let fullYear;
let navBar;
let navBarButtons;
let navBarButtonsContainer;
let burgerBtn;
let navMobile;
let navItemsMobile;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	footerYear = document.querySelector('.footer__year');
	navBar = document.querySelector('.nav');
	navBarButtons = document.querySelectorAll('.nav-items__item');
	navBarButtonsContainer = document.querySelector('.nav-items');
	navMobile = document.querySelector('.nav-mobile');
	heroImg = document.querySelector('.hero-img');
	burgerBtn = document.querySelector('.burget-btn');
	navItemsMobile = document.querySelectorAll('.nav-items--mobile');
};

const prepareDOMEvents = () => {
	setCurrentYear(footerYear);
	document.addEventListener('scroll', () => {
		handleNavBackground(navBar);
	});
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('burger-btn')) {
			handleNav(navMobile);
		}
	});
	setCurrentActiveButton();
	navBarButtonsContainer.addEventListener('click', (event) => {
		const clickedElement = event.target;

		if (clickedElement.classList.contains('nav-items__item')) {
			event.preventDefault();

			const clickedButtonId = clickedElement.id;
			updateActiveButton(clickedButtonId);

			// Przenieś użytkownika do odpowiedniej sekcji lub strony
			const href = clickedElement.getAttribute('href');
			if (href.startsWith('#')) {
				const targetElement = document.querySelector(href);
				if (targetElement) {
					targetElement.scrollIntoView({ behavior: 'smooth' });
				}
			} else {
				// Jeśli link prowadzi do innej strony, przekieruj po krótkim opóźnieniu
				setTimeout(() => {
					window.location.href = href;
				}, 100); // Opóźnienie pozwala na widoczność zmiany klasy active
			}
		}
	});
};

const setCurrentActiveButton = () => {
	const currentPath = window.location.pathname.split('/').pop();
	const currentHash = window.location.hash;

	let activeButtonId = 'home';

	navBarButtons.forEach((button) => {
		const buttonHref = button.getAttribute('href');
		const buttonHrefHash = buttonHref.split('#')[1];

		if (buttonHrefHash === undefined && currentPath === 'index.html' && !currentHash) {
			activeButtonId = 'home';
		}

		if (buttonHrefHash === undefined && currentPath === 'contact.html') {
			activeButtonId = 'contact';
		}

		if (currentHash && currentHash === `#${buttonHrefHash}`) {
			activeButtonId = button.id;
		}

		updateActiveButton(activeButtonId);
	});
};

const updateActiveButton = (clickedButtonId) => {
	navBarButtons.forEach((button) => {
		if (clickedButtonId === button.id) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
};

const setCurrentYear = (yearElement) => {
	fullYear = new Date().getFullYear();
	yearElement.innerHTML = `${fullYear}`;
};

const handleNav = (nav) => {
	nav.classList.toggle('nav-mobile--active');
	if (nav.classList.contains('nav-mobile--active')) {
		nav.style.display = 'flex';
	}

	navItemsMobile.forEach((el) => {
		el.addEventListener('click', () => nav.classList.remove('nav-mobile--active'));
	});
};

const handleNavBackground = (nav) => {
	if (scrollY >= 500) {
		nav.style.backgroundColor = 'rgb(216, 216, 216)';
	} else {
		nav.style.backgroundColor = 'white';
	}
};

document.addEventListener('DOMContentLoaded', main);
