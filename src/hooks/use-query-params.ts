"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams<T extends Record<string, string | undefined>>() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result as T;
  }, [searchParams]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          newSearchParams.set(key, value);
        } else {
          newSearchParams.delete(key);
        }
      });

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return { params, updateParam, updateParams };
}
