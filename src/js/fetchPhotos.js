// const URL = 'https://pixabay.com/api/?key=33675530-14a54e49ac2d12a2b0a037dca&q=yellow+flower&image_type=photo&orientation=horizontal&safesearch=true';

const BASE_URL = 'https://pixabay.com/api/';

export function fetchPhotos(searchPhoto) {
//     const options = {
//         headers: {
//             'key': '33675530-14a54e49ac2d12a2b0a037dca',
//             // 'q': `${searchPhoto}`,
//             'image_type': 'photo',
//             'orientation': 'horizontal',
//             'safesearch': true, 
//         }
// }
return fetch(`https:pixabay.com/api/?key=33675530-14a54e49ac2d12a2b0a037dca&q=${searchPhoto}&image_type=photo&orientation=horizontal&safesearch=true`).then(response => response.json());
}



// export async function fetchPhotos(searchPhoto) {
//     const options = {
//         headers: {
//             'key': '33675530-14a54e49ac2d12a2b0a037dca',
//             'image_type': 'photo',
//             'orientation': 'horizontal',
//             'safesearch': true, 
//         }
//     }

//     const response = await fetch(`${BASE_URL}?q${searchPhoto}`, options);
//     return response.json(); 
// }

