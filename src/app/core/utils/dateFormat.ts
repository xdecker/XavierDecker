export function formatForDateInput(date: string | Date | null): string {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return ''; // fecha inválida
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}
