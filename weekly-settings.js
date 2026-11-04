(() => {
  const trigger = document.querySelector('#settings');
  const modal = document.querySelector('#modal');
  if (!trigger || !modal) return;

  const readHours = () => {
    try { return Math.min(8, Math.max(1, Number(JSON.parse(localStorage.getItem('atelierManga') || '{}').settings?.dailyHours) || 4)); }
    catch { return 4; }
  };
  const text = (hours) => `${hours} ${hours === 1 ? 'hora' : 'horas'} por dia`;

  trigger.addEventListener('click', () => {
    const current = readHours();
    modal.innerHTML = `<form class="modal-body" id="hours-form"><h2 id="modal-title">Seu ritmo de estudo</h2><p class="small">O curso mantém o mesmo foco durante a semana e redistribui o tempo de cada bloco de acordo com sua meta diária.</p><label class="field" for="daily-hours"><label>Horas por dia: <b id="hours-value">${text(current)}</b></label><input id="daily-hours" name="daily-hours" type="range" min="1" max="8" step="0.5" value="${current}"></label><p class="small">Domingo continua sendo leve: revisão, referências, recuperação física e planejamento.</p><footer><button type="button" class="ghost" id="hours-cancel">Cancelar</button><button type="submit">Salvar ritmo</button></footer></form>`;
    modal.showModal();
    const input = document.querySelector('#daily-hours');
    const output = document.querySelector('#hours-value');
    input.addEventListener('input', () => { output.textContent = text(Number(input.value)); });
    document.querySelector('#hours-cancel').addEventListener('click', () => modal.close());
    document.querySelector('#hours-form').addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        const currentState = JSON.parse(localStorage.getItem('atelierManga') || '{}');
        currentState.settings = { ...(currentState.settings || {}), dailyHours: Number(input.value) };
        localStorage.setItem('atelierManga', JSON.stringify(currentState));
        modal.close();
        location.reload();
      } catch { alert('Não foi possível salvar a sua meta de horas neste navegador.'); }
    });
  });
})();
