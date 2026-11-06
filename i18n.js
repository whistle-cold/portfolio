// ============ 国际化 ============
// 用法:
//   data-i18n="key"           替换元素文本
//   data-i18n-html="key"      替换元素 HTML(仅用于本文件中可信的静态文案)
//   data-i18n-attr="attr:key;attr2:key2"  替换属性,如 aria-label、title
// 新增语言:在 messages 中加一个同结构的对象即可。
// 整个文件包在 IIFE 中,只通过 window.i18n 对外暴露,避免与其他脚本的全局变量冲突。
(() => {
  const messages = {
    zh: {
      'meta.title': 'PaperMan · 前端开发者',
      'meta.description': '前端开发者个人作品集:技能、项目与联系方式。',
      'a11y.skip': '跳到主要内容',
      'a11y.mainNav': '主导航',
      'a11y.menuOpen': '打开菜单',
      'a11y.menuClose': '关闭菜单',
      'a11y.theme': '切换深浅色主题',
      'a11y.themeTitle': '切换主题',
      'a11y.lang': 'Switch to English',
      'lang.toggle': 'EN',

      'nav.about': '关于',
      'nav.skills': '技能',
      'nav.projects': '项目',
      'nav.contact': '联系',

      'hero.eyebrow': '你好,我是',
      'hero.sub': '一名专注于 <strong>体验与性能</strong> 的前端开发者,<br class="hide-sm" />用代码把想法变成好用、好看的产品。',
      'hero.cta': '联系我',
      'hero.work': '查看作品',
      'hero.available': '目前开放新的工作机会',

      'about.title': '关于我',
      'about.p1': '我有 <strong>X 年</strong> 前端开发经验,熟悉现代 Web 技术栈,参与过从 0 到 1 的产品搭建,也做过大型项目的性能优化与工程化改造。',
      'about.p2': '我关注可访问性、交互细节和代码可维护性,喜欢和设计师、后端同学紧密协作,把复杂需求拆成清晰、可交付的方案。',
      'about.years': '年经验',
      'about.shipped': '上线项目',
      'about.love': '热爱前端',

      'skills.title': '技能',
      'skills.core': '核心语言',
      'skills.frameworks': '框架与库',
      'skills.tooling': '工程化',
      'skills.other': '其他',
      'skills.testing': '测试 (Jest / Playwright)',
      'skills.perf': '性能优化',
      'skills.a11y': '无障碍 (a11y)',

      'projects.title': '精选项目',
      'projects.a.name': '项目名称 A',
      'projects.a.desc': '一句话描述项目解决了什么问题,以及你在其中负责的部分和取得的成果。',
      'projects.b.name': '项目名称 B',
      'projects.b.desc': '例如:将首屏加载时间从 4s 优化到 1.2s,Lighthouse 性能分提升至 95+。',
      'projects.c.name': '项目名称 C',
      'projects.c.desc': '例如:为团队搭建的组件库,覆盖 40+ 组件,支持主题定制与按需加载。',
      'projects.demo': '在线演示 ↗',
      'projects.source': '源码 ↗',

      'contact.title': '联系我',
      'contact.intro': '无论是工作机会、项目合作,还是单纯想交流技术,都欢迎随时联系我,我通常会在 24 小时内回复。',
      'contact.email': '邮箱',
      'contact.wechat': '微信',
      'contact.social': '社交主页',
      'contact.copy': '复制',
      'contact.copyEmail': '复制邮箱地址',
      'contact.copyWechat': '复制微信号',
      'contact.resume': '下载简历 (PDF)',
      'contact.juejin': '掘金 ↗',

      'form.name': '你的称呼',
      'form.email': '你的邮箱',
      'form.message': '想说的话',
      'form.submit': '发送消息',
      'form.sending': '发送中…',
      'form.err.name': '请填写你的称呼',
      'form.err.email': '请输入有效的邮箱地址',
      'form.err.message': '内容至少 10 个字',
      'form.mailtoSubject': '来自作品集网站的消息 - {name}',
      'form.mailtoOpening': '正在打开你的邮件客户端…',
      'form.ok': '消息已发送,感谢联系!我会尽快回复你。',
      'form.fail': '发送失败,请直接发邮件至 {email}',

      'toast.copied': '已复制:{text}',
      'toast.copyFail': '复制失败,请手动复制',

      'footer.built': '用 ♥ 和纯 HTML/CSS/JS 构建',
      'footer.top': '回到顶部 ↑',
    },

    en: {
      'meta.title': 'PaperMan · Frontend Developer',
      'meta.description': 'Portfolio of a frontend developer: skills, projects and contact.',
      'a11y.skip': 'Skip to main content',
      'a11y.mainNav': 'Main navigation',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.theme': 'Toggle light/dark theme',
      'a11y.themeTitle': 'Toggle theme',
      'a11y.lang': '切换到中文',
      'lang.toggle': '中',

      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',

      'hero.eyebrow': "Hi, I'm",
      'hero.sub': 'A frontend developer focused on <strong>experience and performance</strong>,<br class="hide-sm" /> turning ideas into products that are useful and beautiful.',
      'hero.cta': 'Get in touch',
      'hero.work': 'View my work',
      'hero.available': 'Currently open to new opportunities',

      'about.title': 'About me',
      'about.p1': "I have <strong>X years</strong> of frontend experience with the modern web stack. I've built products from zero to one, and led performance and tooling overhauls on large codebases.",
      'about.p2': 'I care about accessibility, interaction details and maintainable code. I enjoy working closely with designers and backend engineers to turn complex requirements into clear, shippable solutions.',
      'about.years': 'Years of experience',
      'about.shipped': 'Projects shipped',
      'about.love': 'Love for the web',

      'skills.title': 'Skills',
      'skills.core': 'Core languages',
      'skills.frameworks': 'Frameworks & libraries',
      'skills.tooling': 'Tooling',
      'skills.other': 'Other',
      'skills.testing': 'Testing (Jest / Playwright)',
      'skills.perf': 'Performance',
      'skills.a11y': 'Accessibility (a11y)',

      'projects.title': 'Featured projects',
      'projects.a.name': 'Project A',
      'projects.a.desc': 'One sentence on the problem this project solves, what you owned, and the results.',
      'projects.b.name': 'Project B',
      'projects.b.desc': 'e.g. Cut first-load time from 4s to 1.2s and raised the Lighthouse performance score to 95+.',
      'projects.c.name': 'Project C',
      'projects.c.desc': 'e.g. A team component library with 40+ components, theming and tree-shaking support.',
      'projects.demo': 'Live demo ↗',
      'projects.source': 'Source ↗',

      'contact.title': 'Contact',
      'contact.intro': "Whether it's a job opportunity, a collaboration, or just a chat about tech, feel free to reach out. I usually reply within 24 hours.",
      'contact.email': 'Email',
      'contact.wechat': 'WeChat',
      'contact.social': 'Elsewhere',
      'contact.copy': 'Copy',
      'contact.copyEmail': 'Copy email address',
      'contact.copyWechat': 'Copy WeChat ID',
      'contact.resume': 'Download résumé (PDF)',
      'contact.juejin': 'Juejin ↗',

      'form.name': 'Your name',
      'form.email': 'Your email',
      'form.message': 'Message',
      'form.submit': 'Send message',
      'form.sending': 'Sending…',
      'form.err.name': 'Please enter your name',
      'form.err.email': 'Please enter a valid email address',
      'form.err.message': 'Message must be at least 10 characters',
      'form.mailtoSubject': 'Message from portfolio site - {name}',
      'form.mailtoOpening': 'Opening your email client…',
      'form.ok': "Message sent. Thanks for reaching out, I'll get back to you soon!",
      'form.fail': 'Sending failed. Please email me directly at {email}',

      'toast.copied': 'Copied: {text}',
      'toast.copyFail': 'Copy failed, please copy it manually',

      'footer.built': 'Built with ♥ and plain HTML/CSS/JS',
      'footer.top': 'Back to top ↑',
    },
  };

  const HTML_LANG = { zh: 'zh-CN', en: 'en' };

  function detectLang() {
    try {
      const saved = localStorage.getItem('lang');
      if (saved && messages[saved]) return saved;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  let currentLang = detectLang();

  function t(key, vars = {}) {
    const str = messages[currentLang][key] ?? messages.zh[key] ?? key;
    return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  }

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = HTML_LANG[lang];
    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    if (!messages[lang]) return;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyLang(lang);
  }

  window.i18n = {
    t,
    setLang,
    toggle: () => setLang(currentLang === 'zh' ? 'en' : 'zh'),
    get lang() { return currentLang; },
  };

  applyLang(currentLang);
})();
