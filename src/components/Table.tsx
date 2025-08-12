import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  id: number;
  name: string;
  age: number;
};

const defaultData: Person[] = [
  { id: 1, name: "홍길동", age: 25 },
  { id: 2, name: "이순신", age: 40 },
  { id: 3, name: "강감찬", age: 35 },
];

export default function TableMemoDemo() {
  const [data] = useState(() => [...defaultData]);
  const [count, setCount] = useState(0);
  const [useMemoMode, setUseMemoMode] = useState(true);

  // ✅ useMemo로 컬럼 고정
  const columnsMemo = useMemo<ColumnDef<Person>[]>(
    () => {
      console.log("✅ useMemo 컬럼 계산됨");
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "age", header: "Age" },
      ];
    },
    []
  );

  // ❌ 매 렌더마다 새로운 컬럼 배열 생성
  const columnsNormal: ColumnDef<Person>[] = (() => {
    console.log("❌ 일반 컬럼 계산됨");
    return [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "age", header: "Age" },
    ];
  })();

  const table = useReactTable({
    data,
    columns: useMemoMode ? columnsMemo : columnsNormal,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <h2>TanStack Table - useMemo 비교</h2>
      <button onClick={() => setCount(c => c + 1)}>count +1</button>
      <button onClick={() => setUseMemoMode(m => !m)}>
        {useMemoMode ? "useMemo OFF" : "useMemo ON"}
      </button>
      <p>count: {count}</p>

      <table border={1}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
