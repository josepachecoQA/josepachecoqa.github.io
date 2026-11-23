const WHATSAPP_NUMBER = '5581991737145';
const MAX_PHOTOS = 40;
const PHOTO_MAX_SIDE = 1920;
const LOGO_MAX_SIDE = 1200;
const PHOTO_QUALITY = 0.85;

const form = document.getElementById('briefingForm');
const BRIEFING_TYPE = form.dataset.tipo || 'dentista';
const BRIEFING_STORAGE_KEY = form.dataset.storageKey || 'briefingDentista:v1';
const BRIEFING_TITLE = form.dataset.titulo || 'Landing page odontológica';
const photos = {};
const API_BASE = resolveApiBase();

function resolveApiBase() {
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const override = new URLSearchParams(window.location.search).get('api');
  if (isLocal && override) return override.replace(/\/$/, '');
  const meta = document.querySelector('meta[name="briefing-api"]');
  return meta && meta.content ? meta.content.replace(/\/$/, '') : '';
}

function getFieldValue(field) {
  const inputs = Array.from(field.querySelectorAll('input, textarea, select'))
    .filter((input) => input.type !== 'file');

  if (inputs.length === 0) return '';

  const first = inputs[0];
  if (first.type === 'checkbox') {
    return inputs.filter((input) => input.checked).map((input) => input.value).join(', ');
  }
  if (first.type === 'radio') {
    const checked = inputs.find((input) => input.checked);
    return checked ? checked.value : '';
  }
  return first.value.trim();
}

function isColorField(field) {
  return Boolean(field.querySelector('input[type="color"]'));
}

function readFormState() {
  const state = {};
  form.querySelectorAll('input[name], textarea[name]').forEach((input) => {
    if (input.name === 'website') return;
    if (input.type === 'checkbox') {
      state[input.name] = state[input.name] || [];
      if (input.checked) state[input.name].push(input.value);
    } else if (input.type === 'radio') {
      if (input.checked) state[input.name] = input.value;
    } else {
      state[input.name] = input.value;
    }
  });
  return state;
}

function saveState() {
  try {
    localStorage.setItem(BRIEFING_STORAGE_KEY, JSON.stringify(readFormState()));
  } catch (error) {
    // Navegação privada pode bloquear o localStorage; o formulário segue funcionando.
  }
}

function restoreState() {
  let state;
  try {
    state = JSON.parse(localStorage.getItem(BRIEFING_STORAGE_KEY) || 'null');
  } catch (error) {
    state = null;
  }
  if (!state) return;

  form.querySelectorAll('input[name], textarea[name]').forEach((input) => {
    const saved = state[input.name];
    if (saved === undefined) return;
    if (input.type === 'checkbox') {
      input.checked = Array.isArray(saved) && saved.includes(input.value);
    } else if (input.type === 'radio') {
      input.checked = saved === input.value;
    } else {
      input.value = saved;
    }
  });
}

function countPhotos() {
  return Object.values(photos).reduce((total, list) => total + list.length, 0);
}

function updateProgress() {
  const fields = Array.from(form.querySelectorAll('.field[data-q]')).filter((field) => !isColorField(field));
  const answered = fields.filter((field) => getFieldValue(field) !== '').length;
  const photoBonus = (photos['foto-principal'] || []).length > 0 ? 1 : 0;
  const percent = Math.round(((answered + photoBonus) / (fields.length + 1)) * 100);

  document.getElementById('progressText').textContent = `${percent}% preenchido`;
  document.getElementById('progressFill').style.width = `${percent}%`;

  form.querySelectorAll('.step').forEach((step) => {
    const link = document.querySelector(`.briefing-steps a[href="#${step.id}"]`);
    if (!link) return;
    const stepFields = Array.from(step.querySelectorAll('.field[data-q]')).filter((field) => !isColorField(field));
    const hasAnswer = stepFields.some((field) => getFieldValue(field) !== '');
    const requiredOk = Array.from(step.querySelectorAll('[required]')).every(isRequiredFilled);
    link.classList.toggle('is-done', hasAnswer && requiredOk);
  });
}

function isRequiredFilled(input) {
  if (input.type === 'checkbox') return input.checked;
  return input.value.trim() !== '' && input.checkValidity();
}

function validate() {
  const missing = [];
  form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));

  form.querySelectorAll('[required]').forEach((input) => {
    if (isRequiredFilled(input)) return;
    const field = input.closest('.field');
    field.classList.add('is-invalid');
    missing.push({ label: field.dataset.q, element: input });
  });

  if ((photos['foto-principal'] || []).length === 0) {
    const photoField = document.querySelector('[data-photo="foto-principal"]');
    photoField.classList.add('is-invalid');
    missing.push({ label: 'Foto principal', element: photoField.querySelector('input') });
  }

  return missing;
}

function collectAnswers() {
  return Array.from(form.querySelectorAll('.step')).map((step) => {
    const campos = Array.from(step.querySelectorAll('.field[data-q]'))
      .map((field) => ({ pergunta: field.dataset.q, resposta: getFieldValue(field) }))
      .filter((campo) => campo.resposta !== '');
    return { secao: step.dataset.title, campos };
  }).filter((secao) => secao.campos.length > 0);
}

function hasBeforeAfterConsent() {
  return Boolean(form.querySelector('input[name="autorizacaoAntesDepois"]:checked'));
}

function collectPhotos() {
  const consent = hasBeforeAfterConsent();
  const result = [];
  Object.entries(photos).forEach(([category, list]) => {
    if (category === 'antes-depois' && !consent) return;
    const label = document.querySelector(`[data-photo="${category}"]`).dataset.label;
    list.forEach((photo, index) => {
      result.push({
        categoria: category,
        rotulo: label,
        arquivo: `${category}-${index + 1}.${photo.extension}`,
        nomeOriginal: photo.name,
        largura: photo.width,
        altura: photo.height,
        dataUrl: photo.dataUrl
      });
    });
  });
  return result;
}

function toMarkdown(answers) {
  const lines = [`# Briefing - ${BRIEFING_TITLE}`, '', `Gerado em: ${new Date().toLocaleString('pt-BR')}`, ''];
  answers.forEach((secao) => {
    lines.push(`## ${secao.secao}`, '');
    secao.campos.forEach((campo) => {
      const resposta = campo.resposta.includes('\n')
        ? `\n${campo.resposta.split('\n').map((line) => `  > ${line}`).join('\n')}`
        : ` ${campo.resposta}`;
      lines.push(`- **${campo.pergunta}:**${resposta}`);
    });
    lines.push('');
  });

  const photoSummary = Object.entries(photos)
    .filter(([, list]) => list.length > 0)
    .map(([category, list]) => `- ${document.querySelector(`[data-photo="${category}"]`).dataset.label}: ${list.length}`);
  if (photoSummary.length > 0) {
    lines.push('## Fotos anexadas', '', ...photoSummary, '');
  }
  return lines.join('\n');
}

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || BRIEFING_TYPE;
}

function setFeedback(message, isError = false) {
  const feedback = document.getElementById('finishFeedback');
  feedback.textContent = message;
  feedback.classList.toggle('is-error', isError);
}

function failValidation(missing) {
  const names = missing.map((item) => item.label).join(', ');
  setFeedback(`Faltam campos obrigatórios: ${names}.`, true);
  missing[0].element.closest('.field, .photo-field').scrollIntoView({ behavior: 'smooth', block: 'center' });
  missing[0].element.focus({ preventScroll: true });
}

function buildPayload() {
  const answers = collectAnswers();
  return {
    versao: 2,
    tipo: BRIEFING_TYPE,
    geradoEm: new Date().toISOString(),
    profissional: form.elements.nomeCompleto.value.trim(),
    website: form.elements.website.value,
    cores: {
      principal: form.elements.corPrincipal.value,
      secundaria: form.elements.corSecundaria.value,
      destaque: form.elements.corDestaque.value
    },
    dados: readFormState(),
    respostas: answers,
    resumoMarkdown: toMarkdown(answers),
    fotos: collectPhotos()
  };
}

function skippedBeforeAfterNote() {
  return (photos['antes-depois'] || []).length > 0 && !hasBeforeAfterConsent()
    ? ' As fotos de antes/depois ficaram de fora porque a autorização dos pacientes não foi confirmada.'
    : '';
}

async function submitBriefing() {
  const missing = validate();
  if (missing.length > 0) {
    failValidation(missing);
    return;
  }
  if (!API_BASE) {
    setFeedback('O envio online ainda não está disponível. Clique em "Baixar cópia do arquivo" e mande pelo WhatsApp.', true);
    return;
  }

  const button = document.getElementById('submitBriefing');
  button.disabled = true;
  button.textContent = 'Enviando...';
  setFeedback('Enviando suas respostas e fotos. Não feche a página.');

  try {
    const payload = buildPayload();
    const response = await fetch(`${API_BASE}/api/briefings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setFeedback(result.erro || 'Não foi possível enviar agora. Tente de novo ou baixe a cópia do arquivo.', true);
      button.disabled = false;
      button.textContent = 'Enviar briefing';
      return;
    }

    try {
      localStorage.removeItem(BRIEFING_STORAGE_KEY);
    } catch (error) {
      // Sem localStorage não há nada salvo para apagar.
    }
    button.textContent = 'Briefing enviado';
    setFeedback(`Briefing enviado com sucesso! Protocolo ${result.id.slice(0, 8).toUpperCase()} (${result.totalFotos} foto(s)). O José já recebeu.${skippedBeforeAfterNote()}`);
  } catch (error) {
    setFeedback('Sem conexão com o servidor. Verifique a internet e tente de novo, ou baixe a cópia do arquivo e mande pelo WhatsApp.', true);
    button.disabled = false;
    button.textContent = 'Enviar briefing';
  }
}

function downloadBriefing() {
  const missing = validate();
  if (missing.length > 0) {
    failValidation(missing);
    return;
  }

  const payload = buildPayload();
  delete payload.website;
  const nome = payload.profissional;

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `briefing-${slugify(nome)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  const sizeMb = (blob.size / (1024 * 1024)).toFixed(1);
  setFeedback(`Arquivo baixado (${sizeMb} MB, ${payload.fotos.length} foto(s)). Agora é só mandar para o José.${skippedBeforeAfterNote()}`);
}

async function copyAnswers() {
  const text = toMarkdown(collectAnswers());
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const helper = document.createElement('textarea');
    helper.value = text;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    helper.remove();
  }
  setFeedback('Respostas copiadas. As fotos não vão no texto: para elas, use o botão de baixar o arquivo.');
}

function updateWhatsappLink() {
  const nome = form.elements.nomeExibicao.value.trim() || form.elements.nomeCompleto.value.trim();
  const message = `Oi José! ${nome ? `Aqui é ${nome}. ` : ''}Terminei o briefing da minha landing page e vou te mandar o arquivo por aqui.`;
  document.getElementById('sendWhatsapp').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Não foi possível ler ${file.name}`));
    };
    image.src = url;
  });
}

async function processPhoto(file, category) {
  const image = await loadImage(file);
  const isLogo = category === 'logo';
  const maxSide = category === 'logo' ? LOGO_MAX_SIDE : PHOTO_MAX_SIDE;
  // SVG sem width/height declarados não tem tamanho natural; rasterizamos num tamanho padrão.
  const naturalWidth = image.naturalWidth || LOGO_MAX_SIDE;
  const naturalHeight = image.naturalHeight || LOGO_MAX_SIDE;
  const scale = file.type === 'image/svg+xml'
    ? maxSide / Math.max(naturalWidth, naturalHeight)
    : Math.min(1, maxSide / Math.max(naturalWidth, naturalHeight));
  const width = Math.round(naturalWidth * scale);
  const height = Math.round(naturalHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!isLogo) {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(image, 0, 0, width, height);

  const mime = isLogo ? 'image/png' : 'image/jpeg';
  return {
    name: file.name,
    dataUrl: canvas.toDataURL(mime, PHOTO_QUALITY),
    extension: mime === 'image/png' ? 'png' : 'jpg',
    width,
    height
  };
}

function renderPhotos(category) {
  const field = document.querySelector(`[data-photo="${category}"]`);
  const preview = field.querySelector('.photo-preview');
  preview.innerHTML = '';

  (photos[category] || []).forEach((photo, index) => {
    const thumb = document.createElement('div');
    thumb.className = 'photo-thumb';

    const image = document.createElement('img');
    image.src = photo.dataUrl;
    image.alt = photo.name;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = '×';
    remove.setAttribute('aria-label', `Remover ${photo.name}`);
    remove.addEventListener('click', () => {
      photos[category].splice(index, 1);
      renderPhotos(category);
    });

    thumb.append(image, remove);
    preview.appendChild(thumb);
  });

  if (category === 'foto-principal' && (photos[category] || []).length > 0) {
    field.classList.remove('is-invalid');
  }

  const total = countPhotos();
  document.getElementById('photoTotal').textContent = total === 0
    ? 'Nenhuma foto anexada.'
    : `${total} foto(s) anexada(s).`;
  updateProgress();
}

async function handlePhotoInput(event) {
  const input = event.target;
  const category = input.closest('[data-photo]').dataset.photo;
  const files = Array.from(input.files || []);
  input.value = '';
  photos[category] = photos[category] || [];

  const available = MAX_PHOTOS - countPhotos();
  if (files.length > available) {
    setFeedback(`Limite de ${MAX_PHOTOS} fotos no total. Escolha as melhores.`, true);
  }

  for (const file of files.slice(0, Math.max(available, 0))) {
    try {
      photos[category].push(await processPhoto(file, category));
    } catch (error) {
      setFeedback(`${error.message}. Tente outra foto (formatos JPG ou PNG funcionam melhor).`, true);
    }
  }
  renderPhotos(category);
}

function resetBriefing() {
  if (!window.confirm('Apagar todas as respostas e fotos? Isso não pode ser desfeito.')) return;
  try {
    localStorage.removeItem(BRIEFING_STORAGE_KEY);
  } catch (error) {
    // Sem localStorage não há nada salvo para apagar.
  }
  form.reset();
  Object.keys(photos).forEach((category) => {
    photos[category] = [];
    renderPhotos(category);
  });
  form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  const submit = document.getElementById('submitBriefing');
  submit.disabled = false;
  submit.textContent = 'Enviar briefing';
  setFeedback('');
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function observeActiveStep() {
  if (!('IntersectionObserver' in window)) return;
  const links = document.querySelectorAll('.briefing-steps a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  form.querySelectorAll('.step').forEach((step) => observer.observe(step));
}

function initBriefing() {
  restoreState();
  updateProgress();
  updateWhatsappLink();
  observeActiveStep();

  form.addEventListener('input', (event) => {
    if (event.target.type === 'file') return;
    const field = event.target.closest('.field');
    if (field) field.classList.remove('is-invalid');
    saveState();
    updateProgress();
    updateWhatsappLink();
  });

  form.addEventListener('submit', (event) => event.preventDefault());
  form.querySelectorAll('input[type="file"]').forEach((input) => input.addEventListener('change', handlePhotoInput));
  form.querySelectorAll('[data-uppercase]').forEach((input) => input.addEventListener('input', (event) => {
    event.target.value = event.target.value.toUpperCase();
  }));
  document.getElementById('submitBriefing').addEventListener('click', submitBriefing);
  document.getElementById('downloadJson').addEventListener('click', downloadBriefing);
  document.getElementById('copyText').addEventListener('click', copyAnswers);
  document.getElementById('resetForm').addEventListener('click', resetBriefing);
}

initBriefing();
