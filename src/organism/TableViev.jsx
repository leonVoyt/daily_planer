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
    const [activeColumn, setActiveColumn] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [currPost, setCurrPost] = useState({})
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

    return (
      <div className="mt-4 min-w-full rounded-lg shadow-lg bg-green-100 p-4">
        <h1 className="text-3xl font-bold mb-8 text-green-600">
          Statistics Table
        </h1>
        <label
          htmlFor="currancySelect"
          className="text-base font-semibold text-green-600"
        >
          Currency Select:
        </label>
        <select
          id="currancySelect"
          value={currancy.currencies.name}
          onChange={(e) => currancy.fetchCurrencyValues(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300"
        >
          {currancyList.map((el) => (
            <option value={el.name} key={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        <table className="w-full mt-4 bg-white table-fixed">
          <thead>
            <tr className="sticky top-0 bg-green-200">
              {table.getFlatHeaders().map((header) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-300 cursor-pointer transition-all duration-300 hover:bg-gray-100"
                onClick={() => {
                  setShowModal(!showModal)
                  setCurrPost(row.original)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="max-w-[100px] p-2 text-xs font-normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <TableModal setShowModal={setShowModal} currPost={currPost} />
        )}
      </div>
    )
  })
)
const currancyList = [
  { id: 0, name: 'UAH' },
  { id: 1, name: 'USD' },
  { id: 2, name: 'EUR' },
]
