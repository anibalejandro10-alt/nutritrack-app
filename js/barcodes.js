const BARCODE_DATABASE = {
    // ==================== LACTEOS ====================
    // Colun
    "7801620002244": { name: "Leche Entera Colun 1L", brand: "Colun", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: 100 },
    "7801620002251": { name: "Leche Descremada Colun 1L", brand: "Colun", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, portion: 100 },
    "7801620002268": { name: "Leche Semidescremada Colun 1L", brand: "Colun", calories: 45, protein: 3.3, carbs: 4.9, fat: 1.5, portion: 100 },
    "7801620002671": { name: "Yogurt Natural Colun 120g", brand: "Colun", calories: 76, protein: 4, carbs: 9.6, fat: 2.4, portion: 120 },
    "7801620009847": { name: "Yogurt Frutilla Colun 120g", brand: "Colun", calories: 88, protein: 3.6, carbs: 14.4, fat: 2, portion: 120 },
    "7801620003913": { name: "Manjar Colun 440g", brand: "Colun", calories: 286, protein: 7, carbs: 56, fat: 4, portion: 100 },
    "7801620004392": { name: "Queso Chanco Colun", brand: "Colun", calories: 350, protein: 23, carbs: 1.5, fat: 28, portion: 100 },
    "7801620006068": { name: "Mantequilla Colun 250g", brand: "Colun", calories: 717, protein: 0.9, carbs: 0.1, fat: 81, portion: 100 },
    "7801620003210": { name: "Queso Gauda Colun", brand: "Colun", calories: 356, protein: 25, carbs: 2.2, fat: 27, portion: 100 },
    "7801620006761": { name: "Yogurt Griego Colun Natural 110g", brand: "Colun", calories: 95, protein: 8.5, carbs: 4.5, fat: 5, portion: 110 },
    // Soprole
    "7801000037338": { name: "Leche Entera Soprole 1L", brand: "Soprole", calories: 60, protein: 3.1, carbs: 4.7, fat: 3.2, portion: 100 },
    "7801000037345": { name: "Leche Descremada Soprole 1L", brand: "Soprole", calories: 35, protein: 3.5, carbs: 5, fat: 0.1, portion: 100 },
    "7801000042691": { name: "Yogurt Soprole Frutilla 155g", brand: "Soprole", calories: 125, protein: 4.6, carbs: 20, fat: 2.6, portion: 155 },
    "7801000050507": { name: "Manjar Soprole 380g", brand: "Soprole", calories: 290, protein: 6, carbs: 57, fat: 5, portion: 100 },
    "7801000011758": { name: "Queso Crema Soprole 150g", brand: "Soprole", calories: 310, protein: 5.5, carbs: 3.5, fat: 31, portion: 100 },
    // Nestle
    "7613036680013": { name: "Leche Condensada Nestle 397g", brand: "Nestle", calories: 321, protein: 7.9, carbs: 55, fat: 8.7, portion: 100 },
    "7613036680020": { name: "Leche Evaporada Ideal 400ml", brand: "Nestle", calories: 134, protein: 6.8, carbs: 10, fat: 7.6, portion: 100 },

    // ==================== BEBIDAS ====================
    // Coca-Cola Chile
    "7801610221037": { name: "Coca-Cola Original 350ml", brand: "Coca-Cola", calories: 147, protein: 0, carbs: 37, fat: 0, portion: 350 },
    "7801610221136": { name: "Coca-Cola Sin Azucar 350ml", brand: "Coca-Cola", calories: 1, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "7801610340019": { name: "Coca-Cola Original 1.5L", brand: "Coca-Cola", calories: 630, protein: 0, carbs: 158, fat: 0, portion: 1500 },
    "7801610340118": { name: "Coca-Cola Sin Azucar 1.5L", brand: "Coca-Cola", calories: 2, protein: 0, carbs: 0, fat: 0, portion: 1500 },
    "7801610223017": { name: "Fanta Naranja 350ml", brand: "Fanta", calories: 154, protein: 0, carbs: 38, fat: 0, portion: 350 },
    "7801610223116": { name: "Sprite 350ml", brand: "Sprite", calories: 140, protein: 0, carbs: 36, fat: 0, portion: 350 },
    // CCU
    "7801620008116": { name: "Bilz 1.5L", brand: "CCU", calories: 675, protein: 0, carbs: 167, fat: 0, portion: 1500 },
    "7801620008123": { name: "Pap 1.5L", brand: "CCU", calories: 675, protein: 0, carbs: 167, fat: 0, portion: 1500 },
    "7801620008017": { name: "Bilz 350ml", brand: "CCU", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    "7801620008024": { name: "Pap 350ml", brand: "CCU", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    "7801620008031": { name: "Kem Extreme 350ml", brand: "CCU", calories: 161, protein: 0, carbs: 40, fat: 0, portion: 350 },
    "7801620008048": { name: "Kem Zero 350ml", brand: "CCU", calories: 1, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "7801620010010": { name: "Cachantun Con Gas 500ml", brand: "CCU", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    "7801620010027": { name: "Cachantun Sin Gas 500ml", brand: "CCU", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    // Pepsi
    "7801610600019": { name: "Pepsi 350ml", brand: "PepsiCo", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 350 },
    "7801610600118": { name: "Pepsi Zero 350ml", brand: "PepsiCo", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    // Watts
    "7801620023991": { name: "Nectar Naranja Watts 200ml", brand: "Watts", calories: 90, protein: 0.4, carbs: 22, fat: 0, portion: 200 },
    "7801620024004": { name: "Nectar Durazno Watts 200ml", brand: "Watts", calories: 84, protein: 0.2, carbs: 21, fat: 0, portion: 200 },
    "7801620024011": { name: "Nectar Manzana Watts 200ml", brand: "Watts", calories: 88, protein: 0.2, carbs: 22, fat: 0, portion: 200 },
    "7801620020662": { name: "Jugo Watts Naranja 1L", brand: "Watts", calories: 45, protein: 0.3, carbs: 11, fat: 0, portion: 100 },
    // Energeticas
    "90162908": { name: "Red Bull 250ml", brand: "Red Bull", calories: 112, protein: 0, carbs: 28, fat: 0, portion: 250 },
    "90162909": { name: "Red Bull Sugar Free 250ml", brand: "Red Bull", calories: 5, protein: 0, carbs: 0, fat: 0, portion: 250 },
    "70847811756": { name: "Monster Energy 473ml", brand: "Monster", calories: 200, protein: 0, carbs: 54, fat: 0, portion: 473 },
    // Deportivas
    "7802215100109": { name: "Gatorade Lima-Limon 500ml", brand: "PepsiCo", calories: 125, protein: 0, carbs: 31, fat: 0, portion: 500 },
    "7802215100116": { name: "Gatorade Naranja 500ml", brand: "PepsiCo", calories: 125, protein: 0, carbs: 31, fat: 0, portion: 500 },
    "7801610510016": { name: "Powerade Ion4 600ml", brand: "Coca-Cola", calories: 58, protein: 0, carbs: 14, fat: 0, portion: 600 },
    // Agua
    "7801610500012": { name: "Benedictino Sin Gas 600ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 600 },
    "7801610500029": { name: "Benedictino Con Gas 600ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 600 },

    // ==================== CERVEZAS ====================
    "7801620030043": { name: "Cristal Lata 350ml", brand: "CCU", calories: 148, protein: 1.2, carbs: 12, fat: 0, portion: 350 },
    "7801620030050": { name: "Escudo Lata 350ml", brand: "CCU", calories: 155, protein: 1.4, carbs: 13, fat: 0, portion: 350 },
    "7801620030067": { name: "Royal Guard Lata 350ml", brand: "CCU", calories: 143, protein: 1, carbs: 11, fat: 0, portion: 350 },
    "7801620050010": { name: "Kunstmann Torobayo 500ml", brand: "CCU", calories: 235, protein: 2.1, carbs: 20, fat: 0, portion: 500 },
    "7801610700016": { name: "Becker Lata 350ml", brand: "AB InBev", calories: 150, protein: 1.3, carbs: 12, fat: 0, portion: 350 },

    // ==================== SNACKS CHILE ====================
    // Carozzi / Evercrisp
    "7801029008570": { name: "Ramitas Queso 200g", brand: "Evercrisp", calories: 500, protein: 6.7, carbs: 60, fat: 25, portion: 100 },
    "7801029008587": { name: "Ramitas Natural 200g", brand: "Evercrisp", calories: 492, protein: 5.8, carbs: 62, fat: 25, portion: 100 },
    "7801029002240": { name: "Doritos Queso 150g", brand: "Evercrisp", calories: 503, protein: 6.9, carbs: 58, fat: 26, portion: 100 },
    "7801029002523": { name: "Cheetos Queso 150g", brand: "Evercrisp", calories: 500, protein: 5.5, carbs: 60, fat: 25, portion: 100 },
    "7802215000012": { name: "Lays Clasicas 150g", brand: "PepsiCo", calories: 536, protein: 6, carbs: 52, fat: 34, portion: 100 },
    "7802215000029": { name: "Lays Limon 150g", brand: "PepsiCo", calories: 530, protein: 5.8, carbs: 53, fat: 33, portion: 100 },
    "5053990138678": { name: "Pringles Original 124g", brand: "Pringles", calories: 520, protein: 4, carbs: 55, fat: 32, portion: 100 },

    // ==================== GALLETAS Y DULCES ====================
    // Costa
    "7801030400116": { name: "Triton Costa 126g", brand: "Costa", calories: 480, protein: 5.6, carbs: 64, fat: 22, portion: 100 },
    "7801030400598": { name: "Kuky Costa 152g", brand: "Costa", calories: 500, protein: 5.5, carbs: 64, fat: 23, portion: 100 },
    "7801030400444": { name: "Chiquitin Costa 45g", brand: "Costa", calories: 500, protein: 5, carbs: 70, fat: 20, portion: 100 },
    // McKay
    "7801030500019": { name: "Negrita McKay 131g", brand: "McKay", calories: 465, protein: 5.4, carbs: 64, fat: 21, portion: 100 },
    "7801030500224": { name: "Galleta Soda McKay 220g", brand: "McKay", calories: 429, protein: 10, carbs: 71, fat: 11, portion: 100 },
    "7801030500231": { name: "Galleta de Agua McKay 220g", brand: "McKay", calories: 400, protein: 8.6, carbs: 71, fat: 8.6, portion: 100 },
    "7801030500316": { name: "Toddy McKay 150g", brand: "McKay", calories: 469, protein: 6.3, carbs: 63, fat: 22, portion: 100 },
    // Nestle Chocolates
    "7613031579310": { name: "Super 8 Nestle 23g", brand: "Nestle", calories: 105, protein: 1, carbs: 12, fat: 6, portion: 23 },
    "7613034316837": { name: "Sahne Nuss Nestle 250g", brand: "Nestle", calories: 555, protein: 7.5, carbs: 55, fat: 35, portion: 100 },
    "7802225511117": { name: "Trencito Leche Nestle 150g", brand: "Nestle", calories: 530, protein: 7, carbs: 58, fat: 30, portion: 100 },
    // Arcor
    "77949811": { name: "Bon o Bon Arcor 16g", brand: "Arcor", calories: 81, protein: 1.1, carbs: 9, fat: 4.5, portion: 16 },
    // Oreo
    "7622210449283": { name: "Oreo Original 118g", brand: "Mondelez", calories: 482, protein: 4.5, carbs: 73, fat: 21, portion: 100 },
    // Internacional
    "3045140105502": { name: "Nutella 350g", brand: "Ferrero", calories: 539, protein: 6.3, carbs: 57.5, fat: 30.9, portion: 100 },
    "80135876": { name: "Snickers 52g", brand: "Mars", calories: 488, protein: 7.7, carbs: 60, fat: 23, portion: 100 },
    "5000159461122": { name: "M&Ms Chocolate 45g", brand: "Mars", calories: 485, protein: 4.7, carbs: 68, fat: 21, portion: 100 },
    "40000495796": { name: "Twix 50g", brand: "Mars", calories: 495, protein: 4.4, carbs: 64, fat: 25, portion: 100 },

    // ==================== PAN ====================
    "7801040020617": { name: "Pan Molde Blanco Ideal 580g", brand: "Bimbo", calories: 265, protein: 9.2, carbs: 48, fat: 3.5, portion: 100 },
    "7801040020679": { name: "Pan Integral Ideal 580g", brand: "Bimbo", calories: 243, protein: 10.5, carbs: 44, fat: 3.5, portion: 100 },
    "7801040020624": { name: "Pan Molde Light Ideal 380g", brand: "Bimbo", calories: 215, protein: 11, carbs: 40, fat: 2, portion: 100 },

    // ==================== CEREALES ====================
    "7613036256377": { name: "Chocapic Nestle 500g", brand: "Nestle", calories: 381, protein: 6.5, carbs: 78, fat: 4, portion: 100 },
    "7613036602150": { name: "Zucosos Nestle 500g", brand: "Nestle", calories: 375, protein: 5, carbs: 82, fat: 2.5, portion: 100 },
    "7613036601856": { name: "Fitness Cereal Nestle 380g", brand: "Nestle", calories: 357, protein: 9, carbs: 73, fat: 2, portion: 100 },
    "7613036601863": { name: "Corn Flakes Nestle 500g", brand: "Nestle", calories: 357, protein: 7, carbs: 84, fat: 0.4, portion: 100 },
    "7613036602099": { name: "Nesquik Cereal 400g", brand: "Nestle", calories: 385, protein: 6, carbs: 81, fat: 3.5, portion: 100 },
    "5053827154987": { name: "Avena Quaker Tradicional 1kg", brand: "Quaker", calories: 389, protein: 13, carbs: 67, fat: 7, portion: 100 },

    // ==================== PASTAS Y ARROZ ====================
    "7801029004534": { name: "Spaghetti N5 Carozzi 400g", brand: "Carozzi", calories: 348, protein: 12, carbs: 71, fat: 1.4, portion: 100 },
    "7801029004541": { name: "Tallarin Carozzi 400g", brand: "Carozzi", calories: 348, protein: 12, carbs: 71, fat: 1.4, portion: 100 },
    "7801029004558": { name: "Espiral Carozzi 400g", brand: "Carozzi", calories: 348, protein: 12, carbs: 71, fat: 1.4, portion: 100 },
    "7801029004565": { name: "Corbata Carozzi 400g", brand: "Carozzi", calories: 348, protein: 12, carbs: 71, fat: 1.4, portion: 100 },
    "7801620025013": { name: "Arroz Tucapel Grado 1 1kg", brand: "Tucapel", calories: 360, protein: 7, carbs: 79, fat: 0.6, portion: 100 },
    "7801620025020": { name: "Arroz Tucapel Integral 1kg", brand: "Tucapel", calories: 350, protein: 7.5, carbs: 74, fat: 2.5, portion: 100 },

    // ==================== CONSERVAS ====================
    "7801029002578": { name: "Atun en Agua San Jose 170g", brand: "San Jose", calories: 95, protein: 22, carbs: 0, fat: 0.6, portion: 100 },
    "7801029002585": { name: "Atun en Aceite San Jose 170g", brand: "San Jose", calories: 190, protein: 26, carbs: 0, fat: 9, portion: 100 },
    "7801620025600": { name: "Salsa de Tomate Malloa 200g", brand: "Malloa", calories: 68, protein: 1.5, carbs: 14, fat: 0.5, portion: 100 },

    // ==================== SALSAS Y CONDIMENTOS ====================
    "7801600002053": { name: "Mayonesa Hellmanns 500g", brand: "Hellmanns", calories: 709, protein: 1, carbs: 1.3, fat: 78, portion: 100 },
    "7801600002060": { name: "Mayonesa Light Hellmanns 500g", brand: "Hellmanns", calories: 321, protein: 0.8, carbs: 6, fat: 33, portion: 100 },
    "7801600002077": { name: "Ketchup Hellmanns 400g", brand: "Hellmanns", calories: 112, protein: 1.2, carbs: 26, fat: 0.2, portion: 100 },
    "7801600002084": { name: "Mostaza Hellmanns 240g", brand: "Hellmanns", calories: 67, protein: 4, carbs: 5, fat: 3.3, portion: 100 },
    "87157222": { name: "Salsa de Soya Kikkoman 150ml", brand: "Kikkoman", calories: 60, protein: 8.6, carbs: 5.9, fat: 0, portion: 100 },
    "7801600010010": { name: "Aceite Maravilla Chef 900ml", brand: "Chef", calories: 828, protein: 0, carbs: 0, fat: 92, portion: 100 },

    // ==================== EMBUTIDOS ====================
    "7801000123456": { name: "Jamon de Pavo PF 200g", brand: "PF", calories: 104, protein: 17, carbs: 2, fat: 3, portion: 100 },
    "7801000123463": { name: "Vienesas PF 12 unidades", brand: "PF", calories: 275, protein: 11, carbs: 3, fat: 24, portion: 100 },
    "7801000123470": { name: "Longaniza PF 500g", brand: "PF", calories: 320, protein: 17, carbs: 2, fat: 27, portion: 100 },

    // ==================== PRODUCTOS VARIOS ====================
    "7801620025037": { name: "Azucar Iansa 1kg", brand: "Iansa", calories: 400, protein: 0, carbs: 100, fat: 0, portion: 100 },
    "7801620025044": { name: "Endulzante Iansa Stevia 200 sobres", brand: "Iansa", calories: 0, protein: 0, carbs: 0.5, fat: 0, portion: 1 },
    "7801620025051": { name: "Harina Selecta 1kg", brand: "Selecta", calories: 364, protein: 10, carbs: 76, fat: 1, portion: 100 },
    "7801620025068": { name: "Miel de Abeja Natural 500g", brand: "Colmenares", calories: 320, protein: 0.3, carbs: 80, fat: 0, portion: 100 },
    "8710398526878": { name: "Sopa Crema Pollo Knorr", brand: "Knorr", calories: 58, protein: 1.5, carbs: 8, fat: 2.2, portion: 250 },

    // ==================== SUPLEMENTOS ====================
    "748927028232": { name: "Gold Standard Whey 2lb Chocolate", brand: "Optimum Nutrition", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 31 },
    "748927028249": { name: "Gold Standard Whey 2lb Vainilla", brand: "Optimum Nutrition", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 31 },
    "5055534301760": { name: "Impact Whey Protein 1kg Chocolate", brand: "Myprotein", calories: 103, protein: 21, carbs: 1, fat: 1.9, portion: 25 },
    "888849000562": { name: "Quest Bar Chocolate 60g", brand: "Quest", calories: 200, protein: 21, carbs: 21, fat: 8, portion: 60 },

    // ==================== CAFE Y TE ====================
    "7613034626844": { name: "Nescafe Clasico 170g", brand: "Nestle", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    "7613034626851": { name: "Milo Nestle 400g", brand: "Nestle", calories: 420, protein: 6, carbs: 74, fat: 10, portion: 100 },
    "7801620025075": { name: "Te Club 100 bolsitas", brand: "Club", calories: 1, protein: 0, carbs: 0.2, fat: 0, portion: 200 },

    // ==================== CONGELADOS ====================
    "7801620025082": { name: "Nuggets de Pollo Super Pollo 400g", brand: "Super Pollo", calories: 240, protein: 13, carbs: 16, fat: 14, portion: 100 },
    "7801620025099": { name: "Empanada de Pino PF 6 unidades", brand: "PF", calories: 194, protein: 7.8, carbs: 18, fat: 10, portion: 100 },
    "7801620025105": { name: "Pizza Mozzarella Di Giorno", brand: "Di Giorno", calories: 250, protein: 11, carbs: 28, fat: 10, portion: 100 },

    // ==================== LECHE VEGETAL ====================
    "7801620025112": { name: "Leche de Almendras Not Milk 1L", brand: "NotCo", calories: 20, protein: 0.5, carbs: 0.5, fat: 1.5, portion: 100 },
    "7801620025129": { name: "Not Milk Entera 1L", brand: "NotCo", calories: 48, protein: 1, carbs: 5, fat: 2.5, portion: 100 },
};
