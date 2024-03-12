"use client"
import { useEffect, useState } from "react";

import { ActionResponse, ActionResponseType } from "#/app/actions";

export type UseConnectedListProps<T,F> = {
  api: (filters?: F) => Promise<ActionResponse<T[]>>,
  defaultFilters?: F,
  defaultSearch?: string,
  searchFields?: string[],
}

export type UseConnectedList<T, F> = {
  isLoading: boolean,
  isRefreshing: boolean,
  refresh: () => void,
  search: (search: string) => void,
  filter: (filters: F) => void,
  filters: F | undefined,
  rows: T[],
  error: string,
}

export const useConnectedList = <T, F>(
  { api, defaultFilters, defaultSearch = "", searchFields = [] }: UseConnectedListProps<T, F>
): UseConnectedList<T, F> => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [rows, setRows] = useState<T[]>([]);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<F | undefined>(defaultFilters);
  const [search, setSearch] = useState(defaultSearch);

  const handleApi = async () => {
    try {
      const result = await api({
        ...filters,
        OR: searchFields.map(field => ({
          [field]: { contains: search, mode: "insensitive" }
        })),
      } as F);
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

  const filter = (newFilters: F) => {
    setFilters(newFilters);
    setIsRefreshing(true);
    setIsLoading(true);
  }
  
  useEffect(() => {
    if (!isRefreshing) {
      return;
    }
    handleApi();
  }, [isRefreshing]);

  useEffect(() => {
    setIsRefreshing(true);
    setIsLoading(true);
  }, [search]);

  const refresh = () => setIsRefreshing(true);

  return {
    isLoading,
    isRefreshing,
    refresh,
    filter,
    search: setSearch,
    filters,
    rows,
    error,
  };
}