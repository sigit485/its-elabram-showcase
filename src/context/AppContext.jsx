import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  filter: { category: 'all', status: 'all', period: 'all', sort: 'votes', search: '' },
  activeModal: null,
  activeDetailId: null,
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'OPEN_MODAL':
      return { ...state, activeModal: action.modal, activeDetailId: action.detailId ?? state.activeDetailId };
    case 'CLOSE_MODAL':
      return { ...state, activeModal: null, activeDetailId: null };
    case 'SET_DETAIL':
      return { ...state, activeDetailId: action.id, activeModal: 'detail' };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { id: Date.now(), msg: action.msg }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setFilter = useCallback((payload) => dispatch({ type: 'SET_FILTER', payload }), []);
  const openModal = useCallback((modal) => dispatch({ type: 'OPEN_MODAL', modal }), []);
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), []);
  const openDetail = useCallback((id) => dispatch({ type: 'SET_DETAIL', id }), []);
  const showToast = useCallback((msg) => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', msg });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', id }), 3000);
  }, []);

  return (
    <AppContext.Provider value={{ state, setFilter, openModal, closeModal, openDetail, showToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
