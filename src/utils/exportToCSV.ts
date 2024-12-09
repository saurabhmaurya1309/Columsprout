export const exportToCSV = (data: any[], columns: string[]) => {
  const headers = columns.join(',');
  const rows = data.map((item) =>
    columns.map((col) => item[col]).join(',')
  );

  const csvContent = [headers, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.csv';
  link.click();
};
