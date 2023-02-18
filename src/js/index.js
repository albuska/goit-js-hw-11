import Notiflix from 'notiflix';
// import { getData } from './axiosPhotos';
import { getData, objectPage, incrementPage, resetPage } from './axiosPhotos'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import { btnLoadMore, btnDisable, btnEnable } from './btnLoadMore'; 
import { preloaderStart, preloaderStop } from './preloader';

const formRef = document.getElementById('search-form');
const containerGalleryRef = document.querySelector('.gallery');
// const btnLoadMore = document.querySelector('.load-more'); 
const guard = document.querySelector('.js-guard');
console.log("🚀 ~ guard", guard);

  

formRef.addEventListener('submit', onFormSubmit);
// btnLoadMore.addEventListener("click", loadMore);

preloaderStart();
preloaderStop();

function onFormSubmit(e) {
    e.preventDefault(); 
preloaderStart();
objectPage.searchValue = e.currentTarget.elements.searchQuery.value.trim();
resetPage();
 
getData(objectPage.searchValue).then(({hits, totalHits}) => { 
    onClear();
 
    if(totalHits === 0 || objectPage.searchValue === '') {
      // btnLoadMore.hidden = true;
        axiosError(); 

        preloaderStop(); 
    } else {  
      
        onRenderContainerOfItem(hits);

        preloaderStart();
        observer.observe(guard);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        // btnLoadMore.hidden = false;
   
        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
      
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });    
    }
}) 

}

function axiosError() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
   
}

function onRenderContainerOfItem(items) {
const markup = items.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="281" height="180"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`
    }).join(""); 
containerGalleryRef.insertAdjacentHTML('beforeend', markup);  
lightBoxGallery.refresh();
}  


// function loadMore() {
//   btnDisable(); 
//   incrementPage();  
 
//   getData(objectPage.searchValue).then(({hits, totalHits}) => {
//   onRenderContainerOfItem(hits);
 
//   btnEnable(); 
//   const pages = Math.round(totalHits / objectPage.per_page);

 
//   if (objectPage.page === pages) {
//     btnLoadMore.hidden = true;
//     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//     }

// })
// }

function onClear() {
    formRef.reset();
    containerGalleryRef.innerHTML = '';
   
}

const lightBoxGallery = new SimpleLightbox('.gallery a');


const options = {
  root: null,
  rootMargin: "300px",
};
const observer = new IntersectionObserver(onLoad, options);

function onLoad(entries) {

  preloaderStart(); 
    console.log(entries);
entries.forEach((entry) => {
  console.log(entry.isIntersecting);
if(entry.isIntersecting) {
  preloaderStart();
  incrementPage();

  getData(objectPage.searchValue).then(({hits, totalHits}) => {
    onRenderContainerOfItem(hits); 
   
    preloaderStop();

    const pages = Math.round(totalHits / objectPage.per_page); 
    if(objectPage.page === pages) {
     
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      observer.unobserve(guard);
    preloaderStop(); 
    }
  })   
}
}) 
}
