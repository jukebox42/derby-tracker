"use client"
import { useEffect, useState } from "react";

import { ActionResponse, ActionResponseType } from "#/app/actions";

export type UseConnectedEntity<T, F> = {
  isLoading: boolean,
  isRefreshing: boolean,
  onFilter: (filters: F) => void,
  onRefresh: () => void,
  filters: F,
  entity: T | undefined,
  error: string,
}

export const useConnectedEntity = <T, F>(
  api: (filters: F) => Promise<ActionResponse<T>>,
  defaultFilters: F
): UseConnectedEntity<T, F> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [entity, setEntity] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<F>(defaultFilters);

  const handleApi = async () => {
    try {
      const result = await api(filters);
      if (result.type === ActionResponseType.ERROR) {
        setEntity(undefined);
        setError(result.error.message);
        setIsRefreshing(false);
        return setIsLoading(false);
      }
      setEntity(result.data);
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
    entity,
    error,
  }
}