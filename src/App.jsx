import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";

// ══════════════════════════════════════════════════════════════
// COMPREHENSIVE FILIPINO DISH DATABASE — LUZON, VISAYAS, MINDANAO
// ══════════════════════════════════════════════════════════════

const DISHES = {

  // ╔══════════════════════════════════════╗
  // ║        LUZON — BREAKFAST            ║
  // ╚══════════════════════════════════════╝

  tapsilog: {
    name: "Tapsilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Beef sirloin (tapa)", amount: 250, unit: "g", group: "meat" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Sugar", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  longsilog: {
    name: "Longsilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Longganisa", amount: 6, unit: "pcs", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Vinegar", amount: 2, unit: "tbsp", group: "spices" },
    ],
  },
  tocilog: {
    name: "Tocilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Tocino (pork)", amount: 300, unit: "g", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },
  cornsilog: {
    name: "Cornsilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Corned beef (canned)", amount: 1, unit: "can", group: "meat" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },
  arroz_caldo: {
    name: "Arroz Caldo", region: "Luzon", category: "breakfast", base_servings: 4,
    ingredients: [
      { name: "Chicken thigh", amount: 500, unit: "g", group: "meat" },
      { name: "Glutinous rice (malagkit)", amount: 1, unit: "cups", group: "pantry" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Green onion (spring onion)", amount: 3, unit: "stalks", group: "vegetables" },
      { name: "Calamansi", amount: 4, unit: "pcs", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
    ],
  },
  champorado: {
    name: "Champorado", region: "Luzon", category: "breakfast", base_servings: 4,
    ingredients: [
      { name: "Glutinous rice (malagkit)", amount: 1, unit: "cups", group: "pantry" },
      { name: "Tablea (cacao tablets)", amount: 4, unit: "pcs", group: "pantry" },
      { name: "Sugar", amount: 4, unit: "tbsp", group: "pantry" },
      { name: "Evaporated milk", amount: 150, unit: "ml", group: "pantry" },
    ],
  },
  sinangag: {
    name: "Sinangag (Garlic Fried Rice)", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Rice (day-old)", amount: 3, unit: "cups", group: "pantry" },
      { name: "Garlic", amount: 8, unit: "cloves", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
    ],
  },
  daing_na_bangus: {
    name: "Daing na Bangus", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Milkfish (bangus, butterflied)", amount: 1, unit: "pcs", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  hotsilog: {
    name: "Hotsilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Hotdog", amount: 4, unit: "pcs", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Banana ketchup", amount: 2, unit: "tbsp", group: "spices" },
    ],
  },
  spam_silog: {
    name: "Spamsilog", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Luncheon meat (canned)", amount: 1, unit: "can", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
    ],
  },
  pandesal_combo: {
    name: "Pandesal with Kesong Puti", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Pandesal", amount: 6, unit: "pcs", group: "pantry" },
      { name: "Kesong puti (white cheese)", amount: 100, unit: "g", group: "pantry" },
      { name: "Butter", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Coffee (3-in-1)", amount: 2, unit: "sachets", group: "pantry" },
    ],
  },
  tortang_sardinas: {
    name: "Tortang Sardinas", region: "Luzon", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Sardines (canned)", amount: 1, unit: "can", group: "meat" },
      { name: "Egg", amount: 3, unit: "pcs", group: "pantry" },
      { name: "Onion", amount: 0.5, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║      VISAYAS — BREAKFAST            ║
  // ╚══════════════════════════════════════╝

  chorizo_de_cebu_silog: {
    name: "Chorizo de Cebu Silog", region: "Visayas", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Chorizo de Cebu", amount: 6, unit: "pcs", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Vinegar", amount: 2, unit: "tbsp", group: "spices" },
    ],
  },
  batchoy_breakfast: {
    name: "La Paz Batchoy", region: "Visayas", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Pork loin", amount: 150, unit: "g", group: "meat" },
      { name: "Pork liver", amount: 80, unit: "g", group: "meat" },
      { name: "Chicharron (crushed)", amount: 30, unit: "g", group: "pantry" },
      { name: "Miki noodles (fresh)", amount: 200, unit: "g", group: "pantry" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Green onion (spring onion)", amount: 2, unit: "stalks", group: "vegetables" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
    ],
  },
  puto_maya: {
    name: "Puto Maya with Sikwate", region: "Visayas", category: "breakfast", base_servings: 4,
    ingredients: [
      { name: "Glutinous rice (malagkit)", amount: 2, unit: "cups", group: "pantry" },
      { name: "Coconut milk", amount: 200, unit: "ml", group: "pantry" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Sugar", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Tablea (cacao tablets)", amount: 4, unit: "pcs", group: "pantry" },
      { name: "Ripe mango", amount: 2, unit: "pcs", group: "vegetables" },
    ],
  },
  danggit_silog: {
    name: "Danggit Silog", region: "Visayas", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Danggit (dried rabbitfish)", amount: 8, unit: "pcs", group: "meat" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Vinegar", amount: 2, unit: "tbsp", group: "spices" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║     MINDANAO — BREAKFAST            ║
  // ╚══════════════════════════════════════╝

  pastil: {
    name: "Pastil", region: "Mindanao", category: "breakfast", base_servings: 4,
    ingredients: [
      { name: "Chicken breast", amount: 300, unit: "g", group: "meat" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Banana leaves", amount: 4, unit: "pcs", group: "others" },
    ],
  },
  tinola_isda_breakfast: {
    name: "Tinolang Isda (Breakfast)", region: "Mindanao", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Tilapia", amount: 1, unit: "pcs", group: "meat" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 2, unit: "stalks", group: "spices" },
      { name: "Green chili (siling haba)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  tulingan_silog: {
    name: "Tulingan Silog", region: "Mindanao", category: "breakfast", base_servings: 2,
    ingredients: [
      { name: "Tulingan (bullet tuna)", amount: 2, unit: "pcs", group: "meat" },
      { name: "Vinegar", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║         LUZON — LUNCH               ║
  // ╚══════════════════════════════════════╝

  adobo: {
    name: "Chicken Adobo", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 1000, unit: "g", group: "meat" },
      { name: "Soy sauce", amount: 5, unit: "tbsp", group: "spices" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 8, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sinigang_baboy: {
    name: "Sinigang na Baboy", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork ribs", amount: 500, unit: "g", group: "meat" },
      { name: "Tamarind soup mix (sinigang mix)", amount: 1, unit: "packet", group: "spices" },
      { name: "Kangkong (water spinach)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 150, unit: "g", group: "vegetables" },
      { name: "Eggplant", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Radish (labanos)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  pinakbet: {
    name: "Pinakbet", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork belly", amount: 300, unit: "g", group: "meat" },
      { name: "Shrimp paste (bagoong alamang)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Eggplant", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Bitter gourd (ampalaya)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Squash (kalabasa)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Okra", amount: 8, unit: "pcs", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 100, unit: "g", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  kare_kare: {
    name: "Kare-Kare", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Oxtail", amount: 800, unit: "g", group: "meat" },
      { name: "Peanut butter", amount: 4, unit: "tbsp", group: "pantry" },
      { name: "Ground toasted rice", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Banana blossom (puso ng saging)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Eggplant", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 150, unit: "g", group: "vegetables" },
      { name: "Bok choy (pechay)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Annatto seeds (atsuete)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Shrimp paste (bagoong alamang)", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  tinola: {
    name: "Tinolang Manok", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 800, unit: "g", group: "meat" },
      { name: "Green papaya", amount: 200, unit: "g", group: "vegetables" },
      { name: "Chili leaves (dahon ng sili)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  menudo: {
    name: "Menudo", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork (cubed)", amount: 500, unit: "g", group: "meat" },
      { name: "Pork liver", amount: 150, unit: "g", group: "meat" },
      { name: "Potato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato sauce", amount: 250, unit: "g", group: "pantry" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Raisins", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Bell pepper (red)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  afritada: {
    name: "Chicken Afritada", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 1000, unit: "g", group: "meat" },
      { name: "Potato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Bell pepper (red)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green peas", amount: 50, unit: "g", group: "vegetables" },
      { name: "Tomato sauce", amount: 250, unit: "g", group: "pantry" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Bay leaves", amount: 2, unit: "pcs", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginisang_monggo: {
    name: "Ginisang Monggo", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Mung beans (monggo)", amount: 200, unit: "g", group: "pantry" },
      { name: "Pork belly", amount: 150, unit: "g", group: "meat" },
      { name: "Dried fish (dilis)", amount: 50, unit: "g", group: "meat" },
      { name: "Kangkong (water spinach)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginisang_ampalaya: {
    name: "Ginisang Ampalaya", region: "Luzon", category: "lunch", base_servings: 2,
    ingredients: [
      { name: "Bitter gourd (ampalaya)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Egg", amount: 3, unit: "pcs", group: "pantry" },
      { name: "Tomato", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 3, unit: "cloves", group: "spices" },
      { name: "Dried shrimp", amount: 30, unit: "g", group: "meat" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  paksiw_isda: {
    name: "Paksiw na Isda", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Milkfish (bangus)", amount: 1, unit: "pcs", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Bitter gourd (ampalaya)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Eggplant", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  bicol_express: {
    name: "Bicol Express", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork belly", amount: 500, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Coconut cream", amount: 200, unit: "ml", group: "pantry" },
      { name: "Shrimp paste (bagoong alamang)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Chili (siling labuyo)", amount: 8, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 4, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  laing: {
    name: "Laing", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Dried taro leaves (laing)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Coconut cream", amount: 200, unit: "ml", group: "pantry" },
      { name: "Pork belly", amount: 200, unit: "g", group: "meat" },
      { name: "Shrimp paste (bagoong alamang)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Chili (siling labuyo)", amount: 6, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  lumpiang_sariwa: {
    name: "Lumpiang Sariwa", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Lumpia wrapper (fresh)", amount: 8, unit: "pcs", group: "pantry" },
      { name: "Heart of palm (ubod)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Shrimp (medium)", amount: 100, unit: "g", group: "meat" },
      { name: "Tofu (firm)", amount: 100, unit: "g", group: "pantry" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 100, unit: "g", group: "vegetables" },
      { name: "Cabbage", amount: 0.25, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Lettuce leaves", amount: 8, unit: "pcs", group: "vegetables" },
      { name: "Peanuts (ground)", amount: 50, unit: "g", group: "pantry" },
      { name: "Brown sugar", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Cornstarch", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },
  pork_binagoongan: {
    name: "Pork Binagoongan", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork belly", amount: 500, unit: "g", group: "meat" },
      { name: "Shrimp paste (bagoong alamang)", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Kangkong (water spinach)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Sugar", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sinampalukang_manok: {
    name: "Sinampalukang Manok", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 800, unit: "g", group: "meat" },
      { name: "Young tamarind leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginataang_hipon: {
    name: "Ginataang Hipon", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Shrimp (large)", amount: 500, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Squash (kalabasa)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Malunggay leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  bulalo: {
    name: "Bulalo", region: "Luzon", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Beef shank (with bone marrow)", amount: 1000, unit: "g", group: "meat" },
      { name: "Corn on the cob", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Potato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Cabbage", amount: 0.25, unit: "pcs", group: "vegetables" },
      { name: "Bok choy (pechay)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║       VISAYAS — LUNCH               ║
  // ╚══════════════════════════════════════╝

  chicken_inasal: {
    name: "Chicken Inasal", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken leg quarters", amount: 4, unit: "pcs", group: "meat" },
      { name: "Lemongrass", amount: 3, unit: "stalks", group: "spices" },
      { name: "Vinegar", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Annatto oil (atsuete oil)", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Brown sugar", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  kansi: {
    name: "Kansi", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Beef shank (with bone)", amount: 800, unit: "g", group: "meat" },
      { name: "Batwan fruit", amount: 4, unit: "pcs", group: "vegetables" },
      { name: "Jackfruit (green, langka)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 2, unit: "stalks", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  lechon_belly_cebu: {
    name: "Lechon Belly (Cebu style)", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork belly (whole slab)", amount: 1000, unit: "g", group: "meat" },
      { name: "Lemongrass", amount: 4, unit: "stalks", group: "spices" },
      { name: "Garlic", amount: 8, unit: "cloves", group: "spices" },
      { name: "Green onion (spring onion)", amount: 4, unit: "stalks", group: "vegetables" },
      { name: "Salt", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Black pepper", amount: 1, unit: "tsp", group: "spices" },
      { name: "Vinegar (sukang Iloko)", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  tinuom_na_manok: {
    name: "Tinuom na Manok", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (native/bisaya)", amount: 800, unit: "g", group: "meat" },
      { name: "Lemongrass", amount: 3, unit: "stalks", group: "spices" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Green papaya", amount: 150, unit: "g", group: "vegetables" },
      { name: "Banana leaves", amount: 4, unit: "pcs", group: "others" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  utan_bisaya: {
    name: "Utan Bisaya (Vegetable Soup)", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork ribs", amount: 300, unit: "g", group: "meat" },
      { name: "Squash (kalabasa)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Malunggay leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Corn on the cob", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 100, unit: "g", group: "vegetables" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  humba: {
    name: "Humba", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork belly", amount: 800, unit: "g", group: "meat" },
      { name: "Soy sauce", amount: 5, unit: "tbsp", group: "spices" },
      { name: "Vinegar", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Brown sugar", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Banana blossom (puso ng saging)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Dried banana blossoms (black beans optional)", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Star anise", amount: 1, unit: "pcs", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  kadyos_baboy_langka: {
    name: "KBL (Kadyos, Baboy, Langka)", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Pork (with bone)", amount: 500, unit: "g", group: "meat" },
      { name: "Pigeon peas (kadyos)", amount: 200, unit: "g", group: "pantry" },
      { name: "Jackfruit (green, langka)", amount: 300, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 2, unit: "stalks", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Coconut milk", amount: 200, unit: "ml", group: "pantry" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  laswa: {
    name: "Laswa", region: "Visayas", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Shrimp (small)", amount: 100, unit: "g", group: "meat" },
      { name: "Squash (kalabasa)", amount: 150, unit: "g", group: "vegetables" },
      { name: "Okra", amount: 6, unit: "pcs", group: "vegetables" },
      { name: "Sitaw (string beans)", amount: 100, unit: "g", group: "vegetables" },
      { name: "Eggplant", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Malunggay leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║      MINDANAO — LUNCH               ║
  // ╚══════════════════════════════════════╝

  tiyula_itum: {
    name: "Tiyula Itum", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed)", amount: 700, unit: "g", group: "meat" },
      { name: "Burnt coconut (uling)", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Lemongrass", amount: 3, unit: "stalks", group: "spices" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Turmeric", amount: 1, unit: "tsp", group: "spices" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  pyanggang: {
    name: "Pyanggang (Blackened Chicken)", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 1000, unit: "g", group: "meat" },
      { name: "Burnt coconut (uling)", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Coconut milk", amount: 300, unit: "ml", group: "pantry" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Turmeric", amount: 1, unit: "tsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  satti: {
    name: "Satti", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed, for skewers)", amount: 500, unit: "g", group: "meat" },
      { name: "Rice (puso/hanging rice)", amount: 4, unit: "cups", group: "pantry" },
      { name: "Coconut milk", amount: 200, unit: "ml", group: "pantry" },
      { name: "Banana leaves", amount: 8, unit: "pcs", group: "others" },
      { name: "Vinegar", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Brown sugar", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Chili flakes", amount: 1, unit: "tsp", group: "spices" },
      { name: "Peanut butter", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Bamboo skewers", amount: 12, unit: "pcs", group: "others" },
    ],
  },
  sinuglaw: {
    name: "Sinuglaw", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Tuna belly (fresh, sashimi grade)", amount: 300, unit: "g", group: "meat" },
      { name: "Pork belly (grilled)", amount: 200, unit: "g", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Onion", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Coconut cream", amount: 100, unit: "ml", group: "pantry" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  beef_rendang_maranao: {
    name: "Beef Rendang (Maranao)", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed)", amount: 700, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Coconut cream", amount: 200, unit: "ml", group: "pantry" },
      { name: "Lemongrass", amount: 3, unit: "stalks", group: "spices" },
      { name: "Galangal (laos)", amount: 20, unit: "g", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Turmeric", amount: 1, unit: "tsp", group: "spices" },
      { name: "Chili (dried)", amount: 5, unit: "pcs", group: "spices" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginataang_langka: {
    name: "Ginataang Langka", region: "Mindanao", category: "lunch", base_servings: 4,
    ingredients: [
      { name: "Jackfruit (green, langka)", amount: 400, unit: "g", group: "vegetables" },
      { name: "Pork belly", amount: 200, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Shrimp paste (bagoong alamang)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║        LUZON — DINNER               ║
  // ╚══════════════════════════════════════╝

  kaldereta: {
    name: "Kalderetang Baka", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed)", amount: 700, unit: "g", group: "meat" },
      { name: "Potato", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Carrot", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Bell pepper (red)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Bell pepper (green)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato sauce", amount: 250, unit: "g", group: "pantry" },
      { name: "Liver spread", amount: 100, unit: "g", group: "pantry" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Bay leaves", amount: 2, unit: "pcs", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  pochero: {
    name: "Pocherong Baboy", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork (with bone)", amount: 600, unit: "g", group: "meat" },
      { name: "Saba banana", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Bok choy (pechay)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Potato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Cabbage", amount: 0.25, unit: "pcs", group: "vegetables" },
      { name: "Tomato sauce", amount: 150, unit: "g", group: "pantry" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  pork_adobo: {
    name: "Pork Adobo", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork belly", amount: 800, unit: "g", group: "meat" },
      { name: "Soy sauce", amount: 5, unit: "tbsp", group: "spices" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 8, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Sugar", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  lechon_kawali: {
    name: "Lechon Kawali", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork belly (whole slab)", amount: 800, unit: "g", group: "meat" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Cooking oil (for frying)", amount: 500, unit: "ml", group: "pantry" },
      { name: "Liver sauce (Mang Tomas)", amount: 100, unit: "ml", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  bistek: {
    name: "Bistek Tagalog", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Beef sirloin", amount: 500, unit: "g", group: "meat" },
      { name: "Onion", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Soy sauce", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  pancit_bihon: {
    name: "Pancit Bihon", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Bihon noodles", amount: 250, unit: "g", group: "pantry" },
      { name: "Chicken breast", amount: 200, unit: "g", group: "meat" },
      { name: "Shrimp (medium)", amount: 100, unit: "g", group: "meat" },
      { name: "Cabbage", amount: 0.25, unit: "pcs", group: "vegetables" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Celery", amount: 2, unit: "stalks", group: "vegetables" },
      { name: "Snow peas", amount: 50, unit: "g", group: "vegetables" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Calamansi", amount: 4, unit: "pcs", group: "spices" },
    ],
  },
  lumpia_shanghai: {
    name: "Lumpiang Shanghai", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Ground pork", amount: 500, unit: "g", group: "meat" },
      { name: "Lumpia wrapper", amount: 30, unit: "pcs", group: "pantry" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 3, unit: "cloves", group: "spices" },
      { name: "Egg", amount: 1, unit: "pcs", group: "pantry" },
      { name: "Soy sauce", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil (for frying)", amount: 500, unit: "ml", group: "pantry" },
      { name: "Sweet chili sauce", amount: 100, unit: "ml", group: "spices" },
    ],
  },
  nilaga: {
    name: "Nilagang Baka", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Beef shank (with bone)", amount: 700, unit: "g", group: "meat" },
      { name: "Potato", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Cabbage", amount: 0.25, unit: "pcs", group: "vegetables" },
      { name: "Bok choy (pechay)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Corn on the cob", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Saba banana", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  torta_talong: {
    name: "Tortang Talong", region: "Luzon", category: "dinner", base_servings: 2,
    ingredients: [
      { name: "Eggplant", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Egg", amount: 3, unit: "pcs", group: "pantry" },
      { name: "Ground pork", amount: 150, unit: "g", group: "meat" },
      { name: "Onion", amount: 0.5, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Black pepper", amount: 0.25, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  dinuguan: {
    name: "Dinuguan", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork (cubed)", amount: 500, unit: "g", group: "meat" },
      { name: "Pork blood", amount: 300, unit: "ml", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 4, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Sugar", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Cooking oil", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Puto", amount: 8, unit: "pcs", group: "pantry" },
    ],
  },
  mechado: {
    name: "Mechado", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed)", amount: 600, unit: "g", group: "meat" },
      { name: "Potato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Tomato sauce", amount: 250, unit: "g", group: "pantry" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 2, unit: "pcs", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginataang_kalabasa: {
    name: "Ginataang Kalabasa", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Squash (kalabasa)", amount: 500, unit: "g", group: "vegetables" },
      { name: "Shrimp (medium)", amount: 200, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Sitaw (string beans)", amount: 100, unit: "g", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 3, unit: "cloves", group: "spices" },
      { name: "Shrimp paste (bagoong alamang)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sinigang_hipon: {
    name: "Sinigang na Hipon", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Shrimp (large)", amount: 500, unit: "g", group: "meat" },
      { name: "Tamarind soup mix (sinigang mix)", amount: 1, unit: "packet", group: "spices" },
      { name: "Kangkong (water spinach)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Radish (labanos)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  embutido: {
    name: "Embutido", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Ground pork", amount: 500, unit: "g", group: "meat" },
      { name: "Egg", amount: 3, unit: "pcs", group: "pantry" },
      { name: "Carrot", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Bell pepper (red)", amount: 0.5, unit: "pcs", group: "vegetables" },
      { name: "Raisins", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Pickle relish", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Bread crumbs", amount: 50, unit: "g", group: "pantry" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Cheese (quickmelt)", amount: 50, unit: "g", group: "pantry" },
      { name: "Hotdog", amount: 2, unit: "pcs", group: "meat" },
      { name: "Aluminum foil", amount: 2, unit: "pcs", group: "others" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  crispy_pata: {
    name: "Crispy Pata", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork leg (pata)", amount: 1, unit: "pcs", group: "meat" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Cooking oil (for frying)", amount: 1000, unit: "ml", group: "pantry" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sisig: {
    name: "Sisig", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Pork face / maskara", amount: 500, unit: "g", group: "meat" },
      { name: "Pork belly", amount: 200, unit: "g", group: "meat" },
      { name: "Chicken liver", amount: 100, unit: "g", group: "meat" },
      { name: "Onion", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 5, unit: "pcs", group: "vegetables" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Mayonnaise", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Butter", amount: 1, unit: "tbsp", group: "pantry" },
      { name: "Egg", amount: 1, unit: "pcs", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  palabok: {
    name: "Pancit Palabok", region: "Luzon", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Bihon noodles", amount: 250, unit: "g", group: "pantry" },
      { name: "Shrimp (medium)", amount: 200, unit: "g", group: "meat" },
      { name: "Ground pork", amount: 150, unit: "g", group: "meat" },
      { name: "Annatto seeds (atsuete)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Fish sauce (patis)", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Egg", amount: 2, unit: "pcs", group: "pantry" },
      { name: "Chicharron (crushed)", amount: 50, unit: "g", group: "pantry" },
      { name: "Green onion (spring onion)", amount: 3, unit: "stalks", group: "vegetables" },
      { name: "Calamansi", amount: 4, unit: "pcs", group: "spices" },
      { name: "Cornstarch", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║       VISAYAS — DINNER              ║
  // ╚══════════════════════════════════════╝

  lechon_paksiw: {
    name: "Lechon Paksiw", region: "Visayas", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Leftover lechon / pork belly", amount: 600, unit: "g", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Liver sauce (Mang Tomas)", amount: 150, unit: "ml", group: "spices" },
      { name: "Brown sugar", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Garlic", amount: 5, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  inubaran: {
    name: "Inubaran (Chicken in Coconut)", region: "Visayas", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 800, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Jackfruit (green, langka)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 2, unit: "stalks", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  law_uy: {
    name: "Law-uy", region: "Visayas", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Dried fish (dilis or bulad)", amount: 80, unit: "g", group: "meat" },
      { name: "Malunggay leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Squash (kalabasa)", amount: 200, unit: "g", group: "vegetables" },
      { name: "Sweet potato (kamote tops)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Corn on the cob", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 1, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  torta_visayan: {
    name: "Torta (Visayan Omelette)", region: "Visayas", category: "dinner", base_servings: 2,
    ingredients: [
      { name: "Ground pork", amount: 200, unit: "g", group: "meat" },
      { name: "Egg", amount: 4, unit: "pcs", group: "pantry" },
      { name: "Potato", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Black pepper", amount: 0.25, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 3, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  adobong_pusit: {
    name: "Adobong Pusit", region: "Visayas", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Squid (pusit)", amount: 500, unit: "g", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Bay leaves", amount: 2, unit: "pcs", group: "spices" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sinugbang_isda: {
    name: "Sinugbang Isda (Grilled Fish)", region: "Visayas", category: "dinner", base_servings: 2,
    ingredients: [
      { name: "Tilapia (or pompano)", amount: 1, unit: "pcs", group: "meat" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Soy sauce", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 3, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 10, unit: "g", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },

  // ╔══════════════════════════════════════╗
  // ║      MINDANAO — DINNER              ║
  // ╚══════════════════════════════════════╝

  chicken_pianggang: {
    name: "Chicken Pianggang", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Chicken (cut up)", amount: 1000, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 300, unit: "ml", group: "pantry" },
      { name: "Burnt coconut (uling)", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Garlic", amount: 6, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 2, unit: "stalks", group: "spices" },
      { name: "Turmeric", amount: 1, unit: "tsp", group: "spices" },
      { name: "Salt", amount: 1, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  kinilaw: {
    name: "Kinilaw na Tuna", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Tuna (fresh, sashimi grade)", amount: 500, unit: "g", group: "meat" },
      { name: "Vinegar", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Ginger", amount: 30, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 4, unit: "pcs", group: "vegetables" },
      { name: "Coconut cream", amount: 100, unit: "ml", group: "pantry" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  ginataang_kuhol: {
    name: "Ginataang Kuhol", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Golden apple snail (kuhol)", amount: 500, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 400, unit: "ml", group: "pantry" },
      { name: "Chili (siling labuyo)", amount: 5, unit: "pcs", group: "vegetables" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Ginger", amount: 20, unit: "g", group: "vegetables" },
      { name: "Shrimp paste (bagoong alamang)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  adobong_baka_zamboanga: {
    name: "Adobong Baka Zamboanga", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Beef (cubed)", amount: 700, unit: "g", group: "meat" },
      { name: "Coconut milk", amount: 200, unit: "ml", group: "pantry" },
      { name: "Soy sauce", amount: 4, unit: "tbsp", group: "spices" },
      { name: "Vinegar", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 8, unit: "cloves", group: "spices" },
      { name: "Turmeric", amount: 1, unit: "tsp", group: "spices" },
      { name: "Bay leaves", amount: 3, unit: "pcs", group: "spices" },
      { name: "Black peppercorns", amount: 1, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  curacha: {
    name: "Curacha (Spanner Crab)", region: "Mindanao", category: "dinner", base_servings: 2,
    ingredients: [
      { name: "Curacha (spanner crab)", amount: 2, unit: "pcs", group: "meat" },
      { name: "Coconut milk", amount: 200, unit: "ml", group: "pantry" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Ginger", amount: 15, unit: "g", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Chili (siling labuyo)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Salt", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  tinolang_isda_gen_san: {
    name: "Tinolang Isda (GenSan Style)", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Tuna head (or yellowfin steak)", amount: 600, unit: "g", group: "meat" },
      { name: "Ginger", amount: 40, unit: "g", group: "vegetables" },
      { name: "Lemongrass", amount: 3, unit: "stalks", group: "spices" },
      { name: "Tomato", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 4, unit: "pcs", group: "vegetables" },
      { name: "Malunggay leaves", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Fish sauce (patis)", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  sinigang_sa_miso: {
    name: "Sinigang sa Miso", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Salmon head", amount: 1, unit: "pcs", group: "meat" },
      { name: "Miso paste", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Tamarind soup mix (sinigang mix)", amount: 1, unit: "packet", group: "spices" },
      { name: "Kangkong (water spinach)", amount: 1, unit: "bunch", group: "vegetables" },
      { name: "Eggplant", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Radish (labanos)", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Tomato", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Onion", amount: 1, unit: "pcs", group: "vegetables" },
      { name: "Green chili (siling haba)", amount: 3, unit: "pcs", group: "vegetables" },
      { name: "Rice", amount: 4, unit: "cups", group: "pantry" },
    ],
  },
  tuna_belly_steak: {
    name: "Tuna Belly Steak", region: "Mindanao", category: "dinner", base_servings: 2,
    ingredients: [
      { name: "Tuna belly steak", amount: 300, unit: "g", group: "meat" },
      { name: "Soy sauce", amount: 3, unit: "tbsp", group: "spices" },
      { name: "Calamansi juice", amount: 2, unit: "tbsp", group: "spices" },
      { name: "Garlic", amount: 4, unit: "cloves", group: "spices" },
      { name: "Onion", amount: 2, unit: "pcs", group: "vegetables" },
      { name: "Black pepper", amount: 0.5, unit: "tsp", group: "spices" },
      { name: "Cooking oil", amount: 2, unit: "tbsp", group: "pantry" },
      { name: "Rice", amount: 2, unit: "cups", group: "pantry" },
    ],
  },
  durian_con_yelo_dessert: {
    name: "Durian Dessert (Mindanao Special)", region: "Mindanao", category: "dinner", base_servings: 4,
    ingredients: [
      { name: "Fresh durian flesh", amount: 400, unit: "g", group: "vegetables" },
      { name: "Coconut cream", amount: 200, unit: "ml", group: "pantry" },
      { name: "Condensed milk", amount: 100, unit: "ml", group: "pantry" },
      { name: "Sugar", amount: 2, unit: "tbsp", group: "pantry" },
    ],
  },
};

// ─── CONSTANTS ─── //
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_FULL = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["breakfast", "lunch", "dinner"];
const MEAL_LABELS = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner" };
const MEAL_ICONS = { breakfast: "☀️", lunch: "🔥", dinner: "🌙" };
const REGIONS = ["All", "Luzon", "Visayas", "Mindanao"];

const GROUP_CONFIG = {
  meat: { label: "Meat & Protein", icon: "🥩", accent: "#FF6B6B", bg: "rgba(255,107,107,0.08)" },
  vegetables: { label: "Vegetables", icon: "🥬", accent: "#51CF66", bg: "rgba(81,207,102,0.08)" },
  pantry: { label: "Pantry & Dry Goods", icon: "🏪", accent: "#FFD43B", bg: "rgba(255,212,59,0.08)" },
  spices: { label: "Spices & Condiments", icon: "🧂", accent: "#CC5DE8", bg: "rgba(204,93,232,0.08)" },
  others: { label: "Others", icon: "📦", accent: "#74C0FC", bg: "rgba(116,192,252,0.08)" },
};

const REGION_COLORS = {
  Luzon: "#74C0FC",
  Visayas: "#FFD43B",
  Mindanao: "#51CF66",
};

// ─── GLOBAL STYLES (injected once) ─── //
const STYLE_ID = "agp-premium-styles";
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

    .agp-root * { box-sizing: border-box; margin: 0; padding: 0; }
    .agp-root { --bg-base: #0D0D0F; --bg-card: #16161A; --bg-elevated: #1E1E24; --bg-glass: rgba(30,30,36,0.75); --border: rgba(255,255,255,0.06); --border-focus: rgba(255,215,0,0.3); --text-primary: #F0EDE8; --text-secondary: #8A8690; --text-muted: #5A5660; --gold: #D4A843; --gold-light: #F0D78C; --gold-dim: rgba(212,168,67,0.12); --red: #E8513D; --green: #3ECF71; }

    .agp-root { font-family: 'Outfit', -apple-system, sans-serif; background: var(--bg-base); color: var(--text-primary); min-height: 100vh; max-width: 480px; margin: 0 auto; position: relative; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

    .agp-root::before { content: ''; position: fixed; top: -40%; left: -20%; width: 140%; height: 80%; background: radial-gradient(ellipse at 30% 20%, rgba(212,168,67,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 60%, rgba(116,192,252,0.03) 0%, transparent 50%); pointer-events: none; z-index: 0; }

    .agp-shimmer { position: relative; overflow: hidden; }
    .agp-shimmer::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent); animation: agpShimmer 3s ease-in-out infinite; }
    @keyframes agpShimmer { 0%{left:-100%} 100%{left:200%} }

    @keyframes agpFadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes agpPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
    @keyframes agpSlideIn { from { opacity: 0; transform: translateY(-8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes agpSlideUp { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

    .agp-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); }
    .agp-card:hover { border-color: rgba(255,255,255,0.1); }

    .agp-btn { font-family: 'Outfit', sans-serif; cursor: pointer; border: none; transition: all 0.2s cubic-bezier(0.4,0,0.2,1); -webkit-tap-highlight-color: transparent; }
    .agp-btn:active { transform: scale(0.97); }

    .agp-input { font-family: 'Outfit', sans-serif; background: var(--bg-base); border: 1.5px solid var(--border); border-radius: 10px; color: var(--text-primary); padding: 10px 12px; font-size: 14px; outline: none; width: 100%; transition: border-color 0.2s; }
    .agp-input:focus { border-color: var(--border-focus); }
    .agp-input::placeholder { color: var(--text-muted); }

    .agp-scrollbar::-webkit-scrollbar { width: 4px; }
    .agp-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .agp-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

    .agp-dropdown-item { width: 100%; padding: 10px 14px; border: none; background: transparent; text-align: left; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 8px; transition: background 0.15s; }
    .agp-dropdown-item:hover { background: rgba(255,255,255,0.04); }

    .agp-check { width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; transition: all 0.2s; cursor: pointer; }

    .agp-tag { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; }
  `;
  document.head.appendChild(style);
}

// ─── UTILITY FUNCTIONS ─── //
function smartRound(val, unit) {
  if (["pcs", "can", "bunch", "stalks", "packet", "sachets"].includes(unit)) return Math.ceil(val);
  if (unit === "g") {
    if (val <= 50) return Math.ceil(val / 5) * 5;
    if (val <= 200) return Math.ceil(val / 10) * 10;
    if (val <= 500) return Math.ceil(val / 25) * 25;
    return Math.ceil(val / 50) * 50;
  }
  if (unit === "ml") {
    if (val <= 100) return Math.ceil(val / 10) * 10;
    return Math.ceil(val / 50) * 50;
  }
  if (unit === "cups") return Math.ceil(val * 2) / 2;
  if (unit === "tbsp" || unit === "tsp") return Math.ceil(val * 2) / 2;
  if (unit === "cloves") return Math.ceil(val);
  return Math.round(val * 10) / 10;
}

function formatQty(amount, unit) {
  if (unit === "g" && amount >= 1000) return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")} kg`;
  if (unit === "ml" && amount >= 1000) return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")} L`;
  const display = Number.isInteger(amount) ? amount : amount.toFixed(1).replace(/\.0$/, "");
  if (!unit || unit === "pcs") return `${display} ${amount === 1 ? "pc" : "pcs"}`;
  if (unit === "can") return `${display} ${amount === 1 ? "can" : "cans"}`;
  if (unit === "bunch") return `${display} ${amount === 1 ? "bunch" : "bunches"}`;
  if (unit === "packet") return `${display} ${amount === 1 ? "packet" : "packets"}`;
  if (unit === "stalks") return `${display} ${amount === 1 ? "stalk" : "stalks"}`;
  if (unit === "sachets") return `${display} ${amount === 1 ? "sachet" : "sachets"}`;
  return `${display} ${unit}`;
}

// ─── DISH SELECTOR ─── //
const dishOptions = Object.entries(DISHES).map(([key, d]) => ({ key, ...d }));
const dishCount = dishOptions.length;

function DishSelector({ meal, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef(null);

  const filtered = dishOptions.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "All" || d.region === regionFilter;
    return matchesSearch && matchesRegion;
  });
  const preferred = filtered.filter((d) => d.category === meal);
  const others = filtered.filter((d) => d.category !== meal);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDropUp(window.innerHeight - rect.bottom < 360);
    }
  }, [open]);

  const selected = value ? DISHES[value] : null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="agp-btn"
        onClick={() => { setOpen(!open); setSearch(""); setRegionFilter("All"); }}
        style={{
          width: "100%", padding: "11px 14px",
          border: `1.5px solid ${open ? "rgba(212,168,67,0.3)" : value ? "rgba(255,255,255,0.1)" : "var(--border)"}`,
          borderRadius: 12, background: value ? "rgba(212,168,67,0.06)" : "var(--bg-elevated)",
          fontSize: 14, textAlign: "left", fontWeight: 500,
          color: value ? "var(--text-primary)" : "var(--text-muted)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
          {selected ? (
            <React.Fragment>
              <span className="agp-tag" style={{
                background: REGION_COLORS[selected.region] + "20",
                color: REGION_COLORS[selected.region],
              }}>{selected.region}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.name}</span>
            </React.Fragment>
          ) : `Choose ${MEAL_LABELS[meal]}...`}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute",
          ...(dropUp ? { bottom: "100%", marginBottom: 6 } : { top: "100%", marginTop: 6 }),
          left: 0, right: 0, zIndex: 200,
          background: "var(--bg-elevated)", borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
          maxHeight: 340, overflow: "hidden", display: "flex", flexDirection: "column",
          animation: dropUp ? "agpSlideUp 0.2s ease" : "agpSlideIn 0.2s ease",
        }}>
          <div style={{ padding: "10px 10px 6px", borderBottom: "1px solid var(--border)" }}>
            <input className="agp-input" type="text" placeholder="Search dishes..."
              value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
            <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
              {REGIONS.map((r) => (
                <button key={r} className="agp-btn" onClick={() => setRegionFilter(r)}
                  style={{
                    flex: 1, padding: "5px 2px", borderRadius: 8, fontSize: 10, fontWeight: 700,
                    background: regionFilter === r ? (r === "All" ? "var(--gold-dim)" : REGION_COLORS[r] + "20") : "rgba(255,255,255,0.03)",
                    color: regionFilter === r ? (r === "All" ? "var(--gold)" : REGION_COLORS[r]) : "var(--text-muted)",
                    border: `1px solid ${regionFilter === r ? (r === "All" ? "var(--gold-dim)" : REGION_COLORS[r] + "30") : "transparent"}`,
                  }}>{r}</button>
              ))}
            </div>
          </div>
          <div className="agp-scrollbar" style={{ overflowY: "auto", maxHeight: 250 }}>
            {preferred.length > 0 && (
              <React.Fragment>
                <div style={{ padding: "8px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>
                  {MEAL_LABELS[meal]} · {preferred.length}
                </div>
                {preferred.map((d) => (
                  <button key={d.key} className="agp-dropdown-item"
                    onClick={() => { onChange(d.key); setOpen(false); setSearch(""); }}
                    style={{ background: value === d.key ? "var(--gold-dim)" : undefined }}>
                    <span className="agp-tag" style={{
                      background: REGION_COLORS[d.region] + "18", color: REGION_COLORS[d.region],
                    }}>{d.region.substring(0, 3)}</span>
                    <span style={{ fontWeight: value === d.key ? 600 : 400 }}>{d.name}</span>
                  </button>
                ))}
              </React.Fragment>
            )}
            {others.length > 0 && (search || regionFilter !== "All") && (
              <React.Fragment>
                <div style={{ padding: "8px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>
                  Other · {others.length}
                </div>
                {others.map((d) => (
                  <button key={d.key} className="agp-dropdown-item"
                    onClick={() => { onChange(d.key); setOpen(false); setSearch(""); }}>
                    <span className="agp-tag" style={{
                      background: REGION_COLORS[d.region] + "18", color: REGION_COLORS[d.region],
                    }}>{d.region.substring(0, 3)}</span>
                    <span>{d.name}</span>
                    <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: "auto" }}>{MEAL_LABELS[d.category]}</span>
                  </button>
                ))}
              </React.Fragment>
            )}
            {filtered.length === 0 && (
              <div style={{ padding: 24, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>No dishes found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─── //
export default function AutoGroceryPlannerPH() {
  const [servings, setServings] = useState(4);
  const [mealPlan, setMealPlan] = useState(
    Object.fromEntries(DAYS_FULL.map((d) => [d, { breakfast: "", lunch: "", dinner: "" }]))
  );
  const [checkedItems, setCheckedItems] = useState({});
  const [haveItems, setHaveItems] = useState({});
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedDay, setExpandedDay] = useState("Monday");

  useEffect(() => { injectStyles(); }, []);

  const setDish = useCallback((day, meal, dish) => {
    setMealPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: dish } }));
  }, []);

  const groceryList = useMemo(() => {
    const aggregated = {};
    DAYS_FULL.forEach((day) => {
      MEALS.forEach((meal) => {
        const dishKey = mealPlan[day][meal];
        if (!dishKey || !DISHES[dishKey]) return;
        const dish = DISHES[dishKey];
        const scale = servings / dish.base_servings;
        dish.ingredients.forEach((ing) => {
          const key = ing.name;
          if (!aggregated[key]) aggregated[key] = { name: ing.name, amount: 0, unit: ing.unit, group: ing.group, dishes: new Set() };
          aggregated[key].amount += ing.amount * scale;
          aggregated[key].dishes.add(dish.name);
        });
      });
    });
    const grouped = { meat: [], vegetables: [], pantry: [], spices: [], others: [] };
    Object.values(aggregated).forEach((item) => {
      const rounded = smartRound(item.amount, item.unit);
      (grouped[item.group] || grouped.others).push({ ...item, amount: rounded, dishes: [...item.dishes] });
    });
    Object.keys(grouped).forEach((g) => grouped[g].sort((a, b) => a.name.localeCompare(b.name)));
    return grouped;
  }, [mealPlan, servings]);

  const totalItems = Object.values(groceryList).reduce((s, a) => s + a.length, 0);
  const totalChecked = Object.keys(checkedItems).filter((k) => checkedItems[k]).length;
  const filledMeals = DAYS_FULL.reduce((s, d) => s + MEALS.filter((m) => mealPlan[d][m]).length, 0);
  const itemsToBuy = Object.values(groceryList).flat().filter((it) => !haveItems[it.name]).length;

  const regionStats = useMemo(() => {
    const s = { Luzon: 0, Visayas: 0, Mindanao: 0 };
    DAYS_FULL.forEach((day) => MEALS.forEach((meal) => {
      const dk = mealPlan[day][meal];
      if (dk && DISHES[dk]) s[DISHES[dk].region]++;
    }));
    return s;
  }, [mealPlan]);

  return (
    <div className="agp-root" style={{ position: "relative", zIndex: 1 }}>

      {/* ═══════════ HEADER ═══════════ */}
      <div style={{
        padding: "28px 20px 22px", position: "relative", overflow: "hidden",
        background: "linear-gradient(165deg, #1A1712 0%, #0D0D0F 100%)",
        borderBottom: "1px solid rgba(212,168,67,0.12)",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -60, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(116,192,252,0.04) 0%, transparent 70%)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "linear-gradient(135deg, var(--gold) 0%, #B8892E 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 4px 20px rgba(212,168,67,0.25)",
          }}>🇵🇭</div>
          <div>
            <h1 style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: 20, fontWeight: 700,
              letterSpacing: -0.3, lineHeight: 1.2, color: "var(--text-primary)",
            }}>Auto Grocery Planner</h1>
            <p style={{ fontSize: 10, fontWeight: 600, color: "var(--gold)", letterSpacing: 2.5, textTransform: "uppercase", marginTop: 2 }}>
              {dishCount} Filipino Dishes
            </p>
          </div>
        </div>

        {/* Servings */}
        <div style={{
          marginTop: 20, padding: "14px 16px", borderRadius: 14,
          background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backdropFilter: "blur(12px)",
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 2 }}>Servings</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "var(--gold)", fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>{servings}</span>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{servings === 1 ? "person" : "persons"}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
            {[...Array(10)].map((_, i) => (
              <button key={i} className="agp-btn" onClick={() => setServings(i + 1)}
                style={{
                  width: i + 1 === servings ? 28 : 8, height: 28, borderRadius: i + 1 === servings ? 8 : 4,
                  background: i + 1 <= servings
                    ? i + 1 === servings ? "var(--gold)" : "rgba(212,168,67,0.3)"
                    : "rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: i + 1 === servings ? "#0D0D0F" : "transparent",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}>
                {i + 1 === servings ? i + 1 : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Region pills */}
        {filledMeals > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {Object.entries(regionStats).filter(([, v]) => v > 0).map(([region, count]) => (
              <div key={region} style={{
                background: REGION_COLORS[region] + "12", border: `1px solid ${REGION_COLORS[region]}25`,
                borderRadius: 8, padding: "4px 10px",
                fontSize: 10, fontWeight: 700, color: REGION_COLORS[region],
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: REGION_COLORS[region] }} />
                {region} · {count}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════ TAB BAR ═══════════ */}
      <div style={{
        display: "flex", margin: "16px 16px 0", padding: 4, gap: 4,
        background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)",
      }}>
        {[
          { id: "plan", label: "Meal Plan", icon: "📋", badge: filledMeals > 0 ? `${filledMeals}/21` : null },
          { id: "list", label: "Grocery List", icon: "🛒", badge: totalItems > 0 ? totalItems : null },
        ].map((tab) => (
          <button key={tab.id} className="agp-btn" onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, padding: "11px 8px", borderRadius: 11,
              fontSize: 13, fontWeight: 600,
              background: activeTab === tab.id ? "var(--bg-elevated)" : "transparent",
              color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-muted)",
              border: activeTab === tab.id ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              boxShadow: activeTab === tab.id ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
            }}>
            <span style={{ fontSize: 14 }}>{tab.icon}</span> {tab.label}
            {tab.badge && (
              <span style={{
                background: activeTab === tab.id ? "var(--gold)" : "rgba(255,255,255,0.08)",
                color: activeTab === tab.id ? "#0D0D0F" : "var(--text-muted)",
                borderRadius: 20, padding: "1px 7px", fontSize: 10, fontWeight: 800,
              }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* ═══════════ MEAL PLAN TAB ═══════════ */}
      {activeTab === "plan" && (
        <div style={{ padding: "12px 16px 100px" }}>
          {DAYS_FULL.map((day, dayIdx) => {
            const isExpanded = expandedDay === day;
            const filled = MEALS.filter((m) => mealPlan[day][m]).length;
            return (
              <div key={day} className="agp-card" style={{
                marginBottom: 6,
                borderColor: isExpanded ? "rgba(255,255,255,0.1)" : undefined,
                animation: `agpFadeUp 0.3s ease ${dayIdx * 0.03}s both`,
              }}>
                <button className="agp-btn" onClick={() => setExpandedDay(isExpanded ? "" : day)}
                  style={{
                    width: "100%", padding: "14px 16px", background: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    color: "var(--text-primary)",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: filled === 3 ? "linear-gradient(135deg, var(--green), #1E8449)" : filled > 0 ? "var(--gold-dim)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${filled === 3 ? "rgba(62,207,113,0.3)" : filled > 0 ? "rgba(212,168,67,0.2)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: filled === 3 ? 14 : 15, fontWeight: 800,
                      color: filled === 3 ? "#fff" : filled > 0 ? "var(--gold)" : "var(--text-muted)",
                    }}>
                      {filled === 3 ? "✓" : filled}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{day}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500, marginTop: 1 }}>
                        {filled === 0 ? "No meals set" : filled === 3 ? "All meals set" : `${filled} of 3 meals`}
                      </div>
                    </div>
                  </div>
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none"
                    style={{ transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {isExpanded && (
                  <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 12, animation: "agpFadeUp 0.2s ease" }}>
                    {MEALS.map((meal) => (
                      <div key={meal}>
                        <label style={{
                          fontSize: 10, fontWeight: 700, color: "var(--text-muted)",
                          textTransform: "uppercase", letterSpacing: 2, marginBottom: 6, display: "flex", alignItems: "center", gap: 6,
                        }}>
                          <span style={{ fontSize: 13 }}>{MEAL_ICONS[meal]}</span> {MEAL_LABELS[meal]}
                        </label>
                        <DishSelector meal={meal} value={mealPlan[day][meal]}
                          onChange={(dish) => setDish(day, meal, dish)} />
                      </div>
                    ))}
                    {filled > 0 && (
                      <button className="agp-btn" onClick={() => {
                        setMealPlan((prev) => ({ ...prev, [day]: { breakfast: "", lunch: "", dinner: "" } }));
                      }} style={{
                        padding: "7px 14px", background: "rgba(232,81,61,0.08)",
                        border: "1px solid rgba(232,81,61,0.15)", borderRadius: 8,
                        fontSize: 11, color: "var(--red)", fontWeight: 600, alignSelf: "flex-end",
                      }}>Clear day</button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filledMeals === 0 && (
            <div style={{
              marginTop: 20, padding: 28, textAlign: "center",
              border: "1.5px dashed rgba(212,168,67,0.2)", borderRadius: 20,
              background: "rgba(212,168,67,0.03)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🍽️</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                Plan Your Week
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.6 }}>
                Tap any day to choose dishes from Luzon, Visayas & Mindanao. Your grocery list builds itself.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════ GROCERY LIST TAB ═══════════ */}
      {activeTab === "list" && (
        <div style={{ padding: "12px 16px 100px" }}>
          {totalItems === 0 ? (
            <div style={{
              marginTop: 36, padding: 32, textAlign: "center",
              background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 12, filter: "grayscale(0.5)" }}>🛒</div>
              <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 700 }}>Your cart is empty</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, lineHeight: 1.6 }}>
                Set your weekly meal plan and your grocery list will auto-generate.
              </div>
              <button className="agp-btn" onClick={() => setActiveTab("plan")} style={{
                marginTop: 16, padding: "11px 24px",
                background: "linear-gradient(135deg, var(--gold), #B8892E)",
                borderRadius: 10, fontSize: 13, fontWeight: 700, color: "#0D0D0F",
                boxShadow: "0 4px 16px rgba(212,168,67,0.3)",
              }}>Go to Meal Plan</button>
            </div>
          ) : (
            <React.Fragment>
              {/* Summary cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                <div className="agp-card agp-shimmer" style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>Progress</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--green)", marginTop: 4 }}>
                    {totalChecked}<span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>/{totalItems}</span>
                  </div>
                  <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      background: "linear-gradient(90deg, var(--green), #51CF66)",
                      width: `${totalItems ? (totalChecked / totalItems) * 100 : 0}%`,
                      transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
                <div className="agp-card" style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1.5 }}>To Buy</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)", marginTop: 4 }}>
                    {itemsToBuy}<span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}> items</span>
                  </div>
                  <div style={{ marginTop: 8, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 2,
                      background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                      width: `${totalItems ? (itemsToBuy / totalItems) * 100 : 0}%`,
                      transition: "width 0.4s",
                    }} />
                  </div>
                </div>
              </div>

              {/* Grocery groups */}
              {Object.entries(GROUP_CONFIG).map(([groupKey, config]) => {
                const items = groceryList[groupKey];
                if (!items || items.length === 0) return null;
                return (
                  <div key={groupKey} style={{ marginBottom: 12, animation: "agpFadeUp 0.3s ease" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 2px", marginBottom: 4,
                    }}>
                      <span style={{ fontSize: 15 }}>{config.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: config.accent, textTransform: "uppercase", letterSpacing: 1.5 }}>
                        {config.label}
                      </span>
                      <span style={{
                        fontSize: 9, fontWeight: 800, color: "var(--text-muted)",
                        background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "2px 8px",
                      }}>{items.length}</span>
                    </div>

                    <div className="agp-card" style={{ overflow: "hidden" }}>
                      {items.map((item, idx) => {
                        const isChecked = !!checkedItems[item.name];
                        const isOwned = !!haveItems[item.name];
                        return (
                          <div key={item.name} style={{
                            padding: "11px 14px", display: "flex", alignItems: "center", gap: 10,
                            borderBottom: idx < items.length - 1 ? "1px solid var(--border)" : "none",
                            opacity: isOwned ? 0.3 : isChecked ? 0.5 : 1,
                            background: isOwned ? "rgba(255,255,255,0.01)" : isChecked ? "rgba(62,207,113,0.03)" : "transparent",
                            transition: "all 0.25s",
                          }}>
                            <div className="agp-check" onClick={() => {
                              if (!isOwned) setCheckedItems((p) => ({ ...p, [item.name]: !isChecked }));
                            }} style={{
                              border: isChecked ? "none" : `2px solid ${config.accent}30`,
                              background: isChecked ? config.accent : "transparent",
                              color: isChecked ? "#0D0D0F" : "transparent",
                              cursor: isOwned ? "default" : "pointer",
                            }}>
                              {isChecked && "✓"}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 13, fontWeight: 600, color: "var(--text-primary)",
                                textDecoration: isChecked || isOwned ? "line-through" : "none",
                                textDecorationColor: "var(--text-muted)",
                              }}>{item.name}</div>
                              <div style={{
                                fontSize: 10, color: "var(--text-muted)", marginTop: 2,
                                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                              }}>{item.dishes.join(" · ")}</div>
                            </div>

                            <div style={{
                              fontSize: 12, fontWeight: 700, color: config.accent,
                              background: config.bg, padding: "3px 8px", borderRadius: 6, flexShrink: 0,
                              whiteSpace: "nowrap",
                            }}>{formatQty(item.amount, item.unit)}</div>

                            <div className="agp-check" onClick={() => {
                              setHaveItems((p) => ({ ...p, [item.name]: !isOwned }));
                              if (!isOwned) setCheckedItems((p) => ({ ...p, [item.name]: false }));
                            }} style={{
                              width: 26, height: 26, borderRadius: 8, cursor: "pointer",
                              border: `1.5px solid ${isOwned ? "rgba(62,207,113,0.3)" : "var(--border)"}`,
                              background: isOwned ? "rgba(62,207,113,0.1)" : "transparent",
                              fontSize: 11,
                            }}>
                              {isOwned ? "✅" : "🏠"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button className="agp-btn" onClick={() => setCheckedItems({})} style={{
                  flex: 1, padding: "12px", background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)", borderRadius: 12,
                  fontSize: 12, fontWeight: 600, color: "var(--text-secondary)",
                }}>Uncheck All</button>
                <button className="agp-btn" onClick={() => {
                  const all = {};
                  Object.values(groceryList).flat().forEach((it) => { if (!haveItems[it.name]) all[it.name] = true; });
                  setCheckedItems(all);
                }} style={{
                  flex: 1, padding: "12px", background: "linear-gradient(135deg, var(--green), #1E8449)",
                  borderRadius: 12, fontSize: 12, fontWeight: 700, color: "#fff",
                  boxShadow: "0 4px 16px rgba(62,207,113,0.2)",
                }}>Check All</button>
              </div>
              <button className="agp-btn" onClick={() => setHaveItems({})} style={{
                width: "100%", marginTop: 8, padding: "10px",
                background: "transparent", border: "1px solid var(--border)", borderRadius: 12,
                fontSize: 11, fontWeight: 600, color: "var(--text-muted)",
              }}>Reset "Already Have"</button>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}
