import Notiflix from 'notiflix';
import { getData } from './axiosPhotos'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formRef = document.getElementById('search-form');
const containerGalleryRef = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more'); 

let pages = 1; 

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

formRef.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener("click", loadMore);

function onFormSubmit(e) {
    e.preventDefault(); 

const searchValue = e.currentTarget.elements.searchQuery.value;
console.log("🚀 ~ searchValue", searchValue); 

getData(searchValue).then(({hits, totalHits}) => {
   npages = Math.round(totalHits / 40);
    onClear();

    if(totalHits === 0) {
        axiosError(); 
    } else {
        onRenderContainerOfItem(hits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);      
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

let page = 1; 

function loadMore() {
page +=1; 

if (page === pages) {
    btnLoadMore.hidden = true;
    }
}

function onClear() {
    formRef.reset();
    containerGalleryRef.innerHTML = '';
}

const lightBoxGallery = new SimpleLightbox('.gallery a');
