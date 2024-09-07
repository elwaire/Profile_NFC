import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, DocumentData } from 'firebase/firestore';
import { db } from '../configs/firebase';

export interface InformationDetailData {
  avatar: string;
  title: string;
  description: string;
  titleContact: string;
  items: Array<{
    image: string;
    tag: string;
    title: string;
    description: string;
    buttonLabel: string;
    link: string;
  }>;
}

interface UseInformationDetailResult {
  data: InformationDetailData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  saveData: (newData: InformationDetailData) => Promise<void>;
}

const INITIAL_DATA: InformationDetailData = {
  avatar: '',
  title: '',
  description: '',
  titleContact: '',
  items: [{
    image: '',
    tag: '',
    title: '',
    description: '',
    buttonLabel: '',
    link: ''
  }, {
    image: '',
    tag: '',
    title: '',
    description: '',
    buttonLabel: '',
    link: ''
  }]
};

export const useInformationDetail = (): UseInformationDetailResult => {
  const [data, setData] = useState<InformationDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'settings', 'information-detail');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const docData = docSnap.data() as DocumentData;
        setData(docData as InformationDetailData);
      } else {
        setData(INITIAL_DATA);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveData = async (newData: InformationDetailData) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, 'settings', 'information-detail');
      await setDoc(docRef, newData);
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while saving data'));
    } finally {
      setLoading(false);
    }
  };

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch, saveData };
};