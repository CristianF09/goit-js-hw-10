import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// Initialize SlimSelect
new SlimSelect({
  select: '#breed-select',
});

// Select elements
const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');

/**
 * Show loader
 */
const showLoader = () => {
  loader.classList.remove('hidden');
};

/**
 * Hide loader
 */
const hideLoader = () => {
  loader.classList.add('hidden');
};

/**
 * Show error message
 * @param {string} message - The error message to display
 */
const showError = (message) => {
  Notiflix.Notify.failure(message);
};

/**
 * Load breeds and populate the select element
 */
const loadBreeds = async () => {
  try {
    showLoader();
    breedSelect.classList.add('hidden');
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    breedSelect.classList.remove('hidden');
    hideLoader();
  } catch (error) {
    hideLoader();
    showError('Failed to load breeds');
  }
};

/**
 * Load cat by breed and display info
 * @param {string} breedId - The ID of the breed
 */
const loadCatByBreed = async (breedId) => {
  try {
    showLoader();
    catInfo.classList.add('hidden');
    catImage.src = 'loading-image.gif'; // Optional: set a loading image
    const cats = await fetchCatByBreed(breedId);
    const cat = cats[0];
    catImage.src = cat.url;
    breedName.textContent = cat.breeds[0].name;
    description.textContent = cat.breeds[0].description;
    temperament.textContent = cat.breeds[0].temperament;
    catInfo.classList.remove('hidden');
    hideLoader();
  } catch (error) {
    hideLoader();
    showError('Failed to load cat information');
  }
};

// Event listener for breed select change
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loadCatByBreed(breedId);
  }
});

// Load breeds on page load
loadBreeds();