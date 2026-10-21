-- Seed Data for Properties
INSERT INTO properties (title, description, price_per_month, location, accessibility_rating, clima_data)
VALUES 
(
  'Villa Coral - Nerja', 
  'Hermosa villa adaptada con vistas al mar, piscina con rampa y jardines planos. Perfecta para estancias largas en invierno.', 
  1500, 
  'Nerja, Málaga', 
  5, 
  '{"jan_temp": 17, "humidity": 60}'::jsonb
),
(
  'Apartamento Brisa - Marbella', 
  'Lujo y comodidad en el corazón de la Milla de Oro. Ascensor amplio, baños adaptados y cerca del paseo marítimo.', 
  2200, 
  'Marbella, Málaga', 
  4, 
  '{"jan_temp": 18, "humidity": 55}'::jsonb
),
(
  'Residencia Sol - Estepona', 
  'Tranquilidad absoluta en una urbanización senior-friendly. Servicios médicos cercanos y sol todo el año.', 
  1800, 
  'Estepona, Málaga', 
  5, 
  '{"jan_temp": 17, "humidity": 58}'::jsonb
);
