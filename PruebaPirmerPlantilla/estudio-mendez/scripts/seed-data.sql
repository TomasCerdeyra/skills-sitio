-- =============================================
-- Seed Data — Estudio Méndez (rubro: estudio jurídico / derecho comercial y societario)
-- Generado: 2026-05-12
-- Ejecutar UNA SOLA VEZ después de setup-rls.sql
-- =============================================
--
-- setup-rls.sql ya creó el tenant. Copiar el UUID que imprimió
-- y hacer Ctrl+H → buscar 82a32e41-aa15-4409-b4d7-d7e002186039 → reemplazar con el UUID real.
--
-- Para borrar este seed:
--   DELETE FROM public.product_variants WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.product_images WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.products WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.subcategories WHERE tenant_id = 'el-uuid';
--   DELETE FROM public.categories WHERE tenant_id = 'el-uuid';
-- =============================================

-- ⚠️ HACER Ctrl+H → buscar: 82a32e41-aa15-4409-b4d7-d7e002186039 → reemplazar con el UUID que imprimió setup-rls.sql

-- =============================================
-- CATEGORÍAS
-- =============================================
INSERT INTO public.categories (id, tenant_id, name, slug, position, active) VALUES
  ('a1b2c3d4-e001-4001-8001-100000000001', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Derecho Societario', 'derecho-societario', 0, true),
  ('a1b2c3d4-e001-4001-8001-100000000002', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Derecho Comercial', 'derecho-comercial', 1, true),
  ('a1b2c3d4-e001-4001-8001-100000000003', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Contratos', 'contratos', 2, true),
  ('a1b2c3d4-e001-4001-8001-100000000004', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Asesoramiento Continuo', 'asesoramiento-continuo', 3, true);

-- =============================================
-- SUBCATEGORÍAS
-- =============================================
INSERT INTO public.subcategories (id, tenant_id, category_id, name, slug, position, active) VALUES
  ('b2c3d4e5-f001-4001-8001-200000000001', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000001', 'Constitución de Sociedades', 'constitucion-sociedades', 0, true),
  ('b2c3d4e5-f001-4001-8001-200000000002', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000001', 'Fusiones y Adquisiciones', 'fusiones-adquisiciones', 1, true),
  ('b2c3d4e5-f001-4001-8001-200000000003', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000002', 'Defensa del Consumidor', 'defensa-consumidor', 0, true),
  ('b2c3d4e5-f001-4001-8001-200000000004', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000002', 'Litigios Comerciales', 'litigios-comerciales', 1, true),
  ('b2c3d4e5-f001-4001-8001-200000000005', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000003', 'Contratos Comerciales', 'contratos-comerciales', 0, true),
  ('b2c3d4e5-f001-4001-8001-200000000006', '82a32e41-aa15-4409-b4d7-d7e002186039', 'a1b2c3d4-e001-4001-8001-100000000003', 'Contratos Internacionales', 'contratos-internacionales', 1, true);

-- =============================================
-- SERVICIOS (como productos en el catálogo)
-- =============================================
INSERT INTO public.products (id, tenant_id, name, slug, description, price, compare_at_price, category_id, active, featured) VALUES

  -- Derecho Societario
  ('c3d4e5f6-0001-4001-8001-300000000001', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Constitución de SRL o SA', 'constitucion-srl-sa',
    'Redacción de estatuto, tramitación ante IGJ, apertura de cuenta bancaria y asesoramiento en el proceso de inscripción. Incluye acompañamiento hasta la obtención del número de expediente definitivo.',
    85000, NULL, 'a1b2c3d4-e001-4001-8001-100000000001', true, true),

  ('c3d4e5f6-0001-4001-8001-300000000002', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Transformación de Sociedad', 'transformacion-sociedad',
    'Análisis de viabilidad, redacción de documentación y tramitación ante los organismos competentes para el cambio de tipo societario. Orientado a empresas en crecimiento que necesitan adaptar su estructura.',
    65000, NULL, 'a1b2c3d4-e001-4001-8001-100000000001', true, false),

  ('c3d4e5f6-0001-4001-8001-300000000003', '82a32e41-aa15-4409-b4d7-d7e002186039', 'M&A — Due Diligence Legal', 'due-diligence-legal',
    'Revisión exhaustiva de la situación legal, contractual y regulatoria de la empresa objetivo. Identificación de riesgos, pasivos contingentes y recomendaciones para la negociación.',
    145000, NULL, 'a1b2c3d4-e001-4001-8001-100000000001', true, true),

  ('c3d4e5f6-0001-4001-8001-300000000004', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Acuerdos de Accionistas', 'acuerdos-accionistas',
    'Redacción y negociación de shareholders agreements que protegen los derechos de todos los socios. Incluye cláusulas de tag-along, drag-along, preferencias de liquidación y mecanismos de salida.',
    95000, NULL, 'a1b2c3d4-e001-4001-8001-100000000001', true, false),

  -- Derecho Comercial
  ('c3d4e5f6-0001-4001-8001-300000000005', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Defensa en Juicios Comerciales', 'defensa-juicios-comerciales',
    'Representación y patrocinio en conflictos comerciales ante fueros ordinario y arbitral. Análisis de riesgo, estrategia procesal y seguimiento del expediente hasta sentencia firme.',
    0, NULL, 'a1b2c3d4-e001-4001-8001-100000000002', true, false),

  ('c3d4e5f6-0001-4001-8001-300000000006', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Recupero de Créditos Comerciales', 'recupero-creditos',
    'Gestión extrajudicial y judicial para el cobro de deudas comerciales. Estrategia de negociación, medidas cautelares y ejecución de sentencias. Honorarios en parte variables según resultado.',
    0, NULL, 'a1b2c3d4-e001-4001-8001-100000000002', true, false),

  -- Contratos
  ('c3d4e5f6-0001-4001-8001-300000000007', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Redacción de Contratos Comerciales', 'redaccion-contratos',
    'Elaboración de contratos a medida: distribución, agencia, franchising, supply agreements y más. Revisión de contratos de contraparte con detección de cláusulas desfavorables.',
    55000, NULL, 'a1b2c3d4-e001-4001-8001-100000000003', true, true),

  ('c3d4e5f6-0001-4001-8001-300000000008', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Contratos Internacionales', 'contratos-internacionales-servicio',
    'Asesoramiento en operaciones cross-border: selección de ley aplicable, cláusulas de jurisdicción y arbitraje, adaptación a normativa local e internacional (CISG, Incoterms, UCP).',
    75000, NULL, 'a1b2c3d4-e001-4001-8001-100000000003', true, false),

  -- Asesoramiento continuo
  ('c3d4e5f6-0001-4001-8001-300000000009', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Retainer Mensual — PyME', 'retainer-pyme',
    'Asesoramiento legal continuo para empresas pequeñas y medianas. Consultas ilimitadas, revisión de contratos menores, seguimiento de novedades regulatorias y respuesta en 24 hs. Ideal para tener un abogado en el equipo sin el costo de uno en relación de dependencia.',
    85000, NULL, 'a1b2c3d4-e001-4001-8001-100000000004', true, true),

  ('c3d4e5f6-0001-4001-8001-300000000010', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Retainer Mensual — Startup', 'retainer-startup',
    'Acompañamiento legal para startups en etapa de crecimiento. Cap table, equity agreements, rondas de inversión, términos de servicio y privacidad. Tarifa plana con flexibilidad para los primeros años.',
    55000, NULL, 'a1b2c3d4-e001-4001-8001-100000000004', true, false),

  ('c3d4e5f6-0001-4001-8001-300000000011', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Consulta Puntual — 1 hora', 'consulta-puntual',
    'Sesión de consulta de una hora para resolver una duda concreta o evaluar una situación legal específica. Incluye resumen escrito con los puntos clave y recomendaciones. Ideal para empresas que necesitan una segunda opinión.',
    25000, NULL, 'a1b2c3d4-e001-4001-8001-100000000004', true, false),

  ('c3d4e5f6-0001-4001-8001-300000000012', '82a32e41-aa15-4409-b4d7-d7e002186039', 'Auditoría Legal de Empresa', 'auditoria-legal',
    'Revisión integral de la situación legal de la empresa: estructura societaria, contratos vigentes, cumplimiento regulatorio y relaciones laborales. Informe detallado con plan de acción correctivo.',
    120000, 140000, 'a1b2c3d4-e001-4001-8001-100000000004', true, false);

-- =============================================
-- IMÁGENES
-- Usar SIEMPRE images.unsplash.com/photo-{id}
-- =============================================
INSERT INTO public.product_images (id, tenant_id, product_id, url, alt, position) VALUES
  -- Constitución de SRL
  ('d4e5f6a7-0001-4001-8001-400000000001', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000001',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    'Constitución de sociedad — documentos legales', 0),

  -- Transformación de sociedad
  ('d4e5f6a7-0001-4001-8001-400000000002', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000002',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
    'Transformación societaria — reunión de equipo', 0),

  -- Due Diligence
  ('d4e5f6a7-0001-4001-8001-400000000003', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000003',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    'Due Diligence legal — oficina moderna', 0),

  -- Acuerdos de accionistas
  ('d4e5f6a7-0001-4001-8001-400000000004', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000004',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    'Acuerdos de accionistas — documentos', 0),

  -- Defensa en juicios
  ('d4e5f6a7-0001-4001-8001-400000000005', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000005',
    'https://picsum.photos/seed/juicio-comercial-mendez/800/600',
    'Defensa en juicios comerciales', 0),

  -- Recupero de créditos
  ('d4e5f6a7-0001-4001-8001-400000000006', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000006',
    'https://picsum.photos/seed/recupero-creditos-mendez/800/600',
    'Recupero de créditos comerciales', 0),

  -- Redacción de contratos
  ('d4e5f6a7-0001-4001-8001-400000000007', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000007',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    'Redacción de contratos comerciales', 0),

  -- Contratos internacionales
  ('d4e5f6a7-0001-4001-8001-400000000008', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000008',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    'Contratos internacionales', 0),

  -- Retainer PyME
  ('d4e5f6a7-0001-4001-8001-400000000009', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000009',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
    'Retainer mensual PyME — reunión con cliente', 0),

  -- Retainer Startup
  ('d4e5f6a7-0001-4001-8001-400000000010', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000010',
    'https://picsum.photos/seed/retainer-startup-mendez/800/600',
    'Retainer mensual Startup', 0),

  -- Consulta puntual
  ('d4e5f6a7-0001-4001-8001-400000000011', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000011',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    'Consulta puntual — asesoramiento', 0),

  -- Auditoría legal
  ('d4e5f6a7-0001-4001-8001-400000000012', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000012',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
    'Auditoría legal de empresa', 0);

-- =============================================
-- VARIANTES (modalidades de algunos servicios)
-- =============================================
INSERT INTO public.product_variants (id, tenant_id, product_id, name, price, price_modifier, stock) VALUES
  -- Retainer PyME: modalidades
  ('e5f6a7b8-0001-4001-8001-500000000001', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000009', 'Básico (hasta 5 consultas/mes)', 85000, 0, 10),
  ('e5f6a7b8-0001-4001-8001-500000000002', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000009', 'Full (consultas ilimitadas)', 130000, 45000, 5),

  -- Retainer Startup: etapas
  ('e5f6a7b8-0001-4001-8001-500000000003', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000010', 'Pre-seed (hasta 3 consultas/mes)', 55000, 0, 10),
  ('e5f6a7b8-0001-4001-8001-500000000004', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000010', 'Growth (consultas ilimitadas)', 85000, 30000, 5),

  -- Consulta puntual: duración
  ('e5f6a7b8-0001-4001-8001-500000000005', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000011', '1 hora', 25000, 0, 99),
  ('e5f6a7b8-0001-4001-8001-500000000006', '82a32e41-aa15-4409-b4d7-d7e002186039', 'c3d4e5f6-0001-4001-8001-300000000011', '2 horas', 45000, 20000, 99);
