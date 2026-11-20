/* Callback requests update the quote's existing CRM row. */
(() => {
  "use strict";
  const style = document.createElement("style");
  style.textContent = `
    #callbackModal .pyk-modal-box{position:relative;max-width:440px;padding:30px 24px}
    #callbackModal h2{font-family:'DM Serif Display',serif;font-size:1.8rem;font-weight:400;line-height:1.15;margin:0 32px 14px 0}
    #callbackModal .pyk-callback-brand{color:var(--pyk-gold-dark);font-size:.8rem;letter-spacing:.18em;font-weight:700;margin-bottom:24px}
    #callbackClose{position:absolute;right:10px;top:10px;width:44px;height:44px;border:0;background:transparent;color:var(--pyk-ink);font-size:1.7rem;cursor:pointer}
    #callbackModal .pyk-callback-copy{color:var(--pyk-muted);margin:0 0 22px;font-size:1rem}
    #callbackModal .pyk-callback-note{color:var(--pyk-muted);font-size:.8rem;margin:12px 0}
    #callbackModal label{display:block;margin-bottom:8px;font-weight:700}
    #callbackPhone{font-size:16px;width:100%}
    #callbackSubmit,#callbackDecline{width:100%;margin-top:12px;min-height:44px}
    #callbackMessage{margin:16px 0 0;font-size:.95rem}
    #callbackMessage.is-error{color:var(--pyk-coral)}
    #callbackOpen{width:100%;margin-top:10px;min-height:44px}
    @media print{#callbackModal,#callbackOpen{display:none!important}}
  `;
  document.head.append(style);
  const modal = document.createElement("div");
  modal.id = "callbackModal";
  modal.className = "pyk-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-labelledby", "callbackTitle");
  modal.innerHTML = `
    <div class="pyk-modal-box">
      <button type="button" id="callbackClose" aria-label="Zamknij okienko">×</button>
      <div class="pyk-callback-brand">PYK ŁYK</div>
      <h2 id="callbackTitle">Porozmawiajmy o Twoim przyjęciu</h2>
      <p class="pyk-callback-copy">Chcesz sprawdzić dostępność terminu lub omówić wycenę? Zostaw numer — oddzwonimy. <strong>Bez zobowiązań.</strong></p>
      <form id="callbackForm">
        <label for="callbackPhone">Twój numer telefonu</label>
        <input class="pyk-input" id="callbackPhone" type="tel" name="tel" autocomplete="tel" inputmode="tel" placeholder="np. 500 600 700" maxlength="30" required>
        <button class="pyk-button pyk-button-primary" type="submit" id="callbackSubmit">Poproś o telefon</button>
        <p class="pyk-callback-note">Klikając „Poproś o telefon”, prosisz Pyk Łyk o kontakt w sprawie tej wyceny. <a href="/polityka-prywatnosci.html" target="_blank" rel="noopener">Polityka prywatności</a>.</p>
      </form>
      <div id="callbackMessage" role="status" aria-live="polite" hidden></div>
      <button class="pyk-button pyk-button-quiet" type="button" id="callbackDecline">Nie, dziękuję</button>
    </div>`;
  document.body.append(modal);
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.id = "callbackOpen";
  trigger.className = "pyk-button pyk-button-secondary";
  trigger.textContent = "Poproś o telefon";
  trigger.hidden = true;
  document.querySelector(".pyk-summary-actions").append(trigger);
  const input = modal.querySelector("input");
  const form = modal.querySelector("form");
  const submit = modal.querySelector("#callbackSubmit");
  const message = modal.querySelector("#callbackMessage");
  const decline = modal.querySelector("#callbackDecline");
  let context = null, openedContext = null, timer = null, open = false, pending = false;
  let previousFocus = null, dueAt = 0, lastActivity = Date.now(), successful = false;
  let shown = false;
  try { shown = sessionStorage.getItem("pyk-callback-shown") === "yes"; } catch (_) {}
  const seenKey = () => { shown = true; try { sessionStorage.setItem("pyk-callback-shown", "yes"); } catch (_) {} };
  function schedule() {
    clearTimeout(timer);
    if (!context || shown) return;
    timer = setTimeout(tryOpen, Math.max(300, dueAt-Date.now(), lastActivity+4000-Date.now()));
  }
  function tryOpen() {
    if (!context || shown) return;
    if (document.hidden || document.querySelector(".pyk-modal.is-open") ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "")) {
      timer = setTimeout(tryOpen, 1500); return;
    }
    if (Date.now()<dueAt || Date.now()-lastActivity<4000) { schedule(); return; }
    show();
  }
  function show() {
    if (!context || open) return;
    seenKey(); clearTimeout(timer);
    openedContext = context;
    previousFocus = document.activeElement;
    open = true;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("pyk-modal-open");
    // Do not focus the phone: avoid opening the mobile keyboard automatically.
    modal.querySelector("#callbackClose").focus({preventScroll:true});
    void send("callback_shown", openedContext);
  }
  function close(eventName) {
    if (!open || pending) return;
    open = false;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".pyk-modal.is-open")) document.body.classList.remove("pyk-modal-open");
    if (!successful) void send(eventName, openedContext);
    if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
  }
  async function send(event, ctx, phone = "") {
    if (!ctx) return false;
    const q = ctx.quote;
    const payload = {event,leadId:ctx.leadId,callbackToken:ctx.token,email:q.email,phone,
      date:q.date,location:q.location,guests:q.guests,distance:q.distance,bar:q.bar,total:q.total,
      packages:q.selectedPackages.map(p=>p.shortName).join(", "),pageUrl:location.href};
    try {
      const response = await fetch(ctx.endpoint,{method:"POST",body:new URLSearchParams(payload),
        signal:AbortSignal.timeout(20000),keepalive:true});
      return response.ok && (await response.json())?.ok===true;
    } catch (_) { return false; }
  }
  modal.querySelector("#callbackClose").addEventListener("click",()=>close("callback_closed"));
  decline.addEventListener("click",()=>close("callback_declined"));
  trigger.addEventListener("click",show);
  // Backdrop clicks are intentionally ignored; Esc remains available.
  modal.addEventListener("keydown", event => {
    if (event.key === "Escape") { event.preventDefault(); close("callback_closed"); }
    if (event.key !== "Tab") return;
    const controls = [...modal.querySelectorAll("button,input,a")].filter(el=>!el.disabled && el.getClientRects().length);
    const first=controls[0], last=controls[controls.length-1];
    if (event.shiftKey && document.activeElement===first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement===last) { event.preventDefault(); first.focus(); }
  });
  for (const event of ["pointerdown","keydown","input","scroll"]) {
    document.addEventListener(event,()=>{if (!open) { lastActivity=Date.now(); schedule(); }},{passive:true});
  }
  document.addEventListener("visibilitychange",()=>{lastActivity=Date.now();schedule();});
  input.addEventListener("input",()=>input.setCustomValidity(""));
  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if (pending || successful) return;
    const phone=input.value.trim();
    const compact=phone.replace(/[\s().-]/g,"");
    if (!/^[+\d\s().-]+$/.test(phone) || !/^\+?\d{7,15}$/.test(compact)) {
      input.setCustomValidity("Podaj poprawny numer telefonu, np. 500 600 700.");input.reportValidity();return;
    }
    pending=true;submit.disabled=true;decline.disabled=true;
    submit.textContent="Wysyłanie…";
    const saved=await send("callback_requested",openedContext,phone);
    pending=false;submit.disabled=false;decline.disabled=false;
    message.hidden=false;message.classList.toggle("is-error",!saved);
    if (saved) {
      successful=true;form.hidden=true;decline.textContent="Zamknij";
      message.textContent="Dziękujemy! Otrzymaliśmy prośbę o telefon. Oddzwonimy, aby omówić Twoje przyjęcie.";
      trigger.textContent="Prośba o telefon wysłana";decline.focus();
    } else {
      message.textContent="Nie udało się potwierdzić zapisu. Spróbuj ponownie lub zadzwoń: 513 595 540.";
      submit.textContent="Spróbuj ponownie";
    }
  });
  window.PykCallback = {
    activate(value) {
      if (context?.leadId !== value.leadId) {
        successful=false;form.hidden=false;message.hidden=true;input.value="";
        submit.textContent="Poproś o telefon";decline.textContent="Nie, dziękuję";
        trigger.textContent="Poproś o telefon";
      }
      context=value;trigger.hidden=false;dueAt=value.shownAt+10000;schedule();
    },
    suspend() { context=null;trigger.hidden=true;clearTimeout(timer); }
  };
})();
