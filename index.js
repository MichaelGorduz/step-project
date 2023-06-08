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
  
      const linkImage = document.createElement('img');
      linkImage.src = './images/Link.png';
      linkImage.className = 'link-img';
  
      imageContent.append(linkImage, creativeDesign, webDesign);
      hoverImageContainer.appendChild(imageContent);
  
      return hoverImageContainer;
    };
  
    const createImages = (container) => {
      const category = container.getAttribute('data-category');
      const imagesToDisplay = allImages.filter((image) => image.getAttribute('data-category') === category);
  
      container.innerHTML = '';
      imagesToDisplay.forEach((image) => {
        const hoverImageContainer = createHoverImage(category);
        hoverImageContainer.appendChild(image);
        container.appendChild(hoverImageContainer);
      });
    };
  
    allImages.forEach((image) => {
      const category = image.getAttribute('data-category');
      Array.from(tabWrappers).forEach((wrapper) => {
        const correspondingCategory = wrapper.getAttribute('data-category');
        if (category === correspondingCategory || correspondingCategory === 'all') {
          wrapper.appendChild(image);
        }
      });
    });
  
    Array.from(tabTitles).forEach((title) => {
      title.addEventListener('click', () => {
        const category = title.getAttribute('data-category');
  
        Array.from(tabWrappers).forEach((wrapper) => {
          const correspondingCategory = wrapper.getAttribute('data-category');
          if (category === 'all') {
            if (buttonClicked) {
              if (
                correspondingCategory === 'Graphic Design' ||
                correspondingCategory === 'Web Design' ||
                correspondingCategory === 'Landing Pages' ||
                correspondingCategory === 'Wordpress'
              ) {
                wrapper.style.display = 'flex';
              } else {
                wrapper.style.display = 'none';
              }
            } else {
              if (
                correspondingCategory === 'Graphic Design' ||
                correspondingCategory === 'Web Design'
              ) {
                wrapper.style.display = 'flex';
              } else {
                wrapper.style.display = 'none';
              }
            }
          } else {
            if (category === correspondingCategory) {
              wrapper.style.display = 'flex';
            } else {
              wrapper.style.display = 'none';
            }
          }
        });
  
        Array.from(tabTitles).forEach((t) => {
          t.classList.remove('active');
        });
  
        title.classList.add('active');
  
        tabWrappers.forEach(createImages);
  
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
  
      Array.from(tabWrappers).forEach((wrapper) => {
        const correspondingCategory = wrapper.getAttribute('data-category');
        if (
          correspondingCategory === 'Graphic Design' ||
          correspondingCategory === 'Web Design' ||
          correspondingCategory === 'Landing Pages' ||
          correspondingCategory === 'Wordpress'
        ) {
          wrapper.style.display = 'flex';
        } else {
          wrapper.style.display = 'none';
        }
        spinner.style.display = 'none';
      });

      spinner.style.display = 'none'; // Hide the loading spinner
    }, 3000);
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

