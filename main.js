/* main.js — CarbonBridge */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---- MOBILE MENU ----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ---- REVEAL ON SCROLL ----
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Also reveal .step-card, .bc-feat, etc on scroll
const cardEls = document.querySelectorAll('.step-card, .bc-feat, .market-stat-card, .reg-card, .problem-card');
cardEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 60}ms, transform 0.6s ease ${i * 60}ms`;
});
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cardEls.forEach(el => cardObserver.observe(el));

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

// ---- BAR CHART (homepage) ----
const chartEl = document.getElementById('retirementChart');
if (chartEl) {
  // Data: yearly retirements in MtCO2e (2016–2024)
  // Nature-based | Renewable | Other
  const years = ['2016','2017','2018','2019','2020','2021','2022','2023','2024'];
  const data = [
    { year: '2016', nature: 8,  renew: 14, other: 9  },
    { year: '2017', nature: 11, renew: 18, other: 11 },
    { year: '2018', nature: 14, renew: 22, other: 12 },
    { year: '2019', nature: 17, renew: 26, other: 14 },
    { year: '2020', nature: 20, renew: 31, other: 17 },
    { year: '2021', nature: 35, renew: 48, other: 28 },
    { year: '2022', nature: 38, renew: 51, other: 29 },
    { year: '2023', nature: 45, renew: 53, other: 33 },
    { year: '2024', nature: 47, renew: 51, other: 31 },
  ];
  const maxTotal = Math.max(...data.map(d => d.nature + d.renew + d.other));

  chartEl.innerHTML = data.map(d => {
    const total = d.nature + d.renew + d.other;
    const hNature = (d.nature / maxTotal) * 140;
    const hRenew  = (d.renew  / maxTotal) * 140;
    const hOther  = (d.other  / maxTotal) * 140;
    return `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px">
        <div style="display:flex;gap:2px;align-items:flex-end;height:150px;width:100%">
          <div class="bar nature" style="height:${hNature}px" title="${d.nature}Mt Nature-based"></div>
          <div class="bar renew"  style="height:${hRenew}px"  title="${d.renew}Mt Renewable"></div>
          <div class="bar other"  style="height:${hOther}px"  title="${d.other}Mt Other"></div>
        </div>
        <div class="bar-year">${d.year}</div>
      </div>`;
  }).join('');
}

// ---- DONUT CHART (dashboard) ----
function drawDonut(canvasId, segments, labels, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const r = Math.min(cx, cy) - 20;
  const inner = r * 0.6;
  const total = segments.reduce((a, b) => a + b, 0);
  let angle = -Math.PI / 2;

  segments.forEach((val, i) => {
    const sweep = (val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + sweep);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    angle += sweep;
  });

  // Inner hole
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = '#0d1710';
  ctx.fill();

  // Center text
  ctx.fillStyle = '#f0f7f2';
  ctx.font = 'bold 22px DM Mono, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total.toLocaleString() + 'M', cx, cy - 8);
  ctx.fillStyle = '#7a9585';
  ctx.font = '11px Syne, sans-serif';
  ctx.fillText('tCO₂e Total', cx, cy + 14);
}

// ---- LINE CHART (dashboard) ----
function drawLineChart(canvasId, datasets, labels) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const padL = 50, padR = 20, padT = 20, padB = 40;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const allVals = datasets.flatMap(d => d.values);
  const minV = 0;
  const maxV = Math.max(...allVals) * 1.1;

  const toX = (i) => padL + (i / (labels.length - 1)) * chartW;
  const toY = (v) => padT + chartH - ((v - minV) / (maxV - minV)) * chartH;

  // Grid lines
  ctx.strokeStyle = 'rgba(74,222,128,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + chartW, y);
    ctx.stroke();
    const val = maxV - (i / 4) * maxV;
    ctx.fillStyle = '#7a9585';
    ctx.font = '10px DM Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(val), padL - 6, y + 4);
  }

  // X labels
  ctx.fillStyle = '#7a9585';
  ctx.font = '10px DM Mono, monospace';
  ctx.textAlign = 'center';
  labels.forEach((label, i) => {
    ctx.fillText(label, toX(i), h - padB + 16);
  });

  // Lines
  datasets.forEach(ds => {
    ctx.beginPath();
    ds.values.forEach((v, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(v));
      else ctx.lineTo(toX(i), toY(v));
    });
    ctx.strokeStyle = ds.color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Fill area
    ctx.beginPath();
    ds.values.forEach((v, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(v));
      else ctx.lineTo(toX(i), toY(v));
    });
    ctx.lineTo(toX(ds.values.length - 1), padT + chartH);
    ctx.lineTo(toX(0), padT + chartH);
    ctx.closePath();
    ctx.fillStyle = ds.color + '15';
    ctx.fill();

    // Dots
    ds.values.forEach((v, i) => {
      ctx.beginPath();
      ctx.arc(toX(i), toY(v), 3, 0, Math.PI * 2);
      ctx.fillStyle = ds.color;
      ctx.fill();
    });
  });
}

// Dashboard init (called from dashboard.html)
window.initDashboard = function() {
  drawDonut('donutChart',
    [74, 47, 31, 11],
    ['Verra VCS', 'Nature-Based', 'Renewable', 'Other'],
    ['#4ade80', '#22c55e', '#d4a843', '#7a9585']
  );

  drawLineChart('lineChart',
    [
      { values: [31, 45, 67, 89, 111, 160, 154, 163, 163], color: '#4ade80', label: 'Retirements' },
      { values: [55, 80, 110, 145, 190, 365, 310, 260, 287], color: '#d4a843', label: 'Issuances' },
    ],
    ['2016','2017','2018','2019','2020','2021','2022','2023','2024']
  );
};

// ---- WALLET CONNECT MOCK ----
window.connectWallet = function() {
  const btn = document.getElementById('walletBtn');
  if (!btn) return;
  btn.textContent = 'Connecting...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '0x3A4f...8bCd ✓';
    btn.style.background = 'rgba(74,222,128,0.15)';
    btn.style.color = 'var(--green)';
    btn.style.border = '1px solid var(--green)';
    const notice = document.getElementById('walletNotice');
    if (notice) {
      notice.textContent = 'Wallet connected. You can now purchase CBT tokens.';
      notice.style.color = 'var(--green)';
    }
  }, 1800);
};

// ---- COPY TO CLIPBOARD ----
window.copyText = function(text, btnEl) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btnEl.textContent;
    btnEl.textContent = 'Copied!';
    setTimeout(() => btnEl.textContent = orig, 2000);
  });
};
