const galleryItems = [
    {
      preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
        preview:
          'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
        description: 'Flower Blooms',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
        description: 'Alpine Mountains',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
        description: 'Mountain Lake Sailing',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
        description: 'Alpine Spring Meadows',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
        description: 'Nature Landscape',
      },
      {
        preview:
          'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
        original:
          'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
        description: 'Lighthouse Coast Sea',
      },
  ];
  
  const galleryContainer = document.querySelector('.js-gallery');
  const lightbox = document.querySelector('.js-lightbox');
  const lightboxImage = document.querySelector('.lightbox__image');
  const closeButton = document.querySelector('[data-action="close-lightbox"]');
  const lightboxOverlay = document.querySelector('.lightbox__overlay');
  let currentIndex = 0;

  const createGalleryMarkup = items => {
    return items
      .map(
        ({ preview, original, description }, index) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
              data-index="${index}"
            />
          </a>
        </li>`
      )
      .join('');
  };
  
  galleryContainer.innerHTML = createGalleryMarkup(galleryItems);
  

  galleryContainer.addEventListener('click', onGalleryClick);
  
  function onGalleryClick(event) {
    event.preventDefault();
  
    if (event.target.nodeName !== 'IMG') return;
  
    const clickedImage = event.target;
    currentIndex = Number(clickedImage.dataset.index);
  
    openLightbox(clickedImage.dataset.source, clickedImage.alt);
  }
  
  function openLightbox(src, alt) {
    lightbox.classList.add('is-open');
    lightboxImage.src = src;
    lightboxImage.alt = alt;
  
    document.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('keydown', onArrowKeyPress);
  }
  
  closeButton.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  
    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('keydown', onArrowKeyPress);
  }
  
  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      closeLightbox();
    }
  }

  function onArrowKeyPress(event) {
    if (event.code === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      setLightboxImage(currentIndex);
    } else if (event.code === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      setLightboxImage(currentIndex);
    }
  }
  
  function setLightboxImage(index) {
    lightboxImage.src = galleryItems[index].original;
    lightboxImage.alt = galleryItems[index].description;
  }
  