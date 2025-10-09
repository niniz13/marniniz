'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { initializeStore } from '@/lib/store/store';

export default function StoreProvider({ children, initialState }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = initializeStore(initialState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
