import PropTypes from 'prop-types';


export const fetchImages = async (value, page, perPage) => {
    const KEY_API = '29186842-8a22994ff73abec3697b1eb66';
    console.log('page on fetch =>', page)
    const response = await fetch(`https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=${perPage}`);
    if (response.ok) {
        return response.json();
    }
    return await Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${value}! Try again please!`));
}

fetchImages.propTypes = {
    value: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired
}