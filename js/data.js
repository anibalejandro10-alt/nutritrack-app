const FOOD_DATABASE = [
    // ==================== CARNES BLANCAS ====================
    { name: "Pechuga de pollo", category: "carnes_blancas", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: 100, unitWeight: 170, preparations: [
        { name: "A la plancha", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: "Frita", calories: 220, protein: 27, carbs: 5, fat: 10 },
        { name: "Al horno", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: "Hervida", calories: 150, protein: 30, carbs: 0, fat: 2.5 },
        { name: "Apanada", calories: 260, protein: 24, carbs: 12, fat: 14 },
    ] },
    { name: "Muslo de pollo (sin piel)", category: "carnes_blancas", calories: 209, protein: 26, carbs: 0, fat: 10.9, portion: 100, unitWeight: 85, preparations: [
        { name: "A la plancha", calories: 209, protein: 26, carbs: 0, fat: 10.9 },
        { name: "Frito", calories: 260, protein: 24, carbs: 3, fat: 15.5 },
        { name: "Al horno", calories: 220, protein: 25, carbs: 0, fat: 12 },
        { name: "Guisado", calories: 200, protein: 23, carbs: 4, fat: 10 },
    ] },
    { name: "Ala de pollo", category: "carnes_blancas", calories: 203, protein: 30, carbs: 0, fat: 8.1, portion: 100, unitWeight: 34 },
    { name: "Pollo entero asado", category: "carnes_blancas", calories: 239, protein: 27, carbs: 0, fat: 14, portion: 100, unitWeight: 200, preparations: [
        { name: "Asado", calories: 239, protein: 27, carbs: 0, fat: 14 },
        { name: "Frito", calories: 280, protein: 25, carbs: 5, fat: 18 },
        { name: "Al horno", calories: 230, protein: 28, carbs: 0, fat: 12 },
        { name: "Hervido", calories: 200, protein: 29, carbs: 0, fat: 8 },
    ] },
    { name: "Huevo entero", category: "carnes_blancas", calories: 155, protein: 13, carbs: 1.1, fat: 11, portion: 100, unitWeight: 50, preparations: [
        { name: "Cocido/Duro", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
        { name: "Frito en aceite", calories: 196, protein: 13.6, carbs: 0.8, fat: 15 },
        { name: "Revuelto", calories: 149, protein: 10.2, carbs: 1.6, fat: 11.2 },
        { name: "Pochado", calories: 143, protein: 12.6, carbs: 0.7, fat: 10 },
        { name: "Omelette", calories: 154, protein: 10.6, carbs: 0.6, fat: 12 },
    ] },
    { name: "Huevo entero (unidad 50g)", category: "carnes_blancas", calories: 78, protein: 6.5, carbs: 0.6, fat: 5.5, portion: 50 },
    { name: "Clara de huevo", category: "carnes_blancas", calories: 52, protein: 11, carbs: 0.7, fat: 0.2, portion: 100, unitWeight: 33 },
    { name: "Salmon", category: "carnes_blancas", calories: 208, protein: 20, carbs: 0, fat: 13, portion: 100, unitWeight: 125, preparations: [
        { name: "A la plancha", calories: 208, protein: 20, carbs: 0, fat: 13 },
        { name: "Al horno", calories: 183, protein: 25, carbs: 0, fat: 8.5 },
        { name: "Ahumado", calories: 117, protein: 18, carbs: 0, fat: 4.3 },
        { name: "Crudo/Sashimi", calories: 127, protein: 20, carbs: 0, fat: 4.7 },
    ] },
    { name: "Atun en agua", category: "carnes_blancas", calories: 116, protein: 26, carbs: 0, fat: 1, portion: 100, unitWeight: 112, preparations: [
        { name: "Directo de lata", calories: 116, protein: 26, carbs: 0, fat: 1 },
        { name: "A la plancha", calories: 130, protein: 29, carbs: 0, fat: 1.3 },
        { name: "Al horno", calories: 128, protein: 28, carbs: 0, fat: 1.2 },
    ] },
    { name: "Atun en aceite", category: "carnes_blancas", calories: 198, protein: 29, carbs: 0, fat: 8, portion: 100, unitWeight: 112 },
    { name: "Pavo (pechuga)", category: "carnes_blancas", calories: 135, protein: 30, carbs: 0, fat: 1, portion: 100, unitWeight: 150 },
    { name: "Merluza", category: "carnes_blancas", calories: 90, protein: 18, carbs: 0, fat: 1.3, portion: 100, unitWeight: 120, preparations: [
        { name: "A la plancha", calories: 90, protein: 18, carbs: 0, fat: 1.3 },
        { name: "Frita", calories: 197, protein: 16, carbs: 8, fat: 12 },
        { name: "Al horno", calories: 95, protein: 19, carbs: 0, fat: 1.5 },
        { name: "Al vapor", calories: 85, protein: 18, carbs: 0, fat: 1 },
    ] },
    { name: "Reineta", category: "carnes_blancas", calories: 85, protein: 17, carbs: 0, fat: 1.5, portion: 100, unitWeight: 150 },
    { name: "Congrio", category: "carnes_blancas", calories: 95, protein: 20, carbs: 0, fat: 1.2, portion: 100, unitWeight: 150 },
    { name: "Tilapia", category: "carnes_blancas", calories: 96, protein: 20, carbs: 0, fat: 1.7, portion: 100, unitWeight: 115 },
    { name: "Trucha", category: "carnes_blancas", calories: 148, protein: 21, carbs: 0, fat: 6.6, portion: 100, unitWeight: 115 },
    { name: "Sardina en lata", category: "carnes_blancas", calories: 208, protein: 25, carbs: 0, fat: 11, portion: 100, unitWeight: 92 },
    { name: "Jamon de pavo", category: "carnes_blancas", calories: 104, protein: 17, carbs: 2, fat: 3, portion: 100, unitWeight: 20 },
    // Super Pollo y pavo San Jorge
    { name: "Pechuga Super Pollo (100g)", category: "carnes_blancas", calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: 100, preparations: [
        { name: "A la plancha", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: "Al horno", calories: 160, protein: 31, carbs: 0, fat: 3.2 },
        { name: "Hervida", calories: 150, protein: 30, carbs: 0, fat: 2.5 },
        { name: "Apanada", calories: 255, protein: 24, carbs: 12, fat: 14 },
    ] },
    { name: "Pechuga ahumada Super Pollo (rebanada 20g)", category: "carnes_blancas", calories: 26, protein: 5, carbs: 0.3, fat: 0.5, portion: 20 },
    { name: "Pavo ahumado San Jorge (rebanada 20g)", category: "carnes_blancas", calories: 22, protein: 3.5, carbs: 0.5, fat: 0.6, portion: 20 },
    // Conservas de pescado chilenas
    { name: "Atun Albacora en agua (lata 160g escurrida)", category: "carnes_blancas", calories: 176, protein: 38, carbs: 0, fat: 1.5, portion: 160 },
    { name: "Atun Albacora en aceite (lata 160g escurrida)", category: "carnes_blancas", calories: 304, protein: 36, carbs: 0, fat: 17, portion: 160 },
    { name: "Sardinas Malloa en salsa de tomate (100g)", category: "carnes_blancas", calories: 168, protein: 18, carbs: 2, fat: 9, portion: 100 },
    { name: "Sardinas Malloa en aceite (100g)", category: "carnes_blancas", calories: 208, protein: 20, carbs: 0, fat: 13, portion: 100 },

    // ==================== CARNES ROJAS ====================
    { name: "Carne molida (magra)", category: "carnes_rojas", calories: 250, protein: 26, carbs: 0, fat: 15, portion: 100, preparations: [
        { name: "A la plancha", calories: 250, protein: 26, carbs: 0, fat: 15 },
        { name: "Guisada", calories: 220, protein: 24, carbs: 3, fat: 12 },
        { name: "Al horno", calories: 245, protein: 26, carbs: 0, fat: 14.5 },
    ] },
    { name: "Carne molida (extra magra)", category: "carnes_rojas", calories: 176, protein: 26, carbs: 0, fat: 7.6, portion: 100 },
    { name: "Lomo de cerdo", category: "carnes_rojas", calories: 143, protein: 26, carbs: 0, fat: 3.5, portion: 100, unitWeight: 150, preparations: [
        { name: "A la plancha", calories: 143, protein: 26, carbs: 0, fat: 3.5 },
        { name: "Al horno", calories: 150, protein: 27, carbs: 0, fat: 4 },
        { name: "Frito", calories: 210, protein: 24, carbs: 2, fat: 12 },
        { name: "Guisado", calories: 165, protein: 25, carbs: 2, fat: 6 },
    ] },
    { name: "Chuleta de cerdo", category: "carnes_rojas", calories: 231, protein: 25, carbs: 0, fat: 14, portion: 100, unitWeight: 125 },
    { name: "Costilla de cerdo", category: "carnes_rojas", calories: 277, protein: 20, carbs: 0, fat: 21, portion: 100, unitWeight: 150 },
    { name: "Lomo vetado", category: "carnes_rojas", calories: 271, protein: 26, carbs: 0, fat: 18, portion: 100, unitWeight: 200 },
    { name: "Filete de res", category: "carnes_rojas", calories: 271, protein: 26, carbs: 0, fat: 18, portion: 100, unitWeight: 200, preparations: [
        { name: "A la plancha", calories: 271, protein: 26, carbs: 0, fat: 18 },
        { name: "Al horno", calories: 250, protein: 27, carbs: 0, fat: 15 },
        { name: "Frito", calories: 310, protein: 24, carbs: 3, fat: 23 },
        { name: "Guisado", calories: 240, protein: 25, carbs: 4, fat: 13 },
    ] },
    { name: "Carne de cordero", category: "carnes_rojas", calories: 294, protein: 25, carbs: 0, fat: 21, portion: 100, unitWeight: 150 },
    { name: "Chorizo", category: "carnes_rojas", calories: 455, protein: 24, carbs: 2, fat: 38, portion: 100, unitWeight: 60 },
    { name: "Jamon serrano", category: "carnes_rojas", calories: 241, protein: 31, carbs: 0.3, fat: 12, portion: 100, unitWeight: 15 },
    { name: "Longaniza", category: "carnes_rojas", calories: 320, protein: 18, carbs: 1.5, fat: 27, portion: 100, unitWeight: 80 },
    { name: "Vienesa/Salchicha", category: "carnes_rojas", calories: 290, protein: 11, carbs: 3, fat: 26, portion: 100, unitWeight: 50 },
    // Cecinas San Jorge (Agrosuper)
    { name: "Churrasco de vacuno San Jorge (120g)", category: "carnes_rojas", calories: 198, protein: 24, carbs: 0, fat: 11, portion: 120, preparations: [
        { name: "A la plancha", calories: 198, protein: 24, carbs: 0, fat: 11 },
        { name: "Frito", calories: 240, protein: 22, carbs: 0, fat: 16 },
        { name: "Al horno", calories: 190, protein: 24, carbs: 0, fat: 10 },
    ] },
    { name: "Longaniza San Jorge (unidad 80g)", category: "carnes_rojas", calories: 254, protein: 12, carbs: 1, fat: 22, portion: 80 },
    { name: "Vienesa San Jorge (unidad 50g)", category: "carnes_rojas", calories: 145, protein: 5.5, carbs: 1.5, fat: 13, portion: 50 },
    { name: "Mortadela San Jorge (rebanada 25g)", category: "carnes_rojas", calories: 68, protein: 3, carbs: 1, fat: 6, portion: 25 },
    { name: "Jamon de pierna San Jorge (rebanada 20g)", category: "carnes_rojas", calories: 22, protein: 3.5, carbs: 0.5, fat: 0.7, portion: 20 },
    { name: "Costillar cerdo adobado San Jorge (150g)", category: "carnes_rojas", calories: 390, protein: 28, carbs: 2, fat: 30, portion: 150, preparations: [
        { name: "A la plancha", calories: 390, protein: 28, carbs: 2, fat: 30 },
        { name: "Al horno", calories: 370, protein: 29, carbs: 2, fat: 28 },
        { name: "BBQ", calories: 410, protein: 27, carbs: 5, fat: 31 },
    ] },
    { name: "Plateada de vacuno San Jorge (100g)", category: "carnes_rojas", calories: 290, protein: 23, carbs: 0, fat: 22, portion: 100, preparations: [
        { name: "Estofada", calories: 290, protein: 23, carbs: 0, fat: 22 },
        { name: "Al horno", calories: 285, protein: 24, carbs: 0, fat: 20 },
    ] },

    // ==================== MARISCOS ====================
    { name: "Camaron", category: "mariscos", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, portion: 100, unitWeight: 10, preparations: [
        { name: "Cocido", calories: 99, protein: 24, carbs: 0.2, fat: 0.3 },
        { name: "A la plancha", calories: 120, protein: 24, carbs: 0, fat: 2 },
        { name: "Frito", calories: 242, protein: 18, carbs: 11, fat: 14 },
        { name: "Al ajillo", calories: 150, protein: 22, carbs: 2, fat: 6 },
    ] },
    { name: "Pulpo", category: "mariscos", calories: 82, protein: 15, carbs: 2.2, fat: 1, portion: 100 },
    { name: "Calamar", category: "mariscos", calories: 92, protein: 15.6, carbs: 3.1, fat: 1.4, portion: 100 },
    { name: "Mejillones", category: "mariscos", calories: 86, protein: 12, carbs: 3.7, fat: 2.2, portion: 100 },

    // ==================== FRUTAS ====================
    { name: "Platano", category: "frutas", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, portion: 100, unitWeight: 118 },
    { name: "Manzana", category: "frutas", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, portion: 100, unitWeight: 182 },
    { name: "Naranja", category: "frutas", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, portion: 100, unitWeight: 131 },
    { name: "Fresa", category: "frutas", calories: 33, protein: 0.7, carbs: 8, fat: 0.3, portion: 100 },
    { name: "Arandanos", category: "frutas", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, portion: 100 },
    { name: "Uvas", category: "frutas", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, portion: 100 },
    { name: "Mango", category: "frutas", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, portion: 100, unitWeight: 200 },
    { name: "Palta/Aguacate", category: "frutas", calories: 160, protein: 2, carbs: 9, fat: 15, portion: 100, unitWeight: 136 },
    { name: "Sandia", category: "frutas", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, portion: 100 },
    { name: "Pina", category: "frutas", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, portion: 100 },
    { name: "Kiwi", category: "frutas", calories: 61, protein: 1.1, carbs: 15, fat: 0.5, portion: 100, unitWeight: 76 },
    { name: "Cereza", category: "frutas", calories: 50, protein: 1, carbs: 12, fat: 0.3, portion: 100 },
    { name: "Pera", category: "frutas", calories: 57, protein: 0.4, carbs: 15, fat: 0.1, portion: 100, unitWeight: 178 },
    { name: "Durazno/Melocoton", category: "frutas", calories: 39, protein: 0.9, carbs: 10, fat: 0.3, portion: 100, unitWeight: 150 },
    { name: "Melon", category: "frutas", calories: 34, protein: 0.8, carbs: 8, fat: 0.2, portion: 100 },
    { name: "Papaya", category: "frutas", calories: 43, protein: 0.5, carbs: 11, fat: 0.3, portion: 100 },
    { name: "Mandarina", category: "frutas", calories: 53, protein: 0.8, carbs: 13, fat: 0.3, portion: 100, unitWeight: 88 },
    { name: "Pomelo/Toronja", category: "frutas", calories: 42, protein: 0.8, carbs: 11, fat: 0.1, portion: 100, unitWeight: 230 },
    { name: "Ciruela", category: "frutas", calories: 46, protein: 0.7, carbs: 11, fat: 0.3, portion: 100, unitWeight: 66 },
    { name: "Higo fresco", category: "frutas", calories: 74, protein: 0.8, carbs: 19, fat: 0.3, portion: 100, unitWeight: 50 },
    { name: "Frambuesa", category: "frutas", calories: 52, protein: 1.2, carbs: 12, fat: 0.7, portion: 100 },
    { name: "Mora", category: "frutas", calories: 43, protein: 1.4, carbs: 10, fat: 0.5, portion: 100 },
    { name: "Chirimoya", category: "frutas", calories: 75, protein: 1.6, carbs: 18, fat: 0.7, portion: 100, unitWeight: 160 },
    { name: "Lucuma", category: "frutas", calories: 99, protein: 1.5, carbs: 25, fat: 0.5, portion: 100 },
    { name: "Guayaba", category: "frutas", calories: 68, protein: 2.6, carbs: 14, fat: 1, portion: 100, unitWeight: 55 },
    { name: "Maracuya", category: "frutas", calories: 97, protein: 2.2, carbs: 23, fat: 0.7, portion: 100 },
    { name: "Coco rallado", category: "frutas", calories: 354, protein: 3.3, carbs: 15, fat: 33, portion: 100 },
    { name: "Datiles secos", category: "frutas", calories: 282, protein: 2.5, carbs: 75, fat: 0.4, portion: 100, unitWeight: 24 },
    { name: "Pasas", category: "frutas", calories: 299, protein: 3.1, carbs: 79, fat: 0.5, portion: 100 },
    { name: "Ciruelas pasas", category: "frutas", calories: 240, protein: 2.2, carbs: 64, fat: 0.4, portion: 100, unitWeight: 10 },

    // ==================== VERDURAS ====================
    { name: "Brocoli", category: "verduras", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, portion: 100, unitWeight: 150 },
    { name: "Espinaca", category: "verduras", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, portion: 100 },
    { name: "Tomate", category: "verduras", calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, portion: 100, unitWeight: 123 },
    { name: "Zanahoria", category: "verduras", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, portion: 100, unitWeight: 72 },
    { name: "Lechuga", category: "verduras", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, portion: 100 },
    { name: "Pepino", category: "verduras", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, portion: 100, unitWeight: 201 },
    { name: "Cebolla", category: "verduras", calories: 40, protein: 1.1, carbs: 9, fat: 0.1, portion: 100, unitWeight: 110 },
    { name: "Pimiento rojo", category: "verduras", calories: 31, protein: 1, carbs: 6, fat: 0.3, portion: 100, unitWeight: 119 },
    { name: "Pimiento verde", category: "verduras", calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2, portion: 100, unitWeight: 119 },
    { name: "Champiñones", category: "verduras", calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, portion: 100 },
    { name: "Coliflor", category: "verduras", calories: 25, protein: 1.9, carbs: 5, fat: 0.3, portion: 100 },
    { name: "Zapallo italiano/Calabacin", category: "verduras", calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, portion: 100, unitWeight: 196 },
    { name: "Zapallo/Calabaza", category: "verduras", calories: 26, protein: 1, carbs: 6.5, fat: 0.1, portion: 100 },
    { name: "Berenjena", category: "verduras", calories: 25, protein: 1, carbs: 6, fat: 0.2, portion: 100, unitWeight: 300 },
    { name: "Apio", category: "verduras", calories: 16, protein: 0.7, carbs: 3, fat: 0.2, portion: 100, unitWeight: 40 },
    { name: "Repollo/Col", category: "verduras", calories: 25, protein: 1.3, carbs: 6, fat: 0.1, portion: 100 },
    { name: "Col rizada/Kale", category: "verduras", calories: 49, protein: 4.3, carbs: 9, fat: 0.9, portion: 100 },
    { name: "Acelga", category: "verduras", calories: 19, protein: 1.8, carbs: 3.7, fat: 0.2, portion: 100 },
    { name: "Esparragos", category: "verduras", calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, portion: 100, unitWeight: 16 },
    { name: "Arvejas/Guisantes", category: "verduras", calories: 81, protein: 5.4, carbs: 14, fat: 0.4, portion: 100 },
    { name: "Choclo/Maiz desgranado", category: "verduras", calories: 86, protein: 3.3, carbs: 19, fat: 1.2, portion: 100, unitWeight: 90 },
    { name: "Betarraga/Remolacha", category: "verduras", calories: 43, protein: 1.6, carbs: 10, fat: 0.2, portion: 100, unitWeight: 82 },
    { name: "Alcachofa", category: "verduras", calories: 47, protein: 3.3, carbs: 11, fat: 0.2, portion: 100, unitWeight: 120 },
    { name: "Puerro", category: "verduras", calories: 61, protein: 1.5, carbs: 14, fat: 0.3, portion: 100, unitWeight: 89 },
    { name: "Ajo (diente)", category: "verduras", calories: 5, protein: 0.2, carbs: 1, fat: 0, portion: 3 },
    { name: "Jengibre fresco", category: "verduras", calories: 80, protein: 1.8, carbs: 18, fat: 0.8, portion: 100 },
    { name: "Palmitos", category: "verduras", calories: 28, protein: 2.7, carbs: 4.6, fat: 0.6, portion: 100 },
    { name: "Rucula", category: "verduras", calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, portion: 100 },

    // ==================== CEREALES ====================
    { name: "Arroz blanco cocido", category: "cereales", calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: 100, preparations: [
        { name: "Cocido normal", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        { name: "Frito", calories: 186, protein: 3.2, carbs: 25, fat: 8.5 },
        { name: "Al vapor", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        { name: "Graneado", calories: 135, protein: 2.8, carbs: 28, fat: 0.5 },
    ] },
    { name: "Arroz integral cocido", category: "cereales", calories: 123, protein: 2.7, carbs: 26, fat: 1, portion: 100 },
    { name: "Arroz basmati cocido", category: "cereales", calories: 121, protein: 3.5, carbs: 25, fat: 0.4, portion: 100 },
    { name: "Pasta cocida", category: "cereales", calories: 131, protein: 5, carbs: 25, fat: 1.1, portion: 100 },
    { name: "Pasta integral cocida", category: "cereales", calories: 124, protein: 5.3, carbs: 24, fat: 0.5, portion: 100 },
    { name: "Fideos de arroz cocidos", category: "cereales", calories: 108, protein: 0.9, carbs: 24, fat: 0.2, portion: 100 },
    { name: "Pan integral (rebanada)", category: "cereales", calories: 69, protein: 3.6, carbs: 12, fat: 1.1, portion: 28 },
    { name: "Pan blanco (rebanada)", category: "cereales", calories: 75, protein: 2.7, carbs: 14, fat: 1, portion: 28 },
    { name: "Pan pita integral", category: "cereales", calories: 170, protein: 6, carbs: 33, fat: 2, portion: 60 },
    { name: "Tortilla de harina", category: "cereales", calories: 312, protein: 8, carbs: 52, fat: 8, portion: 100, unitWeight: 45 },
    { name: "Avena", category: "cereales", calories: 389, protein: 17, carbs: 66, fat: 7, portion: 100 },
    { name: "Avena instantanea (sobre)", category: "cereales", calories: 130, protein: 4, carbs: 23, fat: 2.5, portion: 35 },
    { name: "Papa cocida", category: "cereales", calories: 87, protein: 1.9, carbs: 20, fat: 0.1, portion: 100, unitWeight: 150, preparations: [
        { name: "Cocida", calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
        { name: "Frita", calories: 312, protein: 3.4, carbs: 41, fat: 15 },
        { name: "Al horno", calories: 93, protein: 2.5, carbs: 21, fat: 0.1 },
        { name: "Pure", calories: 83, protein: 2, carbs: 14, fat: 2.3 },
    ] },
    { name: "Papa frita (casera)", category: "cereales", calories: 312, protein: 3.4, carbs: 41, fat: 15, portion: 100 },
    { name: "Pure de papa", category: "cereales", calories: 83, protein: 2, carbs: 14, fat: 2.3, portion: 100 },
    { name: "Camote cocido", category: "cereales", calories: 90, protein: 2, carbs: 21, fat: 0.1, portion: 100, unitWeight: 130 },
    { name: "Quinoa cocida", category: "cereales", calories: 120, protein: 4.4, carbs: 21, fat: 1.9, portion: 100 },
    { name: "Tortilla de maiz", category: "cereales", calories: 52, protein: 1.4, carbs: 11, fat: 0.7, portion: 26 },
    { name: "Cuscus cocido", category: "cereales", calories: 112, protein: 3.8, carbs: 23, fat: 0.2, portion: 100 },
    { name: "Choclo cocido", category: "cereales", calories: 96, protein: 3.4, carbs: 21, fat: 1.5, portion: 100, unitWeight: 150 },
    { name: "Pan de centeno (rebanada)", category: "cereales", calories: 83, protein: 2.7, carbs: 15, fat: 1.1, portion: 32 },
    { name: "Muesli", category: "cereales", calories: 340, protein: 10, carbs: 63, fat: 6, portion: 100 },
    { name: "Cereal fitness", category: "cereales", calories: 357, protein: 9, carbs: 73, fat: 2, portion: 100 },
    { name: "Cereal corn flakes", category: "cereales", calories: 357, protein: 7, carbs: 84, fat: 0.4, portion: 100 },
    { name: "Yuca/Mandioca cocida", category: "cereales", calories: 160, protein: 1.4, carbs: 38, fat: 0.3, portion: 100, unitWeight: 200 },
    { name: "Platano verde cocido", category: "cereales", calories: 116, protein: 0.8, carbs: 31, fat: 0.2, portion: 100, unitWeight: 150 },
    // Pan y panaderia chilena
    { name: "Marraqueta (unidad)", category: "cereales", calories: 280, protein: 9, carbs: 56, fat: 1.5, portion: 100, unitWeight: 140 },
    { name: "Hallulla (unidad)", category: "cereales", calories: 310, protein: 8, carbs: 52, fat: 7, portion: 100, unitWeight: 90 },
    { name: "Pan de molde Ideal (rebanada)", category: "cereales", calories: 72, protein: 2.5, carbs: 13, fat: 1, portion: 27 },
    { name: "Pan integral Ideal (rebanada)", category: "cereales", calories: 65, protein: 3, carbs: 12, fat: 1, portion: 27 },
    { name: "Dobladita (unidad)", category: "cereales", calories: 180, protein: 4, carbs: 30, fat: 5, portion: 60 },
    { name: "Pan amasado (unidad)", category: "cereales", calories: 250, protein: 6, carbs: 42, fat: 6, portion: 90 },
    { name: "Coliza (unidad)", category: "cereales", calories: 290, protein: 8, carbs: 54, fat: 4, portion: 100, unitWeight: 115 },
    { name: "Pan de completo", category: "cereales", calories: 180, protein: 5, carbs: 34, fat: 2, portion: 65 },
    // Cereales chilenos
    { name: "Cereal Zucosos Nestle (porcion)", category: "cereales", calories: 150, protein: 2, carbs: 33, fat: 1, portion: 40 },
    { name: "Cereal Chocapic Nestle (porcion)", category: "cereales", calories: 152, protein: 2.5, carbs: 32, fat: 1.5, portion: 40 },
    // Pastas Luchetti
    { name: "Tallarines Luchetti crudos (porcion 85g)", category: "cereales", calories: 304, protein: 11, carbs: 62, fat: 1.5, portion: 85 },
    { name: "Spaghetti Luchetti crudos (porcion 85g)", category: "cereales", calories: 304, protein: 11, carbs: 62, fat: 1.5, portion: 85 },
    { name: "Penne Luchetti crudos (porcion 85g)", category: "cereales", calories: 302, protein: 10.5, carbs: 62, fat: 1.3, portion: 85 },
    { name: "Lasagna Luchetti (porcion cruda 85g)", category: "cereales", calories: 306, protein: 11, carbs: 63, fat: 1.5, portion: 85 },
    // Pastas Carozzi
    { name: "Tallarines Carozzi crudos (porcion 85g)", category: "cereales", calories: 300, protein: 10, carbs: 63, fat: 1.2, portion: 85 },
    { name: "Spaghetti Carozzi crudos (porcion 85g)", category: "cereales", calories: 300, protein: 10, carbs: 63, fat: 1.2, portion: 85 },
    // Arroz Tucapel
    { name: "Arroz Tucapel cocido (100g)", category: "cereales", calories: 130, protein: 2.5, carbs: 28, fat: 0.3, portion: 100 },
    { name: "Arroz Tucapel crudo (porcion 75g)", category: "cereales", calories: 273, protein: 5.5, carbs: 60, fat: 0.5, portion: 75 },
    // Avena Quaker
    { name: "Avena Quaker tradicional (porcion 40g)", category: "cereales", calories: 156, protein: 6, carbs: 27, fat: 3, portion: 40 },
    { name: "Avena Quaker instantanea (sobre 28g)", category: "cereales", calories: 100, protein: 3.5, carbs: 19, fat: 2, portion: 28 },

    // ==================== LEGUMBRES ====================
    { name: "Lentejas cocidas", category: "legumbres", calories: 116, protein: 9, carbs: 20, fat: 0.4, portion: 100 },
    { name: "Porotos negros cocidos", category: "legumbres", calories: 132, protein: 8.9, carbs: 24, fat: 0.5, portion: 100 },
    { name: "Garbanzos cocidos", category: "legumbres", calories: 164, protein: 8.9, carbs: 27, fat: 2.6, portion: 100 },
    { name: "Porotos blancos cocidos", category: "legumbres", calories: 139, protein: 9.7, carbs: 25, fat: 0.5, portion: 100 },
    { name: "Tofu firme", category: "legumbres", calories: 144, protein: 17, carbs: 3, fat: 9, portion: 100, preparations: [
        { name: "Natural", calories: 144, protein: 17, carbs: 3, fat: 9 },
        { name: "A la plancha", calories: 180, protein: 18, carbs: 4, fat: 10 },
        { name: "Frito", calories: 271, protein: 17, carbs: 11, fat: 20 },
        { name: "Al vapor", calories: 144, protein: 17, carbs: 3, fat: 9 },
    ] },
    { name: "Proteina de soya texturizada", category: "legumbres", calories: 330, protein: 52, carbs: 30, fat: 1, portion: 100 },
    { name: "Tempeh", category: "legumbres", calories: 192, protein: 20, carbs: 8, fat: 11, portion: 100 },
    { name: "Seitan", category: "legumbres", calories: 370, protein: 75, carbs: 14, fat: 2, portion: 100 },

    // ==================== LACTEOS ====================
    { name: "Leche entera", category: "lacteos", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: 100 },
    { name: "Leche descremada", category: "lacteos", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, portion: 100 },
    { name: "Leche semidescremada", category: "lacteos", calories: 50, protein: 3.3, carbs: 5, fat: 1.8, portion: 100 },
    { name: "Yogurt natural", category: "lacteos", calories: 61, protein: 3.5, carbs: 4.7, fat: 3.3, portion: 100 },
    { name: "Yogurt griego", category: "lacteos", calories: 97, protein: 9, carbs: 3.6, fat: 5, portion: 100 },
    { name: "Yogurt griego 0% grasa", category: "lacteos", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, portion: 100 },
    { name: "Yogurt con frutas", category: "lacteos", calories: 99, protein: 4, carbs: 17, fat: 1.2, portion: 100 },
    { name: "Queso cheddar", category: "lacteos", calories: 403, protein: 25, carbs: 1.3, fat: 33, portion: 100 },
    { name: "Queso cottage", category: "lacteos", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, portion: 100 },
    { name: "Queso mozzarella", category: "lacteos", calories: 280, protein: 28, carbs: 3.1, fat: 17, portion: 100 },
    { name: "Queso crema", category: "lacteos", calories: 342, protein: 6, carbs: 4, fat: 34, portion: 100 },
    { name: "Queso crema light", category: "lacteos", calories: 201, protein: 8, carbs: 7, fat: 16, portion: 100 },
    { name: "Queso parmesano", category: "lacteos", calories: 431, protein: 38, carbs: 4, fat: 29, portion: 100 },
    { name: "Queso gouda", category: "lacteos", calories: 356, protein: 25, carbs: 2.2, fat: 27, portion: 100 },
    { name: "Queso ricotta", category: "lacteos", calories: 174, protein: 11, carbs: 3, fat: 13, portion: 100 },
    { name: "Queso brie", category: "lacteos", calories: 334, protein: 21, carbs: 0.5, fat: 28, portion: 100 },
    { name: "Mantequilla", category: "lacteos", calories: 717, protein: 0.9, carbs: 0.1, fat: 81, portion: 100 },
    { name: "Mantequilla (cucharada 14g)", category: "lacteos", calories: 100, protein: 0.1, carbs: 0, fat: 11.3, portion: 14 },
    { name: "Crema espesa/Nata", category: "lacteos", calories: 340, protein: 2, carbs: 3, fat: 36, portion: 100 },
    { name: "Leche de almendras", category: "lacteos", calories: 17, protein: 0.6, carbs: 0.6, fat: 1.1, portion: 100 },
    { name: "Leche de soya", category: "lacteos", calories: 54, protein: 3.3, carbs: 6, fat: 1.8, portion: 100 },
    { name: "Leche de avena", category: "lacteos", calories: 48, protein: 1, carbs: 7, fat: 1.5, portion: 100 },
    { name: "Leche de coco", category: "lacteos", calories: 230, protein: 2.3, carbs: 6, fat: 24, portion: 100 },
    { name: "Leche condensada", category: "lacteos", calories: 321, protein: 7.9, carbs: 55, fat: 8.7, portion: 100 },
    { name: "Leche evaporada", category: "lacteos", calories: 134, protein: 6.8, carbs: 10, fat: 7.6, portion: 100 },
    // Lacteos chilenos
    { name: "Manjar Colun (cucharada)", category: "lacteos", calories: 65, protein: 1.2, carbs: 12, fat: 1.5, portion: 20 },
    { name: "Yogurt Colun natural (vasito)", category: "lacteos", calories: 95, protein: 5, carbs: 12, fat: 3, portion: 125 },
    { name: "Yogurt Colun frutilla (vasito)", category: "lacteos", calories: 110, protein: 4.5, carbs: 18, fat: 2.5, portion: 125 },
    { name: "Leche Colun entera (vaso 200ml)", category: "lacteos", calories: 122, protein: 6.4, carbs: 9.6, fat: 6.6, portion: 200 },
    { name: "Leche Colun descremada (vaso 200ml)", category: "lacteos", calories: 68, protein: 6.8, carbs: 10, fat: 0.2, portion: 200 },
    { name: "Queso Chanco (porcion 30g)", category: "lacteos", calories: 105, protein: 7, carbs: 0.5, fat: 8.5, portion: 30 },
    { name: "Yogurt Soprole (vasito)", category: "lacteos", calories: 100, protein: 4, carbs: 16, fat: 2, portion: 120 },
    { name: "Leche Soprole entera (vaso 200ml)", category: "lacteos", calories: 120, protein: 6.2, carbs: 9.4, fat: 6.4, portion: 200 },
    { name: "Manjar Soprole (cucharada)", category: "lacteos", calories: 62, protein: 1.1, carbs: 11.5, fat: 1.3, portion: 20 },
    // Lacteos Danone
    { name: "Yogurt Danone Activia natural (frasco 125g)", category: "lacteos", calories: 90, protein: 4.5, carbs: 12, fat: 2.5, portion: 125 },
    { name: "Yogurt Danone Activia frutilla (frasco 125g)", category: "lacteos", calories: 110, protein: 4, carbs: 17, fat: 2.3, portion: 125 },
    { name: "Yogurt Danone Activia 0% (frasco 125g)", category: "lacteos", calories: 65, protein: 5, carbs: 10, fat: 0.1, portion: 125 },
    // Quesos Soprole
    { name: "Queso Soprole laminado (rebanada 22g)", category: "lacteos", calories: 75, protein: 5, carbs: 0.4, fat: 6, portion: 22 },
    { name: "Queso Soprole mantecoso (porcion 30g)", category: "lacteos", calories: 105, protein: 7, carbs: 0.5, fat: 8.5, portion: 30 },
    { name: "Queso crema Soprole (porcion 30g)", category: "lacteos", calories: 90, protein: 2, carbs: 1.5, fat: 8.5, portion: 30 },
    // Mantequillas
    { name: "Mantequilla Colun (porcion 10g)", category: "lacteos", calories: 72, protein: 0.1, carbs: 0, fat: 8, portion: 10 },
    { name: "Mantequilla Soprole (porcion 10g)", category: "lacteos", calories: 73, protein: 0.1, carbs: 0.1, fat: 8.1, portion: 10 },
    // Crema de leche
    { name: "Crema Colun (cda 15ml)", category: "lacteos", calories: 50, protein: 0.3, carbs: 0.5, fat: 5.3, portion: 15 },
    { name: "Crema Soprole (cda 15ml)", category: "lacteos", calories: 51, protein: 0.3, carbs: 0.5, fat: 5.4, portion: 15 },

    // ==================== GRASAS Y ACEITES ====================
    { name: "Aceite de oliva (cucharada)", category: "grasas", calories: 119, protein: 0, carbs: 0, fat: 13.5, portion: 15 },
    { name: "Aceite de coco (cucharada)", category: "grasas", calories: 121, protein: 0, carbs: 0, fat: 13.5, portion: 15 },
    { name: "Aceite de canola (cucharada)", category: "grasas", calories: 124, protein: 0, carbs: 0, fat: 14, portion: 15 },
    { name: "Aceite de girasol (cucharada)", category: "grasas", calories: 120, protein: 0, carbs: 0, fat: 14, portion: 15 },
    { name: "Aceite de aguacate (cucharada)", category: "grasas", calories: 124, protein: 0, carbs: 0, fat: 14, portion: 15 },
    { name: "Mayonesa (cucharada)", category: "grasas", calories: 94, protein: 0.1, carbs: 0.1, fat: 10, portion: 13 },
    { name: "Mayonesa light (cucharada)", category: "grasas", calories: 49, protein: 0.1, carbs: 1, fat: 4.9, portion: 15 },
    { name: "Aceitunas verdes (10 unidades)", category: "grasas", calories: 40, protein: 0.4, carbs: 1.1, fat: 4.3, portion: 30 },
    { name: "Aceitunas negras (10 unidades)", category: "grasas", calories: 36, protein: 0.3, carbs: 2, fat: 3.2, portion: 30 },

    // ==================== SNACKS Y FRUTOS SECOS ====================
    { name: "Almendras", category: "snacks", calories: 579, protein: 21, carbs: 22, fat: 50, portion: 100 },
    { name: "Almendras (puñado 30g)", category: "snacks", calories: 174, protein: 6.3, carbs: 6.6, fat: 15, portion: 30 },
    { name: "Mani/Cacahuate", category: "snacks", calories: 567, protein: 26, carbs: 16, fat: 49, portion: 100 },
    { name: "Nueces", category: "snacks", calories: 654, protein: 15, carbs: 14, fat: 65, portion: 100 },
    { name: "Nueces (puñado 30g)", category: "snacks", calories: 196, protein: 4.5, carbs: 4.2, fat: 19.5, portion: 30 },
    { name: "Castañas de caju/Anacardo", category: "snacks", calories: 553, protein: 18, carbs: 30, fat: 44, portion: 100 },
    { name: "Pistachos", category: "snacks", calories: 560, protein: 20, carbs: 28, fat: 45, portion: 100 },
    { name: "Avellanas", category: "snacks", calories: 628, protein: 15, carbs: 17, fat: 61, portion: 100 },
    { name: "Semillas de chia", category: "snacks", calories: 486, protein: 17, carbs: 42, fat: 31, portion: 100 },
    { name: "Semillas de linaza", category: "snacks", calories: 534, protein: 18, carbs: 29, fat: 42, portion: 100 },
    { name: "Semillas de girasol", category: "snacks", calories: 584, protein: 21, carbs: 20, fat: 51, portion: 100 },
    { name: "Semillas de zapallo/Pepitas", category: "snacks", calories: 559, protein: 30, carbs: 11, fat: 49, portion: 100 },
    { name: "Mix de frutos secos (30g)", category: "snacks", calories: 173, protein: 5, carbs: 7, fat: 15, portion: 30 },
    { name: "Barra de proteina", category: "snacks", calories: 200, protein: 20, carbs: 22, fat: 7, portion: 60 },
    { name: "Barra de cereal", category: "snacks", calories: 130, protein: 2, carbs: 22, fat: 4, portion: 30 },
    { name: "Galletas de arroz", category: "snacks", calories: 35, protein: 0.7, carbs: 7.3, fat: 0.3, portion: 9 },
    { name: "Chocolate negro 70%", category: "snacks", calories: 598, protein: 8, carbs: 46, fat: 43, portion: 100, unitWeight: 25 },
    { name: "Chocolate con leche", category: "snacks", calories: 535, protein: 8, carbs: 59, fat: 30, portion: 100, unitWeight: 25 },
    { name: "Granola", category: "snacks", calories: 471, protein: 10, carbs: 64, fat: 20, portion: 100 },
    { name: "Whey protein (scoop)", category: "snacks", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 30 },
    { name: "Caseina (scoop)", category: "snacks", calories: 120, protein: 24, carbs: 3, fat: 1, portion: 33 },
    { name: "Mantequilla de mani", category: "snacks", calories: 588, protein: 25, carbs: 20, fat: 50, portion: 100 },
    { name: "Mantequilla de mani (cucharada)", category: "snacks", calories: 94, protein: 4, carbs: 3.2, fat: 8, portion: 16 },
    { name: "Mantequilla de almendras", category: "snacks", calories: 614, protein: 21, carbs: 19, fat: 56, portion: 100 },
    { name: "Hummus", category: "snacks", calories: 166, protein: 8, carbs: 14, fat: 10, portion: 100 },
    { name: "Palomitas de maiz (natural)", category: "snacks", calories: 375, protein: 11, carbs: 74, fat: 4, portion: 100 },
    { name: "Papas fritas (bolsa 30g)", category: "snacks", calories: 160, protein: 2, carbs: 15, fat: 10, portion: 30 },
    { name: "Helado de vainilla", category: "snacks", calories: 207, protein: 3.5, carbs: 24, fat: 11, portion: 100, unitWeight: 66 },
    { name: "Helado de chocolate", category: "snacks", calories: 216, protein: 3.8, carbs: 28, fat: 11, portion: 100, unitWeight: 66 },
    { name: "Gelatina (porcion)", category: "snacks", calories: 62, protein: 1.2, carbs: 14, fat: 0, portion: 100 },
    { name: "Arroz inflado con chocolate", category: "snacks", calories: 400, protein: 5, carbs: 70, fat: 12, portion: 100 },
    // Snacks chilenos
    { name: "Caracoquesos Carozzi (bolsa 65g)", category: "snacks", calories: 330, protein: 5, carbs: 40, fat: 16, portion: 65 },
    { name: "Ramitas Carozzi queso (bolsa 60g)", category: "snacks", calories: 300, protein: 4, carbs: 36, fat: 15, portion: 60 },
    { name: "Ramitas Carozzi natural (bolsa 60g)", category: "snacks", calories: 295, protein: 3.5, carbs: 37, fat: 15, portion: 60 },
    { name: "Chis Pop Carozzi (bolsa 72g)", category: "snacks", calories: 370, protein: 4, carbs: 42, fat: 20, portion: 72 },
    { name: "Pikeos Carozzi (bolsa 80g)", category: "snacks", calories: 400, protein: 6, carbs: 48, fat: 20, portion: 80 },
    { name: "Bolitas de chocolate Costa (bolsa 50g)", category: "snacks", calories: 250, protein: 3, carbs: 32, fat: 12, portion: 50 },
    { name: "Galleta Triton Costa (unidad)", category: "snacks", calories: 67, protein: 0.8, carbs: 9, fat: 3, portion: 14 },
    { name: "Galleta Kuky Costa (unidad)", category: "snacks", calories: 55, protein: 0.6, carbs: 7, fat: 2.5, portion: 11 },
    { name: "Alfajor Guaymallen (unidad)", category: "snacks", calories: 170, protein: 2, carbs: 28, fat: 6, portion: 40 },
    { name: "Super 8 Nestle (unidad)", category: "snacks", calories: 105, protein: 1, carbs: 12, fat: 6, portion: 23 },
    { name: "Sahne Nuss Nestle (barra 20g)", category: "snacks", calories: 110, protein: 1.5, carbs: 11, fat: 7, portion: 20 },
    { name: "Negrita Galleta McKay (unidad)", category: "snacks", calories: 130, protein: 1.5, carbs: 18, fat: 6, portion: 28 },
    { name: "Galleta Soda McKay (unidad)", category: "snacks", calories: 30, protein: 0.7, carbs: 5, fat: 0.8, portion: 7 },
    { name: "Galleta de Agua McKay (unidad)", category: "snacks", calories: 28, protein: 0.6, carbs: 5, fat: 0.6, portion: 7 },
    { name: "Bon o Bon (unidad)", category: "snacks", calories: 80, protein: 1, carbs: 9, fat: 4.5, portion: 16 },
    { name: "Cabsha (unidad)", category: "snacks", calories: 90, protein: 1.2, carbs: 10, fat: 5, portion: 18 },
    { name: "Ambrosoli menta (unidad)", category: "snacks", calories: 20, protein: 0, carbs: 5, fat: 0, portion: 5 },
    { name: "Galleta Toddy (unidad)", category: "snacks", calories: 75, protein: 1, carbs: 10, fat: 3.5, portion: 16 },
    { name: "Galleta Oreo (unidad)", category: "snacks", calories: 53, protein: 0.5, carbs: 8, fat: 2.3, portion: 11 },
    { name: "Galleta Chiquitin Costa", category: "snacks", calories: 50, protein: 0.5, carbs: 7, fat: 2, portion: 10 },
    // Snacks Costa adicionales
    { name: "Chocman Costa (unidad 28g)", category: "snacks", calories: 138, protein: 2, carbs: 17, fat: 7, portion: 28 },
    { name: "Baton Costa (unidad 45g)", category: "snacks", calories: 220, protein: 3, carbs: 28, fat: 11, portion: 45 },
    { name: "Morocho Costa (unidad 30g)", category: "snacks", calories: 145, protein: 1.5, carbs: 20, fat: 6.5, portion: 30 },
    // Papas fritas de marca
    { name: "Papas Lays Classic (bolsa 45g)", category: "snacks", calories: 240, protein: 3, carbs: 23, fat: 15, portion: 45 },
    { name: "Papas Lays Classic (bolsa 25g)", category: "snacks", calories: 133, protein: 1.5, carbs: 13, fat: 8.5, portion: 25 },
    { name: "Papas Ruffles (bolsa 45g)", category: "snacks", calories: 238, protein: 3, carbs: 22, fat: 16, portion: 45 },
    { name: "Pringles Original (tubo 149g)", category: "snacks", calories: 774, protein: 7, carbs: 79, fat: 49, portion: 149 },
    { name: "Pringles Original (porcion 30g)", category: "snacks", calories: 156, protein: 1.5, carbs: 16, fat: 10, portion: 30 },
    // Otros snacks chilenos
    { name: "Doritos Nacho (bolsa 45g)", category: "snacks", calories: 222, protein: 3, carbs: 27, fat: 11, portion: 45 },
    { name: "Cheetos (bolsa 45g)", category: "snacks", calories: 238, protein: 3.5, carbs: 25, fat: 14, portion: 45 },
    { name: "Nachos Carozzi (bolsa 70g)", category: "snacks", calories: 350, protein: 5, carbs: 43, fat: 17, portion: 70 },
    { name: "Kuky Avena Costa (unidad)", category: "snacks", calories: 58, protein: 0.8, carbs: 8, fat: 2.5, portion: 12 },

    // ==================== BEBESTIBLES ====================
    { name: "Coca-Cola (lata)", category: "bebestibles", calories: 139, protein: 0, carbs: 35, fat: 0, portion: 330 },
    { name: "Coca-Cola Zero (lata)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 330 },
    { name: "Pepsi (lata)", category: "bebestibles", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 355 },
    { name: "Pepsi Zero (lata)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 355 },
    { name: "Pepsi Zero (vaso 250ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 250 },
    { name: "Pepsi (vaso 250ml)", category: "bebestibles", calories: 106, protein: 0, carbs: 29, fat: 0, portion: 250 },
    { name: "Coca-Cola (vaso 250ml)", category: "bebestibles", calories: 105, protein: 0, carbs: 26.5, fat: 0, portion: 250 },
    { name: "Coca-Cola Zero (vaso 250ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 250 },
    { name: "Sprite (lata)", category: "bebestibles", calories: 140, protein: 0, carbs: 38, fat: 0, portion: 355 },
    { name: "Sprite Zero (lata)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 355 },
    { name: "Sprite (vaso 250ml)", category: "bebestibles", calories: 99, protein: 0, carbs: 27, fat: 0, portion: 250 },
    { name: "Fanta (lata)", category: "bebestibles", calories: 160, protein: 0, carbs: 44, fat: 0, portion: 355 },
    { name: "Fanta Zero (lata)", category: "bebestibles", calories: 2, protein: 0, carbs: 0, fat: 0, portion: 355 },
    { name: "Fanta (vaso 250ml)", category: "bebestibles", calories: 113, protein: 0, carbs: 31, fat: 0, portion: 250 },
    { name: "Jugo de naranja natural", category: "bebestibles", calories: 45, protein: 0.7, carbs: 10, fat: 0.2, portion: 100 },
    { name: "Cafe negro (taza)", category: "bebestibles", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    { name: "Cafe con leche", category: "bebestibles", calories: 67, protein: 3.4, carbs: 6, fat: 3.6, portion: 240 },
    { name: "Cappuccino", category: "bebestibles", calories: 120, protein: 4, carbs: 10, fat: 6, portion: 240 },
    { name: "Latte", category: "bebestibles", calories: 135, protein: 7, carbs: 11, fat: 7, portion: 300 },
    { name: "Mocha", category: "bebestibles", calories: 230, protein: 6, carbs: 30, fat: 10, portion: 300 },
    { name: "Te negro (taza)", category: "bebestibles", calories: 2, protein: 0, carbs: 0.5, fat: 0, portion: 240 },
    { name: "Te verde (taza)", category: "bebestibles", calories: 2, protein: 0, carbs: 0, fat: 0, portion: 240 },
    { name: "Cerveza (lata)", category: "bebestibles", calories: 154, protein: 1.6, carbs: 13, fat: 0, portion: 355 },
    { name: "Cerveza light (lata)", category: "bebestibles", calories: 103, protein: 0.9, carbs: 6, fat: 0, portion: 355 },
    { name: "Vino tinto (copa)", category: "bebestibles", calories: 125, protein: 0.1, carbs: 3.8, fat: 0, portion: 150 },
    { name: "Vino blanco (copa)", category: "bebestibles", calories: 121, protein: 0.1, carbs: 3.8, fat: 0, portion: 150 },
    { name: "Pisco sour (vaso)", category: "bebestibles", calories: 180, protein: 0.3, carbs: 18, fat: 0, portion: 150 },
    { name: "Agua mineral", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Bebida energetica (Red Bull)", category: "bebestibles", calories: 110, protein: 0, carbs: 28, fat: 0, portion: 250 },
    { name: "Bebida energetica (Monster)", category: "bebestibles", calories: 101, protein: 0, carbs: 27, fat: 0, portion: 250 },
    { name: "Leche chocolatada", category: "bebestibles", calories: 83, protein: 3.2, carbs: 12, fat: 2.5, portion: 100 },
    { name: "Batido de proteina (preparado)", category: "bebestibles", calories: 160, protein: 25, carbs: 8, fat: 3, portion: 300 },
    { name: "Smoothie de frutas", category: "bebestibles", calories: 90, protein: 1, carbs: 22, fat: 0.3, portion: 200 },
    { name: "Agua de coco", category: "bebestibles", calories: 19, protein: 0.7, carbs: 3.7, fat: 0.2, portion: 100 },
    { name: "Limonada natural", category: "bebestibles", calories: 40, protein: 0.1, carbs: 10, fat: 0, portion: 200 },
    // Bebidas CCU
    { name: "Bilz CCU (botella 350ml)", category: "bebestibles", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Pap CCU (botella 350ml)", category: "bebestibles", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Bilz CCU (lata 350ml)", category: "bebestibles", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Pap CCU (lata 350ml)", category: "bebestibles", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    { name: "Cachantun con gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Cachantun sin gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Kem CCU (350ml)", category: "bebestibles", calories: 161, protein: 0, carbs: 40, fat: 0, portion: 350 },
    { name: "Kem Zero CCU (350ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    { name: "Crush CCU naranja (350ml)", category: "bebestibles", calories: 165, protein: 0, carbs: 41, fat: 0, portion: 350 },
    { name: "Watts nectar naranja (200ml)", category: "bebestibles", calories: 90, protein: 0.4, carbs: 22, fat: 0, portion: 200 },
    { name: "Watts nectar durazno (200ml)", category: "bebestibles", calories: 84, protein: 0.2, carbs: 21, fat: 0, portion: 200 },
    { name: "Livean CCU agua saborizada (500ml)", category: "bebestibles", calories: 10, protein: 0, carbs: 2, fat: 0, portion: 500 },
    { name: "Pepsi Chile (lata 350ml)", category: "bebestibles", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 350 },
    { name: "Pepsi Zero Chile (lata 350ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    { name: "Coca-Cola Original (botella 500ml)", category: "bebestibles", calories: 210, protein: 0, carbs: 53, fat: 0, portion: 500 },
    { name: "Coca-Cola Zero (botella 500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Coca-Cola Original (1.5L)", category: "bebestibles", calories: 630, protein: 0, carbs: 158, fat: 0, portion: 1500 },
    { name: "Coca-Cola Zero (1.5L)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 1500 },
    // Bebidas zero y light Chile
    { name: "Bilz Zero CCU (350ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    { name: "Pap Zero CCU (350ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    { name: "Sprite Zero (botella 500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Fanta Zero (botella 500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Canada Dry ginger ale (lata 350ml)", category: "bebestibles", calories: 140, protein: 0, carbs: 36, fat: 0, portion: 350 },
    { name: "Canada Dry ginger ale Zero (lata 350ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    // Aguas saborizadas y jugos Chile
    { name: "Benedictino sin gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Benedictino con gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Vital con gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Vital sin gas (500ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    { name: "Watts jugo naranja (1L porcion 200ml)", category: "bebestibles", calories: 90, protein: 0.4, carbs: 22, fat: 0, portion: 200 },
    { name: "Watts jugo manzana (200ml)", category: "bebestibles", calories: 88, protein: 0.2, carbs: 22, fat: 0, portion: 200 },
    { name: "Kapo jugo (200ml)", category: "bebestibles", calories: 80, protein: 0, carbs: 20, fat: 0, portion: 200 },
    { name: "Andina del Valle nectar (200ml)", category: "bebestibles", calories: 86, protein: 0.3, carbs: 21, fat: 0, portion: 200 },
    { name: "Jumex nectar mango (335ml)", category: "bebestibles", calories: 160, protein: 0.3, carbs: 40, fat: 0, portion: 335 },
    // Bebidas deportivas e isotónicas Chile
    { name: "Gatorade (botella 500ml)", category: "bebestibles", calories: 125, protein: 0, carbs: 31, fat: 0, portion: 500 },
    { name: "Gatorade Zero (botella 500ml)", category: "bebestibles", calories: 5, protein: 0, carbs: 1, fat: 0, portion: 500 },
    { name: "Powerade (botella 600ml)", category: "bebestibles", calories: 58, protein: 0, carbs: 14, fat: 0, portion: 600 },
    { name: "Powerade Zero (botella 600ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 600 },
    // Energeticas Chile
    { name: "Red Bull (lata 250ml)", category: "bebestibles", calories: 112, protein: 0, carbs: 28, fat: 0, portion: 250 },
    { name: "Red Bull Sugar Free (lata 250ml)", category: "bebestibles", calories: 5, protein: 0, carbs: 0, fat: 0, portion: 250 },
    { name: "Monster Energy (lata 473ml)", category: "bebestibles", calories: 200, protein: 0, carbs: 54, fat: 0, portion: 473 },
    { name: "Monster Ultra Zero (lata 473ml)", category: "bebestibles", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 473 },
    { name: "Reign Energy (lata 473ml)", category: "bebestibles", calories: 10, protein: 0, carbs: 0, fat: 0, portion: 473 },
    { name: "Volt CCU (lata 250ml)", category: "bebestibles", calories: 112, protein: 0, carbs: 28, fat: 0, portion: 250 },
    // Cervezas Chile
    { name: "Cristal (lata 350ml)", category: "bebestibles", calories: 148, protein: 1.2, carbs: 12, fat: 0, portion: 350 },
    { name: "Escudo (lata 350ml)", category: "bebestibles", calories: 155, protein: 1.4, carbs: 13, fat: 0, portion: 350 },
    { name: "Royal Guard (lata 350ml)", category: "bebestibles", calories: 143, protein: 1, carbs: 11, fat: 0, portion: 350 },
    { name: "Kunstmann Torobayo (botella 500ml)", category: "bebestibles", calories: 235, protein: 2.1, carbs: 20, fat: 0, portion: 500 },
    { name: "Becker (lata 350ml)", category: "bebestibles", calories: 150, protein: 1.3, carbs: 12, fat: 0, portion: 350 },
    { name: "Heineken (lata 350ml)", category: "bebestibles", calories: 150, protein: 1.2, carbs: 11, fat: 0, portion: 350 },
    { name: "Corona (botella 355ml)", category: "bebestibles", calories: 148, protein: 1.2, carbs: 14, fat: 0, portion: 355 },
    { name: "Cerveza sin alcohol (lata 350ml)", category: "bebestibles", calories: 73, protein: 0.7, carbs: 16, fat: 0, portion: 350 },
    // Destilados Chile
    { name: "Pisco 35° (shot 45ml)", category: "bebestibles", calories: 103, protein: 0, carbs: 0, fat: 0, portion: 45 },
    { name: "Pisco 40° (shot 45ml)", category: "bebestibles", calories: 117, protein: 0, carbs: 0, fat: 0, portion: 45 },
    { name: "Piscola (vaso 250ml)", category: "bebestibles", calories: 195, protein: 0, carbs: 26, fat: 0, portion: 250 },
    { name: "Piscola Zero (vaso 250ml)", category: "bebestibles", calories: 103, protein: 0, carbs: 0, fat: 0, portion: 250 },
    { name: "Ron con coca cola (vaso 250ml)", category: "bebestibles", calories: 185, protein: 0, carbs: 24, fat: 0, portion: 250 },
    { name: "Vodka (shot 45ml)", category: "bebestibles", calories: 97, protein: 0, carbs: 0, fat: 0, portion: 45 },
    { name: "Gin tonic (vaso 250ml)", category: "bebestibles", calories: 171, protein: 0, carbs: 14, fat: 0, portion: 250 },
    { name: "Terremoto (vaso)", category: "bebestibles", calories: 350, protein: 1, carbs: 45, fat: 3, portion: 300 },
    // Infusiones y cafe Chile
    { name: "Nescafe Dolca (taza 240ml)", category: "bebestibles", calories: 5, protein: 0.3, carbs: 0.5, fat: 0, portion: 240 },
    { name: "Nescafe clasico (taza)", category: "bebestibles", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    { name: "Cafe expreso (shot)", category: "bebestibles", calories: 3, protein: 0.1, carbs: 0.5, fat: 0, portion: 30 },
    { name: "Cafe americano (taza)", category: "bebestibles", calories: 5, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    { name: "Milo Nestle (vaso preparado)", category: "bebestibles", calories: 180, protein: 5, carbs: 30, fat: 5, portion: 200 },
    { name: "Te con leche (taza)", category: "bebestibles", calories: 30, protein: 1.5, carbs: 3, fat: 1.2, portion: 240 },
    { name: "Mate (calabaza)", category: "bebestibles", calories: 5, protein: 0.3, carbs: 1, fat: 0, portion: 200 },
    { name: "Agüita de hierbas (taza)", category: "bebestibles", calories: 2, protein: 0, carbs: 0, fat: 0, portion: 240 },
    // Bebestibles chilenos
    { name: "Mote con huesillo (vaso)", category: "bebestibles", calories: 280, protein: 3, carbs: 65, fat: 0.5, portion: 300 },
    { name: "Leche con platano (vaso)", category: "bebestibles", calories: 180, protein: 5, carbs: 30, fat: 5, portion: 250 },
    { name: "Cola de mono (vaso)", category: "bebestibles", calories: 220, protein: 4, carbs: 28, fat: 8, portion: 200 },
    { name: "Borgoña (vaso)", category: "bebestibles", calories: 160, protein: 0.2, carbs: 22, fat: 0, portion: 200 },
    { name: "Navegado (taza)", category: "bebestibles", calories: 170, protein: 0.2, carbs: 18, fat: 0, portion: 200 },

    // ==================== SALSAS Y CONDIMENTOS ====================
    { name: "Salsa de tomate/Ketchup (cda)", category: "salsas", calories: 15, protein: 0.2, carbs: 4, fat: 0, portion: 15 },
    { name: "Mostaza (cucharadita)", category: "salsas", calories: 3, protein: 0.2, carbs: 0.3, fat: 0.2, portion: 5 },
    { name: "Salsa de soya (cucharada)", category: "salsas", calories: 9, protein: 1.3, carbs: 0.8, fat: 0, portion: 15 },
    { name: "Salsa BBQ (cucharada)", category: "salsas", calories: 29, protein: 0.1, carbs: 7, fat: 0.1, portion: 17 },
    { name: "Salsa sriracha (cucharadita)", category: "salsas", calories: 5, protein: 0.1, carbs: 1, fat: 0.1, portion: 5 },
    { name: "Mermelada (cucharada)", category: "salsas", calories: 50, protein: 0.1, carbs: 13, fat: 0, portion: 20 },
    { name: "Miel (cucharada)", category: "salsas", calories: 64, protein: 0.1, carbs: 17, fat: 0, portion: 21 },
    { name: "Azucar blanca (cucharadita)", category: "salsas", calories: 16, protein: 0, carbs: 4, fat: 0, portion: 4 },
    { name: "Azucar morena (cucharadita)", category: "salsas", calories: 17, protein: 0, carbs: 4.5, fat: 0, portion: 4.6 },
    { name: "Stevia (sobrecito)", category: "salsas", calories: 0, protein: 0, carbs: 1, fat: 0, portion: 1 },
    { name: "Vinagre balsamico (cucharada)", category: "salsas", calories: 14, protein: 0.1, carbs: 2.7, fat: 0, portion: 15 },
    { name: "Pesto (cucharada)", category: "salsas", calories: 80, protein: 2, carbs: 1, fat: 8, portion: 15 },
    { name: "Guacamole (porcion 30g)", category: "salsas", calories: 50, protein: 0.6, carbs: 2.6, fat: 4.5, portion: 30 },
    { name: "Salsa de queso (cucharada)", category: "salsas", calories: 35, protein: 1, carbs: 2, fat: 2.5, portion: 20 },
    { name: "Salsa Tabasco (cucharadita)", category: "salsas", calories: 1, protein: 0, carbs: 0, fat: 0, portion: 5 },
    // Salsas chilenas
    { name: "Pebre (cucharada)", category: "salsas", calories: 10, protein: 0.3, carbs: 2, fat: 0.2, portion: 15 },
    { name: "Chancho en piedra (cucharada)", category: "salsas", calories: 12, protein: 0.4, carbs: 2.5, fat: 0.3, portion: 15 },
    // Salsas y condimentos de marca chilena
    { name: "Salsa de tomate Carozzi (100g)", category: "salsas", calories: 32, protein: 1.2, carbs: 7, fat: 0.1, portion: 100 },
    { name: "Ketchup Malloa (cucharada 15g)", category: "salsas", calories: 16, protein: 0.3, carbs: 4, fat: 0, portion: 15 },
    { name: "Mayonesa Hellmann's (cucharada 13g)", category: "salsas", calories: 90, protein: 0.1, carbs: 0.1, fat: 10, portion: 13 },
    { name: "Mayonesa Hellmann's Light (cucharada 15g)", category: "salsas", calories: 45, protein: 0.1, carbs: 1, fat: 4.5, portion: 15 },
    { name: "Salsa de aji Verde Carozzi (cucharadita 5g)", category: "salsas", calories: 4, protein: 0.1, carbs: 0.8, fat: 0.1, portion: 5 },
    { name: "Mermelada Watts frutilla (cucharada 20g)", category: "salsas", calories: 52, protein: 0.1, carbs: 13, fat: 0, portion: 20 },
    { name: "Mermelada Watts damasco (cucharada 20g)", category: "salsas", calories: 50, protein: 0.1, carbs: 12.5, fat: 0, portion: 20 },
    { name: "Maggi sopa de pollo (sobre preparado 250ml)", category: "salsas", calories: 45, protein: 1.5, carbs: 8, fat: 1, portion: 250 },
    { name: "Knorr sopa crema verduras (sobre preparado 250ml)", category: "salsas", calories: 90, protein: 2, carbs: 13, fat: 3.5, portion: 250 },

    // ==================== PLATOS COMUNES ====================
    { name: "Hamburguesa simple", category: "platos_comunes", calories: 354, protein: 20, carbs: 29, fat: 17, portion: 150 },
    { name: "Hamburguesa doble con queso", category: "platos_comunes", calories: 560, protein: 32, carbs: 32, fat: 33, portion: 220 },
    { name: "Pizza margarita (trozo)", category: "platos_comunes", calories: 237, protein: 11, carbs: 27, fat: 9, portion: 107 },
    { name: "Pizza pepperoni (trozo)", category: "platos_comunes", calories: 298, protein: 13, carbs: 26, fat: 14, portion: 107 },
    { name: "Hot dog clasico", category: "platos_comunes", calories: 290, protein: 10, carbs: 24, fat: 17, portion: 150 },
    { name: "Papas fritas McDonald's (mediana)", category: "platos_comunes", calories: 340, protein: 4, carbs: 44, fat: 16, portion: 117 },
    { name: "Nuggets de pollo (6 pzas)", category: "platos_comunes", calories: 280, protein: 14, carbs: 16, fat: 18, portion: 96 },
    { name: "Burrito de pollo", category: "platos_comunes", calories: 450, protein: 22, carbs: 50, fat: 18, portion: 250 },
    { name: "Taco (unidad)", category: "platos_comunes", calories: 210, protein: 9, carbs: 20, fat: 10, portion: 100, unitWeight: 85 },
    { name: "Wrap de pollo", category: "platos_comunes", calories: 380, protein: 24, carbs: 36, fat: 15, portion: 200 },
    { name: "Sushi roll (8 pzas)", category: "platos_comunes", calories: 350, protein: 12, carbs: 48, fat: 10, portion: 200 },
    { name: "Sashimi salmon (5 cortes)", category: "platos_comunes", calories: 146, protein: 15, carbs: 0, fat: 9, portion: 70 },
    { name: "Pollo frito (pieza)", category: "platos_comunes", calories: 320, protein: 22, carbs: 12, fat: 20, portion: 120 },
    { name: "Sandwich de jamon y queso", category: "platos_comunes", calories: 352, protein: 17, carbs: 28, fat: 19, portion: 150 },
    { name: "Kebab/Shawarma", category: "platos_comunes", calories: 520, protein: 25, carbs: 45, fat: 25, portion: 300 },
    { name: "Ensalada Caesar con pollo", category: "platos_comunes", calories: 360, protein: 28, carbs: 15, fat: 22, portion: 300 },
    { name: "Dona glaseada", category: "platos_comunes", calories: 269, protein: 4, carbs: 31, fat: 15, portion: 70 },
    { name: "Croissant", category: "platos_comunes", calories: 231, protein: 5, carbs: 26, fat: 12, portion: 57 },
    { name: "Muffin de arandanos", category: "platos_comunes", calories: 377, protein: 6, carbs: 56, fat: 15, portion: 110 },
    { name: "Panqueque/Hotcake (unidad)", category: "platos_comunes", calories: 86, protein: 2.4, carbs: 11, fat: 3.5, portion: 38 },
    { name: "Waffle (unidad)", category: "platos_comunes", calories: 218, protein: 5.9, carbs: 25, fat: 11, portion: 75 },
    { name: "Crepe con nutella", category: "platos_comunes", calories: 350, protein: 7, carbs: 48, fat: 15, portion: 150 },
    { name: "Ramen instantaneo (sobre preparado)", category: "platos_comunes", calories: 380, protein: 9, carbs: 52, fat: 14, portion: 190, fiber: 2, sodium: 1500 },
    { name: "Ramen instantaneo Maruchan (sobre)", category: "platos_comunes", calories: 375, protein: 8, carbs: 50, fat: 15, portion: 85, fiber: 1.5, sodium: 1600 },
    { name: "Ramen japones con caldo (plato)", category: "platos_comunes", calories: 450, protein: 18, carbs: 55, fat: 16, portion: 400 },
    { name: "Ramen coreano picante (sobre)", category: "platos_comunes", calories: 500, protein: 9, carbs: 65, fat: 22, portion: 120, sodium: 1800 },
    { name: "Fideos instantaneos con sabor (sobre)", category: "platos_comunes", calories: 360, protein: 8, carbs: 48, fat: 14, portion: 85, sodium: 1400 },
    { name: "Empanada de carne (general)", category: "platos_comunes", calories: 300, protein: 12, carbs: 28, fat: 16, portion: 150 },
    { name: "Arepa con queso", category: "platos_comunes", calories: 280, protein: 10, carbs: 32, fat: 12, portion: 150 },
    { name: "Quesadilla", category: "platos_comunes", calories: 380, protein: 18, carbs: 32, fat: 20, portion: 180 },
    // Platos chilenos
    { name: "Empanada de pino (unidad)", category: "platos_comunes", calories: 350, protein: 14, carbs: 32, fat: 18, portion: 180 },
    { name: "Empanada de queso (unidad)", category: "platos_comunes", calories: 280, protein: 10, carbs: 28, fat: 14, portion: 140 },
    { name: "Empanada de mariscos", category: "platos_comunes", calories: 300, protein: 16, carbs: 30, fat: 13, portion: 170 },
    { name: "Completo italiano", category: "platos_comunes", calories: 450, protein: 14, carbs: 42, fat: 24, portion: 250 },
    { name: "Completo dinamico", category: "platos_comunes", calories: 480, protein: 15, carbs: 45, fat: 26, portion: 270 },
    { name: "Sopaipilla (unidad)", category: "platos_comunes", calories: 150, protein: 2.5, carbs: 18, fat: 8, portion: 50 },
    { name: "Sopaipilla pasada (unidad)", category: "platos_comunes", calories: 250, protein: 3, carbs: 40, fat: 9, portion: 80 },
    { name: "Pastel de choclo (porcion)", category: "platos_comunes", calories: 380, protein: 18, carbs: 35, fat: 18, portion: 250 },
    { name: "Cazuela de vacuno (plato)", category: "platos_comunes", calories: 320, protein: 22, carbs: 30, fat: 12, portion: 400 },
    { name: "Cazuela de pollo (plato)", category: "platos_comunes", calories: 280, protein: 20, carbs: 28, fat: 10, portion: 400 },
    { name: "Porotos granados (plato)", category: "platos_comunes", calories: 280, protein: 14, carbs: 42, fat: 6, portion: 350 },
    { name: "Porotos con riendas (plato)", category: "platos_comunes", calories: 350, protein: 16, carbs: 48, fat: 10, portion: 350 },
    { name: "Charquican (plato)", category: "platos_comunes", calories: 250, protein: 15, carbs: 28, fat: 8, portion: 300 },
    { name: "Humita (unidad)", category: "platos_comunes", calories: 200, protein: 6, carbs: 30, fat: 7, portion: 150 },
    { name: "Choripan (unidad)", category: "platos_comunes", calories: 380, protein: 16, carbs: 30, fat: 22, portion: 200 },
    { name: "Barros Luco (sandwich)", category: "platos_comunes", calories: 520, protein: 30, carbs: 38, fat: 26, portion: 250 },
    { name: "Barros Jarpa (sandwich)", category: "platos_comunes", calories: 460, protein: 22, carbs: 38, fat: 24, portion: 220 },
    { name: "Churrasco italiano", category: "platos_comunes", calories: 580, protein: 28, carbs: 45, fat: 30, portion: 300 },
    { name: "Lomo a lo pobre (plato)", category: "platos_comunes", calories: 750, protein: 35, carbs: 55, fat: 42, portion: 400 },
    { name: "Caldillo de congrio (plato)", category: "platos_comunes", calories: 220, protein: 18, carbs: 15, fat: 10, portion: 350 },
    { name: "Curanto (porcion)", category: "platos_comunes", calories: 450, protein: 30, carbs: 35, fat: 20, portion: 400 },
    { name: "Milcao (unidad)", category: "platos_comunes", calories: 220, protein: 4, carbs: 38, fat: 6, portion: 120 },
    { name: "Pastel de papa (porcion)", category: "platos_comunes", calories: 320, protein: 18, carbs: 30, fat: 14, portion: 250 },
    { name: "Carbonada (plato)", category: "platos_comunes", calories: 290, protein: 16, carbs: 32, fat: 10, portion: 350 },
    { name: "Ajiaco (plato)", category: "platos_comunes", calories: 200, protein: 12, carbs: 25, fat: 6, portion: 300 },
    { name: "Arrollado huaso (porcion)", category: "platos_comunes", calories: 280, protein: 18, carbs: 5, fat: 22, portion: 100 },
    { name: "Costillar de cerdo BBQ (porcion)", category: "platos_comunes", calories: 400, protein: 25, carbs: 8, fat: 30, portion: 200 },
    { name: "Asado al palo (porcion)", category: "platos_comunes", calories: 300, protein: 28, carbs: 0, fat: 20, portion: 150 },
    { name: "Tallarines con salsa (plato)", category: "platos_comunes", calories: 420, protein: 15, carbs: 55, fat: 15, portion: 350 },
    { name: "Arroz con huevo frito", category: "platos_comunes", calories: 380, protein: 12, carbs: 45, fat: 16, portion: 250 },
    { name: "Pan con palta", category: "platos_comunes", calories: 280, protein: 6, carbs: 32, fat: 14, portion: 120 },
    { name: "Pan con huevo", category: "platos_comunes", calories: 260, protein: 12, carbs: 30, fat: 10, portion: 120 },
    { name: "Pan con queso", category: "platos_comunes", calories: 300, protein: 12, carbs: 32, fat: 13, portion: 120 },
    { name: "Pan con manjar", category: "platos_comunes", calories: 320, protein: 7, carbs: 58, fat: 6, portion: 120 },
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

    static getActivity(dateStr) {
        const all = Storage.get('activity', {});
        return all[dateStr] || { steps: 0, caloriesBurned: 0, distance: 0, type: '', source: 'manual' };
    }

    static setActivity(dateStr, data) {
        const all = Storage.get('activity', {});
        all[dateStr] = data;
        Storage.set('activity', all);
    }

    static getActivityGoals() {
        return Storage.get('activityGoals', { steps: 10000, burn: 500 });
    }

    static setActivityGoals(goals) {
        Storage.set('activityGoals', goals);
    }

    static getMealSchedule() {
        return Storage.get('mealSchedule', {
            meals: [
                { id: 'desayuno', name: 'Desayuno', time: '08:00', enabled: true, foods: [] },
                { id: 'colacion_am', name: 'Colacion AM', time: '10:30', enabled: false, foods: [] },
                { id: 'almuerzo', name: 'Almuerzo', time: '13:00', enabled: true, foods: [] },
                { id: 'colacion_pm', name: 'Colacion PM', time: '16:00', enabled: false, foods: [] },
                { id: 'cena', name: 'Cena', time: '20:00', enabled: true, foods: [] },
                { id: 'snack_nocturno', name: 'Snack Nocturno', time: '22:00', enabled: false, foods: [] },
            ],
            reminderMinutes: 30,
            notificationsEnabled: false,
        });
    }

    static setMealSchedule(schedule) {
        Storage.set('mealSchedule', schedule);
    }

    static getWaterReminder() {
        return Storage.get('waterReminder', {
            enabled: false,
            intervalMinutes: 120,
            startTime: '08:00',
            endTime: '22:00',
        });
    }

    static setWaterReminder(settings) {
        Storage.set('waterReminder', settings);
    }

    static getRecipes() {
        return Storage.get('recipes', []);
    }

    static setRecipes(recipes) {
        Storage.set('recipes', recipes);
    }

    static addRecipe(recipe) {
        const recipes = Storage.getRecipes();
        recipe.id = Date.now() + Math.random().toString(36).slice(2, 6);
        recipes.push(recipe);
        Storage.setRecipes(recipes);
        return recipe;
    }

    static removeRecipe(recipeId) {
        let recipes = Storage.getRecipes();
        recipes = recipes.filter(r => r.id !== recipeId);
        Storage.setRecipes(recipes);
    }

    static trackFoodUsage(foodName) {
        const usage = Storage.get('foodUsage', {});
        usage[foodName] = (usage[foodName] || 0) + 1;
        Storage.set('foodUsage', usage);
    }

    static getFrequentFoods(limit = 10) {
        const usage = Storage.get('foodUsage', {});
        return Object.entries(usage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([name, count]) => ({ name, count }));
    }

    static getPantry() {
        return Storage.get('pantry', []);
    }

    static setPantry(items) {
        Storage.set('pantry', items);
    }

    static addPantryItem(item) {
        const pantry = Storage.getPantry();
        item.id = Date.now() + Math.random().toString(36).slice(2, 6);
        pantry.push(item);
        Storage.setPantry(pantry);
        return item;
    }

    static removePantryItem(itemId) {
        let pantry = Storage.getPantry();
        pantry = pantry.filter(i => i.id !== itemId);
        Storage.setPantry(pantry);
    }

    static getDarkMode() {
        return Storage.get('darkMode', false);
    }

    static setDarkMode(enabled) {
        Storage.set('darkMode', enabled);
    }

    static getStreak() {
        const today = new Date();
        let streak = 0;
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
        return streak;
    }
}
