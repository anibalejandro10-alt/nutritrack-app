const app = {
    currentDate: new Date(),
    historyWeekOffset: 0,

    scanner: null,
    scannedProduct: null,

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
        this.renderFoodDatabase();
        this.updateAll();
        this.loadProfileIfExists();
    },

    // --- Navigation ---
    bindNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showView(link.dataset.view);
            });
        });
    },

    showView(viewName) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

        const view = document.getElementById('view-' + viewName);
        const link = document.querySelector(`[data-view="${viewName}"]`);
        if (view) view.classList.add('active');
        if (link) link.classList.add('active');

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('active');

        if (viewName !== 'scanner') this.stopScanner();
        if (viewName === 'history') this.renderHistory();
        if (viewName === 'stats') this.renderStats();
        if (viewName === 'goals') this.loadGoalsForm();
        if (viewName === 'profile') this.loadProfileForm();
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

        document.getElementById('totalCalories').textContent = Math.round(totals.calories);
        document.getElementById('totalProtein').textContent = Math.round(totals.protein);
        document.getElementById('totalCarbs').textContent = Math.round(totals.carbs);
        document.getElementById('totalFat').textContent = Math.round(totals.fat);

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
                html += `
                    <div class="meal-item">
                        <div class="meal-item-info">
                            <div class="meal-item-name">${this.escapeHtml(entry.name)}</div>
                            <div class="meal-item-macros">
                                <span><span class="macro-dot p"></span> ${Math.round(entry.protein || 0)}g</span>
                                <span><span class="macro-dot c"></span> ${Math.round(entry.carbs || 0)}g</span>
                                <span><span class="macro-dot f"></span> ${Math.round(entry.fat || 0)}g</span>
                                <span>${entry.portion || ''}g</span>
                            </div>
                        </div>
                        <div class="meal-item-cal">${Math.round(entry.calories)} kcal</div>
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
            ctx.strokeStyle = '#ffcc80';
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

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 20px Segoe UI';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(Math.round(total), cx, cy - 8);
        ctx.font = '11px Segoe UI';
        ctx.fillStyle = '#8d6e63';
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
            const entry = {
                name: document.getElementById('foodName').value.trim(),
                calories: parseFloat(document.getElementById('foodCalories').value) || 0,
                protein: parseFloat(document.getElementById('foodProtein').value) || 0,
                carbs: parseFloat(document.getElementById('foodCarbs').value) || 0,
                fat: parseFloat(document.getElementById('foodFat').value) || 0,
                portion: parseFloat(document.getElementById('foodPortion').value) || 0,
                mealType: document.getElementById('mealType').value,
            };

            if (!entry.name) return;

            Storage.addEntry(this.getDateStr(), entry);
            e.target.reset();
            this.showView('dashboard');
            this.updateAll();
            this.showToast('Alimento agregado');
        });
    },

    fillFoodForm(food) {
        document.getElementById('foodName').value = food.name;
        document.getElementById('foodCalories').value = food.calories;
        document.getElementById('foodProtein').value = food.protein;
        document.getElementById('foodCarbs').value = food.carbs;
        document.getElementById('foodFat').value = food.fat;
        document.getElementById('foodPortion').value = food.portion;
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

        container.innerHTML = foods.map(food => `
            <div class="food-db-item" onclick='app.fillFoodForm(${JSON.stringify(food)})'>
                <div>
                    <div class="food-db-name">${food.name}</div>
                    <div class="food-db-detail">P: ${food.protein}g | C: ${food.carbs}g | G: ${food.fat}g | ${food.portion}g</div>
                </div>
                <div class="food-db-cal">${food.calories} kcal</div>
            </div>
        `).join('');
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

        // Grid lines
        ctx.strokeStyle = '#ffcc80';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartH / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(canvas.width - padding.right, y);
            ctx.stroke();

            ctx.fillStyle = '#5d4037';
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
                ctx.fillStyle = '#1a1a1a';
                ctx.font = 'bold 11px Segoe UI';
                ctx.textAlign = 'center';
                ctx.fillText(Math.round(d.calories), x + barWidth / 2, y - 6);
            }

            // Day label
            ctx.fillStyle = '#8d6e63';
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
            this.showToast('Perfil guardado');
        });
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
            document.querySelector('.logo').innerHTML = `Nutri<span>Track</span>`;
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
                    <input type="number" id="scannedPortion" value="${product.portion}" min="1" onchange="app.updateScannedPortion(this.value)" oninput="app.updateScannedPortion(this.value)">
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
                    <input type="number" id="scannedPortion" value="100" min="1" onchange="app.updateScannedPortion(this.value)" oninput="app.updateScannedPortion(this.value)">
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
        this.updateAll();
        this.showToast('Producto agregado: ' + entry.name);

        document.getElementById('scannerResultPanel').style.display = 'none';
        this.scannedProduct = null;
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
};

document.addEventListener('DOMContentLoaded', () => app.init());
