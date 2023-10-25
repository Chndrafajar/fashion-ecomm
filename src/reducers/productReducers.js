export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem('auth'))?._id,
  name: '',
  description: '',
  price: 0,
  category: '',
  quantity: 0,
  cover: '',
  images: [],
  shipping: '',
};

export const productReducers = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    default:
      return state;
  }
};
