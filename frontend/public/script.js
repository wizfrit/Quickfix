document.querySelector('.search-icon')?.addEventListener('click', () => {
  alert('Search feature is under development.');
});

document.querySelector('.search-btn')?.addEventListener('click', () => {
  const query = document.querySelector('.search-input')?.value;
  alert(`You searched for: ${query}`);
});
