import EmptyState from './EmptyState';

const DataTable = ({ columns, data = [], renderActions }) => {
  if (!data.length) {
    return <EmptyState message="No records yet. Try adjusting filters or add a new entry." />;
  }

  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {renderActions && <th />}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id ?? row.id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>
              ))}
              {renderActions && <td className="table-actions">{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
