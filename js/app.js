const app = {
    currentDate: new Date(),
    historyWeekOffset: 0,

    scanner: null,
    scannedProduct: null,

    // Reference values for portion scaling (per 100g)
    _foodRef: null,
    _selectedPreparation: null,

    // Filtered food lists for safe onclick
    _filteredFoods: [],
    _modalFoods: [],

    // Notification timers
    _mealNotificationTimers: [],
    _waterReminderTimer: null,

    init() {
        this.bindNavigation();
        this.bindDateNav();
        this.bindAddFoodForm();
        this.bindGoalsForm();
        this.bindProfileForm();
        this.bindFoodSearch();
        this.bindCategoryFilter();
        this.bindHistoryNav();
        this.bindMenuToggle();
        this.bindActivityForms();
        this.bindPortionScaling();
        this.renderFoodDatabase();
        this.updateAll();
        this.loadProfileIfExists();
        this.initNotifications();
        this.initDarkMode();
        this.renderFrequentFoods();
    },

    // --- Navigation ---
    bindNavigation() {
        document.querySelectorAll('.nav-link[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showView(link.dataset.view);
            });
        });

        document.querySelectorAll('.nav-group-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const group = toggle.closest('.nav-group');
                document.querySelectorAll('.nav-group').forEach(g => {
                    if (g !== group) g.classList.remove('open');
                });
                group.classList.toggle('open');
            });
        });
    },

    showView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        const view = document.getElementById('view-' + viewName);
        const link = document.querySelector(`.nav-link[data-view="${viewName}"]`);
        if (view) view.classList.add('active');
        if (link) {
            link.classList.add('active');
            const parentGroup = link.closest('.nav-group');
            if (parentGroup) parentGroup.classList.add('open');
        }

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('active');

        if (viewName !== 'scanner') this.stopScanner();
        if (viewName === 'history') this.renderHistory();
        if (viewName === 'stats') this.renderStats();
        if (viewName === 'goals') this.loadGoalsForm();
        if (viewName === 'profile') this.loadProfileForm();
        if (viewName === 'activity') this.renderActivity();
        if (viewName === 'diet') this.renderDietSchedule();
        if (viewName === 'recipes') this.renderRecipes();
        if (viewName === 'add-food') this.renderFrequentFoods();
        if (viewName === 'pantry') this.renderPantry();
    },

    bindMenuToggle() {
        document.getElementById('menuToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        document.getElementById('sidebarOverlay').addEventListener('click', () => {
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('active');
        });
    },

    // --- Date Navigation ---
    getDateStr(date) {
        const d = date || this.currentDate;
        return d.toISOString().split('T')[0];
    },

    formatDate(date) {
        const d = date || this.currentDate;
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return d.toLocaleDateString('es-ES', options);
    },

    formatDateShort(dateStr) {
        const d = new Date(dateStr + 'T12:00:00');
        return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    },

    bindDateNav() {
        document.getElementById('prevDay').addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() - 1);
            this.updateAll();
        });
        document.getElementById('nextDay').addEventListener('click', () => {
            this.currentDate.setDate(this.currentDate.getDate() + 1);
            this.updateAll();
        });
    },

    updateDateDisplay() {
        const today = new Date();
        const isToday = this.getDateStr() === this.getDateStr(today);
        const display = isToday ? 'Hoy - ' + this.formatDate() : this.formatDate();
        document.getElementById('currentDate').textContent = display;
    },

    // --- Update All ---
    updateAll() {
        this.updateDateDisplay();
        this.updateDashboard();
    },

    updateDashboard() {
        const dateStr = this.getDateStr();
        const entries = Storage.getEntries(dateStr);
        const goals = Storage.getGoals();
        const water = Storage.getWater(dateStr);

        let totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        entries.forEach(e => {
            totals.calories += e.calories || 0;
            totals.protein += e.protein || 0;
            totals.carbs += e.carbs || 0;
            totals.fat += e.fat || 0;
        });

        document.getElementById('totalCalories').textContent = this.fmtNum(totals.calories);
        document.getElementById('totalProtein').textContent = this.fmtNum(totals.protein);
        document.getElementById('totalCarbs').textContent = this.fmtNum(totals.carbs);
        document.getElementById('totalFat').textContent = this.fmtNum(totals.fat);

        document.getElementById('goalCalories').textContent = goals.calories;
        document.getElementById('goalProtein').textContent = goals.protein;
        document.getElementById('goalCarbs').textContent = goals.carbs;
        document.getElementById('goalFat').textContent = goals.fat;

        const pctProtein = Math.min((totals.protein / goals.protein) * 100, 100);
        const pctCarbs = Math.min((totals.carbs / goals.carbs) * 100, 100);
        const pctFat = Math.min((totals.fat / goals.fat) * 100, 100);

        document.getElementById('proteinBar').style.width = pctProtein + '%';
        document.getElementById('carbsBar').style.width = pctCarbs + '%';
        document.getElementById('fatBar').style.width = pctFat + '%';

        this.renderMealsList(entries);
        this.renderMacroChart(totals);
        this.renderWater(water, goals.water);
        this.renderStreak();
        this.renderWeeklyComparison();
        this.renderDeficitPanel(totals);
    },

    // --- Deficit Panel ---
    renderDeficitPanel(totals) {
        const container = document.getElementById('deficitContent');
        if (!container) return;

        const profile = Storage.getProfile();
        if (!profile || !profile.age || !profile.weight || !profile.height) {
            container.innerHTML = `
                <div class="deficit-no-profile">
                    <p>Completa tu perfil para ver el balance calorico del dia y proyecciones de peso.</p>
                    <button class="btn btn-primary" onclick="app.showView('profile')">Ir a Mi Perfil</button>
                </div>`;
            return;
        }

        const tdee = Math.round(this.calculateTDEE(profile));
        const targetCal = Math.round(this.calculateTargetCalories(profile));
        const consumed = Math.round(totals.calories);
        const activity = Storage.getActivity(this.getDateStr());
        const burned = activity.caloriesBurned || 0;
        const netConsumed = consumed - burned;
        const balance = netConsumed - tdee;
        const deficitFromTarget = consumed - targetCal;

        const isDeficit = balance < 0;
        const isSurplus = balance > 0;
        const balanceAbs = Math.abs(Math.round(balance));

        const pctOfTdee = Math.min(Math.round((netConsumed / tdee) * 100), 200);
        const barPct = Math.min(pctOfTdee, 150);
        const markerPct = Math.min(100, (tdee / (tdee * 1.5)) * 100);

        let barClass = 'at-goal';
        if (pctOfTdee < 95) barClass = 'under';
        else if (pctOfTdee > 105) barClass = 'over';

        let statusText = '';
        let statusIcon = '';
        if (isDeficit) {
            statusText = `Deficit de ${balanceAbs} kcal`;
            statusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" style="width:18px;height:18px"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>';
        } else if (isSurplus) {
            statusText = `Superavit de ${balanceAbs} kcal`;
            statusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2" style="width:18px;height:18px"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>';
        } else {
            statusText = 'En equilibrio';
            statusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" style="width:18px;height:18px"><line x1="5" y1="12" x2="19" y2="12"/></svg>';
        }

        // 1 kg grasa = 7700 kcal (OMS/WHO, Hall et al. 2011)
        const KG_FAT_KCAL = 7700;
        const dailyDeficit = isDeficit ? balanceAbs : 0;
        const dailySurplus = isSurplus ? balanceAbs : 0;

        let projectionHtml = '';
        if (dailyDeficit > 0) {
            const daysPerKg = Math.round(KG_FAT_KCAL / dailyDeficit);
            const weeklyLoss = Math.round((dailyDeficit * 7 / KG_FAT_KCAL) * 100) / 100;
            const monthlyLoss = Math.round((dailyDeficit * 30 / KG_FAT_KCAL) * 100) / 100;
            projectionHtml = `
                <div class="deficit-projection">
                    <div class="deficit-projection-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Si mantienes este deficit diario
                    </div>
                    <div class="deficit-projection-grid">
                        <div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Perdida semanal</span>
                                <span class="deficit-proj-value" style="color:#22c55e">~${weeklyLoss} kg</span>
                            </div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Perdida mensual</span>
                                <span class="deficit-proj-value" style="color:#22c55e">~${monthlyLoss} kg</span>
                            </div>
                        </div>
                        <div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Dias para 1 kg</span>
                                <span class="deficit-proj-value">${daysPerKg} dias</span>
                            </div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Deficit diario</span>
                                <span class="deficit-proj-value" style="color:#22c55e">-${dailyDeficit} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        } else if (dailySurplus > 0) {
            const weeklyGain = Math.round((dailySurplus * 7 / KG_FAT_KCAL) * 100) / 100;
            const monthlyGain = Math.round((dailySurplus * 30 / KG_FAT_KCAL) * 100) / 100;
            projectionHtml = `
                <div class="deficit-projection">
                    <div class="deficit-projection-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Si mantienes este superavit diario
                    </div>
                    <div class="deficit-projection-grid">
                        <div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Ganancia semanal</span>
                                <span class="deficit-proj-value" style="color:var(--danger)">+${weeklyGain} kg</span>
                            </div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Ganancia mensual</span>
                                <span class="deficit-proj-value" style="color:var(--danger)">+${monthlyGain} kg</span>
                            </div>
                        </div>
                        <div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Dias para +1 kg</span>
                                <span class="deficit-proj-value">${Math.round(KG_FAT_KCAL / dailySurplus)} dias</span>
                            </div>
                            <div class="deficit-proj-item">
                                <span class="deficit-proj-label">Superavit diario</span>
                                <span class="deficit-proj-value" style="color:var(--danger)">+${dailySurplus} kcal</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        const goalLabel = profile.goal === 'lose' ? 'Objetivo deficit' : profile.goal === 'gain' || profile.goal === 'bulk' ? 'Objetivo superavit' : 'Mantenimiento';

        container.innerHTML = `
            <div class="deficit-summary">
                <div class="deficit-box consumed">
                    <div class="deficit-box-value">${consumed}</div>
                    <div class="deficit-box-label">Consumidas${burned > 0 ? ` (${burned} quemadas)` : ''}</div>
                </div>
                <div class="deficit-box tdee">
                    <div class="deficit-box-value">${tdee}</div>
                    <div class="deficit-box-label">TDEE (gasto total)</div>
                </div>
                <div class="deficit-box result ${isDeficit ? 'deficit-positive' : isSurplus ? 'deficit-negative' : ''}">
                    <div class="deficit-box-value">${statusIcon} ${isDeficit ? '-' : isSurplus ? '+' : ''}${balanceAbs}</div>
                    <div class="deficit-box-label">${statusText}</div>
                </div>
            </div>

            <div class="deficit-bar-container">
                <div class="deficit-bar">
                    <div class="deficit-bar-fill ${barClass}" style="width:${Math.min(barPct, 100)}%"></div>
                    <div class="deficit-bar-marker" style="left:${markerPct}%"></div>
                </div>
                <div class="deficit-bar-labels">
                    <span>0 kcal</span>
                    <span>Meta: ${targetCal} (${goalLabel})</span>
                    <span>TDEE: ${tdee}</span>
                </div>
            </div>

            ${projectionHtml}

            <div class="deficit-reference">
                <div class="deficit-reference-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
                    Referencia cientifica
                </div>
                <ul>
                    <li><span class="highlight">1 kg de grasa corporal = ~7.700 kcal</span> (Hall et al., American Journal of Clinical Nutrition, 2011; OMS)</li>
                    <li>Un deficit de <span class="highlight">500 kcal/dia</span> produce una perdida de ~0.45 kg por semana (~2 kg/mes)</li>
                    <li>Un deficit de <span class="highlight">250 kcal/dia</span> es mas moderado: ~1 kg/mes, mas sostenible y preserva masa muscular</li>
                    <li>Deficit superiores a <span class="highlight">1.000 kcal/dia</span> pueden causar perdida muscular, fatiga y efecto rebote (ACSM, WHO)</li>
                    <li>Ritmo seguro recomendado: <span class="highlight">0.5 a 1 kg por semana</span> (deficit 500-1000 kcal/dia) segun ACSM y Dietary Guidelines for Americans</li>
                </ul>
            </div>
        `;
    },

    // --- Meals List ---
    renderMealsList(entries) {
        const container = document.getElementById('mealsList');
        if (entries.length === 0) {
            container.innerHTML = '<p class="empty-state">No hay alimentos registrados hoy. Agrega tu primera comida.</p>';
            return;
        }

        const grouped = {};
        const mealOrder = ['desayuno', 'almuerzo', 'cena', 'snack'];
        const mealNames = { desayuno: 'Desayuno', almuerzo: 'Almuerzo', cena: 'Cena', snack: 'Snack' };

        entries.forEach(e => {
            const type = e.mealType || 'snack';
            if (!grouped[type]) grouped[type] = [];
            grouped[type].push(e);
        });

        let html = '';
        mealOrder.forEach(type => {
            if (!grouped[type]) return;
            html += `<div class="meal-group-title">${mealNames[type]}</div>`;
            grouped[type].forEach(entry => {
                const hasExtras = (entry.fiber > 0) || (entry.sugar > 0) || (entry.sodium > 0);
                html += `
                    <div class="meal-item">
                        <div class="meal-item-info">
                            <div class="meal-item-name">${this.escapeHtml(entry.name)}</div>
                            <div class="meal-item-macros">
                                <span><span class="macro-dot p"></span> ${this.fmtNum(entry.protein || 0)}g</span>
                                <span><span class="macro-dot c"></span> ${this.fmtNum(entry.carbs || 0)}g</span>
                                <span><span class="macro-dot f"></span> ${this.fmtNum(entry.fat || 0)}g</span>
                                <span>${this.fmtNum(entry.portion || 0)}g</span>
                            </div>
                            ${hasExtras ? `<div class="nutrient-extras">
                                ${entry.fiber ? `<span>Fibra: ${this.fmtNum(entry.fiber)}g</span>` : ''}
                                ${entry.sugar ? `<span>Azucar: ${this.fmtNum(entry.sugar)}g</span>` : ''}
                                ${entry.sodium ? `<span>Sodio: ${Math.round(entry.sodium)}mg</span>` : ''}
                            </div>` : ''}
                        </div>
                        <div class="meal-item-cal">${this.fmtNum(entry.calories)} kcal</div>
                        <div class="meal-item-actions">
                            <button onclick="app.deleteEntry('${entry.id}')" title="Eliminar">&#x2715;</button>
                        </div>
                    </div>`;
            });
        });

        container.innerHTML = html;
    },

    deleteEntry(entryId) {
        Storage.removeEntry(this.getDateStr(), entryId);
        this.updateAll();
        this.showToast('Alimento eliminado');
    },

    // --- Macro Chart ---
    renderMacroChart(totals) {
        const canvas = document.getElementById('macroChart');
        const ctx = canvas.getContext('2d');
        const size = Math.min(canvas.width, canvas.height);
        const cx = size / 2;
        const cy = size / 2;
        const radius = size / 2 - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const proteinCal = (totals.protein || 0) * 4;
        const carbsCal = (totals.carbs || 0) * 4;
        const fatCal = (totals.fat || 0) * 9;
        const total = proteinCal + carbsCal + fatCal;

        const legend = document.getElementById('macroLegend');

        if (total === 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = document.body.classList.contains('dark-mode') ? '#333' : '#ffcc80';
            ctx.lineWidth = 20;
            ctx.stroke();
            legend.innerHTML = '<span class="empty-state" style="padding:.5rem">Sin datos</span>';
            return;
        }

        const data = [
            { value: proteinCal, color: '#c62828', label: 'Proteinas', grams: totals.protein },
            { value: carbsCal, color: '#f57f17', label: 'Carbohidratos', grams: totals.carbs },
            { value: fatCal, color: '#4e342e', label: 'Grasas', grams: totals.fat },
        ];

        let startAngle = -Math.PI / 2;
        data.forEach(d => {
            const sliceAngle = (d.value / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
            ctx.strokeStyle = d.color;
            ctx.lineWidth = 20;
            ctx.lineCap = 'round';
            ctx.stroke();
            startAngle += sliceAngle;
        });

        const isDark = document.body.classList.contains('dark-mode');
        ctx.fillStyle = isDark ? '#e0e0e0' : '#1a1a1a';
        ctx.font = 'bold 20px Segoe UI';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(total), cx, cy - 8);
        ctx.font = '11px Segoe UI';
        ctx.fillStyle = isDark ? '#a1887f' : '#8d6e63';
        ctx.fillText('kcal macros', cx, cy + 12);

        legend.innerHTML = data.map(d => {
            const pct = Math.round((d.value / total) * 100);
            return `<div class="legend-item">
                <span class="legend-dot" style="background:${d.color}"></span>
                ${d.label}: ${Math.round(d.grams)}g (${pct}%)
            </div>`;
        }).join('');
    },

    // --- Water ---
    renderWater(count, goal) {
        document.getElementById('waterCount').textContent = count;
        document.querySelector('.water-unit').textContent = `/ ${goal} vasos`;

        const container = document.getElementById('waterGlasses');
        let html = '';
        for (let i = 0; i < goal; i++) {
            html += `<div class="water-glass ${i < count ? 'filled' : ''}" onclick="app.setWater(${i + 1})"></div>`;
        }
        container.innerHTML = html;
    },

    addWater() {
        const dateStr = this.getDateStr();
        const goals = Storage.getGoals();
        let count = Storage.getWater(dateStr);
        if (count < goals.water) {
            count++;
            Storage.setWater(dateStr, count);
            this.renderWater(count, goals.water);
        }
    },

    removeWater() {
        const dateStr = this.getDateStr();
        let count = Storage.getWater(dateStr);
        if (count > 0) {
            count--;
            Storage.setWater(dateStr, count);
            this.renderWater(count, Storage.getGoals().water);
        }
    },

    setWater(n) {
        const dateStr = this.getDateStr();
        Storage.setWater(dateStr, n);
        this.renderWater(n, Storage.getGoals().water);
    },

    // --- Add Food ---
    bindAddFoodForm() {
        document.getElementById('addFoodForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const qty = parseFloat(document.getElementById('foodQuantity').value) || 1;
            const calories = parseFloat(document.getElementById('foodCalories').value) || 0;
            const protein = parseFloat(document.getElementById('foodProtein').value) || 0;
            const carbs = parseFloat(document.getElementById('foodCarbs').value) || 0;
            const fat = parseFloat(document.getElementById('foodFat').value) || 0;
            const grams = parseFloat(document.getElementById('foodPortion').value) || 0;
            const fiber = parseFloat(document.getElementById('foodFiber')?.value) || 0;
            const sugar = parseFloat(document.getElementById('foodSugar')?.value) || 0;
            const sodium = parseFloat(document.getElementById('foodSodium')?.value) || 0;
            const name = document.getElementById('foodName').value.trim();
            const prepSelect = document.getElementById('foodPreparation');
            const preparation = (prepSelect && prepSelect.value) || '';

            if (!name) return;

            const displayName = preparation
                ? (qty !== 1 ? `${name} (${preparation}) x${qty}` : `${name} (${preparation})`)
                : (qty !== 1 ? `${name} x${qty}` : name);

            const entry = {
                name: displayName,
                calories: Math.round(calories * 10) / 10,
                protein: Math.round(protein * 100) / 100,
                carbs: Math.round(carbs * 100) / 100,
                fat: Math.round(fat * 100) / 100,
                fiber: Math.round(fiber * 100) / 100,
                sugar: Math.round(sugar * 100) / 100,
                sodium: Math.round(sodium * 10) / 10,
                portion: Math.round(grams * 10) / 10,
                mealType: document.getElementById('mealType').value,
                quantity: qty,
                preparation: preparation,
            };

            Storage.addEntry(this.getDateStr(), entry);
            Storage.trackFoodUsage(name);
            e.target.reset();
            document.getElementById('foodQuantity').value = 1;
            this._foodRef = null;
            this._selectedPreparation = null;
            this._lastEditedField = null;
            const prepGroup = document.getElementById('preparationGroup');
            if (prepGroup) prepGroup.style.display = 'none';
            const info = document.getElementById('portionScalingInfo');
            if (info) info.style.display = 'none';
            this._hideUnitWeightInfo();
            this._highlightActiveMode();
            this.showView('dashboard');
            this.updateAll();
            this.showToast(qty !== 1 ? `${qty}x ${name} agregado` : 'Alimento agregado');
        });
    },

    fillFoodForm(food) {
        const unitW = food.unitWeight || food.portion;
        document.getElementById('foodName').value = food.name;
        document.getElementById('foodPortion').value = unitW;
        document.getElementById('foodQuantity').value = 1;

        const fiberInput = document.getElementById('foodFiber');
        const sugarInput = document.getElementById('foodSugar');
        const sodiumInput = document.getElementById('foodSodium');
        if (fiberInput) fiberInput.value = food.fiber || '';
        if (sugarInput) sugarInput.value = food.sugar || '';
        if (sodiumInput) sodiumInput.value = food.sodium || '';

        this._foodRef = {
            basePortion: food.portion,
            unitWeight: unitW,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            fiber: food.fiber || 0,
            sugar: food.sugar || 0,
            sodium: food.sodium || 0,
            preparations: food.preparations || null,
        };
        this._selectedPreparation = null;
        this._lastEditedField = null;

        this._showUnitWeightInfo(unitW);

        // Set initial macros scaled to 1 unit
        this._recalcMacros();

        const prepGroup = document.getElementById('preparationGroup');
        const prepSelect = document.getElementById('foodPreparation');
        if (prepGroup && prepSelect) {
            if (food.preparations && food.preparations.length > 0) {
                prepGroup.style.display = 'block';
                prepSelect.innerHTML = food.preparations.map((p, i) =>
                    `<option value="${this.escapeHtml(p.name)}" ${i === 0 ? 'selected' : ''}>${this.escapeHtml(p.name)}</option>`
                ).join('');
                prepSelect.onchange = () => this.onPreparationChange(prepSelect);
                const firstPrep = food.preparations[0];
                this._foodRef.calories = firstPrep.calories;
                this._foodRef.protein = firstPrep.protein;
                this._foodRef.carbs = firstPrep.carbs;
                this._foodRef.fat = firstPrep.fat;
                this._recalcMacros();
            } else {
                prepGroup.style.display = 'none';
                prepSelect.innerHTML = '';
            }
        }

        const info = document.getElementById('portionScalingInfo');
        if (info) info.style.display = 'none';
        this._highlightActiveMode();

        document.querySelector('.form-panel').scrollIntoView({ behavior: 'smooth' });
    },

    // --- Food Database ---
    renderFoodDatabase(filter = 'all', search = '') {
        const container = document.getElementById('foodDatabase');
        let foods = FOOD_DATABASE;

        if (filter !== 'all') {
            foods = foods.filter(f => f.category === filter);
        }

        if (search) {
            const s = search.toLowerCase();
            foods = foods.filter(f => f.name.toLowerCase().includes(s));
        }

        if (foods.length === 0) {
            container.innerHTML = '<p class="empty-state">No se encontraron alimentos</p>';
            return;
        }

        this._filteredFoods = foods;
        container.innerHTML = foods.map((food, idx) => `
            <div class="food-db-item" onclick="app.selectFood(${idx})">
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">P: ${food.protein}g | C: ${food.carbs}g | G: ${food.fat}g | ${food.portion}g</div>
                    ${food.preparations ? `<div class="food-db-preparations">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c-1.5 3-5 5-5 9a5 5 0 0010 0c0-4-3.5-6-5-9z"/></svg>
                        ${food.preparations.length} preparaciones
                    </div>` : ''}
                </div>
                <div class="food-db-cal">${food.calories} kcal</div>
            </div>
        `).join('');
    },

    selectFood(idx) {
        if (this._filteredFoods && this._filteredFoods[idx]) {
            this.fillFoodForm(this._filteredFoods[idx]);
        }
    },

    bindFoodSearch() {
        document.getElementById('foodSearch').addEventListener('input', (e) => {
            const activeCategory = document.querySelector('.cat-btn.active')?.dataset.category || 'all';
            this.renderFoodDatabase(activeCategory, e.target.value);
        });
    },

    bindCategoryFilter() {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const search = document.getElementById('foodSearch').value;
                this.renderFoodDatabase(btn.dataset.category, search);
            });
        });
    },

    // --- Portion Scaling (Gramos <-> Unidades) ---
    _lastEditedField: null,

    bindPortionScaling() {
        const gramsInput = document.getElementById('foodPortion');
        const unitsInput = document.getElementById('foodQuantity');

        const snapshotIfNeeded = () => {
            if (!this._foodRef) this._snapshotManualRef();
        };
        gramsInput.addEventListener('focus', snapshotIfNeeded);
        unitsInput.addEventListener('focus', snapshotIfNeeded);

        gramsInput.addEventListener('input', () => {
            this._lastEditedField = 'grams';
            if (this._foodRef) {
                this._syncFromGrams();
                this._recalcMacros();
            }
            this._highlightActiveMode();
        });
        unitsInput.addEventListener('input', () => {
            this._lastEditedField = 'units';
            if (this._foodRef) {
                this._syncFromUnits();
                this._recalcMacros();
            }
            this._highlightActiveMode();
        });
    },

    _snapshotManualRef() {
        const grams = parseFloat(document.getElementById('foodPortion').value) || 100;
        const qty = parseFloat(document.getElementById('foodQuantity').value) || 1;
        const uw = qty !== 0 ? grams / qty : grams;
        this._foodRef = {
            basePortion: grams,
            unitWeight: uw,
            calories: parseFloat(document.getElementById('foodCalories').value) || 0,
            protein: parseFloat(document.getElementById('foodProtein').value) || 0,
            carbs: parseFloat(document.getElementById('foodCarbs').value) || 0,
            fat: parseFloat(document.getElementById('foodFat').value) || 0,
            fiber: parseFloat(document.getElementById('foodFiber')?.value) || 0,
            sugar: parseFloat(document.getElementById('foodSugar')?.value) || 0,
            sodium: parseFloat(document.getElementById('foodSodium')?.value) || 0,
        };
        this._showUnitWeightInfo(Math.round(uw * 10) / 10);
    },

    _syncFromGrams() {
        if (!this._foodRef) return;
        const grams = parseFloat(document.getElementById('foodPortion').value) || 0;
        const uw = this._foodRef.unitWeight || this._foodRef.basePortion;
        const units = Math.round((grams / uw) * 100) / 100;
        document.getElementById('foodQuantity').value = units;
    },

    _syncFromUnits() {
        if (!this._foodRef) return;
        const units = parseFloat(document.getElementById('foodQuantity').value) || 0;
        const uw = this._foodRef.unitWeight || this._foodRef.basePortion;
        const grams = Math.round(units * uw * 10) / 10;
        document.getElementById('foodPortion').value = grams;
    },

    _recalcMacros() {
        if (!this._foodRef) return;
        const grams = parseFloat(document.getElementById('foodPortion').value) || 0;
        const ref = this._foodRef;
        const ratio = grams / ref.basePortion;

        document.getElementById('foodCalories').value = Math.round(ref.calories * ratio * 10) / 10;
        document.getElementById('foodProtein').value = Math.round(ref.protein * ratio * 100) / 100;
        document.getElementById('foodCarbs').value = Math.round(ref.carbs * ratio * 100) / 100;
        document.getElementById('foodFat').value = Math.round(ref.fat * ratio * 100) / 100;

        const fiberInput = document.getElementById('foodFiber');
        const sugarInput = document.getElementById('foodSugar');
        const sodiumInput = document.getElementById('foodSodium');
        if (fiberInput && ref.fiber !== undefined) fiberInput.value = Math.round(ref.fiber * ratio * 100) / 100;
        if (sugarInput && ref.sugar !== undefined) sugarInput.value = Math.round(ref.sugar * ratio * 100) / 100;
        if (sodiumInput && ref.sodium !== undefined) sodiumInput.value = Math.round(ref.sodium * ratio * 10) / 10;

        const info = document.getElementById('portionScalingInfo');
        if (info) {
            const units = parseFloat(document.getElementById('foodQuantity').value) || 0;
            const uw = ref.unitWeight || ref.basePortion;
            if (units !== 1 || grams !== uw) {
                info.textContent = `${units} unid. x ${uw}g = ${grams}g`;
                info.style.display = 'block';
            } else {
                info.style.display = 'none';
            }
        }
    },

    _highlightActiveMode() {
        const gramsGroup = document.querySelector('.portion-grams-group');
        const unitsGroup = document.querySelector('.portion-units-group');
        if (!gramsGroup || !unitsGroup) return;
        gramsGroup.classList.toggle('active-mode', this._lastEditedField === 'grams');
        unitsGroup.classList.toggle('active-mode', this._lastEditedField === 'units');
    },

    _showUnitWeightInfo(unitWeight) {
        const el = document.getElementById('unitWeightInfo');
        const val = document.getElementById('unitWeightValue');
        if (el && val) {
            val.textContent = unitWeight;
            el.style.display = 'flex';
        }
    },

    _hideUnitWeightInfo() {
        const el = document.getElementById('unitWeightInfo');
        if (el) el.style.display = 'none';
    },

    onPreparationChange(selectEl) {
        if (!this._foodRef || !this._foodRef.preparations) return;
        const prep = this._foodRef.preparations.find(p => p.name === selectEl.value);
        if (prep) {
            this._foodRef.calories = prep.calories;
            this._foodRef.protein = prep.protein;
            this._foodRef.carbs = prep.carbs;
            this._foodRef.fat = prep.fat;
            this._selectedPreparation = prep.name;
            this._recalcMacros();
        }
    },

    // --- Goals ---
    bindGoalsForm() {
        document.getElementById('goalsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const goals = {
                calories: parseInt(document.getElementById('goalCaloriesInput').value) || 2000,
                protein: parseInt(document.getElementById('goalProteinInput').value) || 150,
                carbs: parseInt(document.getElementById('goalCarbsInput').value) || 250,
                fat: parseInt(document.getElementById('goalFatInput').value) || 65,
                water: parseInt(document.getElementById('goalWaterInput').value) || 8,
            };
            Storage.setGoals(goals);
            this.updateAll();
            this.showToast('Metas actualizadas');
        });
    },

    loadGoalsForm() {
        const goals = Storage.getGoals();
        document.getElementById('goalCaloriesInput').value = goals.calories;
        document.getElementById('goalProteinInput').value = goals.protein;
        document.getElementById('goalCarbsInput').value = goals.carbs;
        document.getElementById('goalFatInput').value = goals.fat;
        document.getElementById('goalWaterInput').value = goals.water;
    },

    applyPreset(name) {
        const preset = PRESETS[name];
        if (!preset) return;
        document.getElementById('goalCaloriesInput').value = preset.calories;
        document.getElementById('goalProteinInput').value = preset.protein;
        document.getElementById('goalCarbsInput').value = preset.carbs;
        document.getElementById('goalFatInput').value = preset.fat;
        document.getElementById('goalWaterInput').value = preset.water;
        this.showToast('Preset aplicado - guarda para confirmar');
    },

    // --- History ---
    bindHistoryNav() {
        document.getElementById('historyPrev').addEventListener('click', () => {
            this.historyWeekOffset--;
            this.renderHistory();
        });
        document.getElementById('historyNext').addEventListener('click', () => {
            this.historyWeekOffset++;
            this.renderHistory();
        });
    },

    renderHistory() {
        const container = document.getElementById('historyList');
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (this.historyWeekOffset * 7));

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            days.push(d);
        }

        const endOfWeek = new Date(days[6]);
        document.getElementById('historyRange').textContent =
            `${days[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;

        let html = '';
        days.forEach(day => {
            const dateStr = day.toISOString().split('T')[0];
            const entries = Storage.getEntries(dateStr);
            const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
            entries.forEach(e => {
                totals.calories += e.calories || 0;
                totals.protein += e.protein || 0;
                totals.carbs += e.carbs || 0;
                totals.fat += e.fat || 0;
            });
            const water = Storage.getWater(dateStr);
            const hasData = entries.length > 0;
            const dayName = this.formatDateShort(dateStr);

            html += `
                <div class="history-day">
                    <div class="history-day-header" onclick="this.nextElementSibling.classList.toggle('open')">
                        <span class="history-day-date">${dayName}</span>
                        <div class="history-day-summary">
                            ${hasData ? `
                                <span class="cal">${Math.round(totals.calories)} kcal</span>
                                <span>P: ${Math.round(totals.protein)}g</span>
                                <span>C: ${Math.round(totals.carbs)}g</span>
                                <span>G: ${Math.round(totals.fat)}g</span>
                                <span>Agua: ${water}</span>
                            ` : '<span style="color:var(--text-muted)">Sin registros</span>'}
                        </div>
                    </div>
                    <div class="history-day-details">
                        ${hasData ? entries.map(e => `
                            <div class="meal-item" style="margin-bottom:.4rem">
                                <div class="meal-item-info">
                                    <div class="meal-item-name">${this.escapeHtml(e.name)}</div>
                                    <div class="meal-item-macros">
                                        <span><span class="macro-dot p"></span> ${Math.round(e.protein || 0)}g</span>
                                        <span><span class="macro-dot c"></span> ${Math.round(e.carbs || 0)}g</span>
                                        <span><span class="macro-dot f"></span> ${Math.round(e.fat || 0)}g</span>
                                    </div>
                                </div>
                                <div class="meal-item-cal">${Math.round(e.calories)} kcal</div>
                            </div>
                        `).join('') : '<p class="empty-state">Sin datos para este dia</p>'}
                    </div>
                </div>`;
        });

        container.innerHTML = html;
    },

    // --- Stats ---
    renderStats() {
        this.renderWeeklyCaloriesChart();
        this.renderWeeklyMacroStats();
        this.renderGeneralStats();
    },

    renderWeeklyCaloriesChart() {
        const canvas = document.getElementById('weeklyCaloriesChart');
        const ctx = canvas.getContext('2d');
        const goals = Storage.getGoals();

        canvas.width = canvas.parentElement.clientWidth - 48;
        canvas.height = 280;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const today = new Date();
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }

        const data = days.map(d => {
            const dateStr = d.toISOString().split('T')[0];
            const entries = Storage.getEntries(dateStr);
            let cal = 0;
            entries.forEach(e => cal += e.calories || 0);
            return { date: d, calories: cal };
        });

        const maxCal = Math.max(goals.calories, ...data.map(d => d.calories), 100);
        const padding = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartW = canvas.width - padding.left - padding.right;
        const chartH = canvas.height - padding.top - padding.bottom;
        const barWidth = chartW / 7 * 0.6;
        const gap = chartW / 7;

        const isDarkChart = document.body.classList.contains('dark-mode');

        // Grid lines
        ctx.strokeStyle = isDarkChart ? '#333' : '#ffcc80';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(canvas.width - padding.right, y);
            ctx.stroke();

            ctx.fillStyle = isDarkChart ? '#b0b0b0' : '#5d4037';
            ctx.font = '11px Segoe UI';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(maxCal - (maxCal / 4) * i), padding.left - 8, y + 4);
        }

        // Goal line
        const goalY = padding.top + chartH - (goals.calories / maxCal) * chartH;
        ctx.strokeStyle = '#e6510044';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(padding.left, goalY);
        ctx.lineTo(canvas.width - padding.right, goalY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#e6510088';
        ctx.font = '10px Segoe UI';
        ctx.textAlign = 'left';
        ctx.fillText('Meta', canvas.width - padding.right - 30, goalY - 5);

        // Bars
        data.forEach((d, i) => {
            const x = padding.left + gap * i + (gap - barWidth) / 2;
            const barH = (d.calories / maxCal) * chartH;
            const y = padding.top + chartH - barH;

            const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartH);
            if (d.calories > goals.calories) {
                gradient.addColorStop(0, '#c62828');
                gradient.addColorStop(1, '#c6282844');
            } else {
                gradient.addColorStop(0, '#e65100');
                gradient.addColorStop(1, '#e6510044');
            }
            ctx.fillStyle = gradient;

            const r = 4;
            if (barH > r) {
                ctx.beginPath();
                ctx.moveTo(x, y + r);
                ctx.arcTo(x, y, x + r, y, r);
                ctx.arcTo(x + barWidth, y, x + barWidth, y + r, r);
                ctx.lineTo(x + barWidth, padding.top + chartH);
                ctx.lineTo(x, padding.top + chartH);
                ctx.closePath();
                ctx.fill();
            }

            // Value on top
            if (d.calories > 0) {
                ctx.fillStyle = isDarkChart ? '#e0e0e0' : '#1a1a1a';
                ctx.font = 'bold 11px Segoe UI';
                ctx.textAlign = 'center';
                ctx.fillText(Math.round(d.calories), x + barWidth / 2, y - 6);
            }

            // Day label
            ctx.fillStyle = isDarkChart ? '#757575' : '#8d6e63';
            ctx.font = '11px Segoe UI';
            ctx.textAlign = 'center';
            const dayLabel = d.date.toLocaleDateString('es-ES', { weekday: 'short' });
            ctx.fillText(dayLabel, x + barWidth / 2, canvas.height - 10);
        });
    },

    renderWeeklyMacroStats() {
        const container = document.getElementById('weeklyMacroStats');
        const today = new Date();
        let totalP = 0, totalC = 0, totalF = 0, totalCal = 0, daysWithData = 0;

        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const entries = Storage.getEntries(d.toISOString().split('T')[0]);
            if (entries.length > 0) daysWithData++;
            entries.forEach(e => {
                totalP += e.protein || 0;
                totalC += e.carbs || 0;
                totalF += e.fat || 0;
                totalCal += e.calories || 0;
            });
        }

        const avg = daysWithData || 1;
        container.innerHTML = `
            <div class="stat-row">
                <span class="stat-label">Calorias promedio</span>
                <span class="stat-value" style="color:var(--calories-color)">${Math.round(totalCal / avg)} kcal</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Proteina promedio</span>
                <span class="stat-value" style="color:var(--protein-color)">${Math.round(totalP / avg)} g</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Carbohidratos promedio</span>
                <span class="stat-value" style="color:var(--carbs-color)">${Math.round(totalC / avg)} g</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Grasas promedio</span>
                <span class="stat-value" style="color:var(--fat-color)">${Math.round(totalF / avg)} g</span>
            </div>
            <div class="stat-row">
                <span class="stat-label">Dias registrados (semana)</span>
                <span class="stat-value">${daysWithData} / 7</span>
            </div>
        `;
    },

    renderGeneralStats() {
        const container = document.getElementById('generalStats');
        const allDates = Storage.getAllDates();
        const totalDays = allDates.length;

        let totalCal = 0, totalEntries = 0;
        allDates.forEach(dateStr => {
            const entries = Storage.getEntries(dateStr);
            totalEntries += entries.length;
            entries.forEach(e => totalCal += e.calories || 0);
        });

        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            if (Storage.getEntries(dateStr).length > 0) {
                streak++;
            } else {
                break;
            }
        }

        container.innerHTML = `
            <div class="stat-big">
                <div class="stat-big-value">${totalDays}</div>
                <div class="stat-big-label">Dias registrados</div>
            </div>
            <div class="stat-big">
                <div class="stat-big-value">${streak}</div>
                <div class="stat-big-label">Racha actual (dias)</div>
            </div>
            <div class="stat-big">
                <div class="stat-big-value">${totalEntries}</div>
                <div class="stat-big-label">Alimentos totales</div>
            </div>
            <div class="stat-big">
                <div class="stat-big-value">${totalDays > 0 ? Math.round(totalCal / totalDays) : 0}</div>
                <div class="stat-big-label">Promedio kcal/dia</div>
            </div>
        `;
    },

    // --- Profile ---
    bindProfileForm() {
        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = {
                name: document.getElementById('profileName').value.trim(),
                age: parseInt(document.getElementById('profileAge').value) || 0,
                gender: document.getElementById('profileGender').value,
                weight: parseFloat(document.getElementById('profileWeight').value) || 0,
                height: parseInt(document.getElementById('profileHeight').value) || 0,
                activity: parseFloat(document.getElementById('profileActivity').value) || 1.55,
                goal: document.getElementById('profileGoal').value,
                bodyfat: parseFloat(document.getElementById('profileBodyfat').value) || 0,
            };

            if (!profile.age || !profile.weight || !profile.height) {
                this.showToast('Completa edad, peso y estatura');
                return;
            }

            Storage.setProfile(profile);
            this.renderProfileResults(profile);
            this.autoApplyProfileGoals(profile);
            this.showToast('Perfil guardado y metas actualizadas');
        });
    },

    autoApplyProfileGoals(profile) {
        if (!profile || !profile.age || !profile.weight || !profile.height) return;
        const targetCal = Math.round(this.calculateTargetCalories(profile));
        const macros = this.calculateMacros(profile);
        const goals = {
            calories: targetCal,
            protein: macros.protein,
            carbs: macros.carbs,
            fat: macros.fat,
            water: Storage.getGoals().water,
        };
        Storage.setGoals(goals);
        this.updateAll();
    },

    loadProfileForm() {
        const profile = Storage.getProfile();
        if (!profile) return;
        document.getElementById('profileName').value = profile.name || '';
        document.getElementById('profileAge').value = profile.age || '';
        document.getElementById('profileGender').value = profile.gender || 'male';
        document.getElementById('profileWeight').value = profile.weight || '';
        document.getElementById('profileHeight').value = profile.height || '';
        document.getElementById('profileActivity').value = profile.activity || 1.55;
        document.getElementById('profileGoal').value = profile.goal || 'maintain';
        document.getElementById('profileBodyfat').value = profile.bodyfat || '';
        this.renderProfileResults(profile);
    },

    loadProfileIfExists() {
        const profile = Storage.getProfile();
        if (profile && profile.name) {
            document.querySelector('.logo').innerHTML = `Macros<span>!</span>`;
        }
        if (profile && profile.age && profile.weight && profile.height) {
            this.autoApplyProfileGoals(profile);
        }
    },

    calculateBMR(profile) {
        // Mifflin-St Jeor
        if (profile.gender === 'male') {
            return (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5;
        }
        return (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) - 161;
    },

    calculateTDEE(profile) {
        return this.calculateBMR(profile) * profile.activity;
    },

    calculateTargetCalories(profile) {
        const tdee = this.calculateTDEE(profile);
        switch (profile.goal) {
            case 'lose': return tdee - 500;
            case 'gain': return tdee + 300;
            case 'bulk': return tdee + 500;
            default: return tdee;
        }
    },

    calculateMacros(profile) {
        const targetCal = this.calculateTargetCalories(profile);
        let proteinRatio, carbsRatio, fatRatio;

        switch (profile.goal) {
            case 'lose':
                // High protein to preserve muscle
                proteinRatio = 0.35;
                fatRatio = 0.30;
                carbsRatio = 0.35;
                break;
            case 'gain':
            case 'bulk':
                proteinRatio = 0.30;
                fatRatio = 0.25;
                carbsRatio = 0.45;
                break;
            default:
                proteinRatio = 0.30;
                fatRatio = 0.25;
                carbsRatio = 0.45;
        }

        return {
            protein: Math.round((targetCal * proteinRatio) / 4),
            carbs: Math.round((targetCal * carbsRatio) / 4),
            fat: Math.round((targetCal * fatRatio) / 9),
        };
    },

    calculateBMI(profile) {
        const heightM = profile.height / 100;
        return profile.weight / (heightM * heightM);
    },

    getBMICategory(bmi) {
        if (bmi < 18.5) return { label: 'Bajo peso', color: 'var(--info)' };
        if (bmi < 25) return { label: 'Peso normal', color: 'var(--primary)' };
        if (bmi < 30) return { label: 'Sobrepeso', color: 'var(--warning)' };
        return { label: 'Obesidad', color: 'var(--danger)' };
    },

    renderProfileResults(profile) {
        if (!profile || !profile.age || !profile.weight || !profile.height) return;

        const bmr = Math.round(this.calculateBMR(profile));
        const tdee = Math.round(this.calculateTDEE(profile));
        const targetCal = Math.round(this.calculateTargetCalories(profile));
        const macros = this.calculateMacros(profile);
        const bmi = this.calculateBMI(profile);
        const bmiCat = this.getBMICategory(bmi);

        const goalLabels = {
            lose: 'Deficit (-500 kcal)',
            maintain: 'Mantenimiento',
            gain: 'Superavit (+300 kcal)',
            bulk: 'Volumen (+500 kcal)'
        };

        const container = document.getElementById('profileResults');
        container.innerHTML = `
            <div class="profile-calc-grid">
                <div class="calc-card">
                    <div class="calc-value">${bmr}</div>
                    <div class="calc-label">BMR (Metabolismo basal)</div>
                </div>
                <div class="calc-card">
                    <div class="calc-value">${tdee}</div>
                    <div class="calc-label">TDEE (Gasto total)</div>
                </div>
                <div class="calc-card highlight">
                    <div class="calc-value" style="font-size:2rem">${targetCal}</div>
                    <div class="calc-label">Calorias objetivo (${goalLabels[profile.goal]})</div>
                </div>
            </div>
            <div style="margin-top:1.25rem">
                <h4 style="font-size:.9rem;color:var(--text-secondary);margin-bottom:.75rem">Macros recomendados</h4>
                <div class="macro-rec-row">
                    <span class="macro-rec-label"><span class="macro-dot p"></span> Proteinas</span>
                    <span class="macro-rec-value" style="color:var(--protein-color)">${macros.protein}g</span>
                </div>
                <div class="macro-rec-row">
                    <span class="macro-rec-label"><span class="macro-dot c"></span> Carbohidratos</span>
                    <span class="macro-rec-value" style="color:var(--carbs-color)">${macros.carbs}g</span>
                </div>
                <div class="macro-rec-row">
                    <span class="macro-rec-label"><span class="macro-dot f"></span> Grasas</span>
                    <span class="macro-rec-value" style="color:var(--fat-color)">${macros.fat}g</span>
                </div>
            </div>
        `;

        // Show BMI
        const bmiBox = document.getElementById('profileBMI');
        bmiBox.style.display = 'block';
        document.getElementById('bmiValue').textContent = bmi.toFixed(1);
        document.getElementById('bmiValue').style.color = bmiCat.color;
        document.getElementById('bmiLabel').textContent = bmiCat.label;

        // Position BMI marker (scale: 15-40)
        const markerPct = Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100);
        document.getElementById('bmiMarker').style.left = markerPct + '%';

        // Show apply button
        document.getElementById('profileActions').style.display = 'block';

        this._calculatedProfile = { calories: targetCal, ...macros };
    },

    applyProfileToGoals() {
        if (!this._calculatedProfile) return;
        const goals = {
            calories: this._calculatedProfile.calories,
            protein: this._calculatedProfile.protein,
            carbs: this._calculatedProfile.carbs,
            fat: this._calculatedProfile.fat,
            water: Storage.getGoals().water,
        };
        Storage.setGoals(goals);
        this.updateAll();
        this.showToast('Metas actualizadas segun tu perfil');
    },

    // --- Barcode Scanner ---
    startScanner() {
        if (this.scanner) return;

        const containerWidth = document.getElementById('scannerContainer').offsetWidth;
        const qrWidth = Math.min(250, containerWidth - 40);
        const qrHeight = Math.min(150, Math.round(qrWidth * 0.6));

        const config = {
            fps: 10,
            qrbox: { width: qrWidth, height: qrHeight },
            aspectRatio: 1.5,
            formatsToSupport: [
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
            ]
        };

        this.scanner = new Html5Qrcode("scannerReader");

        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'flex';

        this.scanner.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                this.onBarcodeScanned(decodedText);
            },
            () => {}
        ).catch((err) => {
            this.scanner = null;
            document.getElementById('startScanBtn').style.display = 'flex';
            document.getElementById('stopScanBtn').style.display = 'none';
            this.showToast('No se pudo acceder a la camara');
        });
    },

    stopScanner() {
        if (this.scanner) {
            this.scanner.stop().then(() => {
                this.scanner.clear();
                this.scanner = null;
            }).catch(() => {
                this.scanner = null;
            });
        }
        const startBtn = document.getElementById('startScanBtn');
        const stopBtn = document.getElementById('stopScanBtn');
        if (startBtn) startBtn.style.display = 'flex';
        if (stopBtn) stopBtn.style.display = 'none';
    },

    onBarcodeScanned(barcode) {
        this.stopScanner();
        this.showToast('Codigo detectado: ' + barcode);
        this.searchBarcode(barcode);
    },

    searchBarcode(barcode) {
        if (!barcode || !barcode.trim()) {
            this.showToast('Ingresa un codigo de barras');
            return;
        }

        barcode = barcode.trim();
        const resultPanel = document.getElementById('scannerResultPanel');
        const resultContainer = document.getElementById('scannerResult');

        resultPanel.style.display = 'flex';

        const localProduct = typeof BARCODE_DATABASE !== 'undefined' && BARCODE_DATABASE[barcode];
        if (localProduct) {
            this.displayLocalProduct(localProduct);
            return;
        }

        resultContainer.innerHTML = `
            <div class="scanner-loading">
                <div class="spinner"></div>
                <p>Buscando producto en linea...</p>
            </div>
        `;

        fetch(`https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 1 && data.product) {
                    this.displayScannedProduct(data.product);
                } else {
                    resultContainer.innerHTML = `
                        <div class="scanner-error">
                            <p>Producto no encontrado para el codigo: <strong>${this.escapeHtml(barcode)}</strong></p>
                            <p style="margin-top:.5rem;font-size:.85rem;color:var(--text-muted)">
                                Intenta con otro codigo o agrega el alimento manualmente.
                            </p>
                            <button class="btn btn-outline" style="margin-top:1rem" onclick="app.showView('add-food')">Agregar manualmente</button>
                        </div>
                    `;
                    this.scannedProduct = null;
                }
            })
            .catch(() => {
                resultContainer.innerHTML = `
                    <div class="scanner-error">
                        <p>Error de conexion. Verifica tu internet e intenta de nuevo.</p>
                    </div>
                `;
                this.scannedProduct = null;
            });
    },

    displayLocalProduct(product) {
        this.scannedProduct = {
            name: product.brand ? `${product.name}` : product.name,
            calories: product.calories,
            protein: product.protein,
            carbs: product.carbs,
            fat: product.fat,
            portion: product.portion,
            per100: {
                calories: Math.round(product.calories / product.portion * 100),
                protein: Math.round(product.protein / product.portion * 100 * 10) / 10,
                carbs: Math.round(product.carbs / product.portion * 100 * 10) / 10,
                fat: Math.round(product.fat / product.portion * 100 * 10) / 10
            }
        };

        const resultContainer = document.getElementById('scannerResult');
        resultContainer.innerHTML = `
            <div class="scanner-product-card">
                <div class="scanner-product-name">${this.escapeHtml(product.name)}</div>
                ${product.brand ? `<div class="scanner-product-brand">${this.escapeHtml(product.brand)}</div>` : ''}
                <div class="scanner-local-badge">Producto local</div>
                <div class="scanner-nutri-grid">
                    <div class="scanner-nutri-item highlight">
                        <div class="scanner-nutri-value" id="scannedCal">${product.calories}</div>
                        <div class="scanner-nutri-label">Calorias (kcal)</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedProtein">${product.protein}g</div>
                        <div class="scanner-nutri-label">Proteinas</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedCarbs">${product.carbs}g</div>
                        <div class="scanner-nutri-label">Carbohidratos</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedFat">${product.fat}g</div>
                        <div class="scanner-nutri-label">Grasas</div>
                    </div>
                </div>
                <div class="scanner-portion-row">
                    <label>Porcion:</label>
                    <input type="number" id="scannedPortion" value="${product.portion}" min="0.1" step="any" onchange="app.updateScannedPortion(this.value)" oninput="app.updateScannedPortion(this.value)">
                    <span>gramos</span>
                </div>
            </div>
        `;
    },

    displayScannedProduct(product) {
        const nutrients = product.nutriments || {};
        const name = product.product_name || product.product_name_es || 'Producto desconocido';
        const brand = product.brands || '';
        const image = product.image_front_small_url || product.image_url || '';
        const servingSize = product.serving_quantity || product.product_quantity || 100;

        const cal = Math.round(nutrients['energy-kcal_100g'] || nutrients['energy-kcal'] || (nutrients.energy_100g || 0) / 4.184 || 0);
        const protein = Math.round((nutrients.proteins_100g || 0) * 10) / 10;
        const carbs = Math.round((nutrients.carbohydrates_100g || 0) * 10) / 10;
        const fat = Math.round((nutrients.fat_100g || 0) * 10) / 10;

        this.scannedProduct = {
            name: brand ? `${name} (${brand})` : name,
            calories: cal,
            protein: protein,
            carbs: carbs,
            fat: fat,
            portion: 100,
            per100: { calories: cal, protein, carbs, fat }
        };

        const resultContainer = document.getElementById('scannerResult');
        resultContainer.innerHTML = `
            <div class="scanner-product-card">
                ${image ? `<img src="${image}" alt="${this.escapeHtml(name)}" class="scanner-product-image">` : ''}
                <div class="scanner-product-name">${this.escapeHtml(name)}</div>
                ${brand ? `<div class="scanner-product-brand">${this.escapeHtml(brand)}</div>` : ''}
                <div class="scanner-nutri-grid">
                    <div class="scanner-nutri-item highlight">
                        <div class="scanner-nutri-value" id="scannedCal">${cal}</div>
                        <div class="scanner-nutri-label">Calorias (kcal)</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedProtein">${protein}g</div>
                        <div class="scanner-nutri-label">Proteinas</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedCarbs">${carbs}g</div>
                        <div class="scanner-nutri-label">Carbohidratos</div>
                    </div>
                    <div class="scanner-nutri-item">
                        <div class="scanner-nutri-value" id="scannedFat">${fat}g</div>
                        <div class="scanner-nutri-label">Grasas</div>
                    </div>
                </div>
                <div class="scanner-portion-row">
                    <label>Porcion:</label>
                    <input type="number" id="scannedPortion" value="100" min="0.1" step="any" onchange="app.updateScannedPortion(this.value)" oninput="app.updateScannedPortion(this.value)">
                    <span>gramos</span>
                </div>
            </div>
        `;
    },

    updateScannedPortion(grams) {
        if (!this.scannedProduct || !this.scannedProduct.per100) return;
        const g = parseFloat(grams) || 100;
        const ratio = g / 100;
        const p = this.scannedProduct.per100;

        this.scannedProduct.portion = g;
        this.scannedProduct.calories = Math.round(p.calories * ratio);
        this.scannedProduct.protein = Math.round(p.protein * ratio * 10) / 10;
        this.scannedProduct.carbs = Math.round(p.carbs * ratio * 10) / 10;
        this.scannedProduct.fat = Math.round(p.fat * ratio * 10) / 10;

        const calEl = document.getElementById('scannedCal');
        const protEl = document.getElementById('scannedProtein');
        const carbEl = document.getElementById('scannedCarbs');
        const fatEl = document.getElementById('scannedFat');
        if (calEl) calEl.textContent = this.scannedProduct.calories;
        if (protEl) protEl.textContent = this.scannedProduct.protein + 'g';
        if (carbEl) carbEl.textContent = this.scannedProduct.carbs + 'g';
        if (fatEl) fatEl.textContent = this.scannedProduct.fat + 'g';
    },

    addScannedFood() {
        if (!this.scannedProduct) {
            this.showToast('No hay producto escaneado');
            return;
        }

        const entry = {
            name: this.scannedProduct.name,
            calories: this.scannedProduct.calories,
            protein: this.scannedProduct.protein,
            carbs: this.scannedProduct.carbs,
            fat: this.scannedProduct.fat,
            portion: this.scannedProduct.portion,
            mealType: document.getElementById('scannerMealType').value,
        };

        Storage.addEntry(this.getDateStr(), entry);
        Storage.trackFoodUsage(entry.name);
        this.updateAll();
        this.showToast('Producto agregado: ' + entry.name);

        document.getElementById('scannerResultPanel').style.display = 'none';
        this.scannedProduct = null;
    },

    // --- Activity / Apple Health ---
    bindActivityForms() {
        document.getElementById('activityForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const dateStr = this.getDateStr();
            const data = {
                steps: parseInt(document.getElementById('manualSteps').value) || 0,
                caloriesBurned: parseInt(document.getElementById('manualCalBurned').value) || 0,
                distance: parseFloat(document.getElementById('manualDistance').value) || 0,
                type: document.getElementById('activityType').value,
                source: 'manual',
            };
            Storage.setActivity(dateStr, data);
            this.renderActivity();
            e.target.reset();
            this.showToast('Actividad guardada');
        });

        document.getElementById('activityGoalsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const goals = {
                steps: parseInt(document.getElementById('goalSteps').value) || 10000,
                burn: parseInt(document.getElementById('goalBurn').value) || 500,
            };
            Storage.setActivityGoals(goals);
            this.renderActivity();
            this.showToast('Metas de actividad guardadas');
        });
    },

    renderActivity() {
        const dateStr = this.getDateStr();
        const activity = Storage.getActivity(dateStr);
        const goals = Storage.getActivityGoals();
        const healthConnected = Storage.get('healthConnected', false);

        document.getElementById('stepsCount').textContent = activity.steps.toLocaleString();
        document.getElementById('caloriesBurned').textContent = activity.caloriesBurned.toLocaleString();
        document.getElementById('distanceWalked').textContent = activity.distance.toFixed(1);
        document.getElementById('stepsGoal').textContent = goals.steps.toLocaleString();
        document.getElementById('burnGoal').textContent = goals.burn;
        document.getElementById('goalSteps').value = goals.steps;
        document.getElementById('goalBurn').value = goals.burn;

        const stepsPct = Math.min((activity.steps / goals.steps) * 100, 100);
        const burnPct = Math.min((activity.caloriesBurned / goals.burn) * 100, 100);
        document.getElementById('stepsBar').style.width = stepsPct + '%';
        document.getElementById('burnBar').style.width = burnPct + '%';

        const entries = Storage.getEntries(dateStr);
        let totalConsumed = 0;
        entries.forEach(e => totalConsumed += e.calories || 0);
        const balance = Math.round(totalConsumed - activity.caloriesBurned);
        document.getElementById('calorieBalance').textContent = (balance > 0 ? '+' : '') + balance;
        document.getElementById('balanceLabel').textContent =
            balance > 0 ? 'Superavit calorico' : balance < 0 ? 'Deficit calorico' : 'Equilibrio';

        const dot = document.querySelector('.activity-status-dot');
        const statusText = document.getElementById('healthStatusText');
        if (healthConnected) {
            dot.classList.remove('disconnected');
            dot.classList.add('connected');
            statusText.textContent = 'Conectado a Apple Health';
            document.getElementById('connectHealthBtn').textContent = 'Sincronizar ahora';
        }
    },

    connectAppleHealth() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (!isIOS) {
            this.showToast('Apple Health solo disponible en iPhone');
            this.showHealthFallback();
            return;
        }

        if (navigator.health) {
            navigator.health.requestAuthorization(
                { read: ['steps', 'calories.active', 'distance'] },
                () => {
                    Storage.set('healthConnected', true);
                    this.syncHealthData();
                    this.showToast('Conectado a Apple Health');
                    this.renderActivity();
                },
                (err) => {
                    this.showToast('No se pudo conectar');
                    this.showHealthFallback();
                }
            );
        } else {
            Storage.set('healthConnected', true);
            this.showToast('Modo simulado activado - registra manualmente');
            this.renderActivity();
        }
    },

    syncHealthData() {
        if (!navigator.health) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        navigator.health.query({
            startDate: today,
            endDate: new Date(),
            dataType: 'steps',
        }, (data) => {
            const steps = data.reduce((sum, d) => sum + d.value, 0);
            const dateStr = this.getDateStr();
            const activity = Storage.getActivity(dateStr);
            activity.steps = Math.round(steps);
            activity.source = 'apple_health';
            Storage.setActivity(dateStr, activity);
            this.renderActivity();
        }, () => {});

        navigator.health.query({
            startDate: today,
            endDate: new Date(),
            dataType: 'calories.active',
        }, (data) => {
            const cal = data.reduce((sum, d) => sum + d.value, 0);
            const dateStr = this.getDateStr();
            const activity = Storage.getActivity(dateStr);
            activity.caloriesBurned = Math.round(cal);
            Storage.setActivity(dateStr, activity);
            this.renderActivity();
        }, () => {});
    },

    showHealthFallback() {
        Storage.set('healthConnected', false);
    },

    // --- Toast ---
    showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    },

    // --- Modal ---
    closeModal() {
        document.getElementById('modal').classList.remove('active');
    },

    // --- Helpers ---
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    fmtNum(n) {
        if (n === 0) return '0';
        if (Number.isInteger(n)) return n.toString();
        const rounded = Math.round(n * 10) / 10;
        return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(1);
    },

    // --- Diet Schedule ---
    renderDietSchedule() {
        const schedule = Storage.getMealSchedule();
        const container = document.getElementById('mealScheduleList');
        if (!container) return;

        container.innerHTML = schedule.meals.map((meal, idx) => `
            <div class="meal-slot ${meal.enabled ? '' : 'disabled'}">
                <div class="meal-slot-header">
                    <label class="meal-slot-toggle">
                        <input type="checkbox" ${meal.enabled ? 'checked' : ''} onchange="app.toggleMealSlot(${idx}, this.checked)">
                        <span class="toggle-slider"></span>
                    </label>
                    <input type="text" class="meal-slot-name" value="${this.escapeHtml(meal.name)}"
                           onchange="app.updateMealSlotName(${idx}, this.value)"
                           style="border:none;background:transparent;font-weight:600;font-size:.95rem;color:var(--text);outline:none;flex:1">
                    <div class="meal-slot-time">
                        <input type="time" value="${meal.time}" onchange="app.updateMealSlotTime(${idx}, this.value)">
                    </div>
                    ${schedule.meals.length > 2 ? `<button class="meal-slot-remove" onclick="app.removeMealSlot(${idx})" title="Eliminar">&times;</button>` : ''}
                </div>
                <div class="meal-slot-foods">
                    ${(meal.foods || []).map((f, fi) => `
                        <div class="meal-slot-food">
                            <span class="meal-slot-food-name">${this.escapeHtml(f.name)}</span>
                            <span class="meal-slot-food-cal">${f.calories} kcal</span>
                            <button onclick="app.removeMealSlotFood(${idx}, ${fi})">&times;</button>
                        </div>
                    `).join('')}
                </div>
                <div class="meal-slot-actions">
                    <button class="btn btn-outline" onclick="app.addFoodToMealSlot(${idx})">+ Alimento</button>
                </div>
            </div>
        `).join('');

        // Update notification settings UI
        const notifEnabled = document.getElementById('notificationsEnabled');
        const reminderMin = document.getElementById('reminderMinutes');
        if (notifEnabled) notifEnabled.checked = schedule.notificationsEnabled;
        if (reminderMin) reminderMin.value = schedule.reminderMinutes;

        // Update water reminder UI
        const waterSettings = Storage.getWaterReminder();
        const waterEnabled = document.getElementById('waterReminderEnabled');
        const waterInterval = document.getElementById('waterInterval');
        const waterStart = document.getElementById('waterStartTime');
        const waterEnd = document.getElementById('waterEndTime');
        if (waterEnabled) waterEnabled.checked = waterSettings.enabled;
        if (waterInterval) waterInterval.value = waterSettings.intervalMinutes;
        if (waterStart) waterStart.value = waterSettings.startTime;
        if (waterEnd) waterEnd.value = waterSettings.endTime;

        this.updateNotificationStatus();
        this.renderDietDayPlan();
    },

    toggleMealSlot(idx, enabled) {
        const schedule = Storage.getMealSchedule();
        schedule.meals[idx].enabled = enabled;
        Storage.setMealSchedule(schedule);
        this.renderDietSchedule();
        if (schedule.notificationsEnabled) this.scheduleMealNotifications();
    },

    updateMealSlotName(idx, name) {
        const schedule = Storage.getMealSchedule();
        schedule.meals[idx].name = name;
        Storage.setMealSchedule(schedule);
    },

    updateMealSlotTime(idx, time) {
        const schedule = Storage.getMealSchedule();
        schedule.meals[idx].time = time;
        Storage.setMealSchedule(schedule);
        if (schedule.notificationsEnabled) this.scheduleMealNotifications();
    },

    addMealSlot() {
        const schedule = Storage.getMealSchedule();
        schedule.meals.push({
            id: 'custom_' + Date.now(),
            name: 'Nueva comida',
            time: '12:00',
            enabled: true,
            foods: [],
        });
        Storage.setMealSchedule(schedule);
        this.renderDietSchedule();
    },

    removeMealSlot(idx) {
        const schedule = Storage.getMealSchedule();
        schedule.meals.splice(idx, 1);
        Storage.setMealSchedule(schedule);
        this.renderDietSchedule();
    },

    addFoodToMealSlot(mealIdx) {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modalBody');
        document.getElementById('modalTitle').textContent = 'Agregar alimento al horario';

        let searchHtml = `
            <div class="search-box" style="margin-bottom:.75rem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="modalFoodSearch" placeholder="Buscar alimento..." autocomplete="off" oninput="app.filterModalFoods(this.value)">
            </div>
            <div id="modalFoodList" style="max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:.3rem"></div>
        `;
        body.innerHTML = searchHtml;
        modal.classList.add('active');

        this._pendingMealSlotIdx = mealIdx;
        this.filterModalFoods('');
    },

    filterModalFoods(search) {
        const container = document.getElementById('modalFoodList');
        if (!container) return;
        let foods = FOOD_DATABASE;
        if (search) {
            const s = search.toLowerCase();
            foods = foods.filter(f => f.name.toLowerCase().includes(s));
        }
        this._modalFoods = foods.slice(0, 50);
        container.innerHTML = this._modalFoods.map((food, idx) => `
            <div class="food-db-item" onclick="app.selectFoodForSlotByIdx(${idx})">
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">${food.calories} kcal | ${food.portion}g</div>
                </div>
            </div>
        `).join('');
    },

    selectFoodForSlotByIdx(idx) {
        const food = this._modalFoods[idx];
        if (!food) return;
        this.selectFoodForSlot({
            name: food.name, calories: food.calories, protein: food.protein,
            carbs: food.carbs, fat: food.fat, portion: food.portion
        });
    },

    selectFoodForSlot(food) {
        const schedule = Storage.getMealSchedule();
        const idx = this._pendingMealSlotIdx;
        if (!schedule.meals[idx].foods) schedule.meals[idx].foods = [];
        schedule.meals[idx].foods.push(food);
        Storage.setMealSchedule(schedule);
        this.closeModal();
        this.renderDietSchedule();
        this.showToast('Alimento agregado al horario');
    },

    removeMealSlotFood(mealIdx, foodIdx) {
        const schedule = Storage.getMealSchedule();
        schedule.meals[mealIdx].foods.splice(foodIdx, 1);
        Storage.setMealSchedule(schedule);
        this.renderDietSchedule();
    },

    renderDietDayPlan() {
        const schedule = Storage.getMealSchedule();
        const container = document.getElementById('dietDayPlan');
        const totalsContainer = document.getElementById('dietPlanTotals');
        if (!container) return;

        const enabledMeals = schedule.meals.filter(m => m.enabled).sort((a, b) => a.time.localeCompare(b.time));

        if (enabledMeals.length === 0) {
            container.innerHTML = '<p class="empty-state">No hay comidas programadas</p>';
            if (totalsContainer) totalsContainer.innerHTML = '';
            return;
        }

        let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;

        container.innerHTML = enabledMeals.map(meal => {
            const foods = meal.foods || [];
            let mealCal = 0;
            foods.forEach(f => {
                mealCal += f.calories || 0;
                totalCal += f.calories || 0;
                totalP += f.protein || 0;
                totalC += f.carbs || 0;
                totalF += f.fat || 0;
            });
            return `
                <div class="diet-plan-meal">
                    <div class="diet-plan-meal-header">
                        <span class="diet-plan-meal-name">${this.escapeHtml(meal.name)}</span>
                        <span class="diet-plan-meal-time">${meal.time}</span>
                    </div>
                    <div class="diet-plan-meal-foods">
                        ${foods.length > 0 ? foods.map(f => `${this.escapeHtml(f.name)} (${f.calories} kcal)`).join(', ') : '<span style="color:var(--text-muted)">Sin alimentos planificados</span>'}
                    </div>
                </div>
            `;
        }).join('');

        if (totalsContainer) {
            totalsContainer.innerHTML = `
                <h4>Total planificado</h4>
                <div class="diet-totals-grid">
                    <div class="diet-total-item">
                        <div class="diet-total-value" style="color:var(--calories-color)">${Math.round(totalCal)}</div>
                        <div class="diet-total-label">kcal</div>
                    </div>
                    <div class="diet-total-item">
                        <div class="diet-total-value" style="color:var(--protein-color)">${Math.round(totalP)}g</div>
                        <div class="diet-total-label">Proteina</div>
                    </div>
                    <div class="diet-total-item">
                        <div class="diet-total-value" style="color:var(--carbs-color)">${Math.round(totalC)}g</div>
                        <div class="diet-total-label">Carbos</div>
                    </div>
                    <div class="diet-total-item">
                        <div class="diet-total-value" style="color:var(--fat-color)">${Math.round(totalF)}g</div>
                        <div class="diet-total-label">Grasas</div>
                    </div>
                </div>
            `;
        }
    },

    // --- Notifications ---
    initNotifications() {
        const schedule = Storage.getMealSchedule();
        if (schedule.notificationsEnabled) {
            this.scheduleMealNotifications();
        }
        const waterSettings = Storage.getWaterReminder();
        if (waterSettings.enabled) {
            this.scheduleWaterReminder();
        }
    },

    async requestNotificationPermission() {
        if (!('Notification' in window)) {
            this.showToast('Tu navegador no soporta notificaciones');
            return false;
        }
        if (Notification.permission === 'granted') return true;
        if (Notification.permission === 'denied') {
            this.showToast('Notificaciones bloqueadas. Activalas en la configuracion del navegador.');
            return false;
        }
        const result = await Notification.requestPermission();
        return result === 'granted';
    },

    async toggleMealNotifications(enabled) {
        const schedule = Storage.getMealSchedule();
        if (enabled) {
            const granted = await this.requestNotificationPermission();
            if (!granted) {
                document.getElementById('notificationsEnabled').checked = false;
                return;
            }
            schedule.notificationsEnabled = true;
            Storage.setMealSchedule(schedule);
            this.scheduleMealNotifications();
            this.showToast('Notificaciones de comida activadas');
        } else {
            schedule.notificationsEnabled = false;
            Storage.setMealSchedule(schedule);
            this.clearMealNotifications();
            this.showToast('Notificaciones de comida desactivadas');
        }
        this.updateNotificationStatus();
    },

    updateReminderMinutes(minutes) {
        const schedule = Storage.getMealSchedule();
        schedule.reminderMinutes = parseInt(minutes);
        Storage.setMealSchedule(schedule);
        if (schedule.notificationsEnabled) this.scheduleMealNotifications();
    },

    scheduleMealNotifications() {
        this.clearMealNotifications();
        const schedule = Storage.getMealSchedule();
        if (!schedule.notificationsEnabled) return;

        const now = new Date();
        schedule.meals.filter(m => m.enabled).forEach(meal => {
            const [h, m] = meal.time.split(':').map(Number);
            const mealTime = new Date(now);
            mealTime.setHours(h, m, 0, 0);

            const reminderTime = new Date(mealTime.getTime() - schedule.reminderMinutes * 60000);

            if (reminderTime > now) {
                const delay = reminderTime.getTime() - now.getTime();
                const timer = setTimeout(() => {
                    this.sendNotification(
                        `${meal.name} en ${schedule.reminderMinutes} min`,
                        `Tu ${meal.name.toLowerCase()} esta programado para las ${meal.time}. Prepara tu comida.`,
                        'meal'
                    );
                }, delay);
                this._mealNotificationTimers.push(timer);
            }
        });
    },

    clearMealNotifications() {
        this._mealNotificationTimers.forEach(t => clearTimeout(t));
        this._mealNotificationTimers = [];
    },

    async toggleWaterReminder(enabled) {
        const settings = Storage.getWaterReminder();
        if (enabled) {
            const granted = await this.requestNotificationPermission();
            if (!granted) {
                document.getElementById('waterReminderEnabled').checked = false;
                return;
            }
            settings.enabled = true;
            Storage.setWaterReminder(settings);
            this.scheduleWaterReminder();
            this.showToast('Recordatorio de agua activado');
        } else {
            settings.enabled = false;
            Storage.setWaterReminder(settings);
            this.clearWaterReminder();
            this.showToast('Recordatorio de agua desactivado');
        }
        this.updateNotificationStatus();
    },

    updateWaterInterval(minutes) {
        const settings = Storage.getWaterReminder();
        settings.intervalMinutes = parseInt(minutes);
        Storage.setWaterReminder(settings);
        if (settings.enabled) this.scheduleWaterReminder();
    },

    updateWaterTimes() {
        const settings = Storage.getWaterReminder();
        settings.startTime = document.getElementById('waterStartTime').value;
        settings.endTime = document.getElementById('waterEndTime').value;
        Storage.setWaterReminder(settings);
        if (settings.enabled) this.scheduleWaterReminder();
    },

    scheduleWaterReminder() {
        this.clearWaterReminder();
        const settings = Storage.getWaterReminder();
        if (!settings.enabled) return;

        const now = new Date();
        const [startH, startM] = settings.startTime.split(':').map(Number);
        const [endH, endM] = settings.endTime.split(':').map(Number);
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;
        const nowMin = now.getHours() * 60 + now.getMinutes();

        if (nowMin >= startMin && nowMin <= endMin) {
            this._waterReminderTimer = setInterval(() => {
                const currentMin = new Date().getHours() * 60 + new Date().getMinutes();
                if (currentMin >= startMin && currentMin <= endMin) {
                    const water = Storage.getWater(this.getDateStr());
                    const goals = Storage.getGoals();
                    if (water < goals.water) {
                        this.sendNotification(
                            'Hora de beber agua',
                            `Llevas ${water} de ${goals.water} vasos hoy. Mantente hidratado.`,
                            'water'
                        );
                    }
                }
            }, settings.intervalMinutes * 60000);
        }

        // Schedule first one if we're in range
        if (nowMin >= startMin && nowMin <= endMin) {
            const firstDelay = settings.intervalMinutes * 60000;
            setTimeout(() => {
                if (Storage.getWaterReminder().enabled) {
                    const water = Storage.getWater(this.getDateStr());
                    const goals = Storage.getGoals();
                    if (water < goals.water) {
                        this.sendNotification(
                            'Hora de beber agua',
                            `Llevas ${water} de ${goals.water} vasos hoy. Mantente hidratado.`,
                            'water'
                        );
                    }
                }
            }, firstDelay);
        }
    },

    clearWaterReminder() {
        if (this._waterReminderTimer) {
            clearInterval(this._waterReminderTimer);
            this._waterReminderTimer = null;
        }
    },

    sendNotification(title, body, tag) {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        try {
            new Notification(title, {
                body,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🍊</text></svg>',
                tag: tag || 'nutritrack',
                requireInteraction: false,
            });
        } catch (e) {
            // Fallback for mobile - show in-app toast
            this.showToast(title + ': ' + body);
        }
    },

    updateNotificationStatus() {
        const statusEl = document.getElementById('notificationStatus');
        if (!statusEl) return;
        const schedule = Storage.getMealSchedule();
        const waterSettings = Storage.getWaterReminder();
        const hasAny = schedule.notificationsEnabled || waterSettings.enabled;

        const dot = statusEl.querySelector('.activity-status-dot');
        if (dot) {
            dot.classList.toggle('connected', hasAny);
            dot.classList.toggle('disconnected', !hasAny);
        }

        let statusText = '';
        if (schedule.notificationsEnabled && waterSettings.enabled) {
            statusText = `Comidas (${schedule.reminderMinutes} min antes) y agua (cada ${waterSettings.intervalMinutes} min)`;
        } else if (schedule.notificationsEnabled) {
            statusText = `Comidas: recordar ${schedule.reminderMinutes} min antes`;
        } else if (waterSettings.enabled) {
            statusText = `Agua: cada ${waterSettings.intervalMinutes} min`;
        } else {
            statusText = 'Notificaciones desactivadas';
        }
        statusEl.lastElementChild.textContent = statusText;
    },

    onPortionChange() {
        this._lastEditedField = 'grams';
        if (this._foodRef) {
            this._syncFromGrams();
            this._recalcMacros();
        }
    },

    // --- Dark Mode ---
    initDarkMode() {
        const enabled = Storage.getDarkMode();
        if (enabled) {
            document.body.classList.add('dark-mode');
        }
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) toggle.checked = enabled;
    },

    toggleDarkMode(enabled) {
        Storage.setDarkMode(enabled);
        document.body.classList.toggle('dark-mode', enabled);
        this.showToast(enabled ? 'Modo oscuro activado' : 'Modo claro activado');
    },

    // --- Streak ---
    renderStreak() {
        const streakEl = document.getElementById('streakCount');
        if (!streakEl) return;
        const streak = Storage.getStreak();
        streakEl.textContent = streak;
        const card = document.getElementById('streakCard');
        if (card) {
            card.classList.toggle('active-streak', streak > 0);
        }
    },

    // --- Weekly Goal Comparison ---
    renderWeeklyComparison() {
        const container = document.getElementById('weeklyBars');
        if (!container) return;
        const goals = Storage.getGoals();
        const today = new Date();
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push(d);
        }

        let html = '';
        days.forEach(d => {
            const dateStr = d.toISOString().split('T')[0];
            const entries = Storage.getEntries(dateStr);
            let cal = 0;
            entries.forEach(e => cal += e.calories || 0);
            const pct = Math.min(Math.round((cal / goals.calories) * 100), 150);
            const isOver = cal > goals.calories;
            const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'narrow' });
            const isToday = dateStr === this.getDateStr(new Date());
            html += `<div class="weekly-bar-item ${isToday ? 'today' : ''}">
                <div class="weekly-bar-track">
                    <div class="weekly-bar-fill ${isOver ? 'over' : ''}" style="height:${Math.min(pct, 100)}%"></div>
                </div>
                <span class="weekly-bar-label">${dayLabel}</span>
                <span class="weekly-bar-value">${Math.round(cal)}</span>
            </div>`;
        });
        container.innerHTML = html;
    },

    // --- Frequent Foods ---
    renderFrequentFoods() {
        const section = document.getElementById('frequentFoodsSection');
        const list = document.getElementById('frequentFoodsList');
        if (!section || !list) return;

        const pantry = Storage.getPantry();
        const frequent = Storage.getFrequentFoods(8);
        const hasPantry = pantry.length > 0;
        const hasFrequent = frequent.length > 0;

        if (!hasPantry && !hasFrequent) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        this._frequentFoodsData = [];
        const foods = FOOD_DATABASE;
        let html = '';

        if (hasPantry) {
            html += '<div style="font-size:.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.4rem;width:100%">Almacen</div>';
            pantry.forEach(p => {
                this._frequentFoodsData.push(p);
                const realIdx = this._frequentFoodsData.length - 1;
                html += `<div class="frequent-food-chip" onclick="app.quickAddFrequent(${realIdx})" style="border-color:var(--primary)">
                    <span class="frequent-food-name">${this.escapeHtml(p.name)}</span>
                    <span class="frequent-food-cal">${p.calories} kcal</span>
                </div>`;
            });
        }

        if (hasFrequent) {
            if (hasPantry) {
                html += '<div style="font-size:.8rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:.4rem;margin-top:.5rem;width:100%">Frecuentes</div>';
            }
            frequent.forEach(f => {
                const food = foods.find(fd => fd.name === f.name);
                if (!food) return;
                if (pantry.some(p => p.name === food.name)) return;
                this._frequentFoodsData.push(food);
                const realIdx = this._frequentFoodsData.length - 1;
                html += `<div class="frequent-food-chip" onclick="app.quickAddFrequent(${realIdx})">
                    <span class="frequent-food-name">${this.escapeHtml(f.name)}</span>
                    <span class="frequent-food-cal">${food.calories} kcal</span>
                </div>`;
            });
        }

        list.innerHTML = html;
    },

    quickAddFrequent(idx) {
        const food = this._frequentFoodsData && this._frequentFoodsData[idx];
        if (!food) return;
        this.fillFoodForm(food);
    },

    // --- Pantry / Almacen ---
    _pantrySearchFoods: [],

    filterPantrySearch(search) {
        const container = document.getElementById('pantrySearchResults');
        if (!container) return;
        if (!search) { container.innerHTML = ''; return; }
        const s = search.toLowerCase();
        const foods = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(s)).slice(0, 20);
        this._pantrySearchFoods = foods;
        container.innerHTML = foods.map((food, idx) => `
            <div class="food-db-item" onclick="app.addToPantryFromSearch(${idx})">
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">P: ${food.protein}g | C: ${food.carbs}g | G: ${food.fat}g | ${food.portion}g</div>
                </div>
                <div style="display:flex;align-items:center;gap:.5rem">
                    <span class="food-db-cal">${food.calories} kcal</span>
                    <button class="btn btn-primary btn-sm">+ Guardar</button>
                </div>
            </div>
        `).join('');
    },

    addToPantryFromSearch(idx) {
        const food = this._pantrySearchFoods[idx];
        if (!food) return;
        const pantry = Storage.getPantry();
        if (pantry.some(p => p.name === food.name)) {
            this.showToast('Este alimento ya esta en tu almacen');
            return;
        }
        Storage.addPantryItem({
            name: food.name, calories: food.calories, protein: food.protein,
            carbs: food.carbs, fat: food.fat, portion: food.portion,
            unitWeight: food.unitWeight || undefined,
            category: food.category || '', preparations: food.preparations || null,
            fiber: food.fiber || 0, sugar: food.sugar || 0, sodium: food.sodium || 0,
        });
        this.renderPantry();
        this.showToast('Agregado al almacen: ' + food.name);
    },

    addCustomPantryItem(event) {
        event.preventDefault();
        const name = document.getElementById('pantryCustomName').value.trim();
        if (!name) return;
        const pantry = Storage.getPantry();
        if (pantry.some(p => p.name === name)) {
            this.showToast('Ya existe un alimento con ese nombre');
            return;
        }
        Storage.addPantryItem({
            name,
            calories: parseFloat(document.getElementById('pantryCustomCal').value) || 0,
            portion: parseFloat(document.getElementById('pantryCustomPortion').value) || 100,
            protein: parseFloat(document.getElementById('pantryCustomProtein').value) || 0,
            carbs: parseFloat(document.getElementById('pantryCustomCarbs').value) || 0,
            fat: parseFloat(document.getElementById('pantryCustomFat').value) || 0,
            category: 'custom',
        });
        document.getElementById('pantryCustomForm').reset();
        this.renderPantry();
        this.showToast('Alimento personalizado guardado en almacen');
    },

    removePantryItem(itemId) {
        Storage.removePantryItem(itemId);
        this.renderPantry();
        this.showToast('Eliminado del almacen');
    },

    usePantryItem(itemId) {
        const pantry = Storage.getPantry();
        const item = pantry.find(p => p.id === itemId);
        if (!item) return;
        this.fillFoodForm(item);
        this.showView('add-food');
    },

    renderPantry() {
        const container = document.getElementById('pantryList');
        if (!container) return;
        const pantry = Storage.getPantry();

        if (pantry.length === 0) {
            container.innerHTML = '<p class="empty-state">Tu almacen esta vacio. Busca y agrega alimentos que uses con frecuencia.</p>';
            return;
        }

        container.innerHTML = pantry.map(item => `
            <div class="pantry-item">
                <div class="pantry-item-info">
                    <div class="pantry-item-name">${this.escapeHtml(item.name)}</div>
                    <div class="pantry-item-macros">
                        <span><span class="macro-dot p"></span> ${item.protein}g</span>
                        <span><span class="macro-dot c"></span> ${item.carbs}g</span>
                        <span><span class="macro-dot f"></span> ${item.fat}g</span>
                        <span>${item.portion}g</span>
                    </div>
                </div>
                <div class="pantry-item-cal">${item.calories} kcal</div>
                <div class="pantry-item-actions">
                    <button class="btn btn-primary btn-sm" onclick="app.usePantryItem('${item.id}')" title="Usar">Usar</button>
                    <button class="btn btn-outline btn-sm" onclick="app.removePantryItem('${item.id}')" title="Eliminar">&times;</button>
                </div>
            </div>
        `).join('');
    },

    // --- Photo AI ---
    onPhotoSelected(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const container = document.getElementById('photoPreviewContainer');
            const img = document.getElementById('photoPreview');
            if (container && img) {
                img.src = e.target.result;
                container.style.display = 'block';
            }
            this.analyzePhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    },

    analyzePhoto(imageData) {
        const analyzing = document.getElementById('photoAnalyzing');
        const resultsPanel = document.getElementById('photoResultsPanel');
        if (analyzing) analyzing.style.display = 'block';

        setTimeout(() => {
            if (analyzing) analyzing.style.display = 'none';
            if (resultsPanel) resultsPanel.style.display = 'block';
            this.showPhotoSuggestions();
        }, 1500);
    },

    showPhotoSuggestions() {
        const container = document.getElementById('photoResults');
        if (!container) return;

        const suggestions = this.getSmartSuggestions();
        this._photoSuggestions = suggestions;

        container.innerHTML = suggestions.map((food, idx) => `
            <div class="photo-result-item">
                <div class="photo-result-info">
                    <div class="food-db-name">${this.escapeHtml(food.name)}</div>
                    <div class="food-db-detail">P: ${food.protein}g | C: ${food.carbs}g | G: ${food.fat}g | ${food.portion}g</div>
                </div>
                <div class="photo-result-actions">
                    <span class="food-db-cal">${food.calories} kcal</span>
                    <button class="btn btn-primary btn-sm" onclick="app.addPhotoFood(${idx})">+ Agregar</button>
                </div>
            </div>
        `).join('');
    },

    getSmartSuggestions() {
        const frequent = Storage.getFrequentFoods(5);
        const frequentNames = frequent.map(f => f.name);
        let suggestions = FOOD_DATABASE.filter(f => frequentNames.includes(f.name));

        const commonCategories = ['platos_comunes', 'carnes_blancas', 'cereales'];
        const common = FOOD_DATABASE.filter(f => commonCategories.includes(f.category));
        const shuffled = common.sort(() => Math.random() - 0.5).slice(0, 8);
        suggestions = [...suggestions, ...shuffled];

        const seen = new Set();
        return suggestions.filter(f => {
            if (seen.has(f.name)) return false;
            seen.add(f.name);
            return true;
        }).slice(0, 10);
    },

    addPhotoFood(idx) {
        const food = this._photoSuggestions && this._photoSuggestions[idx];
        if (!food) return;

        const entry = {
            name: food.name,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            portion: food.portion,
            mealType: 'almuerzo',
        };

        Storage.addEntry(this.getDateStr(), entry);
        Storage.trackFoodUsage(food.name);
        this.updateAll();
        this.showToast('Agregado: ' + food.name);
    },

    filterPhotoFoods(search) {
        const container = document.getElementById('photoFoodList');
        if (!container) return;
        if (!search) { container.innerHTML = ''; return; }
        const s = search.toLowerCase();
        const foods = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(s)).slice(0, 20);
        this._photoSearchFoods = foods;
        container.innerHTML = foods.map((food, idx) => `
            <div class="food-db-item" onclick="app.addPhotoSearchFood(${idx})">
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">${food.calories} kcal | ${food.portion}g</div>
                </div>
                <button class="btn btn-primary btn-sm">+ Agregar</button>
            </div>
        `).join('');
    },

    addPhotoSearchFood(idx) {
        const food = this._photoSearchFoods && this._photoSearchFoods[idx];
        if (!food) return;
        const entry = {
            name: food.name, calories: food.calories, protein: food.protein,
            carbs: food.carbs, fat: food.fat, portion: food.portion, mealType: 'almuerzo',
        };
        Storage.addEntry(this.getDateStr(), entry);
        Storage.trackFoodUsage(food.name);
        this.updateAll();
        this.showToast('Agregado: ' + food.name);
    },

    // --- Recipes ---
    renderRecipes() {
        this.renderSavedRecipes();
        this.renderRecipeIngredients();
        this.updateRecipeTotals();
    },

    _recipeIngredients: [],

    addRecipeIngredient() {
        const modal = document.getElementById('modal');
        const body = document.getElementById('modalBody');
        document.getElementById('modalTitle').textContent = 'Agregar ingrediente';

        body.innerHTML = `
            <div class="search-box" style="margin-bottom:.75rem">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="recipeIngSearch" placeholder="Buscar alimento..." oninput="app.filterRecipeIngredients(this.value)">
            </div>
            <div id="recipeIngList" style="max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:.3rem"></div>
        `;
        modal.classList.add('active');
        this.filterRecipeIngredients('');
    },

    filterRecipeIngredients(search) {
        const container = document.getElementById('recipeIngList');
        if (!container) return;
        let foods = FOOD_DATABASE;
        if (search) {
            const s = search.toLowerCase();
            foods = foods.filter(f => f.name.toLowerCase().includes(s));
        }
        this._recipeSearchFoods = foods.slice(0, 50);
        container.innerHTML = this._recipeSearchFoods.map((food, idx) => `
            <div class="food-db-item" onclick="app.selectRecipeIngredient(${idx})">
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">${food.calories} kcal | P:${food.protein}g C:${food.carbs}g G:${food.fat}g | ${food.portion}g</div>
                </div>
            </div>
        `).join('');
    },

    selectRecipeIngredient(idx) {
        const food = this._recipeSearchFoods && this._recipeSearchFoods[idx];
        if (!food) return;
        this._recipeIngredients.push({
            name: food.name, calories: food.calories, protein: food.protein,
            carbs: food.carbs, fat: food.fat, portion: food.portion,
            quantity: food.portion,
        });
        this.closeModal();
        this.renderRecipeIngredients();
        this.updateRecipeTotals();
    },

    renderRecipeIngredients() {
        const container = document.getElementById('recipeIngredientsList');
        if (!container) return;
        if (this._recipeIngredients.length === 0) {
            container.innerHTML = '<p class="empty-state" style="padding:.5rem">Sin ingredientes. Agrega el primero.</p>';
            return;
        }
        container.innerHTML = this._recipeIngredients.map((ing, idx) => `
            <div class="recipe-ingredient-item">
                <div class="recipe-ingredient-info">
                    <span class="recipe-ingredient-name">${this.escapeHtml(ing.name)}</span>
                    <span class="recipe-ingredient-cal">${Math.round(ing.calories * ing.quantity / ing.portion)} kcal</span>
                </div>
                <div class="recipe-ingredient-controls">
                    <input type="number" value="${ing.quantity}" min="1" style="width:70px" onchange="app.updateRecipeIngQty(${idx}, this.value)">
                    <span style="font-size:.8rem;color:var(--text-muted)">g</span>
                    <button onclick="app.removeRecipeIngredient(${idx})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:1.1rem">&times;</button>
                </div>
            </div>
        `).join('');
    },

    updateRecipeIngQty(idx, value) {
        if (this._recipeIngredients[idx]) {
            this._recipeIngredients[idx].quantity = parseFloat(value) || 0;
            this.updateRecipeTotals();
        }
    },

    removeRecipeIngredient(idx) {
        this._recipeIngredients.splice(idx, 1);
        this.renderRecipeIngredients();
        this.updateRecipeTotals();
    },

    updateRecipeTotals() {
        const container = document.getElementById('recipeTotals');
        const grid = document.getElementById('recipeTotalsGrid');
        if (!container || !grid) return;

        if (this._recipeIngredients.length === 0) {
            container.style.display = 'none';
            return;
        }

        const portions = parseInt(document.getElementById('recipePortions')?.value) || 1;
        let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;

        this._recipeIngredients.forEach(ing => {
            const ratio = ing.quantity / ing.portion;
            totalCal += ing.calories * ratio;
            totalP += ing.protein * ratio;
            totalC += ing.carbs * ratio;
            totalF += ing.fat * ratio;
        });

        container.style.display = 'block';
        grid.innerHTML = `
            <div class="diet-total-item">
                <div class="diet-total-value" style="color:var(--calories-color)">${Math.round(totalCal / portions)}</div>
                <div class="diet-total-label">kcal</div>
            </div>
            <div class="diet-total-item">
                <div class="diet-total-value" style="color:var(--protein-color)">${Math.round(totalP / portions)}g</div>
                <div class="diet-total-label">Proteina</div>
            </div>
            <div class="diet-total-item">
                <div class="diet-total-value" style="color:var(--carbs-color)">${Math.round(totalC / portions)}g</div>
                <div class="diet-total-label">Carbos</div>
            </div>
            <div class="diet-total-item">
                <div class="diet-total-value" style="color:var(--fat-color)">${Math.round(totalF / portions)}g</div>
                <div class="diet-total-label">Grasas</div>
            </div>
            <div class="diet-total-item" style="grid-column:1/-1;font-size:.85rem;color:var(--text-secondary)">
                Total: ${Math.round(totalCal)} kcal | ${portions} porciones
            </div>
        `;
    },

    saveRecipe(event) {
        event.preventDefault();
        const name = document.getElementById('recipeName').value.trim();
        const portions = parseInt(document.getElementById('recipePortions').value) || 1;

        if (!name) { this.showToast('Ingresa un nombre'); return; }
        if (this._recipeIngredients.length === 0) { this.showToast('Agrega al menos un ingrediente'); return; }

        let totalCal = 0, totalP = 0, totalC = 0, totalF = 0;
        this._recipeIngredients.forEach(ing => {
            const ratio = ing.quantity / ing.portion;
            totalCal += ing.calories * ratio;
            totalP += ing.protein * ratio;
            totalC += ing.carbs * ratio;
            totalF += ing.fat * ratio;
        });

        const recipe = {
            name,
            portions,
            ingredients: [...this._recipeIngredients],
            perPortion: {
                calories: Math.round(totalCal / portions),
                protein: Math.round(totalP / portions * 10) / 10,
                carbs: Math.round(totalC / portions * 10) / 10,
                fat: Math.round(totalF / portions * 10) / 10,
            },
            totalCalories: Math.round(totalCal),
        };

        Storage.addRecipe(recipe);
        this._recipeIngredients = [];
        document.getElementById('recipeForm').reset();
        document.getElementById('recipePortions').value = 4;
        this.renderRecipeIngredients();
        this.updateRecipeTotals();
        this.renderSavedRecipes();
        this.showToast('Receta guardada: ' + name);
    },

    renderSavedRecipes() {
        const container = document.getElementById('savedRecipesList');
        if (!container) return;
        const recipes = Storage.getRecipes();

        if (recipes.length === 0) {
            container.innerHTML = '<p class="empty-state">No tienes recetas guardadas. Crea tu primera receta.</p>';
            return;
        }

        container.innerHTML = recipes.map(r => `
            <div class="saved-recipe-card">
                <div class="saved-recipe-header">
                    <div class="saved-recipe-name">${this.escapeHtml(r.name)}</div>
                    <div class="saved-recipe-portions">${r.portions} porciones</div>
                </div>
                <div class="saved-recipe-macros">
                    <span style="color:var(--calories-color);font-weight:700">${r.perPortion.calories} kcal</span>
                    <span>P: ${r.perPortion.protein}g</span>
                    <span>C: ${r.perPortion.carbs}g</span>
                    <span>G: ${r.perPortion.fat}g</span>
                    <span style="color:var(--text-muted)">por porcion</span>
                </div>
                <div class="saved-recipe-ingredients">
                    ${r.ingredients.map(i => this.escapeHtml(i.name) + ' (' + i.quantity + 'g)').join(', ')}
                </div>
                <div class="saved-recipe-actions">
                    <button class="btn btn-primary btn-sm" onclick="app.addRecipeToLog('${r.id}')">+ Agregar al registro</button>
                    <button class="btn btn-outline btn-sm" onclick="app.deleteRecipe('${r.id}')">Eliminar</button>
                </div>
            </div>
        `).join('');
    },

    addRecipeToLog(recipeId) {
        const recipes = Storage.getRecipes();
        const recipe = recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const entry = {
            name: recipe.name + ' (1 porcion)',
            calories: recipe.perPortion.calories,
            protein: recipe.perPortion.protein,
            carbs: recipe.perPortion.carbs,
            fat: recipe.perPortion.fat,
            portion: 0,
            mealType: 'almuerzo',
        };

        Storage.addEntry(this.getDateStr(), entry);
        Storage.trackFoodUsage(recipe.name);
        this.updateAll();
        this.showToast('Receta agregada: ' + recipe.name);
    },

    deleteRecipe(recipeId) {
        Storage.removeRecipe(recipeId);
        this.renderSavedRecipes();
        this.showToast('Receta eliminada');
    },

    // --- Export ---
    exportToPDF() {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const goals = Storage.getGoals();
            const profile = Storage.getProfile();
            const today = new Date();

            doc.setFontSize(20);
            doc.setTextColor(230, 81, 0);
            doc.text('Macros! - Reporte Nutricional', 20, 20);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text('Generado: ' + today.toLocaleDateString('es-ES', { dateStyle: 'long' }), 20, 28);

            let y = 40;

            if (profile && profile.name) {
                doc.setFontSize(14);
                doc.setTextColor(0);
                doc.text('Perfil: ' + profile.name, 20, y);
                y += 8;
                doc.setFontSize(10);
                doc.setTextColor(80);
                doc.text(`Peso: ${profile.weight}kg | Estatura: ${profile.height}cm | Edad: ${profile.age}`, 20, y);
                y += 12;
            }

            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Metas Diarias', 20, y);
            y += 8;
            doc.setFontSize(10);
            doc.setTextColor(80);
            doc.text(`Calorias: ${goals.calories} kcal | Proteina: ${goals.protein}g | Carbos: ${goals.carbs}g | Grasa: ${goals.fat}g`, 20, y);
            y += 12;

            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Ultimos 7 dias', 20, y);
            y += 8;

            for (let i = 6; i >= 0; i--) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const entries = Storage.getEntries(dateStr);
                let cal = 0, p = 0, c = 0, f = 0;
                entries.forEach(e => { cal += e.calories || 0; p += e.protein || 0; c += e.carbs || 0; f += e.fat || 0; });
                const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

                doc.setFontSize(9);
                doc.setTextColor(cal > goals.calories ? 198 : 0, cal > goals.calories ? 40 : 0, cal > goals.calories ? 40 : 0);
                doc.text(`${dayLabel}: ${Math.round(cal)} kcal | P:${Math.round(p)}g C:${Math.round(c)}g G:${Math.round(f)}g | ${entries.length} alimentos`, 20, y);
                y += 6;
            }

            y += 6;
            const streak = Storage.getStreak();
            doc.setFontSize(12);
            doc.setTextColor(230, 81, 0);
            doc.text(`Racha actual: ${streak} dias`, 20, y);

            doc.save('Macros-Reporte.pdf');
            this.showToast('PDF exportado');
        } catch (e) {
            this.showToast('Error al generar PDF. Recarga la pagina e intenta de nuevo.');
        }
    },

    exportToWord() {
        const goals = Storage.getGoals();
        const profile = Storage.getProfile();
        const today = new Date();
        const streak = Storage.getStreak();

        let html = `<html><head><meta charset="utf-8"><style>
            body{font-family:Calibri,sans-serif;padding:2rem;color:#333}
            h1{color:#e65100}h2{color:#5d4037;border-bottom:2px solid #ffcc80;padding-bottom:.5rem}
            table{border-collapse:collapse;width:100%;margin:1rem 0}
            th,td{border:1px solid #ddd;padding:.5rem;text-align:left}
            th{background:#fff3e0;color:#e65100}
            .over{color:#c62828;font-weight:bold}
        </style></head><body>`;
        html += `<h1>Macros! - Reporte Nutricional</h1>`;
        html += `<p>Generado: ${today.toLocaleDateString('es-ES', { dateStyle: 'long' })}</p>`;

        if (profile && profile.name) {
            html += `<h2>Perfil</h2><p>${profile.name} | ${profile.weight}kg | ${profile.height}cm | ${profile.age} anos</p>`;
        }

        html += `<h2>Metas Diarias</h2>`;
        html += `<p>Calorias: ${goals.calories} kcal | Proteina: ${goals.protein}g | Carbos: ${goals.carbs}g | Grasa: ${goals.fat}g</p>`;
        html += `<h2>Ultimos 7 dias</h2><table><tr><th>Dia</th><th>Calorias</th><th>Proteina</th><th>Carbos</th><th>Grasa</th><th>Alimentos</th></tr>`;

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const entries = Storage.getEntries(dateStr);
            let cal = 0, p = 0, c = 0, f = 0;
            entries.forEach(e => { cal += e.calories || 0; p += e.protein || 0; c += e.carbs || 0; f += e.fat || 0; });
            const dayLabel = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
            const overClass = cal > goals.calories ? ' class="over"' : '';
            html += `<tr><td>${dayLabel}</td><td${overClass}>${Math.round(cal)}</td><td>${Math.round(p)}g</td><td>${Math.round(c)}g</td><td>${Math.round(f)}g</td><td>${entries.length}</td></tr>`;
        }
        html += `</table>`;
        html += `<p><strong>Racha actual:</strong> ${streak} dias</p>`;

        const allDates = Storage.getAllDates();
        html += `<h2>Resumen General</h2>`;
        html += `<p>Total dias registrados: ${allDates.length} | Racha: ${streak} dias</p>`;
        html += `</body></html>`;

        const blob = new Blob([html], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Macros-Reporte.doc';
        link.click();
        URL.revokeObjectURL(link.href);
        this.showToast('Word exportado');
    },
};

document.addEventListener('DOMContentLoaded', () => app.init());
