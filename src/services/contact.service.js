// shortcut: simula el envío; conectar al endpoint de CRM cuando exista.
export const sendVisitRequest = (payload) =>
  new Promise((resolve) => setTimeout(() => resolve({ ok: true, payload }), 900))
