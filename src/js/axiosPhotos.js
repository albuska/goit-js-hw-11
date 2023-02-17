import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const getData = async (searchPhoto, page = 1) => {
	const response = await axios.get(
		`${BASE_URL}?key=33675530-14a54e49ac2d12a2b0a037dca&q=${searchPhoto}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
	return response.data; 	  
};


// export function fetchPhotos(searchPhoto) {

// return fetch(`https:pixabay.com/api/?key=33675530-14a54e49ac2d12a2b0a037dca&q=${searchPhoto}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json());
// }


