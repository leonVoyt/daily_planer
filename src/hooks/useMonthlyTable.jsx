import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { getColor } from '../pages/Statistics'

export const useMonthlyTable = (currancy) => {
  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('month', {
        header: 'Month',
        cell: (info) => info.getValue(),
        sortingFn: (a, b) => {
          const dateA = new Date(a.original.month)
          const dateB = new Date(b.original.month)
          return dateA > dateB ? 1 : -1
        },
      }),
      columnHelper.accessor('income', {
        header: 'Income',
        cell: (info) => (
          <span className="text-green-600">
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('expenses', {
        header: 'Expenses',
        cell: (info) => (
          <span className="text-red-600">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),

      columnHelper.accessor('Rent', {
        header: 'Rent',
        cell: (info) => (
          <span className="text-orange-400">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('Food', {
        header: 'Food',
        cell: (info) => (
          <span className="text-orange-400">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('Entertainment', {
        header: 'Entertainment',
        cell: (info) => (
          <span className="text-orange-400">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('Transport', {
        header: 'Transport',
        cell: (info) => (
          <span className="text-orange-400">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('Other', {
        header: 'Other',
        cell: (info) => (
          <span className="text-orange-400">
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
      columnHelper.accessor('monthlyTotal', {
        header: 'Monthly Total',
        cell: (info) => (
          <span className={getColor(info.getValue())}>
            {' '}
            {(info.getValue() * currancy.value).toFixed(2) +
              currancy.letterCode}
          </span>
        ),
      }),
    ],
    [columnHelper]
  )

  return columns
}
