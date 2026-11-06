// ============ 配置 ============
// 联系表单提交地址。推荐使用 Formspree(https://formspree.io)等免费服务:
// 注册后把下面替换成你的表单地址,例如 'https://formspree.io/f/xxxxxxx'。
// 留空时,表单会回退为打开访客的邮件客户端(mailto)。
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'you@example.com';

// ============ 工具 ============
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const { t } = window.i18n;

const toastEl = $('.toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// ============ 年份 ============
$('#year').textContent = new Date().getFullYear();

// ============ 语言切换 ============
$('.lang-toggle').addEventListener('click', () => window.i18n.toggle());

// ============ 主题切换 ============
$('.theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  const current =
    root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ============ 移动端菜单 ============
const navToggle = $('.nav-toggle');
const navLinks = $('#nav-links');
function setMenu(open) {
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', t(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  navLinks.classList.toggle('open', open);
}
navToggle.addEventListener('click', () => setMenu(navToggle.getAttribute('aria-expanded') !== 'true'));
$$('#nav-links a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// ============ 导航高亮当前区块 ============
const sections = $$('main section[id]');
const linkMap = new Map($$('#nav-links a').map((a) => [a.getAttribute('href').slice(1), a]));
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      linkMap.forEach((a) => a.classList.remove('active'));
      linkMap.get(entry.target.id)?.classList.add('active');
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => navObserver.observe(s));

// ============ 滚动进入动画 ============
const revealTargets = $$('.section-title, .card, .about-text, .stats, .contact-methods');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ============ 鼠标光效 ============
// 仅在有精确指针(鼠标)且未开启"减少动态效果"时启用
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reduceMotion) {
  // 光晕带惯性地跟随鼠标,营造液体般的流动感
  const glow = $('.cursor-glow');
  let targetX = innerWidth / 2, targetY = innerHeight / 2;
  let x = targetX, y = targetY;
  let rafId = 0;

  function tick() {
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    rafId = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(tick) : 0;
  }

  addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.classList.add('active');
    if (!rafId) rafId = requestAnimationFrame(tick);
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('active'));

  // 卡片表面的玻璃高光
  $$('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

// ============ 一键复制 ============
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 非安全上下文(如 file://)下的降级方案
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}
$$('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const ok = await copyText(btn.dataset.copy);
    toast(ok ? t('toast.copied', { text: btn.dataset.copy }) : t('toast.copyFail'));
  });
});

// ============ 联系表单 ============
const form = $('#contact-form');
const statusEl = $('.form-status', form);
const rules = {
  name: (v) => (v.trim() ? '' : t('form.err.name')),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : t('form.err.email')),
  message: (v) => (v.trim().length >= 10 ? '' : t('form.err.message')),
};

function validateField(input) {
  const msg = rules[input.name]?.(input.value) ?? '';
  const field = input.closest('.field');
  field.classList.toggle('invalid', !!msg);
  $('.error', field).textContent = msg;
  input.setAttribute('aria-invalid', String(!!msg));
  return !msg;
}

$$('input, textarea', form).forEach((input) => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.closest('.field').classList.contains('invalid')) validateField(input);
  });
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputs = $$('input, textarea', form);
  const results = inputs.map(validateField);
  if (results.includes(false)) {
    inputs[results.indexOf(false)].focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  statusEl.className = 'form-status';

  if (!FORM_ENDPOINT) {
    const subject = encodeURIComponent(t('form.mailtoSubject', { name: data.name }));
    const body = encodeURIComponent(`${data.message}\n\n——\n${data.name}\n${data.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    statusEl.textContent = t('form.mailtoOpening');
    return;
  }

  const btn = $('button[type="submit"]', form);
  btn.disabled = true;
  btn.textContent = t('form.sending');
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    statusEl.textContent = t('form.ok');
    statusEl.classList.add('ok');
  } catch {
    statusEl.textContent = t('form.fail', { email: CONTACT_EMAIL });
    statusEl.classList.add('fail');
  } finally {
    btn.disabled = false;
    btn.textContent = t('form.submit');
  }
});

// 切换语言时,刷新已显示的校验错误和菜单按钮文案
document.addEventListener('langchange', () => {
  $$('.field.invalid input, .field.invalid textarea', form).forEach(validateField);
  statusEl.textContent = '';
  statusEl.className = 'form-status';
  setMenu(navToggle.getAttribute('aria-expanded') === 'true');
});
