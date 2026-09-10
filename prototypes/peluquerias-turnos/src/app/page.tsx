"use client";

import { useEffect, useMemo, useState } from "react";

type Business = { id: string; name: string; rating?: string; reviews?: number; hours: string[] };

const businesses: Business[] = [
  { id: "hl", name: "Barbería HL", rating: "4.8", reviews: 374, hours: ["lunes a viernes, 09:30–19:30","sábado y domingo cerrado"] },
  { id: "mustafa", name: "Mustafa barbería", rating: "5.0", reviews: 45, hours: ["lunes a miércoles 13:30–20:00","jueves y viernes 10:00–20:00","sábado 09:30–14:30","domingo cerrado"] },
  { id: "unisex", name: "Peluqueria unisex", rating: "4.8", reviews: 125, hours: ["martes a viernes 09:00–19:00","sábado 09:00–18:00","lunes y domingo cerrado"] },
  { id: "albornoz", name: "SALON UNISEX ALBORNOZ", rating: "4.8", reviews: 171, hours: ["lunes a viernes 09:00–14:30 y 15:30–20:00","sábado 09:00–17:00","domingo cerrado"] },
  { id: "style-a", name: "Style A Peluquería", rating: "4.8", reviews: 41, hours: ["martes a sábado 09:00–17:00","lunes y domingo cerrado"] },
  { id: "v-beauty", name: "Peluquería y Spa V Beauty", rating: "4.9", reviews: 31, hours: ["lunes a sábado 09:30–18:30","domingo cerrado"] },
  { id: "basuino", name: "Basuino Estilistas", rating: "4.8", reviews: 279, hours: ["martes a viernes 10:00–19:00","sábado 09:30–18:00","lunes y domingo cerrado"] },
  { id: "estilo-morena", name: "Peluquería Estilo Morena", rating: "4.8", reviews: 24, hours: ["Horario no publicado en la fuente"] },
  { id: "pelokitos", name: "Pelokitos Peluquería para Niños", rating: "4.8", reviews: 166, hours: ["todos los días 10:00–21:00"] },
  { id: "carina", name: "Peluquería Carina", rating: "4.8", reviews: 119, hours: ["martes a viernes 09:00–18:00","sábado 09:00–17:00","lunes y domingo cerrado"] },
  { id: "chiche", name: "Peluquería Chiche", rating: "4.9", reviews: 81, hours: ["Horario no publicado en la fuente"] },
  { id: "ruffa", name: "Ruffa Peluquería", rating: "4.5", reviews: 228, hours: ["todos los días 10:00–19:00"] },
  { id: "zohan", name: "Zohan Barbería, Peluquería y Bar", rating: "4.9", reviews: 73, hours: ["martes y miércoles 09:00–12:00 y 16:30–20:00","jueves y viernes hasta las 21:00","sábado 09:00–21:00","lunes y domingo cerrado"] },
  { id: "luciano", name: "Peluquería Luciano Pompei", rating: "4.8", reviews: 91, hours: ["martes a viernes 09:00–12:00 y 16:00–19:30","sábado 10:00–13:00 y 15:00–19:30","lunes y domingo cerrado"] },
  { id: "goldenblade", name: "GoldenBlade Barbershop", rating: "5.0", reviews: 26, hours: ["martes a viernes 10:00–20:00","sábado 10:00–18:00","lunes y domingo cerrado"] },
  { id: "rucci", name: "El Barber Del Rucci fabian", rating: "4.6", reviews: 48, hours: ["Horario no publicado en la fuente"] },
  { id: "cintia", name: "Cintia Romero Beauty Hair & Esthetic", rating: "4.8", reviews: 39, hours: ["martes a sábado 09:00–18:00","lunes y domingo cerrado"] },
  { id: "demario", name: "Peluqueria De Mario", rating: "4.6", reviews: 70, hours: ["Horario no publicado en la fuente"] },
  { id: "karolina", name: "Peluquería Karolina", rating: "4.8", reviews: 42, hours: ["lunes y domingo 09:00–17:00","martes a sábado cerrado"] },
  { id: "irene", name: "Peluquería Irene", rating: "4.8", reviews: 69, hours: ["martes a viernes 10:00–19:00","sábado 10:00–16:00","lunes y domingo cerrado"] },
  { id: "maria-jesus", name: "Peluquería María Jesús", rating: "4.5", reviews: 21, hours: ["Horario no publicado en la fuente"] },
  { id: "the-barbers-brothers", name: "The Barbers Brothers", rating: "4.9", reviews: 104, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-ricky-telesco", name: "Peluquería Ricky Telesco", rating: "4.8", reviews: 143, hours: ["Lun: Cerrado","Mar a Sáb: 9:30 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-daniel-leal", name: "Peluquería Daniel Leal", rating: "4.7", reviews: 156, hours: ["Lun: Cerrado","Mar a Vie: 8 AM to 12 PM, 2 to 8 PM","Sáb: 8 AM to 8 PM","Dom: Cerrado"] },
  { id: "estilista-s", name: "Estilista s", rating: "4.9", reviews: 21, hours: ["Lun a Sáb: 9 AM to 9 PM","Dom: 6 to 9 PM"] },
  { id: "ailin-estilista", name: "Ailin Estilista", rating: "4.9", reviews: 25, hours: ["Lun: Cerrado","Mar a Vie: 8:30 AM to 5 PM","Sáb: 8 AM to 5 PM","Dom: Cerrado"] },
  { id: "destello-estilistas", name: "Destello Estilistas", rating: "4.7", reviews: 115, hours: ["Lun: Cerrado","Mar a Vie: 9 AM to 12:30 PM, 3:30 to 7:30 PM","Sáb: 9 AM to 12:30 PM, 3 to 7 PM","Dom: Cerrado"] },
  { id: "estilista-arjona", name: "Estilista Arjona", rating: "4.9", reviews: 50, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "viviana-estilista", name: "Viviana Estilista", rating: "4.7", reviews: 33, hours: ["Horario a confirmar con el equipo"] },
  { id: "santiago-estilista", name: "Santiago Estilista", rating: "4.9", reviews: 62, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "soledad-estilistas", name: "Soledad Estilistas", rating: "4.8", reviews: 54, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 8 PM","Dom: Cerrado"] },
  { id: "carolina-colusso-estilista", name: "Carolina Colusso Estilista", rating: "5", reviews: 21, hours: ["Lun: Cerrado","Mar a Vie: 12 to 6 PM","Sáb: 10 AM to 5 PM","Dom: Cerrado"] },
  { id: "estilista-estela-edit", name: "Estilista Estela Edit", rating: "4.9", reviews: 39, hours: ["Lun: Cerrado","Mar a Vie: 9 AM to 12:30 PM, 3 to 6:30 PM","Sáb: 9 AM to 5 PM","Dom: Cerrado"] },
  { id: "estilistas-del-paseo", name: "Estilistas del Paseo", rating: "4.1", reviews: 50, hours: ["Lun: Cerrado","Mar a Vie: 9:30 AM to 7 PM","Sáb: 9 AM to 4 PM","Dom: Cerrado"] },
  { id: "miguel-angel-estilista-unisex", name: "Miguel Angel Estilista Unisex", rating: "4.8", reviews: 285, hours: ["Lun: Cerrado","Mar a Vie: 10 AM to 7 PM","Sáb: 9 AM to 6 PM","Dom: Cerrado"] },
  { id: "hernan-baggi-estilistas", name: "HERNÁN BAGGI estilistas", rating: "4.8", reviews: 83, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 6 PM","Dom: Cerrado"] },
  { id: "estilo-gala-estilista", name: "Estilo Gala Estilista", rating: "5", reviews: 22, hours: ["Lun a Vie: 9 AM to 6 PM","Sáb y Dom: Cerrado"] },
  { id: "jesica-paniza-hairstudio", name: "Jésica Paniza Hairstudio", rating: "4.9", reviews: 59, hours: ["Lun: Cerrado","Mar a Vie: 10 AM to 6 PM","Sáb: 9 AM to 5 PM","Dom: Cerrado"] },
  { id: "canete-s-barbershop", name: "Cañete's Barbershop", rating: "4.3", reviews: 74, hours: ["Lun y Mar: 11 AM to 9 PM","Mié y Jue: 11:30 AM to 9 PM","Vie a Dom: 11 AM to 9 PM"] },
  { id: "barberia-siberian", name: "Barbería Siberian", rating: "4.8", reviews: 45, hours: ["Lun: Cerrado","Mar: 12 AM to 5 PM","Mié a Vie: 5 to 9 PM","Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "jesica-stilista", name: "Jesica Stilista", rating: "5", reviews: 41, hours: ["Lun a Sáb: 9 AM to 7 PM","Dom: Cerrado"] },
  { id: "sandra-estilista-unisex", name: "Sandra ESTILISTA UNISEX", rating: "4.8", reviews: 43, hours: ["Lun a Sáb: 9:30 AM to 7:30 PM","Dom: Cerrado"] },
  { id: "ruben-t-estilista", name: "Ruben T Estilista", rating: "4.9", reviews: 23, hours: ["Horario a confirmar con el equipo"] },
  { id: "peluqueria-natalia-rojas", name: "Peluqueria Natalia Rojas", rating: "5", reviews: 33, hours: ["Lun a Sáb: 9 AM to 7:30 PM","Dom: Cerrado"] },
  { id: "lumina-studio", name: "Lúmina Studio", rating: "5", reviews: 25, hours: ["Lun a Vie: 9 AM to 12 PM, 3 to 7 PM","Sáb y Dom: Cerrado"] },
  { id: "salon-de-belleza-kdf", name: "Salon de belleza KDF", rating: "4.6", reviews: 21, hours: ["Horario a confirmar con el equipo"] },
  { id: "lmg-essence", name: "LMG ESSENCE", rating: "5", reviews: 70, hours: ["Lun: 9 AM to 9 PM","Mar a Vie: 9 AM to 8 PM","Sáb: 9 AM to 1 PM","Dom: Cerrado"] },
  { id: "team-petro-estilistas", name: "team Petro estilistas", rating: "4.7", reviews: 177, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "mazutiz-estilistas", name: "Mazutiz Estilistas", rating: "4.5", reviews: 50, hours: ["Lun: Cerrado","Mar a Vie: 10 AM to 8 PM","Sáb: 10 AM to 6 PM","Dom: Cerrado"] },
  { id: "estilistas-rodolfo-romano-y-daniel-ledesma", name: "Estilistas Rodolfo Romano y Daniel Ledesma", rating: "4.8", reviews: 75, hours: ["Lun a Sáb: 4 to 10 PM","Dom: Cerrado"] },
  { id: "nestor-fuentes-estilista", name: "Nestor Fuentes Estilista", rating: "4.6", reviews: 145, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "e-j-estilistas-peluqueria-unisex", name: "E+J Estilistas peluquería unisex", rating: "4.8", reviews: 76, hours: ["Lun a Sáb: 8 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-sergio-castillo-estilismo-de-autor", name: "Peluquería Sergio Castillo Estilismo de autor", rating: "4.8", reviews: 73, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "noema-estilistas", name: "Noema Estilistas", rating: "5", reviews: 85, hours: ["Lun a Sáb: 9 AM to 8 PM","Dom: 10 AM to 7 PM"] },
  { id: "nidi-estilista-y-spa-especialista-en-colorimetria", name: "NIDI Estilista y Spa • Especialista en Colorimetría", rating: "4.8", reviews: 242, hours: ["Lun a Vie: 10 AM to 6 PM","Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "valeria-ugas-estilista-profesional", name: "Valeria Ugas Estilista Profesional", rating: "4.8", reviews: 54, hours: ["Lun a Sáb: 10 AM to 6 PM","Dom: 10 AM to 4 PM"] },
  { id: "rodrigo-estilista", name: "Rodrigo Estilista", rating: "4.8", reviews: 44, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "anna-estilista", name: "Anna Estilista", rating: "4.7", reviews: 70, hours: ["Lun: Cerrado","Mar a Jue: 10 AM to 8 PM","Vie y Sáb: 9:30 AM to 8 PM","Dom: Cerrado"] },
  { id: "osvaldo-penelas-estilista", name: "Osvaldo Penelas Estilista", rating: "4.7", reviews: 41, hours: ["Lun a Sáb: 10 AM to 9 PM","Dom: Cerrado"] },
  { id: "mt-estilista", name: "MT Estilista", rating: "5", reviews: 78, hours: ["Lun: Cerrado","Mar a Sáb: 11 AM to 8 PM","Dom: Cerrado"] },
  { id: "roma-estilista-spa-peinados-a-domicilio-novias-casamientos-quinceaneras-masajes-peluqueria", name: "ROMA ESTILISTA SPA/PEINADOS A DOMICILIO/NOVIAS/CASAMIENTOS/QUINCEAÑERAS/MASAJES/PELUQUERÍA.", rating: "5", reviews: 32, hours: ["Lun a Dom: 9 AM to 10 PM"] },
  { id: "norberto-vallina-estilista", name: "Norberto Vallina estilista", rating: "4.8", reviews: 37, hours: ["Lun: Cerrado","Mar a Vie: 11:30 AM to 7 PM","Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "barberia-club-22", name: "Barberia Club 22", rating: "4.5", reviews: 473, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "barberia-luxury-gr", name: "Barbería Luxury GR 💈", rating: "5", reviews: 60, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "felix-barber-studio", name: "Félix Barber Studio", rating: "4.8", reviews: 162, hours: ["Lun: Cerrado","Mar a Sáb: 11 AM to 8 PM","Dom: Cerrado"] },
  { id: "rufianes-barberia-av-congreso-2365", name: "Rufianes Barberia Av.Congreso 2365", rating: "4.4", reviews: 769, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "barberia-argentina", name: "Barberia Argentina", rating: "4.4", reviews: 154, hours: ["Lun: Cerrado","Mar a Dom: 10 AM to 8 PM"] },
  { id: "al-mejor-estilo-barberia", name: "Al Mejor Estilo Barberia", rating: "4.8", reviews: 114, hours: ["Lun a Sáb: 10:30 AM to 8 PM","Dom: Cerrado"] },
  { id: "pikaros-barberia", name: "Pikaros barberia", rating: "4.9", reviews: 81, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "soul-barber-studio", name: "Soul Barber Studio", rating: "5", reviews: 72, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "barberia-90-s", name: "Barbería 90´s", rating: "5", reviews: 63, hours: ["Lun a Vie: 12 to 8:30 PM","Sáb y Dom: Cerrado"] },
  { id: "barberia-argentina-2", name: "Barberia Argentina 2", rating: "4.3", reviews: 45, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "el-as-barberia", name: "El As Barbería", rating: "4.4", reviews: 53, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "rufianes-barberia-monroe", name: "RUFIANES BARBERIA MONROE", rating: "4.3", reviews: 63, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "hacha-brava-barberia-en-nunez", name: "Hacha Brava Barbería en Núñez", rating: "4.5", reviews: 123, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "hipster-barber", name: "Hipster barber", rating: "4.7", reviews: 23, hours: ["Lun y Mar: 11 AM to 8 PM","Mié: 8 AM to 7 PM","Jue a Sáb: 11 AM to 8 PM","Dom: Cerrado"] },
  { id: "peluqueria-y-barberia-julio", name: "Peluquería y Barbería Julio", rating: "4.9", reviews: 120, hours: ["Lun: Cerrado","Mar a Vie: 9:30 AM to 1 PM, 3:30 to 7 PM","Sáb: 9:30 AM to 3 PM","Dom: Cerrado"] },
  { id: "munich-barberia", name: "Munich Barbería", rating: "4.4", reviews: 36, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "il-santino-barberia", name: "IL SANTINO BARBERIA", rating: "4.6", reviews: 131, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "by-me-peluqueria-barberia", name: "By Me Peluquería Barbería", rating: "4.9", reviews: 70, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "gervas-barberia-y-peluqueria", name: "Gervas barberia y peluqueria", rating: "4.9", reviews: 127, hours: ["Lun a Vie: 12 to 7 PM","Sáb: 9 AM to 2 PM","Dom: Cerrado"] },
  { id: "rufianes-barberia-congreso-2580", name: "Rufianes Barberia Congreso 2580", rating: "4.1", reviews: 58, hours: ["Lun a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "la-belleceria-peluqueria", name: "La Belleceria peluquería", rating: "4.9", reviews: 402, hours: ["Lun: 8 AM to 10 PM","Mar: 8 AM to 10:30 PM","Mié: 8 AM to 10 PM","Jue y Vie: 8 AM to 11 PM","Sáb: 7:30 AM to 8 PM","Dom: 9 AM to 10 PM"] },
  { id: "peluqueria-pepe", name: "PELUQUERÍA Pepe", rating: "4.8", reviews: 406, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "alejandra-acqua-peluqueria", name: "Alejandra Acqua Peluquería", rating: "4.9", reviews: 196, hours: ["Lun: Cerrado","Mar a Sáb: 11 AM to 7 PM","Dom: Cerrado"] },
  { id: "vanina-orfois-peluqueria", name: "VANINA ORFOIS • Peluquería", rating: "4.9", reviews: 4383, hours: ["Lun a Sáb: 9 AM to 8:30 PM","Dom: Cerrado"] },
  { id: "peluqueria-peinados", name: "Peluquería Peinados", rating: "4.9", reviews: 29, hours: ["Lun: Cerrado","Mar a Vie: 10 AM to 1 PM, 2 to 7 PM","Sáb: 10 AM to 1 PM, 2 to 6 PM","Dom: Cerrado"] },
  { id: "hv-peluqueria", name: "HV Peluquería", rating: "4.5", reviews: 225, hours: ["Lun y Mar: Cerrado","Mié a Sáb: 10 AM to 6 PM","Dom: Cerrado"] },
  { id: "peluqueria-chapeaux", name: "Peluquería Chapeaux", rating: "4.3", reviews: 277, hours: ["Lun a Sáb: 9 AM to 8 PM","Dom: Cerrado"] },
  { id: "del-rio-peluqueria", name: "Del Rio Peluquería", rating: "4.4", reviews: 69, hours: ["Lun a Sáb: 9 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-alcides-alvarenga", name: "Peluquería Alcides Alvarenga", rating: "4.7", reviews: 148, hours: ["Lun: Cerrado","Mar a Vie: 8:30 AM to 12 PM, 2:30 to 8 PM","Sáb: 8:30 AM to 12:30 PM, 2 to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-mirame-bymatt", name: "Peluquería Mirame ByMatt", rating: "4.6", reviews: 340, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 8 PM","Dom: Cerrado"] },
  { id: "peluqueria-unisex-daniel-sabga", name: "Peluquería unisex Daniel Sabga", rating: "4.8", reviews: 54, hours: ["Lun: Cerrado","Mar a Sáb: 10:30 AM to 7 PM","Dom: Cerrado"] },
  { id: "estilo-peluqueria", name: "Estilo Peluquería", rating: "4.7", reviews: 44, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-ezeangel", name: "Peluquería Ezeangel", rating: "4.3", reviews: 134, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "peluqueria-constantine", name: "Peluquería Constantine", rating: "4.3", reviews: 151, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 6:30 PM","Dom: Cerrado"] },
  { id: "peluqueria-estilo-diva", name: "Peluquería Estilo Diva", rating: "4.7", reviews: 30, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 7 PM","Dom: Cerrado"] },
  { id: "maria-corbalan-peluqueria", name: "María Corbalán Peluquería", rating: "4.8", reviews: 30, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 12 PM, 3 to 7 PM","Dom: Cerrado"] },
  { id: "difusiones-peluqueria-unisex", name: "Difusiones Peluquería Unisex", rating: "4.2", reviews: 40, hours: ["Lun: Cerrado","Mar a Vie: 10 AM to 2 PM, 3 to 7 PM","Sáb: 10 AM to 2 PM, 3 to 6 PM","Dom: Cerrado"] },
  { id: "zebra-peluqueria-unisex", name: "Zebra peluquería unisex", rating: "4.6", reviews: 25, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 8:30 PM","Dom: Cerrado"] },
  { id: "peluqueria-de-sol", name: "Peluquería de Sol", rating: "5", reviews: 24, hours: ["Horario a confirmar con el equipo"] },
  { id: "rith-mendoza-peluqueria", name: "Rith Mendoza (Peluquería) 🤎", rating: "5", reviews: 37, hours: ["Lun: Cerrado","Mar: 10 AM to 4 PM","Mié: 10 AM to 8 PM","Jue: 10 AM to 6 PM","Vie y Sáb: 10 AM to 8 PM","Dom: Cerrado"] },
  { id: "peluqueria-stilos", name: "Peluquería Stilos", rating: "4.7", reviews: 26, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 7 PM","Dom: Cerrado"] },
  { id: "gustavo-resquin-estilista-profesional", name: "Gustavo Resquin Estilista Profesional", rating: "5", reviews: 35, hours: ["Lun a Vie: 10 AM to 7 PM","Sáb: 10 AM to 1 PM","Dom: Cerrado"] },
  { id: "mariana-martinez", name: "MARIANA MARTÍNEZ", rating: "4.5", reviews: 92, hours: ["Lun: Cerrado","Mar a Sáb: 9 AM to 5 PM","Dom: Cerrado"] },
  { id: "peluqueria-tu-lugar", name: "Peluquería tu Lugar", rating: "4.8", reviews: 39, hours: ["Lun y Mar: Cerrado","Mié a Sáb: 10 AM to 6 PM","Dom: Cerrado"] },
  { id: "peluqueria-oscar", name: "Peluquería Oscar", rating: "4.5", reviews: 61, hours: ["Lun: Cerrado","Mar a Sáb: 12 to 8 PM","Dom: Cerrado"] },
  { id: "la-barberia-del-papi", name: "La Barbería del PAPI", rating: "4.7", reviews: 20, hours: ["Lun a Jue: 11 AM to 8 PM","Vie: 11 AM to 7 PM","Sáb: 11 AM to 9 PM","Dom: Cerrado"] },
  { id: "peluqueria-y-barberia-reserva-de-turno", name: "Peluquería y barbería reserva de turno", rating: "4.8", reviews: 634, hours: ["Lun: 8 AM to 11:30 PM","Mar a Dom: Abierto las 24 horas"] },
  { id: "hacha-brava-barberia-recoleta", name: "Hacha Brava Barbería Recoleta", rating: "4.8", reviews: 46, hours: ["Lun a Sáb: 11 AM to 9 PM","Dom: Cerrado"] },
  { id: "capitan-barberia", name: "CAPITÁN BARBERÍA", rating: "4.9", reviews: 1168, hours: ["Lun a Vie: 10 AM to 8 PM","Sáb y Dom: Cerrado"] },
  { id: "barberia-original-fade", name: "Barberia Original Fade", rating: "4.7", reviews: 219, hours: ["Lun a Mié: 10 AM to 8 PM","Jue a Sáb: 10 AM to 9 PM","Dom: 12 to 5 PM"] },
  { id: "fredy-estilistas-unisex", name: "Fredy Estilistas Unisex", rating: "5", reviews: 40, hours: ["Lun: Cerrado","Mar a Sáb: 10 AM to 4 PM","Dom: Cerrado"] },
  { id: "caro-franco-estilista-mkp", name: "Caro Franco Estilista & MKP", hours: ["Horario a confirmar con el equipo"] },
];

const services = [
  { name: "Corte", detail: "45 min" },
  { name: "Corte + barba", detail: "60 min" },
  { name: "Color", detail: "90 min" },
  { name: "Brushing", detail: "45 min" },
];

const salonPhotos = [
  { src: "/images/hair-salon/hero-salon-interior.jpg", alt: "Interior de referencia de un salón de peluquería" },
  { src: "/images/hair-salon/service-hair-styling-hands.jpg", alt: "Servicio de styling en un salón de peluquería" },
  { src: "/images/hair-salon/detail-wash-station.jpg", alt: "Estación de lavado de un salón de peluquería" },
];

const staff = [
  { name: "Lucía", role: "Estilista", services: ["Corte", "Color", "Brushing"], color: "#7de2d1", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=85", load: [0, 62, 88, 54, 80, 48, 74] },
  { name: "Mica", role: "Colorista", services: ["Color", "Brushing"], color: "#ffb17a", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=85", load: [0, 82, 64, 78, 91, 65, 58] },
  { name: "Sofi", role: "Barbería", services: ["Corte", "Corte + barba"], color: "#a9a3ff", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=700&q=85", load: [0, 54, 72, 44, 69, 77, 42] },
];

const days = [
  { short: "Lun", date: "08 Sep" }, { short: "Mar", date: "09 Sep" }, { short: "Mié", date: "10 Sep" },
  { short: "Jue", date: "11 Sep" }, { short: "Vie", date: "12 Sep" }, { short: "Sáb", date: "13 Sep" }, { short: "Dom", date: "14 Sep" },
];
const slots = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

function Button({ children, onClick, secondary = false, disabled = false }: { children: React.ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button className={secondary ? "button button-secondary" : "button"} onClick={onClick} disabled={disabled}>{children}</button>;
}

export default function Home() {
  const [view, setView] = useState<"client" | "owner">("client");
  const [businessId, setBusinessId] = useState("basuino");
  const [step, setStep] = useState(1);
  const [day, setDay] = useState(0);
  const [hairdresser, setHairdresser] = useState("");
  const [service, setService] = useState("");
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [ownerDay, setOwnerDay] = useState(2);

  const business = businesses.find((item) => item.id === businessId) ?? businesses[0];
  const hasReviews = business.rating !== undefined && business.reviews !== undefined;
  const selectedStaff = staff.find((item) => item.name === hairdresser);
  const readyToConfirm = Boolean(name.trim() && contact.trim());
  const occupancy = useMemo(() => Math.round(staff.reduce((total, item) => total + item.load[ownerDay], 0) / staff.length), [ownerDay]);

  useEffect(() => {
    const requestedBusiness = new URLSearchParams(window.location.search).get("business");
    if (requestedBusiness && businesses.some((item) => item.id === requestedBusiness)) {
      const frame = window.requestAnimationFrame(() => setBusinessId(requestedBusiness));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  function resetBooking() {
    setStep(1); setDay(0); setHairdresser(""); setService(""); setSlot(""); setName(""); setContact(""); setConfirmed(false);
  }
  return (
    <div className="site-shell">
      <div className="demo-banner">DEMO DE NIVAROR <span>Esta muestra no es el sitio oficial ni recibe turnos reales.</span></div>
      <header className="nav">
        <a className="brand" href="#inicio">agenda<span>+</span></a>
        <div className="view-switch" role="tablist" aria-label="Cambiar perspectiva"><button className={view === "client" ? "active" : ""} onClick={() => setView("client")}>Reservar</button><button className={view === "owner" ? "active" : ""} onClick={() => setView("owner")}>Vista del dueño</button></div>
      </header>

      {view === "client" ? <main>
        <section className="hero" id="inicio"><div className="hero-copy"><p className="eyebrow">Reservá tu turno</p><h1>{business.name}</h1><p className="hero-text">Una agenda simple para reservar con la persona correcta y que el equipo vea la semana completa de un vistazo.</p><Button onClick={() => document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth" })}>Reservar un turno <span>↗</span></Button><p className="microcopy">Demo funcional · Sin pago · Sin datos reales</p></div><div className="hero-visual"><div className="hero-gallery" aria-label="Fotos de referencia del salón">{salonPhotos.map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt} loading={index === 0 ? "eager" : "lazy"} />)}</div><div className="hero-board" aria-label="Resumen visual de la agenda"><div className="board-top"><span>HOY · MIÉ 10 SEP</span><span className="live-dot">● Agenda abierta</span></div><div className="board-title"><strong>{business.name}</strong>{hasReviews && <span>{business.rating} <b>★</b> · {business.reviews} reseñas</span>}</div><div className="board-line"><span>09:00</span><span className="board-pill aqua">Lucía · Corte</span><span className="board-pill muted">10:30 libre</span></div><div className="board-line"><span>12:00</span><span className="board-pill orange">Mica · Color</span><span className="board-pill muted">13:30 libre</span></div><div className="board-line"><span>15:00</span><span className="board-pill purple">Sofi · Barbería</span><span className="board-pill muted">16:30 libre</span></div><div className="board-footer"><span>Distribución del día</span><div className="mini-bars"><i /><i /><i /><i /><i /></div><strong>76%</strong></div></div></div></section>
        <section className="trust-row">{hasReviews ? <><span><b>{business.rating} ★</b> en Google Maps</span><span>{business.reviews} reseñas verificadas en la fuente</span></> : <span>Ficha de Google Maps a confirmar</span>}<span>Agenda por profesional</span></section>
        <section className="booking-section" id="reservar"><div className="section-intro"><p className="eyebrow">01 / Reservar</p><h2>Un turno, cinco decisiones simples.</h2><p>La persona elige cuándo venir y con quién atenderse. El equipo recibe la agenda ordenada.</p></div><div className="booking-layout"><aside className="step-list">{["Día", "Peluquero", "Servicio", "Horario", "Confirmar"].map((label, index) => <button key={label} className={step === index + 1 ? "current" : step > index + 1 ? "done" : ""} onClick={() => step > index + 1 && setStep(index + 1)}><span>{step > index + 1 ? "✓" : `0${index + 1}`}</span>{label}</button>)}<div className="booking-note"><span>↳</span><p>Las disponibilidades de esta muestra son ilustrativas. Se conectan al calendario real del salón en una implementación.</p></div></aside><div className="booking-card"><div className="booking-card-head"><div><p className="eyebrow">{business.name}</p><h3>{step === 1 ? "¿Qué día te queda mejor?" : step === 2 ? "Elegí quién te atiende" : step === 3 ? "¿Qué servicio buscás?" : step === 4 ? "Elegí un horario" : "Revisá tu turno"}</h3></div><span className="step-count">0{step} / 05</span></div>
          {step === 1 && <div className="choice-grid day-grid">{days.map((item, index) => <button key={item.date} className={day === index ? "choice selected" : "choice"} onClick={() => setDay(index)}><small>{item.short}</small><strong>{item.date.split(" ")[0]}</strong><span>{item.date.split(" ")[1]}</span></button>)}</div>}
          {step === 2 && <div className="choice-grid">{staff.map((item) => <button key={item.name} className={hairdresser === item.name ? "choice person selected" : "choice person"} onClick={() => { setHairdresser(item.name); setService(""); setSlot(""); }}><img className="avatar photo-avatar" src={item.photo} alt="" /><span><strong>{item.name}</strong><small>{item.role}</small></span><b>{hairdresser === item.name ? "✓" : "→"}</b></button>)}</div>}
          {step === 3 && <div className="choice-grid service-grid">{services.map((item) => { const unavailable = !selectedStaff?.services.includes(item.name); return <button key={item.name} disabled={unavailable} className={`${service === item.name ? "choice selected" : "choice"}${unavailable ? " service-unavailable" : ""}`} onClick={() => setService(item.name)}><strong>{item.name}</strong><small>{unavailable ? "Este profesional no ofrece este servicio" : `${item.detail} · duración orientativa`}</small></button>; })}</div>}
          {step === 4 && <><p className="selected-context">{days[day].short} {days[day].date} · {selectedStaff?.name ?? "Peluquero"} · {service || "Servicio"}</p><div className="slot-grid">{slots.map((item, index) => <button key={item} className={slot === item ? "slot selected" : index === 3 ? "slot unavailable" : "slot"} disabled={index === 3} onClick={() => setSlot(item)}>{item}<small>{index === 3 ? "ocupado" : "disponible"}</small></button>)}</div></>}
          {step === 5 && <div className="confirm-area">{confirmed ? <><div className="confirm-mark">✓</div><h4>Turno confirmado en esta demo</h4><p>{days[day].short} {days[day].date} a las {slot} con {hairdresser}, para {service}.</p></> : <><p className="selected-context">{days[day].short} {days[day].date} · {hairdresser} · {service} · {slot}</p><div className="input-grid"><label>Tu nombre<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Martina" /></label><label>WhatsApp o email<input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Para la confirmación" /></label></div><p className="form-hint">En una implementación, esto envía la solicitud al equipo sin exponer tu contacto públicamente.</p></>}</div>}
          <div className="booking-actions">{step > 1 && !confirmed && <Button secondary onClick={() => setStep(step - 1)}>Volver</Button>}{step < 5 ? <Button disabled={(step === 2 && !hairdresser) || (step === 3 && !service) || (step === 4 && !slot)} onClick={() => setStep(step + 1)}>Continuar <span>→</span></Button> : confirmed ? <Button onClick={resetBooking}>Hacer otra reserva</Button> : <Button disabled={!readyToConfirm} onClick={() => setConfirmed(true)}>Confirmar turno <span>→</span></Button>}</div>
        </div></div></section>
        <section className="team-section"><div className="section-intro"><p className="eyebrow">02 / Nuestro equipo</p><h2>Personas reales para tu próximo turno.</h2><p>Elegí con quién querés atenderte y consultá los horarios de referencia del salón.</p></div><div className="team-layout"><div className="team-grid">{staff.map((item) => <article className="team-card" key={item.name}><img src={item.photo} alt={`${item.name}, ${item.role}`} loading="lazy" /><div><strong>{item.name}</strong><span>{item.role}</span></div></article>)}</div><div className="schedule-card"><div className="section-heading"><div><p className="eyebrow">Horarios</p><h3>{business.name}</h3></div><span className="demo-label">Según la ficha del negocio</span></div><div className="business-hours">{business.hours.map((line) => <span key={line}>{line}</span>)}</div></div></div></section>
      </main> : <main className="owner-main">
        <section className="owner-header"><div><p className="eyebrow">Vista del dueño · agenda operativa</p><h1>La semana, <em>en una sola mirada.</em></h1><p>Distribuí turnos por profesional, encontrá huecos y entendé dónde se concentra la demanda.</p></div><div className="owner-context"><span>Negocio seleccionado</span><strong>{business.name}</strong>{hasReviews && <span className="rating-line">{business.rating} <b>★</b> · {business.reviews} reseñas en Maps</span>}</div></section>
        <section className="metric-grid"><div><span>Turnos esta semana</span><strong>84</strong><small>+12% vs. semana anterior</small></div><div><span>Ocupación promedio</span><strong>{occupancy}%</strong><small>Objetivo del equipo: 80%</small></div><div><span>Huecos útiles</span><strong>04</strong><small>Concentrados el jueves</small></div><div><span>Profesionales activos</span><strong>03</strong><small>Con agenda visible</small></div></section>
        <section className="distribution"><div className="section-heading"><div><p className="eyebrow">Distribución semanal</p><h2>Carga por peluquero</h2></div><span className="demo-label">Datos de agenda ilustrativos</span></div><div className="chart-area"><div className="chart-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-grid">{staff.map((item) => <div className="chart-column" key={item.name}><div className="bars">{item.load.map((value, index) => <button key={`${item.name}-${index}`} className={ownerDay === index ? "bar active" : "bar"} style={{ height: `${Math.max(value, 6)}%`, background: item.color }} onClick={() => setOwnerDay(index)} aria-label={`${item.name}, ${days[index]?.short ?? "Domingo"}, ${value}%`}>{ownerDay === index && <span>{value}%</span>}</button>)}</div><strong>{item.name}</strong><small>{item.role}</small></div>)}</div></div><div className="day-tabs">{days.map((item, index) => <button key={item.date} className={ownerDay === index ? "active" : ""} onClick={() => setOwnerDay(index)}><small>{item.short}</small><strong>{item.date.split(" ")[0]}</strong></button>)}</div></section>
        <section className="timetable"><div className="section-heading"><div><p className="eyebrow">Agenda del día</p><h2>{days[ownerDay].short} {days[ownerDay].date}</h2></div><span className="occupancy-chip">{occupancy}% ocupado</span></div><div className="time-list">{slots.map((time, index) => <div className={index === 3 ? "time-row gap" : "time-row"} key={time}><time>{time}</time><div className="time-person"><img className="avatar small photo-avatar" src={staff[index % staff.length].photo} alt="" loading="lazy" /><span><strong>{index === 3 ? "Hueco disponible" : `${staff[index % staff.length].name} · ${index % 2 ? "Color" : "Corte"}`}</strong><small>{index === 3 ? "Podés abrirlo a reserva" : "Turno confirmado · datos simulados"}</small></span></div><span className={index === 3 ? "status open" : "status"}>{index === 3 ? "Libre" : "Confirmado"}</span></div>)}</div><div className="hours-note"><strong>Horario de referencia</strong><span>{business.hours.join(" · ")}</span></div></section>
        <section className="owner-actions"><button className="button" onClick={() => setView("client")}>Ver cómo reserva un cliente <span>↗</span></button></section>
      </main>}
      <footer className="footer"><span>agenda+ / Nivaror</span><span>Prototipo de agenda para peluquerías y barberías · Rosario</span><span>Demo, no oficial</span></footer>
    </div>
  );
}
