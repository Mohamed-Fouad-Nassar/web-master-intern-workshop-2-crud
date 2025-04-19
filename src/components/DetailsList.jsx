export default function DetailsList({ children }) {
  return (
    <div className="flow-root w-full">
      <dl className="-my-3 divide-y divide-zinc-200 text-sm dark:divide-zinc-700">
        {children}
      </dl>
    </div>
  );
}

export function DetailsListRow({ title, value, children }) {
  return (
    <div className="relative grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-zinc-900 dark:text-white">{title}</dt>
      <dd className="text-zinc-700 sm:col-span-2 dark:text-zinc-200">
        {value || "N/A"}
      </dd>
      {children}
    </div>
  );
}

DetailsList.Row = DetailsListRow;
