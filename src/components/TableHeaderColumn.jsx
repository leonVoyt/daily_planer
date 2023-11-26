import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { flexRender } from '@tanstack/react-table'

const TableHeaderColumn = ({ header, isActive, onClick }) => {
  const Chevron =
    header.column.getIsSorted() === 'asc' ? ChevronUpIcon : ChevronDownIcon

  return (
    <th
      key={header.id}
      className={`cursor-pointer border-b border-slate-300 p-2 text-left align-middle text-sm font-normal`}
      onClick={onClick}
      style={{ width: header.column.getSize() }}
    >
      {header.isPlaceholder ? null : (
        <>
          <div className="whitespace-nowrap">
            <span
              className={`${isActive ? 'font-extrabold text-green-700' : ''}`}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </span>
            <Chevron
              className={`ml-2 inline-block h-2 ${
                isActive ? 'stroke-[3px] text-black' : 'text-gray-400'
              }`}
            />
          </div>
        </>
      )}
    </th>
  )
}
export default TableHeaderColumn
