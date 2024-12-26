import { useState, useEffect } from 'react';

export function useWelcomeToast() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const jobsData = localStorage.getItem('jobsData');
    const hasShownToast = localStorage.getItem('hasShownWelcomeToast');

    if (!jobsData && !hasShownToast) {
      setShowToast(true);
      localStorage.setItem('hasShownWelcomeToast', 'true');
    }
  }, []);

  return {
    showToast,
    setShowToast
  };
}