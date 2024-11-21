// Reference: https://clerk.com/changelog/2024-07-26-clerk-expo-v2

import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

// Help Android warm up the browser when we do the sign in
// So the browser can start faster => boost the performance
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
