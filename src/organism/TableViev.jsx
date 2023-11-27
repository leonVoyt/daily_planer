import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTableView } from '../hooks/useTableView'
import TableHeaderColumn from '../components/TableHeaderColumn'
import { inject, observer } from 'mobx-react'
import TableModal from '../components/modals/TableModal'
export const TableView = inject('budget')(
  observer(({ budget: { currancy }, data, viewType }) => {
    console.log(currancy.currencies.value)

    const [activeColumn, setActiveColumn] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currMonth, setCurrMonth] = useState('')
    const table = useReactTable({
      data: data,
      columns: useTableView(viewType, currancy.currencies),
      enableSortingRemoval: false,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      initialState: {
        sorting: [{ id: 'month', desc: false }],
      },
    })
    const currancyList = [
      { id: 0, name: 'UAH' },
      { id: 1, name: 'USD' },
      { id: 2, name: 'EUR' },
    ]
    return (
      <div className=" mt-1 min-w-full rounded-lg bg-white shadow-2xl">
        <label htmlFor="currancySelect">Currancy Select : </label>
        <select
          id="currancySelect"
          value={currancy.currencies.name}
          onChange={(e) => currancy.fetchCurrencyValues(e.target.value)}
        >
          {currancyList.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <table className="table-fixed w-full">
          <thead>
            <tr className="sticky top-12 bg-white">
              {table.getFlatHeaders().map((header) => {
                return (
                  <TableHeaderColumn
                    key={header.id}
                    header={header}
                    isActive={
                      activeColumn === header.id && header.column.getCanSort()
                    }
                    onClick={() => {
                      setActiveColumn(header.id)
                      if (header.column.getCanSort()) {
                        header.column.toggleSorting()
                      }
                    }}
                  />
                )
              })}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-300 "
                onClick={() => {
                  setShowModal(!showModal)
                  setCurrMonth(row.original.month)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`max-w-[100px] whitespace-normal p-2 text-xs font-normal`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <TableModal setShowModal={setShowModal} month={currMonth} />
        )}
      </div>
    )
  })
)
