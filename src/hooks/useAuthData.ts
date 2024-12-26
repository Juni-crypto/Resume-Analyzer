import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ApiResponse {
  userId: string;
  response_data: any;
}

export function useAuthData() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const fetchingRef = useRef(false);

  const fetchUserData = async () => {
    // Prevent concurrent fetches
    if (fetchingRef.current) {
      return;
    }

    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      fetchingRef.current = true;
      setIsLoading(true);
      setError(null);

      const [atsResponse, jobsResponse] = await Promise.all([
        fetch(
          `https://bm7cr2dasm.ap-south-1.awsapprunner.com/ats-response/${user.uid}`
        ),
        fetch(
          `https://bm7cr2dasm.ap-south-1.awsapprunner.com/job-data/${user.uid}`
        ),
      ]);

      if (!atsResponse.ok || !jobsResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const [atsData, jobsData] = await Promise.all([
        atsResponse.json(),
        jobsResponse.json(),
      ]);

      if (atsData.response_data) {
        localStorage.setItem(
          'resumeAnalysis',
          JSON.stringify(atsData.response_data)
        );
      }

      if (jobsData) {
        localStorage.setItem('jobsData', JSON.stringify({ jobs: jobsData }));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch user data'
      );
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeData = async () => {
      if (user && mounted) {
        await fetchUserData();
      } else {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeData();

    return () => {
      mounted = false;
    };
  }, [user?.uid]); // Only depend on user ID changes

  return { isLoading, error, refetch: fetchUserData, isInitialized };
}
