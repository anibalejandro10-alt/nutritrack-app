const BARCODE_DATABASE = {
    // ==================== LACTEOS CHILE ====================
    "7802000000012": { name: "Leche Colun Entera 1L", brand: "Colun", calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, portion: 100 },
    "7802000000029": { name: "Leche Colun Descremada 1L", brand: "Colun", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, portion: 100 },
    "7802000000036": { name: "Leche Colun Semidescremada 1L", brand: "Colun", calories: 45, protein: 3.3, carbs: 4.9, fat: 1.5, portion: 100 },
    "7801620002671": { name: "Yogurt Colun Natural 125g", brand: "Colun", calories: 76, protein: 4, carbs: 9.6, fat: 2.4, portion: 125 },
    "7801620009847": { name: "Yogurt Colun Frutilla 125g", brand: "Colun", calories: 88, protein: 3.6, carbs: 14.4, fat: 2, portion: 125 },
    "7801620003913": { name: "Manjar Colun 250g", brand: "Colun", calories: 325, protein: 6, carbs: 60, fat: 7.5, portion: 100 },
    "7801620004392": { name: "Queso Chanco Colun 250g", brand: "Colun", calories: 350, protein: 23, carbs: 1.5, fat: 28, portion: 100 },
    "7801620006068": { name: "Mantequilla Colun 250g", brand: "Colun", calories: 717, protein: 0.9, carbs: 0.1, fat: 81, portion: 100 },
    "7801000037680": { name: "Leche Soprole Entera 1L", brand: "Soprole", calories: 60, protein: 3.1, carbs: 4.7, fat: 3.2, portion: 100 },
    "7801000037697": { name: "Leche Soprole Descremada 1L", brand: "Soprole", calories: 35, protein: 3.5, carbs: 5, fat: 0.1, portion: 100 },
    "7801000042196": { name: "Yogurt Soprole Frutilla 165g", brand: "Soprole", calories: 83, protein: 3.3, carbs: 13.3, fat: 1.7, portion: 165 },
    "7801000042202": { name: "Yogurt Soprole Vainilla 165g", brand: "Soprole", calories: 85, protein: 3.2, carbs: 13.8, fat: 1.6, portion: 165 },
    "7801000050900": { name: "Manjar Soprole 250g", brand: "Soprole", calories: 320, protein: 5.8, carbs: 59, fat: 7, portion: 100 },
    "7801000011110": { name: "Queso Crema Soprole 227g", brand: "Soprole", calories: 342, protein: 6, carbs: 4, fat: 34, portion: 100 },
    "7801900002015": { name: "Leche Loncoleche Entera 1L", brand: "Loncoleche", calories: 60, protein: 3.1, carbs: 4.7, fat: 3.2, portion: 100 },
    "7801900004019": { name: "Leche Loncoleche Descremada 1L", brand: "Loncoleche", calories: 34, protein: 3.4, carbs: 5, fat: 0.1, portion: 100 },

    // ==================== BEBIDAS CHILE ====================
    "7801610221037": { name: "Coca-Cola Original 350ml", brand: "Coca-Cola", calories: 140, protein: 0, carbs: 35, fat: 0, portion: 350 },
    "7801610221211": { name: "Coca-Cola Zero 350ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "7801610221358": { name: "Coca-Cola Light 350ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "7801610223017": { name: "Fanta Naranja 350ml", brand: "Fanta", calories: 160, protein: 0, carbs: 40, fat: 0, portion: 350 },
    "7801610223116": { name: "Sprite 350ml", brand: "Sprite", calories: 140, protein: 0, carbs: 36, fat: 0, portion: 350 },
    "7801610340019": { name: "Coca-Cola 1.5L", brand: "Coca-Cola", calories: 420, protein: 0, carbs: 105, fat: 0, portion: 1500 },
    "7801610340118": { name: "Coca-Cola Zero 1.5L", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 1500 },
    "7801620008017": { name: "Bilz 350ml", brand: "CCU", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    "7801620008024": { name: "Pap 350ml", brand: "CCU", calories: 158, protein: 0, carbs: 39, fat: 0, portion: 350 },
    "7801620008031": { name: "Kem 350ml", brand: "CCU", calories: 161, protein: 0, carbs: 40, fat: 0, portion: 350 },
    "7801620008048": { name: "Kem Zero 350ml", brand: "CCU", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "7801620008055": { name: "Crush Naranja 350ml", brand: "CCU", calories: 165, protein: 0, carbs: 41, fat: 0, portion: 350 },
    "7801620010010": { name: "Cachantun Con Gas 500ml", brand: "CCU", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    "7801620010027": { name: "Cachantun Sin Gas 500ml", brand: "CCU", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 500 },
    "7801620012014": { name: "Livean Agua Saborizada 500ml", brand: "CCU", calories: 10, protein: 0, carbs: 2, fat: 0, portion: 500 },
    "7801610600019": { name: "Pepsi 350ml", brand: "Pepsi", calories: 150, protein: 0, carbs: 41, fat: 0, portion: 350 },
    "7801610600118": { name: "Pepsi Zero 350ml", brand: "Pepsi", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 350 },
    "9002490100070": { name: "Red Bull 250ml", brand: "Red Bull", calories: 112, protein: 0, carbs: 28, fat: 0, portion: 250 },
    "9002490100087": { name: "Red Bull Sugar Free 250ml", brand: "Red Bull", calories: 5, protein: 0, carbs: 0, fat: 0, portion: 250 },
    "5449000131805": { name: "Monster Energy 473ml", brand: "Monster", calories: 190, protein: 0, carbs: 51, fat: 0, portion: 473 },

    // ==================== JUGOS Y NECTARES ====================
    "7801620020013": { name: "Watts Nectar Naranja 200ml", brand: "Watts", calories: 90, protein: 0.4, carbs: 22, fat: 0, portion: 200 },
    "7801620020020": { name: "Watts Nectar Durazno 200ml", brand: "Watts", calories: 84, protein: 0.2, carbs: 21, fat: 0, portion: 200 },
    "7801620020037": { name: "Watts Nectar Manzana 200ml", brand: "Watts", calories: 88, protein: 0.2, carbs: 22, fat: 0, portion: 200 },
    "7801620020044": { name: "Watts Nectar Piña 200ml", brand: "Watts", calories: 86, protein: 0.3, carbs: 21, fat: 0, portion: 200 },

    // ==================== CERVEZAS CHILE ====================
    "7801620030012": { name: "Cristal Lata 350ml", brand: "CCU", calories: 148, protein: 1.2, carbs: 12, fat: 0, portion: 350 },
    "7801620030029": { name: "Escudo Lata 350ml", brand: "CCU", calories: 155, protein: 1.4, carbs: 13, fat: 0, portion: 350 },
    "7801620030036": { name: "Royal Guard Lata 350ml", brand: "CCU", calories: 143, protein: 1, carbs: 11, fat: 0, portion: 350 },
    "7801610700016": { name: "Becker Lata 350ml", brand: "AB InBev", calories: 150, protein: 1.3, carbs: 12, fat: 0, portion: 350 },
    "7801620050010": { name: "Kunstmann Torobayo 350ml", brand: "CCU", calories: 165, protein: 1.5, carbs: 14, fat: 0, portion: 350 },

    // ==================== SNACKS CAROZZI ====================
    "7801029000017": { name: "Ramitas Queso Carozzi 60g", brand: "Carozzi", calories: 300, protein: 4, carbs: 36, fat: 15, portion: 60 },
    "7801029000024": { name: "Ramitas Natural Carozzi 60g", brand: "Carozzi", calories: 295, protein: 3.5, carbs: 37, fat: 15, portion: 60 },
    "7801029000031": { name: "Caracoquesos Carozzi 65g", brand: "Carozzi", calories: 330, protein: 5, carbs: 40, fat: 16, portion: 65 },
    "7801029000048": { name: "Chis Pop Carozzi 72g", brand: "Carozzi", calories: 370, protein: 4, carbs: 42, fat: 20, portion: 72 },
    "7801029000055": { name: "Pikeos Carozzi 80g", brand: "Carozzi", calories: 400, protein: 6, carbs: 48, fat: 20, portion: 80 },
    "7801029010016": { name: "Doritos Queso 72g", brand: "Evercrisp", calories: 362, protein: 5, carbs: 42, fat: 19, portion: 72 },
    "7801029010023": { name: "Cheetos Queso 55g", brand: "Evercrisp", calories: 275, protein: 3, carbs: 33, fat: 14, portion: 55 },
    "7802215000102": { name: "Papas Lays Clasicas 42g", brand: "Pepsico", calories: 224, protein: 2.5, carbs: 24, fat: 13, portion: 42 },
    "7802215000119": { name: "Papas Lays Cebolla 42g", brand: "Pepsico", calories: 224, protein: 2.5, carbs: 24, fat: 13, portion: 42 },
    "7802215000126": { name: "Papas Lays Limon 42g", brand: "Pepsico", calories: 218, protein: 2.4, carbs: 24, fat: 12.5, portion: 42 },

    // ==================== GALLETAS Y DULCES CHILE ====================
    "7801030400012": { name: "Galleta Triton Costa 126g", brand: "Costa", calories: 605, protein: 7, carbs: 80, fat: 28, portion: 126 },
    "7801030400029": { name: "Galleta Kuky Costa 120g", brand: "Costa", calories: 600, protein: 6.5, carbs: 76, fat: 27, portion: 120 },
    "7801030400036": { name: "Galleta Chiquitin Costa 100g", brand: "Costa", calories: 500, protein: 5, carbs: 70, fat: 20, portion: 100 },
    "7801030400043": { name: "Bolitas de Chocolate Costa 50g", brand: "Costa", calories: 250, protein: 3, carbs: 32, fat: 12, portion: 50 },
    "7801030500019": { name: "Galleta Negrita McKay 135g", brand: "McKay", calories: 628, protein: 7, carbs: 87, fat: 28, portion: 135 },
    "7801030500026": { name: "Galleta Soda McKay 140g", brand: "McKay", calories: 600, protein: 14, carbs: 100, fat: 16, portion: 140 },
    "7801030500033": { name: "Galleta de Agua McKay 140g", brand: "McKay", calories: 560, protein: 12, carbs: 100, fat: 12, portion: 140 },
    "7801030500040": { name: "Galleta Toddy McKay 120g", brand: "McKay", calories: 562, protein: 7.5, carbs: 75, fat: 26, portion: 120 },

    // ==================== CHOCOLATES Y DULCES ====================
    "7613036644112": { name: "Super 8 Nestle", brand: "Nestle", calories: 105, protein: 1, carbs: 12, fat: 6, portion: 23 },
    "7613036644129": { name: "Sahne Nuss Nestle 150g", brand: "Nestle", calories: 550, protein: 7.5, carbs: 55, fat: 35, portion: 100 },
    "7613036650014": { name: "Bon o Bon Arcor", brand: "Arcor", calories: 500, protein: 6, carbs: 56, fat: 28, portion: 100 },
    "7613036655019": { name: "Ambrosoli Menta", brand: "Ambrosoli", calories: 392, protein: 0, carbs: 98, fat: 0, portion: 100 },
    "7622210449283": { name: "Oreo Original 118g", brand: "Mondelez", calories: 482, protein: 4.5, carbs: 73, fat: 21, portion: 100 },
    "7622210449290": { name: "Oreo Double Stuf 157g", brand: "Mondelez", calories: 490, protein: 4, carbs: 70, fat: 22, portion: 100 },
    "7802225511117": { name: "Chocolate Trencito Nestle 150g", brand: "Nestle", calories: 530, protein: 7, carbs: 58, fat: 30, portion: 100 },
    "7802225511124": { name: "Chocolate Trencito Blanco 150g", brand: "Nestle", calories: 540, protein: 6, carbs: 60, fat: 32, portion: 100 },

    // ==================== PAN Y PANADERIA ====================
    "7801040100012": { name: "Pan de Molde Ideal 580g", brand: "Ideal", calories: 267, protein: 9, carbs: 48, fat: 3.7, portion: 100 },
    "7801040100029": { name: "Pan Integral Ideal 580g", brand: "Ideal", calories: 241, protein: 11, carbs: 44, fat: 3.7, portion: 100 },
    "7801040100036": { name: "Pan de Molde Ideal Light", brand: "Ideal", calories: 220, protein: 10, carbs: 42, fat: 2.5, portion: 100 },
    "7801040200019": { name: "Pan Bimbo Blanco 480g", brand: "Bimbo", calories: 270, protein: 8.5, carbs: 50, fat: 3.5, portion: 100 },
    "7801040200026": { name: "Pan Bimbo Integral 480g", brand: "Bimbo", calories: 245, protein: 10, carbs: 45, fat: 3.5, portion: 100 },

    // ==================== CEREALES ====================
    "7613036600118": { name: "Chocapic Nestle 400g", brand: "Nestle", calories: 380, protein: 6.3, carbs: 80, fat: 3.8, portion: 100 },
    "7613036600125": { name: "Zucosos Nestle 400g", brand: "Nestle", calories: 375, protein: 5, carbs: 82, fat: 2.5, portion: 100 },
    "7613036600132": { name: "Nesquik Cereal 400g", brand: "Nestle", calories: 385, protein: 6, carbs: 81, fat: 3.5, portion: 100 },
    "7613036600149": { name: "Fitness Nestle 350g", brand: "Nestle", calories: 357, protein: 9, carbs: 73, fat: 2, portion: 100 },
    "7613036600156": { name: "Corn Flakes Nestle 500g", brand: "Nestle", calories: 357, protein: 7, carbs: 84, fat: 0.4, portion: 100 },
    "5053827154987": { name: "Avena Quaker 1kg", brand: "Quaker", calories: 389, protein: 17, carbs: 66, fat: 7, portion: 100 },
    "5053827154994": { name: "Avena Quaker Instantanea sobre", brand: "Quaker", calories: 130, protein: 4, carbs: 23, fat: 2.5, portion: 35 },

    // ==================== PASTAS Y ARROZ ====================
    "7801029100013": { name: "Spaghetti N5 Carozzi 400g", brand: "Carozzi", calories: 350, protein: 12, carbs: 72, fat: 1.5, portion: 100 },
    "7801029100020": { name: "Tallarin Carozzi 400g", brand: "Carozzi", calories: 350, protein: 12, carbs: 72, fat: 1.5, portion: 100 },
    "7801029100037": { name: "Corbata Carozzi 400g", brand: "Carozzi", calories: 350, protein: 12, carbs: 72, fat: 1.5, portion: 100 },
    "7801029100044": { name: "Espiral Carozzi 400g", brand: "Carozzi", calories: 350, protein: 12, carbs: 72, fat: 1.5, portion: 100 },
    "7801029200010": { name: "Arroz Miraflores 1kg", brand: "Miraflores", calories: 360, protein: 7, carbs: 79, fat: 0.6, portion: 100 },
    "7801029200027": { name: "Arroz Tucapel 1kg", brand: "Tucapel", calories: 360, protein: 7, carbs: 79, fat: 0.6, portion: 100 },

    // ==================== CONSERVAS Y ENLATADOS ====================
    "7801029300014": { name: "Atun en Agua San Jose 170g", brand: "San Jose", calories: 116, protein: 26, carbs: 0, fat: 1, portion: 100 },
    "7801029300021": { name: "Atun en Aceite San Jose 170g", brand: "San Jose", calories: 198, protein: 29, carbs: 0, fat: 8, portion: 100 },
    "7801029300038": { name: "Sardina Van Camps 125g", brand: "Van Camps", calories: 208, protein: 25, carbs: 0, fat: 11, portion: 100 },
    "7801029300045": { name: "Salsa de Tomate Malloa 200g", brand: "Malloa", calories: 85, protein: 1.5, carbs: 18, fat: 0.5, portion: 100 },

    // ==================== ACEITES Y CONDIMENTOS ====================
    "7801029400011": { name: "Aceite Maravilla Chef 900ml", brand: "Chef", calories: 828, protein: 0, carbs: 0, fat: 92, portion: 100 },
    "7801029400028": { name: "Aceite de Oliva Carbonell 500ml", brand: "Carbonell", calories: 828, protein: 0, carbs: 0, fat: 92, portion: 100 },
    "7801029400035": { name: "Mayonesa Hellmanns 500g", brand: "Hellmanns", calories: 724, protein: 0.8, carbs: 0.8, fat: 77, portion: 100 },
    "7801029400042": { name: "Mayonesa Light Hellmanns 500g", brand: "Hellmanns", calories: 327, protein: 0.7, carbs: 7, fat: 33, portion: 100 },
    "7801029400059": { name: "Ketchup Hellmanns 400g", brand: "Hellmanns", calories: 100, protein: 1.3, carbs: 27, fat: 0, portion: 100 },
    "7801029400066": { name: "Mostaza Hellmanns 240g", brand: "Hellmanns", calories: 66, protein: 4, carbs: 6, fat: 3, portion: 100 },

    // ==================== PRODUCTOS NESTLE INTERNACIONALES ====================
    "7613034626844": { name: "Nescafe Clasico 100g", brand: "Nestle", calories: 2, protein: 0.3, carbs: 0, fat: 0, portion: 240 },
    "7613034626851": { name: "Milo Nestle 400g", brand: "Nestle", calories: 420, protein: 6, carbs: 74, fat: 10, portion: 100 },
    "7613036680011": { name: "Leche Condensada Nestle 397g", brand: "Nestle", calories: 321, protein: 7.9, carbs: 55, fat: 8.7, portion: 100 },
    "7613036680028": { name: "Leche Evaporada Ideal 400g", brand: "Nestle", calories: 134, protein: 6.8, carbs: 10, fat: 7.6, portion: 100 },
    "3045140105502": { name: "Nutella 350g", brand: "Ferrero", calories: 539, protein: 6.3, carbs: 57.5, fat: 30.9, portion: 100 },
    "3045140105519": { name: "Nutella 750g", brand: "Ferrero", calories: 539, protein: 6.3, carbs: 57.5, fat: 30.9, portion: 100 },

    // ==================== EMBUTIDOS ====================
    "7801029500018": { name: "Jamon de Pavo PF 200g", brand: "PF", calories: 104, protein: 17, carbs: 2, fat: 3, portion: 100 },
    "7801029500025": { name: "Vienesas PF 12 unidades", brand: "PF", calories: 290, protein: 11, carbs: 3, fat: 26, portion: 100 },
    "7801029500032": { name: "Longaniza PF 500g", brand: "PF", calories: 320, protein: 18, carbs: 1.5, fat: 27, portion: 100 },
    "7801029500049": { name: "Chorizo PF 500g", brand: "PF", calories: 455, protein: 24, carbs: 2, fat: 38, portion: 100 },
    "7801029500056": { name: "Pate PF 100g", brand: "PF", calories: 320, protein: 12, carbs: 3, fat: 29, portion: 100 },

    // ==================== PRODUCTOS INTERNACIONALES ====================
    "5000112546415": { name: "Coca-Cola Original 330ml", brand: "Coca-Cola", calories: 139, protein: 0, carbs: 35, fat: 0, portion: 330 },
    "5449000000996": { name: "Coca-Cola Zero 330ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 330 },
    "4060800100085": { name: "Haribo Ositos 100g", brand: "Haribo", calories: 343, protein: 6.9, carbs: 77, fat: 0.5, portion: 100 },
    "5060335635075": { name: "Pringles Original 165g", brand: "Pringles", calories: 520, protein: 4, carbs: 55, fat: 32, portion: 100 },
    "5060335635082": { name: "Pringles Crema y Cebolla 165g", brand: "Pringles", calories: 525, protein: 4, carbs: 54, fat: 33, portion: 100 },
    "7622300489434": { name: "Milka Chocolate 100g", brand: "Milka", calories: 530, protein: 6.5, carbs: 58, fat: 30, portion: 100 },
    "80135876": { name: "Snickers Barra 52g", brand: "Mars", calories: 250, protein: 4, carbs: 33, fat: 12, portion: 52 },
    "5000159461122": { name: "M&M's Chocolate 45g", brand: "Mars", calories: 210, protein: 2, carbs: 30, fat: 9, portion: 45 },
    "40000495796": { name: "Twix Barra 50g", brand: "Mars", calories: 250, protein: 2.5, carbs: 33, fat: 12, portion: 50 },
    "7622210100610": { name: "Toblerone 100g", brand: "Mondelez", calories: 525, protein: 6, carbs: 59, fat: 29, portion: 100 },

    // ==================== CONGELADOS Y PREPARADOS ====================
    "7801029600015": { name: "Empanada de Pino La Criollita 6u", brand: "La Criollita", calories: 350, protein: 14, carbs: 32, fat: 18, portion: 180 },
    "7801029600022": { name: "Empanada de Queso La Criollita 6u", brand: "La Criollita", calories: 280, protein: 10, carbs: 28, fat: 14, portion: 140 },
    "7801029600039": { name: "Pizza Mozzarella Di Giorno", brand: "Di Giorno", calories: 267, protein: 11, carbs: 30, fat: 11, portion: 100 },
    "7801029600046": { name: "Nuggets de Pollo Super Pollo", brand: "Super Pollo", calories: 240, protein: 13, carbs: 16, fat: 14, portion: 100 },

    // ==================== SUPLEMENTOS DEPORTIVOS ====================
    "5060245603379": { name: "Whey Protein Gold Standard 900g", brand: "Optimum Nutrition", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 30 },
    "5060245603386": { name: "Whey Protein Gold Standard 2.27kg", brand: "Optimum Nutrition", calories: 120, protein: 24, carbs: 3, fat: 1.5, portion: 30 },
    "5060245603393": { name: "Caseina Gold Standard 900g", brand: "Optimum Nutrition", calories: 120, protein: 24, carbs: 3, fat: 1, portion: 33 },
    "5060245700019": { name: "Whey Protein MyProtein 1kg", brand: "MyProtein", calories: 103, protein: 21, carbs: 1, fat: 1.9, portion: 25 },
    "5060245700026": { name: "Creatina Monohidrato MyProtein 500g", brand: "MyProtein", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 5 },
    "7801029700012": { name: "Barra de Proteina Quest 60g", brand: "Quest", calories: 200, protein: 21, carbs: 21, fat: 8, portion: 60 },

    // ==================== FRUTAS Y VERDURAS ENVASADAS ====================
    "7801029800019": { name: "Salsa de Tomate Pomarola 500g", brand: "Carozzi", calories: 52, protein: 1.5, carbs: 8, fat: 1.5, portion: 100 },
    "7801029800026": { name: "Mermelada de Frutilla Watts 500g", brand: "Watts", calories: 250, protein: 0.3, carbs: 65, fat: 0, portion: 100 },
    "7801029800033": { name: "Mermelada de Damasco Watts 500g", brand: "Watts", calories: 248, protein: 0.3, carbs: 64, fat: 0, portion: 100 },
    "7801029800040": { name: "Mermelada de Durazno Watts 500g", brand: "Watts", calories: 245, protein: 0.3, carbs: 63, fat: 0, portion: 100 },

    // ==================== AGUA Y BEBIDAS SALUDABLES ====================
    "7801620015019": { name: "Cachantun Mas Limon 500ml", brand: "CCU", calories: 15, protein: 0, carbs: 3.5, fat: 0, portion: 500 },
    "7801620015026": { name: "Cachantun Mas Frutilla 500ml", brand: "CCU", calories: 15, protein: 0, carbs: 3.5, fat: 0, portion: 500 },
    "7801610500012": { name: "Benedictino Sin Gas 600ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 600 },
    "7801610500029": { name: "Benedictino Con Gas 600ml", brand: "Coca-Cola", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 600 },
    "5449000014535": { name: "Powerade Ion4 600ml", brand: "Coca-Cola", calories: 58, protein: 0, carbs: 14, fat: 0, portion: 600 },
    "7802215100017": { name: "Gatorade Naranja 500ml", brand: "Pepsico", calories: 125, protein: 0, carbs: 31, fat: 0, portion: 500 },
    "7802215100024": { name: "Gatorade Limon 500ml", brand: "Pepsico", calories: 125, protein: 0, carbs: 31, fat: 0, portion: 500 },

    // ==================== PRODUCTOS VARIOS ====================
    "7801029900016": { name: "Miel de Abeja Colmenares 500g", brand: "Colmenares", calories: 304, protein: 0.3, carbs: 82, fat: 0, portion: 100 },
    "7801029900023": { name: "Azucar Iansa 1kg", brand: "Iansa", calories: 387, protein: 0, carbs: 100, fat: 0, portion: 100 },
    "7801029900030": { name: "Endulzante Iansa Stevia 250g", brand: "Iansa", calories: 0, protein: 0, carbs: 0.5, fat: 0, portion: 1 },
    "7801029900047": { name: "Harina Selecta 1kg", brand: "Selecta", calories: 364, protein: 10, carbs: 76, fat: 1, portion: 100 },
    "7801029900054": { name: "Sal Lobos 1kg", brand: "Lobos", calories: 0, protein: 0, carbs: 0, fat: 0, portion: 1 },
    "8710398526878": { name: "Knorr Sopa Instantanea Pollo", brand: "Knorr", calories: 58, protein: 1.5, carbs: 8, fat: 2.2, portion: 250 },
    "7801029900061": { name: "Salsa de Soya Traverso 250ml", brand: "Traverso", calories: 60, protein: 8.7, carbs: 5.3, fat: 0, portion: 100 },
};
