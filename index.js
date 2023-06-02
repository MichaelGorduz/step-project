function switchTabs() {

    const tabsContainer = document.querySelector(".tabs");
    let tabs = document.querySelectorAll(".tabs-title");
    let contents = document.querySelectorAll(".tabs-content li");

    tabsContainer.addEventListener("click", (event) => {

        const clickedTab = event.target.closest(".tabs-title");

        if (!clickedTab) return; // Ignore clicks on elements other than tabs

        tabs.forEach((tab, index) => {
            if (tab === clickedTab) {
                // Add active class to the clicked tab
                tab.classList.add("active");
                contents[index].style.display = "block";
            } else {
                // Remove active class from other tabs
                tab.classList.remove("active");
                contents[index].style.display = "none";
            }
        });
    });

    // Add active class to the first tab and content
    tabs[0].classList.add("active");
    contents[0].style.display = "block";
}

window.addEventListener("DOMContentLoaded", () => {
    switchTabs();
    switchAmazingTabs();
    putTime();
});
// ~~~~~~~~~~~~~~~~~~~~~ Amazing Tabs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function switchAmazingTabs() {
    const tabTitles = document.querySelectorAll('.amazing-tabs-title');
    const tabWrappers = document.querySelectorAll('.amazing-tabs-wrapper');
    const tabsContainer = document.querySelector('.amazing-tabs');
    const allImagesContainer = document.querySelector('.all-images');
    const allImages = Array.from(allImagesContainer.querySelectorAll('img'));
    const loadMoreButton = document.querySelector('.load-more');
    let isButtonClicked = false;

    const sortImages = (container) => {
        const category = container.getAttribute('data-category');
        const imagesToDisplay = allImages.filter((image) => image.getAttribute('data-category') === category);

        container.innerHTML = '';

        imagesToDisplay.forEach((image, index) => {
            const hoverImageContainer = document.createElement('div');
            hoverImageContainer.classList.add('hover-image');

            const imageContent = document.createElement('div');
            imageContent.classList.add('image-content');

            const creativeDesign = document.createElement('p');
            creativeDesign.classList.add('creative-design');
            creativeDesign.textContent = 'Creative Design';

            const webDesign = document.createElement('p');
            webDesign.classList.add('web-design');
            webDesign.textContent = 'Web Design';

            const linkImage = document.createElement("img");
            linkImage.src = "./images/Link.png";
            linkImage.classList.add('link-img');

            imageContent.appendChild(linkImage);
            imageContent.appendChild(creativeDesign);
            imageContent.appendChild(webDesign);

            hoverImageContainer.appendChild(image);
            hoverImageContainer.appendChild(imageContent);

            container.appendChild(hoverImageContainer);
        });

    };

    const loadMoreImages = () => {
        const moreImagesContainer = document.querySelector('.more-images');
        const moreImages = Array.from(moreImagesContainer.querySelectorAll('img'));

        moreImages.forEach((image) => {
            const category = image.getAttribute('data-category');
            const correspondingWrapper = document.querySelector(`.amazing-tabs-wrapper[data-category="${category}"]`);

            if (correspondingWrapper) {
                correspondingWrapper.appendChild(image);
            }
        });

        loadMoreButton.style.display = 'none';
        const amazingTabsContent = document.querySelector('.amazing-tabs-content');
        isButtonClicked = true;
        if (isButtonClicked && tabTitles[0].classList.contains('active')) {
            amazingTabsContent.style.gridTemplateRows = 'repeat(5, 1fr)';
            amazingTabsContent.style.gridTemplateRows = "repeat(2, 1fr)";
        }
    };

    tabsContainer.addEventListener('click', (event) => {
        const tab = event.target.closest('.amazing-tabs-title');
        if (!tab) return;

        const category = tab.getAttribute('data-category');

        tabWrappers.forEach((wrapper) => {
            const imgCategory = wrapper.getAttribute('data-category');
            if (imgCategory === category) {
                wrapper.style.display = 'grid';
                wrapper.style.gridTemplateColumns = "repeat(4, 1fr)";
                wrapper.style.gridTemplateRows = "repeat(2, 1fr)";

            } else if (category === 'all') {
                wrapper.style.display = 'grid';
                wrapper.style.gridTemplateColumns = "repeat(4, 1fr)";
                wrapper.style.gridTemplateRows = "repeat(2, 1fr)";
                wrapper.style.gridAutoRows= "0";

            } else {
                wrapper.style.display = 'none';
            }
        });

        tabTitles.forEach((title) => title.classList.remove('active'));
        tab.classList.add('active');

        tabWrappers.forEach(sortImages);

        if (category === 'all' && !isButtonClicked) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none';
        }

        const amazingTabsContent = document.querySelector('.amazing-tabs-content');
        if (category === 'all' && isButtonClicked) {
            amazingTabsContent.style.gridTemplateRows = 'repeat(5, 1fr)';
        } else {
            amazingTabsContent.style.gridTemplateRows = 'repeat(2, 1fr)';
        }
    });

    loadMoreButton.addEventListener('click', loadMoreImages);

    tabTitles[0].click();
}

/* ~~~~~~~~~~~~~~~~~~~~~ Animation on Scroll ~~~~~~~~~~~~~~~~~~~~~~~ */

function setElementVisibility(elementId) {
    const element = document.getElementById(elementId);
    const isVisible = element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom >= 0;

    // element.style.opacity = isVisible ? '1' : '0';
    // element.style.animation = isVisible ? 'slide-up 0.5s linear' : '';

    if (isVisible) {
        element.style.opacity = '1';
        element.style.animation = 'slide-up 0.5s linear';
    } else {
        element.style.opacity = '0';
        element.style.animation = '';
    }

}

window.addEventListener('scroll', () => {
    // setElementVisibility('amazing-section');
    setElementVisibility('myTabsSection');
});

//   ~~~~~~~~~~~~~~~~~~~~~~~~~~ Adding Date ~~~~~~~~~~~~~~~~~~~~~~~~

function putTime() {
    const dateContainer = document.querySelectorAll(".img-hover");
    const currentDate = new Date();
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const day = currentDate.toLocaleString("en-US", { day: "numeric" });

    if (dateContainer) {
        dateContainer.forEach((element) => {
            element.innerHTML = `<span class="date">${day}</span><span class="month">${month}</span>`;
        });
    }
}

