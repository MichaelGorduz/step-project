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
  const tabWrapper = document.querySelector('.amazing-tabs-wrapper');
  const allImages = Array.from(document.querySelector('.all-images').querySelectorAll('img'));
  const loadMoreButton = document.querySelector('.load-more');
  let buttonClicked = false;
  const button = document.getElementById('myButton');
  const spinner = document.getElementById('spinner');

  const createHoverImage = (category) => {
    const hoverImageContainer = document.createElement('div');
    hoverImageContainer.className = 'hover-image';

    const imageContent = document.createElement('div');
    imageContent.className = 'image-content';

    const creativeDesign = document.createElement('p');
    creativeDesign.className = 'creative-design';
    creativeDesign.textContent = 'Creative Design';

    const webDesign = document.createElement('p');
    webDesign.className = 'web-design';
    webDesign.textContent = category;

    const linkImagesContainer = document.createElement('div');
    linkImagesContainer.className = 'link-images';

    const firstImageContainer = document.createElement('div');
    firstImageContainer.classList.add('first-img-container');

    const linkImage = document.createElement('img');
    linkImage.src = './images/Link.svg';
    linkImage.className = 'link-img';

    const squareImageContainer = document.createElement('div');
    squareImageContainer.classList.add('square-img-container');

    const squareImage = document.createElement('img');
    squareImage.src = './images/Square.svg';
    squareImage.className = 'square-img';

    const linkWrapperLinkImage = document.createElement('a');
    linkWrapperLinkImage.href = '#';
    linkWrapperLinkImage.appendChild(linkImage);

    const linkWrapperSquareImage = document.createElement('a');
    linkWrapperSquareImage.href = '#';
    linkWrapperSquareImage.appendChild(squareImage);

    firstImageContainer.appendChild(linkWrapperLinkImage);
    squareImageContainer.appendChild(linkWrapperSquareImage);
    linkImagesContainer.append(firstImageContainer, squareImageContainer);

    imageContent.append(linkImagesContainer, creativeDesign, webDesign);
    hoverImageContainer.appendChild(imageContent);

    return hoverImageContainer;
  };

  const filterImages = (category) => {
    allImages.forEach((image) => {
      const imageCategory = image.getAttribute('data-category');
      if (category === 'all' && buttonClicked === false) {
        if (imageCategory === 'Graphic Design' || imageCategory === 'Web Design') {
          const hoverImageContainer = createHoverImage(imageCategory);
          hoverImageContainer.appendChild(image);
          tabWrapper.appendChild(hoverImageContainer);
        }
      } else if (category === 'all' && buttonClicked === true) {
        if (
          imageCategory === 'Graphic Design' ||
          imageCategory === 'Web Design' ||
          imageCategory === 'Landing Pages' ||
          imageCategory === 'Wordpress'
        ) {
          const hoverImageContainer = createHoverImage(imageCategory);
          hoverImageContainer.appendChild(image);
          tabWrapper.appendChild(hoverImageContainer);
        }
      } else if (imageCategory === category) {
        const hoverImageContainer = createHoverImage(imageCategory);
        hoverImageContainer.appendChild(image);
        tabWrapper.appendChild(hoverImageContainer);
      }
    });
  };


  Array.from(tabTitles).forEach((title) => {
    title.addEventListener('click', () => {
      const category = title.getAttribute('data-category');

      Array.from(tabTitles).forEach((t) => {
        t.classList.remove('active');
      });

      title.classList.add('active');

      tabWrapper.innerHTML = '';
      filterImages(category);
      if (!buttonClicked) {
        loadMoreButton.style.display = category === 'all' ? 'block' : 'none';
      }
    });
  });

  loadMoreButton.addEventListener('click', () => {
    buttonClicked = true;
    loadMoreButton.style.display = 'none';
    spinner.style.display = 'block'; // Show the loading spinner

    setTimeout(() => {
      tabWrapper.innerHTML = '';

      allImages.forEach((image) => {
        const imageCategory = image.getAttribute('data-category');
        if (
          imageCategory === 'Graphic Design' ||
          imageCategory === 'Web Design' ||
          imageCategory === 'Landing Pages' ||
          imageCategory === 'Wordpress'
        ) {
          const hoverImageContainer = createHoverImage(imageCategory);
          hoverImageContainer.appendChild(image);
          tabWrapper.appendChild(hoverImageContainer);
        }
      });

      spinner.style.display = 'none'; // Hide the loading spinner
    }, 2000);
  });

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
