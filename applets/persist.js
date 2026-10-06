// Remembers an applet's form fields in localStorage, keyed by element id. Storage can
// be missing or throw (private windows, blocked site data), so every access is guarded
// and the applet falls back to its defaults.
export function persist(key) {
  const fields = () => document.querySelectorAll('input[id]:not([type="file"]), select[id], textarea[id]');

  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved) {
      fields().forEach((el) => {
        if (!(el.id in saved)) return;
        if (el.type === 'checkbox' || el.type === 'radio') el.checked = saved[el.id];
        else el.value = saved[el.id];
      });
    }
  } catch (e) { /* unavailable or corrupt: keep defaults */ }

  const save = () => {
    const data = {};
    fields().forEach((el) => { data[el.id] = el.type === 'checkbox' || el.type === 'radio' ? el.checked : el.value; });
    try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { /* not persisted */ }
  };
  document.addEventListener('input', save);
  document.addEventListener('change', save);

  return {
    reset() {
      document.removeEventListener('input', save);
      document.removeEventListener('change', save);
      try { localStorage.removeItem(key); } catch (e) { /* nothing stored */ }
      window.location.reload();
    },
  };
}
