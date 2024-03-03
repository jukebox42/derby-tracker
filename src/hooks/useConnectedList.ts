"use client"
import { useEffect, useState } from "react";

import { ActionResponse, ActionResponseType } from "@/app/actions";

export type UseConnectedList<T, F> = {
  isLoading: boolean,
  isRefreshing: boolean,
  onRefresh: () => void,
  onFilter: (filters: F) => void,
  filters: F | undefined,
  rows: T[],
  error: string,
}

export const useConnectedList = <T, F>(
  api: (filters?: F) => Promise<ActionResponse<T[]>>,
  defaultFilters?: F
): UseConnectedList<T, F> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [rows, setRows] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<F | undefined>(defaultFilters);

  const handleApi = async () => {
    try {
      const result = await api(filters);
      if (result.type === ActionResponseType.ERROR) {
        setRows([]);
        setError(result.error.message);
        setIsRefreshing(false);
        return setIsLoading(false);
      }
      setRows(result.data);
      setIsRefreshing(false);
      setIsLoading(false);
    } catch (e) {
      setError(e + "");
      setIsRefreshing(false);
      return setIsLoading(false);
    }
  }
  
  useEffect(() => {
    if (!isRefreshing) {
      return;
    }
    handleApi();
  }, [isRefreshing]);

  const onFilter = (newFilters: F) => {
    setFilters(newFilters);
    setIsRefreshing(true);
  }

  const onRefresh = () => setIsRefreshing(true);

  return {
    isLoading,
    isRefreshing,
    onRefresh,
    onFilter,
    filters,
    rows,
    error,
  }
}