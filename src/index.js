import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

/**
 * Populates the dropdown with cat breeds.
 * @param {Array} breeds - The array of cat breeds.
 */
const populateBreeds = (breeds) => {
  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
};

/**
 * Displays the information about the selected cat breed.
 * @param {Array} data - The array of cat images and breed info.
 */
const displayBreedInfo = (data) => {
  const breed = data[0].breeds[0];
  const breedInfoHTML = `
    <h2>${breed.name}</h2>
    <p>${breed.description}</p>
    <p><strong>Temperament:</strong> ${breed.temperament}</p>
    <div class="cat-images">
      ${data.map((image) => `<img src="${image.url}" alt="${breed.name}">`).join('')}
    </div>
  `;
  catInfo.innerHTML = breedInfoHTML;
  catInfo.classList.remove('hidden');
};

/**
 * Fetches and displays the information about the selected breed.
 * @param {string} breedId - The ID of the selected breed.
 */
const fetchBreedInfo = async (breedId) => {
  try {
    loader.classList.remove('hidden');
    catInfo.classList.add('hidden');
    error.classList.add('hidden');

    const data = await fetchCatByBreed(breedId);
    displayBreedInfo(data);
  } catch (err) {
    error.classList.remove('hidden');
  } finally {
    loader.classList.add('hidden');
  }
};

/**
 * Initializes the application.
 */
const init = async () => {
  try {
    loader.classList.remove('hidden');
    breedSelect.classList.add('hidden');
    error.classList.add('hidden');

    const breeds = await fetchBreeds();
    populateBreeds(breeds);
    breedSelect.classList.remove('hidden');
  } catch (err) {
    error.classList.remove('hidden');
  } finally {
    loader.classList.add('hidden');
  }
};

breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  if (breedId) {
    fetchBreedInfo(breedId);
  }
});

init();