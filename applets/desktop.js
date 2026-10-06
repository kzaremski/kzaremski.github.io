(function() {
  var APPLETS = window.APPLETS || {};
  var desktop = document.getElementById('desktop');
  var layer = document.getElementById('windows');
  var tasks = document.getElementById('tasks');
  var menu = document.getElementById('menu');
  var start = document.getElementById('start');
  var windows = [];
  var zTop = 10;
  var opened = 0;
  var MIN_W = 280;
  var MIN_H = 180;

  function bounds() {
    return { w: desktop.clientWidth, h: desktop.clientHeight };
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function setRect(win, r) {
    win.rect = r;
    win.el.style.left = r.x + 'px';
    win.el.style.top = r.y + 'px';
    win.el.style.width = r.w + 'px';
    win.el.style.height = r.h + 'px';
  }

  function focus(win) {
    windows.forEach(function(w) {
      var active = w === win;
      w.el.classList.toggle('active', active);
      w.task.classList.toggle('active', active && !w.minimized);
    });
    if (win) win.el.style.zIndex = ++zTop;
  }

  function topVisible() {
    var visible = windows.filter(function(w) { return !w.minimized; });
    visible.sort(function(a, b) { return b.el.style.zIndex - a.el.style.zIndex; });
    return visible[0] || null;
  }

  function minimize(win) {
    win.minimized = true;
    win.el.hidden = true;
    focus(topVisible());
  }

  function restore(win) {
    win.minimized = false;
    win.el.hidden = false;
    focus(win);
  }

  function toggleMaximize(win) {
    win.maximized = !win.maximized;
    win.el.classList.toggle('maximized', win.maximized);
    if (!win.maximized) setRect(win, win.rect);
  }

  function close(win) {
    win.el.remove();
    win.task.remove();
    windows.splice(windows.indexOf(win), 1);
    focus(topVisible());
  }

  // While dragging or resizing, iframes would swallow pointer events; the shields
  // cover every frame for the duration.
  function track(e, onMove) {
    e.preventDefault();
    document.body.classList.add('wm-dragging');
    var startX = e.clientX;
    var startY = e.clientY;
    function move(ev) { onMove(ev.clientX - startX, ev.clientY - startY); }
    function up() {
      document.body.classList.remove('wm-dragging');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
  }

  function open(slug) {
    var applet = APPLETS[slug];
    if (!applet) return;
    var b = bounds();
    var offset = (opened++ % 8) * 26;
    var w = Math.min(applet.width, b.w - 16);
    var h = Math.min(applet.height, b.h - 16);
    var win = { slug: slug, minimized: false, maximized: b.w < 700 };

    win.el = el('section', 'win95-window wm-window');
    win.el.setAttribute('role', 'dialog');
    win.el.setAttribute('aria-label', applet.title);
    var bar = el('div', 'win95-titlebar');
    var title = el('span', 'win95-title');
    var icon = el('img');
    icon.src = applet.icon;
    icon.alt = '';
    icon.width = icon.height = 16;
    title.append(icon, document.createTextNode(applet.exe));
    var controls = el('span', 'win95-controls');
    [['min', '_', 'Minimize'], ['max', '□', 'Maximize'], ['close', '×', 'Close']].forEach(function(c) {
      var btn = el('button', null, c[1]);
      btn.type = 'button';
      btn.dataset.act = c[0];
      btn.setAttribute('aria-label', c[2]);
      controls.appendChild(btn);
    });
    bar.append(title, controls);
    var body = el('div', 'wm-body');
    var frame = el('iframe');
    frame.src = applet.app;
    frame.title = applet.title;
    var shield = el('div', 'wm-shield');
    body.append(frame, shield);
    var grip = el('div', 'wm-grip');
    win.el.append(bar, body, grip);
    win.frame = frame;

    win.task = el('button', 'wm-task');
    win.task.type = 'button';
    var taskIcon = icon.cloneNode();
    win.task.append(taskIcon, el('span', null, applet.exe));

    layer.appendChild(win.el);
    tasks.appendChild(win.task);
    windows.push(win);
    setRect(win, {
      // Open to the right of the desktop icon column so the icons stay clickable.
      x: Math.max(0, Math.min(112 + offset, b.w - w)),
      y: Math.max(0, Math.min(24 + offset, b.h - h)),
      w: w,
      h: h,
    });
    win.el.classList.toggle('maximized', win.maximized);
    focus(win);

    win.el.addEventListener('pointerdown', function() { if (!win.el.classList.contains('active')) focus(win); });
    controls.addEventListener('click', function(e) {
      var act = e.target.dataset.act;
      if (act === 'min') minimize(win);
      else if (act === 'max') toggleMaximize(win);
      else if (act === 'close') close(win);
    });
    bar.addEventListener('dblclick', function(e) { if (!e.target.dataset.act) toggleMaximize(win); });
    bar.addEventListener('pointerdown', function(e) {
      if (e.target.dataset.act || win.maximized || e.button !== 0) return;
      var r = win.rect;
      track(e, function(dx, dy) {
        var bb = bounds();
        setRect(win, {
          x: Math.max(60 - r.w, Math.min(r.x + dx, bb.w - 60)),
          y: Math.max(0, Math.min(r.y + dy, bb.h - 24)),
          w: r.w,
          h: r.h,
        });
      });
    });
    grip.addEventListener('pointerdown', function(e) {
      if (win.maximized || e.button !== 0) return;
      var r = win.rect;
      track(e, function(dx, dy) {
        setRect(win, { x: r.x, y: r.y, w: Math.max(MIN_W, r.w + dx), h: Math.max(MIN_H, r.h + dy) });
      });
    });
    win.task.addEventListener('click', function() {
      if (win.minimized) restore(win);
      else if (win.el.classList.contains('active')) minimize(win);
      else focus(win);
    });
  }

  // Clicking inside an inactive window's frame lands on its shield; keyboard focus
  // moving into a frame shows up as the parent window losing focus.
  window.addEventListener('blur', function() {
    setTimeout(function() {
      windows.forEach(function(w) {
        if (document.activeElement === w.frame && !w.el.classList.contains('active')) focus(w);
      });
    });
  });

  // Desktop icons: select on click, open on double-click, Enter, or a touch tap.
  document.querySelectorAll('.wm-icon').forEach(function(icon) {
    var slug = icon.dataset.applet;
    var touch = false;
    icon.addEventListener('pointerdown', function(e) { touch = e.pointerType === 'touch'; });
    icon.addEventListener('click', function(e) {
      document.querySelectorAll('.wm-icon.selected').forEach(function(i) { i.classList.remove('selected'); });
      icon.classList.add('selected');
      if (!slug) {
        if (!touch && e.detail < 2) e.preventDefault();
        return;
      }
      e.preventDefault();
      if (touch) open(slug);
    });
    icon.addEventListener('dblclick', function() {
      if (slug) open(slug);
      else window.location.href = icon.href;
    });
    icon.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && slug) { e.preventDefault(); open(slug); }
    });
  });
  desktop.addEventListener('pointerdown', function(e) {
    if (e.target === desktop || e.target.id === 'icons') {
      document.querySelectorAll('.wm-icon.selected').forEach(function(i) { i.classList.remove('selected'); });
    }
  });

  function setMenu(show) {
    menu.hidden = !show;
    start.setAttribute('aria-expanded', show);
    start.classList.toggle('pressed', show);
  }
  start.addEventListener('click', function() { setMenu(menu.hidden); });
  document.addEventListener('pointerdown', function(e) {
    if (!menu.hidden && !menu.contains(e.target) && !start.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') setMenu(false); });
  menu.querySelectorAll('[data-applet]').forEach(function(item) {
    item.addEventListener('click', function() { setMenu(false); open(item.dataset.applet); });
  });

  document.getElementById('shutdown').addEventListener('click', function() {
    setMenu(false);
    var screen = el('div', 'wm-shutdown');
    screen.append(el('p', null, 'It’s now safe to turn off your computer.'), el('small', null, 'Click anywhere to go back to konstantin.zarem.ski'));
    screen.addEventListener('click', function() { window.location.href = '/'; });
    document.body.appendChild(screen);
  });

  var clock = document.getElementById('clock');
  function tick() {
    clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  tick();
  setInterval(tick, 15000);

  // Keep restored windows reachable when the browser shrinks.
  window.addEventListener('resize', function() {
    var b = bounds();
    windows.forEach(function(w) {
      var r = w.rect;
      setRect(w, {
        x: Math.max(60 - r.w, Math.min(r.x, b.w - 60)),
        y: Math.max(0, Math.min(r.y, b.h - 24)),
        w: r.w,
        h: r.h,
      });
    });
  });

  // /applets/#nametag opens that applet on arrival.
  var hash = window.location.hash.slice(1);
  if (APPLETS[hash]) open(hash);
})();
