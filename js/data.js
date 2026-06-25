const FOOD_DATABASE = [
    // Proteinas
    { name: "Pechuga de pollo", category: "proteinas", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: 100 },
    { name: "Huevo entero", category: "proteinas", calories: 155, protein: 13, carbs: 1.1, fat: 11, portion: 100 },
    { name: "Clara de huevo", category: "proteinas", calories: 52, protein: 11, carbs: 0.7, fat: 0.2, portion: 100 },
    { name: "Salmon", category: "proteinas", calories: 208, protein: 20, carbs: 0, fat: 13, portion: 100 },
    { name: "Atun en agua", category: "proteinas", calories: 116, protein: 26, carbs: 0, fat: 1, portion: 100 },
    { name: "Carne molida (magra)", category: "proteinas", calories: 250, protein: 26, carbs: 0, fat: 15, portion: 100 },
    { name: "Lomo de cerdo", category: "proteinas", calories: 143, protein: 26, carbs: 0, fat: 3.5, portion: 100 },
    { name: "Camaron", category: "proteinas", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, portion: 100 },
    { name: "Tofu firme", category: "proteinas", calories: 144, protein: 17, carbs: 3, fat: 9, portion: 100 },
    { name: "Pavo (pechuga)", category: "proteinas", calories: 135, protein: 30, carbs: 0, fat: 1, portion: 100 },

    // Carbohidratos
    { name: "Arroz blanco cocido", category: "carbohidratos", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: 100 },
    { name: "Arroz integral cocido", category: "carbohidratos", calories: 123, protein: 2.7, carbs: 26, fat: 1, portion: 100 },
    { name: "Pasta cocida", category: "carbohidratos", calories: 131, protein: 5, carbs: 25, fat: 1.1, portion: 100 },
    { name: "Pan integral (rebanada)", category: "carbohidratos", calories: 69, protein: 3.6, carbs: 12, fat: 1.1, portion: 28 },
    { name: "Pan blanco (rebanada)", category: "carbohidratos", calories: 75, protein: 2.7, carbs: 14, fat: 1, portion: 28 },
    { name: "Avena", category: "carbohidratos", calories: 389, protein: 17, carbs: 66, fat: 7, portion: 100 },
    { name: "Papa cocida", category: "carbohidratos", calories: 87, protein: 1.9, carbs: 20, fat: 0.1, portion: 100 },
    { name: "Camote cocido", category: "carbohidratos", calories: 90, protein: 2, carbs: 21, fat: 0.1, portion: 100 },
    { name: "Quinoa cocida", category: "carbohidratos", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, portion: 100 },
    { name: "Tortilla de maiz", category: "carbohidratos", calories: 52, protein: 1.4, carbs: 11, fat: 0.7, portion: 26 },

    // Frutas
    { name: "Platano", category: "frutas", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: 100 },
    { name: "Manzana", category: "frutas", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: 100 },
    { name: "Naranja", category: "frutas", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, portion: 100 },
    { name: "Fresa", category: "frutas", calories: 33, protein: 0.7, carbs: 8, fat: 0.3, portion: 100 },
    { name: "Arandanos", category: "frutas", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, portion: 100 },
    { name: "Uvas", category: "frutas", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, portion: 100 },
    { name: "Mango", category: "frutas", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, portion: 100 },
    { name: "Palta/Aguacate", category: "frutas", calories: 160, protein: 2, carbs: 9, fat: 15, portion: 100 },
    { name: "Sandia", category: "frutas", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, portion: 100 },
    { name: "Pina", category: "frutas", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, portion: 100 },

    // Verduras
    { name: "Brocoli", category: "verduras", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: 100 },
    { name: "Espinaca", category: "verduras", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, portion: 100 },
    { name: "Tomate", category: "verduras", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: 100 },
    { name: "Zanahoria", category: "verduras", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, portion: 100 },
    { name: "Lechuga", category: "verduras", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, portion: 100 },
    { name: "Pepino", category: "verduras", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, portion: 100 },
    { name: "Cebolla", category: "verduras", calories: 40, protein: 1.1, carbs: 9, fat: 0.1, portion: 100 },
    { name: "Pimiento", category: "verduras", calories: 31, protein: 1, carbs: 6, fat: 0.3, portion: 100 },
    { name: "Champiñones", category: "verduras", calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, portion: 100 },
    { name: "Coliflor", category: "verduras", calories: 25, protein: 1.9, carbs: 5, fat: 0.3, portion: 100 },

    // Lacteos
    { name: "Leche entera", category: "lacteos", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: 100 },
    { name: "Leche descremada", category: "lacteos", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, portion: 100 },
    { name: "Yogurt natural", category: "lacteos", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, portion: 100 },
    { name: "Yogurt griego", category: "lacteos", calories: 97, protein: 9, carbs: 3.6, fat: 5, portion: 100 },
    { name: "Queso cheddar", category: "lacteos", calories: 403, protein: 25, carbs: 1.3, fat: 33, portion: 100 },
    { name: "Queso cottage", category: "lacteos", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, portion: 100 },
    { name: "Queso mozzarella", category: "lacteos", calories: 280, protein: 28, carbs: 3.1, fat: 17, portion: 100 },

    // Snacks
    { name: "Almendras", category: "snacks", calories: 579, protein: 21, carbs: 22, fat: 50, portion: 100 },
    { name: "Mani/Cacahuate", category: "snacks", calories: 567, protein: 26, carbs: 16, fat: 49, portion: 100 },
    { name: "Barra de proteina", category: "snacks", calories: 200, protein: 20, carbs: 22, fat: 7, portion: 60 },
    { name: "Galletas de arroz", category: "snacks", calories: 35, protein: 0.7, carbs: 7.3, fat: 0.3, portion: 9 },
    { name: "Chocolate negro 70%", category: "snacks", calories: 598, protein: 8, carbs: 46, fat: 43, portion: 100 },
    { name: "Granola", category: "snacks", calories: 471, protein: 10, carbs: 64, fat: 20, portion: 100 },
    { name: "Whey protein (scoop)", category: "snacks", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 30 },
    { name: "Nueces", category: "snacks", calories: 654, protein: 15, carbs: 14, fat: 65, portion: 100 },
    { name: "Semillas de chia", category: "snacks", calories: 486, protein: 17, carbs: 42, fat: 31, portion: 100 },
    { name: "Mantequilla de mani", category: "snacks", calories: 588, protein: 25, carbs: 20, fat: 50, portion: 100 },

    // Bebidas
    { name: "Coca-Cola (lata)", category: "bebidas", calories: 139, protein: 0, carbs: 35, fat: 0, portion: 330 },
    { name: "Coca-Cola Zero (lata)", category: "bebidas", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 330 },
    { name: "Pepsi (lata)", category: "bebidas", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 355 },
    { name: "Sprite (lata)", category: "bebidas", calories: 140, protein: 0, carbs: 38, fat: 0, portion: 355 },
    { name: "Fanta (lata)", category: "bebidas", calories: 160, protein: 0, carbs: 44, fat: 0, portion: 355 },
    { name: "Jugo de naranja natural", category: "bebidas", calories: 45, protein: 0.7, carbs: 10, fat: 0.2, portion: 100 },
    { name: "Cafe negro (taza)", category: "bebidas", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    { name: "Cafe con leche", category: "bebidas", calories: 67, protein: 3.4, carbs: 6, fat: 3.6, portion: 240 },
    { name: "Te negro (taza)", category: "bebidas", calories: 2, protein: 0, carbs: 0.5, fat: 0, portion: 240 },
    { name: "Cerveza (lata)", category: "bebidas", calories: 154, protein: 1.6, carbs: 13, fat: 0, portion: 355 },
    { name: "Vino tinto (copa)", category: "bebidas", calories: 125, protein: 0.1, carbs: 3.8, fat: 0, portion: 150 },
    { name: "Agua mineral", category: "bebidas", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Bebida energetica (Red Bull)", category: "bebidas", calories: 110, protein: 0, carbs: 28, fat: 0, portion: 250 },
    { name: "Leche chocolatada", category: "bebidas", calories: 83, protein: 3.2, carbs: 12, fat: 2.5, portion: 100 },

    // Bebidas CCU
    { name: "Bilz CCU (botella 350ml)", category: "bebidas", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Pap CCU (botella 350ml)", category: "bebidas", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Bilz CCU (lata 350ml)", category: "bebidas", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Pap CCU (lata 350ml)", category: "bebidas", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Cachantun con gas (500ml)", category: "bebidas", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Cachantun sin gas (500ml)", category: "bebidas", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Kem CCU (350ml)", category: "bebidas", calories: 161, protein: 0, carbs: 40, fat: 0, portion: 350 },
    { name: "Kem Zero CCU (350ml)", category: "bebidas", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    { name: "Crush CCU naranja (350ml)", category: "bebidas", calories: 165, protein: 0, carbs: 41, fat: 0, portion: 350 },
    { name: "Watts nectar naranja (200ml)", category: "bebidas", calories: 90, protein: 0.4, carbs: 22, fat: 0, portion: 200 },
    { name: "Watts nectar durazno (200ml)", category: "bebidas", calories: 84, protein: 0.2, carbs: 21, fat: 0, portion: 200 },
    { name: "Livean CCU agua saborizada (500ml)", category: "bebidas", calories: 10, protein: 0, carbs: 2, fat: 0, portion: 500 },
    { name: "Pepsi Chile (lata 350ml)", category: "bebidas", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 350 },

    // Productos Chilenos - Snacks Carozzi
    { name: "Caracoquesos Carozzi (bolsa 65g)", category: "chileno", calories: 330, protein: 5, carbs: 40, fat: 16, portion: 65 },
    { name: "Ramitas Carozzi queso (bolsa 60g)", category: "chileno", calories: 300, protein: 4, carbs: 36, fat: 15, portion: 60 },
    { name: "Ramitas Carozzi natural (bolsa 60g)", category: "chileno", calories: 295, protein: 3.5, carbs: 37, fat: 15, portion: 60 },
    { name: "Chis Pop Carozzi (bolsa 72g)", category: "chileno", calories: 370, protein: 4, carbs: 42, fat: 20, portion: 72 },
    { name: "Pikeos Carozzi (bolsa 80g)", category: "chileno", calories: 400, protein: 6, carbs: 48, fat: 20, portion: 80 },
    { name: "Bolitas de chocolate Costa (bolsa 50g)", category: "chileno", calories: 250, protein: 3, carbs: 32, fat: 12, portion: 50 },

    // Productos Chilenos - Galletas y dulces
    { name: "Galleta Tritón Costa (unidad)", category: "chileno", calories: 67, protein: 0.8, carbs: 9, fat: 3, portion: 14 },
    { name: "Galleta Kuky Costa (unidad)", category: "chileno", calories: 55, protein: 0.6, carbs: 7, fat: 2.5, portion: 11 },
    { name: "Alfajor Guaymallen (unidad)", category: "chileno", calories: 170, protein: 2, carbs: 28, fat: 6, portion: 40 },
    { name: "Super 8 Nestle (unidad)", category: "chileno", calories: 105, protein: 1, carbs: 12, fat: 6, portion: 23 },
    { name: "Sahne Nuss Nestle (barra 20g)", category: "chileno", calories: 110, protein: 1.5, carbs: 11, fat: 7, portion: 20 },
    { name: "Negrita Galleta McKay (unidad)", category: "chileno", calories: 130, protein: 1.5, carbs: 18, fat: 6, portion: 28 },
    { name: "Galleta Soda McKay (unidad)", category: "chileno", calories: 30, protein: 0.7, carbs: 5, fat: 0.8, portion: 7 },
    { name: "Galleta de Agua McKay (unidad)", category: "chileno", calories: 28, protein: 0.6, carbs: 5, fat: 0.6, portion: 7 },

    // Productos Chilenos - Pan y panaderia
    { name: "Marraqueta (unidad)", category: "chileno", calories: 280, protein: 9, carbs: 56, fat: 1.5, portion: 100 },
    { name: "Hallulla (unidad)", category: "chileno", calories: 310, protein: 8, carbs: 52, fat: 7, portion: 100 },
    { name: "Pan de molde Ideal (rebanada)", category: "chileno", calories: 72, protein: 2.5, carbs: 13, fat: 1, portion: 27 },
    { name: "Pan integral Ideal (rebanada)", category: "chileno", calories: 65, protein: 3, carbs: 12, fat: 1, portion: 27 },
    { name: "Dobladita (unidad)", category: "chileno", calories: 180, protein: 4, carbs: 30, fat: 5, portion: 60 },

    // Productos Chilenos - Comidas tipicas
    { name: "Empanada de pino (unidad)", category: "chileno", calories: 350, protein: 14, carbs: 32, fat: 18, portion: 180 },
    { name: "Empanada de queso (unidad)", category: "chileno", calories: 280, protein: 10, carbs: 28, fat: 14, portion: 140 },
    { name: "Completo italiano", category: "chileno", calories: 450, protein: 14, carbs: 42, fat: 24, portion: 250 },
    { name: "Sopaipilla (unidad)", category: "chileno", calories: 150, protein: 2.5, carbs: 18, fat: 8, portion: 50 },
    { name: "Sopaipilla pasada (unidad)", category: "chileno", calories: 250, protein: 3, carbs: 40, fat: 9, portion: 80 },
    { name: "Pastel de choclo (porcion)", category: "chileno", calories: 380, protein: 18, carbs: 35, fat: 18, portion: 250 },
    { name: "Cazuela de vacuno (plato)", category: "chileno", calories: 320, protein: 22, carbs: 30, fat: 12, portion: 400 },
    { name: "Porotos granados (plato)", category: "chileno", calories: 280, protein: 14, carbs: 42, fat: 6, portion: 350 },
    { name: "Charquican (plato)", category: "chileno", calories: 250, protein: 15, carbs: 28, fat: 8, portion: 300 },
    { name: "Humita (unidad)", category: "chileno", calories: 200, protein: 6, carbs: 30, fat: 7, portion: 150 },
    { name: "Choripan (unidad)", category: "chileno", calories: 380, protein: 16, carbs: 30, fat: 22, portion: 200 },
    { name: "Barros Luco (sandwich)", category: "chileno", calories: 520, protein: 30, carbs: 38, fat: 26, portion: 250 },
    { name: "Barros Jarpa (sandwich)", category: "chileno", calories: 460, protein: 22, carbs: 38, fat: 24, portion: 220 },
    { name: "Churrasco italiano", category: "chileno", calories: 580, protein: 28, carbs: 45, fat: 30, portion: 300 },
    { name: "Lomo a lo pobre (plato)", category: "chileno", calories: 750, protein: 35, carbs: 55, fat: 42, portion: 400 },

    // Productos Chilenos - Lacteos locales
    { name: "Manjar Colun (cucharada)", category: "chileno", calories: 65, protein: 1.2, carbs: 12, fat: 1.5, portion: 20 },
    { name: "Yogurt Colun natural (vasito)", category: "chileno", calories: 95, protein: 5, carbs: 12, fat: 3, portion: 125 },
    { name: "Yogurt Colun frutilla (vasito)", category: "chileno", calories: 110, protein: 4.5, carbs: 18, fat: 2.5, portion: 125 },
    { name: "Leche Colun entera (vaso 200ml)", category: "chileno", calories: 122, protein: 6.4, carbs: 9.6, fat: 6.6, portion: 200 },
    { name: "Leche Colun descremada (vaso 200ml)", category: "chileno", calories: 68, protein: 6.8, carbs: 10, fat: 0.2, portion: 200 },
    { name: "Queso Chanco (porcion 30g)", category: "chileno", calories: 105, protein: 7, carbs: 0.5, fat: 8.5, portion: 30 },

    // Productos Chilenos - Cereales y otros
    { name: "Mote con huesillo (vaso)", category: "chileno", calories: 280, protein: 3, carbs: 65, fat: 0.5, portion: 300 },
    { name: "Cereal Zucosos Nestle (porcion)", category: "chileno", calories: 150, protein: 2, carbs: 33, fat: 1, portion: 40 },
    { name: "Cereal Chocapic Nestle (porcion)", category: "chileno", calories: 152, protein: 2.5, carbs: 32, fat: 1.5, portion: 40 },
];

const PRESETS = {
    perdida: { calories: 1500, protein: 130, carbs: 150, fat: 50, water: 10 },
    mantenimiento: { calories: 2000, protein: 150, carbs: 250, fat: 65, water: 8 },
    volumen: { calories: 2800, protein: 180, carbs: 350, fat: 80, water: 10 },
};

class Storage {
    static get(key, fallback) {
        try {
            const val = localStorage.getItem('nutritrack_' + key);
            return val ? JSON.parse(val) : fallback;
        } catch {
            return fallback;
        }
    }

    static set(key, value) {
        localStorage.setItem('nutritrack_' + key, JSON.stringify(value));
    }

    static getGoals() {
        return Storage.get('goals', {
            calories: 2000,
            protein: 150,
            carbs: 250,
            fat: 65,
            water: 8
        });
    }

    static setGoals(goals) {
        Storage.set('goals', goals);
    }

    static getEntries(dateStr) {
        const all = Storage.get('entries', {});
        return all[dateStr] || [];
    }

    static setEntries(dateStr, entries) {
        const all = Storage.get('entries', {});
        all[dateStr] = entries;
        Storage.set('entries', all);
    }

    static addEntry(dateStr, entry) {
        const entries = Storage.getEntries(dateStr);
        entry.id = Date.now() + Math.random().toString(36).slice(2, 6);
        entries.push(entry);
        Storage.setEntries(dateStr, entries);
        return entry;
    }

    static removeEntry(dateStr, entryId) {
        let entries = Storage.getEntries(dateStr);
        entries = entries.filter(e => e.id !== entryId);
        Storage.setEntries(dateStr, entries);
    }

    static getWater(dateStr) {
        const all = Storage.get('water', {});
        return all[dateStr] || 0;
    }

    static setWater(dateStr, count) {
        const all = Storage.get('water', {});
        all[dateStr] = count;
        Storage.set('water', all);
    }

    static getAllDates() {
        const entries = Storage.get('entries', {});
        return Object.keys(entries).filter(d => entries[d].length > 0).sort();
    }

    static getProfile() {
        return Storage.get('profile', null);
    }

    static setProfile(profile) {
        Storage.set('profile', profile);
    }
}
