import { useMonthlyTable } from './useMonthlyTable'

export const TableViewType = {
  SymbolSearch: 'symbolSearch',
}

export const useTableView = (definition, currancyRate) => {
  const columnsResolver = {
    symbolSearch: useMonthlyTable(currancyRate),
  }

  const columns = columnsResolver[definition]

  return columns
}
