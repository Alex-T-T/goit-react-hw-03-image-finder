
export const fetchImages = (value) => {
    const KEY_API = '29186842-8a22994ff73abec3697b1eb66';
    
    return fetch(`https://pixabay.com/api/?q=${value}&page=1&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => { 
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${value}! Change it please!`))
                })
}