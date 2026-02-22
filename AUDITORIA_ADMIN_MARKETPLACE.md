# 🔍 AUDITORÍA COMPLETA: PANEL DE ADMINISTRACIÓN
## MotoMarket Cuba - Análisis Profundo + Benchmark Competitivo

**Fecha:** Febrero 2026  
**Versión:** 1.0  
**Objetivo:** Evaluar el panel de administración actual y definir roadmap hacia un marketplace profesional de nivel internacional

**Nota crítica:** 🚨 **No existe base de datos aún**. Este análisis contempla la arquitectura, estructura y organización del código, preparando el terreno para cuando se implemente la BD.

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Auditoría del Admin Actual](#auditoría-del-admin-actual)
3. [Benchmark Competitivo](#benchmark-competitivo)
4. [Funcionalidades Críticas Faltantes](#funcionalidades-críticas-faltantes)
5. [Problemas de Arquitectura Frontend](#problemas-de-arquitectura-frontend)
6. [Recomendaciones Estructuradas](#recomendaciones-estructuradas)
7. [Plan de Implementación](#plan-de-implementación)

---

## 📊 RESUMEN EJECUTIVO

### Estado Actual del Admin: 3/10 ⭐

**Fortalezas:**
- ✅ UI/UX visualmente moderna y profesional
- ✅ Componentes reutilizables bien estructurados (premium-card, animated-counter)
- ✅ Sistema de navegación lateral limpio
- ✅ Buena separación de concerns (sidebar, header, dashboard)
- ✅ Estructura base lista para crecimiento

**Debilidades Críticas:**
- ❌ **100% mockdata** - No hay integración con datos reales
- ❌ **Funcionalidades superficiales** - Solo dashboard cosmético
- ❌ **Secciones incompletas** - Motos, Usuarios, Pendientes, Estadísticas son stubs
- ❌ **Sin moderación** - No hay herramientas para moderar publicaciones
- ❌ **Sin gestión de reportes** - No hay sistema para reportes de usuarios
- ❌ **Sin gestión de pagos** - No hay control de transacciones
- ❌ **Arquitectura preparada para features, pero vacía**

### Madurez Relativa (vs Marketplaces Internacionales):
- 🔴 **Moderación y Control:** 2/10 (crítico)
- 🔴 **Gestión de Publicaciones:** 3/10 (crítico)
- 🟡 **Análisis y Reportes:** 4/10 (bajo)
- 🟡 **Gestión de Usuarios:** 3/10 (bajo)
- 🟢 **Diseño Visual:** 8/10 (bueno)
- 🟡 **Automatización:** 2/10 (crítico)

---

## 🔍 AUDITORÍA DEL ADMIN ACTUAL

### 1. ESTRUCTURA Y ORGANIZACIÓN

#### Estructura de Carpetas
```
app/admin/
├── page.tsx                 (Layout principal)
├── estadisticas/
│   └── page.tsx            (Stub - sin contenido)
├── motos/
│   └── page.tsx            (Stub - sin contenido)
├── pendientes/
│   └── page.tsx            (Stub - sin contenido)
└── usuarios/
    └── page.tsx            (Stub - sin contenido)

components/admin/
├── admin-table.tsx         (Componente genérico de tabla)
├── dashboard.tsx           (Panel principal - 70% mockdata)
├── header.tsx              (Header del admin)
├── quick-stats.tsx         (Estadísticas rápidas)
└── sidebar.tsx             (Navegación lateral)
```

**Evaluación:**
- ✅ Estructura lógica y escalable
- ✅ Separation of concerns clara
- ⚠️ Rutas planas - sin sub-categorías anidadas
- ❌ Páginas completamente vacías (stubs)

#### Problema de Escalabilidad:
```
Actual:
/admin/motos                (¿Lista? ¿Detalle? ¿Editar?)
/admin/usuarios             (¿Lista? ¿Perfil? ¿Sanciones?)
/admin/pendientes           (¿Sólo cola de aprobación?)
/admin/estadísticas         (¿Dashboard o reportes?)

Debería ser:
/admin/motos                (Lista principal)
├── /admin/motos/[id]       (Detalle y edición)
├── /admin/motos/duplicadas (Detección de duplicados)
├── /admin/motos/reportadas (Publicaciones reportadas)
└── /admin/motos/archived   (Archivo histórico)

/admin/usuarios             (Lista de usuarios)
├── /admin/usuarios/[id]    (Perfil y sanciones)
├── /admin/usuarios/verificacion (Cola de verificación)
├── /admin/usuarios/prohibidos (Usuarios baneados)
└── /admin/usuarios/reportes-fraude (Reporte de fraudes)
```

---

### 2. COMPONENTES DEL ADMIN

#### dashboard.tsx (141 líneas)
**Estado:** ⚠️ 70% funcional, 30% mockdata

**Qué tiene:**
- 4 tarjetas de métricas (mockeadas)
- Gráfico de barras (mockeado)
- Layout responsive con Grid

**Qué falta:**
- ❌ Datos en tiempo real
- ❌ Sincronización con BD
- ❌ Filtros por fecha
- ❌ Exportación de datos
- ❌ Alertas de eventos críticos (muchos pendientes, estafas reportadas, etc.)
- ❌ KPIs contextuales (% de verificación, tasa de fraude, etc.)

**Problemas arquitectónicos:**
```tsx
// ACTUAL: Datos hardcodeados
const chartData = [
  { name: "Lun", Motos: 18, Usuarios: 6 },
  { name: "Mar", Motos: 22, Usuarios: 7 },
  // ...
];

// DEBERÍA SER:
// 1. Hook personalizado que fetch de API
// 2. Cálculos en servidor (para datos sensibles)
// 3. Caché con revalidación
// 4. Fallback a mockdata solo en dev
```

#### admin-table.tsx
**Estado:** ✅ Componente genérico bien hecho

**Qué tiene:**
- Estructura base de tabla reutilizable
- Soporte para columnas personalizadas
- Tiene potencial para extensión

**Qué le falta para ser profesional:**
- ❌ Paginación
- ❌ Ordenamiento
- ❌ Búsqueda/filtros
- ❌ Acciones en lote (bulk actions)
- ❌ Selección múltiple
- ❌ Exportación a CSV/Excel
- ❌ Resaltado condicional de filas

#### sidebar.tsx
**Estado:** ✅ Bien implementado

**Qué tiene:**
- Navegación clara
- Iconos animados
- Estado activo visible
- Responsive (oculto en móvil)

**Qué falta:**
- ⚠️ Sin indicadores de actividad (ej: "3 pendientes de aprobación")
- ❌ Sin notificaciones urgentes (badge de alertas)
- ❌ Sin rol-based navigation (los admins no ven lo mismo según rol)

---

### 3. FLUJOS DE USUARIO CRÍTICOS FALTANTES

#### A. Moderación de Publicaciones
**Estado:** ❌ **No existe**

Debería permitir:
```
Dashboard → Publicaciones Reportadas
│
├── Cola de reportes (listado)
│   ├── Vista previa de publicación
│   ├── Tipo de reporte (estafa, falsa, ofensiva, duplicada)
│   ├── Evidencia/comentario del reportador
│   ├── Historial de reportes de este usuario
│   └── Historial de esta publicación
│
├── Acciones:
│   ├── Aprobar (ignorar reporte)
│   ├── Rechazar (eliminar publicación)
│   ├── Editar (permitir corrección)
│   ├── Contactar vendedor (warning)
│   └── Banear usuario (si hay múltiples reportes)
│
└── Analytics:
    ├── Tiempo promedio de revisión
    ├── Tasa de aprobación vs rechazo
    ├── Usuarios más reportados
    └── Razones de reporte más comunes
```

#### B. Gestión de Usuarios/Vendedores
**Estado:** ❌ **No existe**

Debería permitir:
```
Dashboard → Usuarios
│
├── Filtros:
│   ├── Estado (activo, inactivo, baneado, verificado)
│   ├── Tipo (comprador, vendedor, negocio)
│   ├── Fecha de registro
│   ├── Nivel de verificación
│   └── Número de publicaciones
│
├── Acciones:
│   ├── Ver perfil completo
│   ├── Historial de puntuación
│   ├── Publicaciones activas/archivadas
│   ├── Mensajes sospechosos
│   ├── Cambiar nivel de verificación
│   ├── Dar badges especiales
│   ├── Enviar mensaje de advertencia
│   ├── Suspender temporalmente
│   └── Banear permanentemente
│
├── Gestión de reportes:
│   ├── Usuarios reportados
│   ├── Razones de reportes
│   ├── Histórico de sanciones
│   └── Lista negra compartida
│
└── Analytics:
    ├── Usuarios nuevos/día
    ├── Tasa de verificación
    ├── Usuarios activos
    ├── Tasa de baneados
    └── ROI por usuario tipo
```

#### C. Control de Publicaciones
**Estado:** ⚠️ **Estructura existe pero vacía**

Debería permitir:
```
Dashboard → Motos (Publicaciones)
│
├── Listado con filtros:
│   ├── Estado (borrador, activa, pausada, archivada, rechazada)
│   ├── Verificación (no verificada, verificada, inspección)
│   ├── Precio (rango)
│   ├── Fecha de publicación
│   ├── Vendedor
│   ├── Calidad (fotos, descripción, completitud)
│   └── Vistas/interacciones
│
├── Acciones individuales:
│   ├── Vista previa completa
│   ├── Editar (como admin)
│   ├── Destacar (featured/premium)
│   ├── Pausar (sin eliminar)
│   ├── Reactivar
│   ├── Eliminar
│   ├── Enviar a inspección
│   └── Marcar como verificada
│
├── Acciones en lote:
│   ├── Destacar múltiples
│   ├── Pausar múltiples
│   ├── Verificar múltiples
│   └── Exportar listado
│
├── Gestión de destacados:
│   ├── Cola de solicitudes
│   ├── Publicaciones destacadas activas
│   ├── Historial de destacados
│   ├── Revenue tracking (si es pago)
│   └── Límites por usuario
│
└── Analytics:
    ├── Motos más vistas
    ├── Tasa de conversión (vistas → contactos)
    ├── Tiempo promedio hasta venta
    ├── Precios promedio por marca/modelo
    └── Publicaciones que generan reportes
```

#### D. Sistema de Reportes y Denuncias
**Estado:** ❌ **No existe**

Debería permitir:
```
Dashboard → Reportes
│
├── Centro de denuncias
│   ├── Reportes pendientes
│   ├── Reportes en investigación
│   ├── Reportes resueltos
│   └── Reportes cerrados
│
├── Tipos de reporte:
│   ├── Publicación fraudulenta
│   ├── Publicación ofensiva/inapropiada
│   ├── Publicación duplicada
│   ├── Usuario comportamiento sospechoso
│   ├── Estafa/fraude
│   ├── Información personal expuesta
│   └── Contenido político/religioso
│
├── Flujo de investigación:
│   ├── Análisis inicial
│   ├── Contacto con partes involucradas
│   ├── Recolección de evidencia
│   ├── Decisión final
│   └── Implementación de acción correctiva
│
├── Actions:
│   ├── Archivar reporte (no procedente)
│   ├── Aplicar warning (aviso)
│   ├── Suspender (temporal)
│   ├── Banear permanentemente
│   ├── Eliminar contenido
│   └── Escalar a autoridades (si aplica)
│
└── Analytics:
    ├── Reportes por tipo
    ├── Tasa de resolución
    ├── Usuarios más reportados
    ├── Publicaciones más reportadas
    ├── Patrones de fraude
    └── Necesidad de nueva moderación
```

#### E. Gestión de Pagos y Monetización
**Estado:** ❌ **No existe**

Debería permitir:
```
Dashboard → Monetización
│
├── Transacciones
│   ├── Publicaciones destacadas pagadas
│   ├── Ingresos por mes
│   ├── Métodos de pago aceptados
│   ├── Comisiones
│   └── Auditoría de pagos
│
├── Gestión de planes premium
│   ├── Usuarios activos con suscripción
│   ├── Ingresos recurrentes
│   ├── Churn rate
│   └── Gestión manual de suscripciones
│
├── Facturación
│   ├── Generar facturas
│   ├── Gestionar reembolsos
│   ├── Crear cupones/códigos
│   └── Configurar comisiones por categoría
│
└── Reports
    ├── Ingresos vs gastos
    ├── Rentabilidad por tipo de publicación
    ├── Clientes con mayor valor
    └── Proyecciones de revenue
```

---

### 4. DEFICIENCIAS EN ESTADÍSTICAS Y ANALÍTICA

#### Métricas Actuales (Dashboard)
```
✅ Motos publicadas (1280)
✅ Usuarios activos (432)
✅ Pendientes de aprobación (17)
✅ Ingresos estimados ($4200)
+ Un gráfico de línea simple
```

#### Métricas que Faltan Críticamente

**KPIs de Salud del Marketplace:**
```
❌ Tasa de estafas reportadas (%)
❌ Tasa de resolución de reportes (tiempo promedio)
❌ Usuarios baneados/semana
❌ Publicaciones eliminadas/semana (razón)
❌ Tasa de verificación de vendedores (%)
❌ Score de confianza promedio del marketplace
```

**KPIs de Engagement:**
```
❌ Contactos por publicación (promedio)
❌ Tasa de conversión (publicación → venta)
❌ Tiempo promedio hasta venta
❌ Usuarios activos diarios (DAU)
❌ Usuarios activos mensuales (MAU)
❌ Sesiones promedio por usuario
```

**KPIs de Crecimiento:**
```
❌ Nuevos usuarios/día
❌ Nuevas publicaciones/día
❌ Tasa de retención (D1, D7, D30)
❌ Cost of Acquisition (CAC)
❌ Lifetime Value (LTV)
❌ New vs. Returning usuarios (%)
```

**KPIs de Calidad:**
```
❌ Puntuación promedio de publicaciones
❌ Completitud de datos (fotos, descripción, especificaciones)
❌ Tasa de rechazo de publicaciones (%)
❌ Tiempo de revisión de moderación
❌ Satisfacción del usuario (NPS)
```

**KPIs Específicos para Marketplace de Motos:**
```
❌ Precio promedio de moto vendida
❌ Marcas/modelos más populares
❌ Provincias con mayor demanda
❌ Ciclo de vida de una publicación (¿cuánto tarda en vender?)
❌ Motos más vistas/contactadas (sin vender) - posible fraude
❌ Distribución de precios por marca
```

---

### 5. PROBLEMAS DE ARQUITECTURA FRONTEND

#### A. Falta de Integración con Backend/BD

**Problema:**
```tsx
// ACTUAL: Todo es mockdata
const metrics = [
  { label: "Motos publicadas", value: 1280 },
  { label: "Usuarios activos", value: 432 },
  // Valores nunca cambian
];

// PROBLEMA: 
// 1. Si la BD tiene datos reales, el admin muestra info falsa
// 2. Sin saber qué endpoint existe, es difícil conectar
// 3. No hay estrategia de caching/revalidación
```

**Impacto:** 🔴 CRÍTICO - El admin es completamente inútil sin datos reales.

#### B. Sin Sistema de Permisos/Roles

**Problema:**
```tsx
// ACTUAL: No hay verificación de rol
export default function AdminPage() {
  // Cualquiera que acceda a /admin ve todo igual
  return <Dashboard />;
}

// DEBERÍA SER:
// 1. Verificar autenticación
// 2. Verificar rol (admin, moderador, editor, support)
// 3. Mostrar UI basada en permisos
// 4. Auditar acciones por rol
```

**Impacto:** 🔴 **CRÍTICO PARA SEGURIDAD**

#### C. Sin Auditoría/Logging

**Problema:**
```
No hay trace de:
❌ Quién modificó una publicación
❌ Cuándo se baneó un usuario
❌ Por qué se rechazó una publicación
❌ Quién cambió el estado de una moto
❌ Qué admin hizo qué acción
```

**Impacto:** 🔴 CRÍTICO - Imposible resolver disputas, imposible auditar.

#### D. Sin Notificaciones en Tiempo Real

**Problema:**
```
El admin debe alertar de:
❌ Nueva publicación que necesita revisión
❌ Usuario reportado múltiples veces
❌ Publicación recibiendo reports
❌ Moto marcada como duplicada
❌ Pago fallido
❌ Mensaje fraudulento detectado
```

**Impacto:** 🟡 ALTO - Moderación lenta, fraudes sin detectar.

#### E. Sin Filtros/Búsqueda Avanzada

**Problema:**
```
Admin DEBE poder:
❌ Buscar moto por número de publicación
❌ Filtrar usuario por email/teléfono
❌ Filtrar reportes por rango de fecha
❌ Buscar publicaciones por marca/modelo
❌ Filtrar usuarios por localización
❌ Combinar múltiples filtros
❌ Guardar búsquedas frecuentes
```

**Impacto:** 🟡 ALTO - Ineficiencia operacional.

#### F. Sin Bulk Actions

**Problema:**
```
Admin DEBE poder:
❌ Rechazar 10 publicaciones a la vez
❌ Dar badge a múltiples usuarios verificados
❌ Pausar todas las motos de un usuario sospechoso
❌ Descargar listado de reportes filtrados
```

**Impacto:** 🟡 MEDIO - Operaciones manuales tedious.

#### G. Sin Undo/Restore

**Problema:**
```
❌ Si elimino una publicación, ¿puedo recuperarla?
❌ Si baneo un usuario, ¿puedo ver el reporte original?
❌ Si rechazo un reporte, ¿puedo cambiarlo después?
```

**Impacto:** 🟡 MEDIUM - Riesgo de decisiones irreversibles.

---

## 🌍 BENCHMARK COMPETITIVO

He investigado los patrones de paneles de administración en marketplaces internacionales líderes:

### 1. MERCADOLIBRE (eBay latam)

**Estructura Admin:**
```
Personal
├── Configuración de cuenta
├── Vender
│   ├── Publicar
│   ├── Mis publicaciones (gestión)
│   └── Envíos
├── Liquidaciones
└── Datos de Comprador/Vendedor

Vendedor Plus Panel
├── Dashboard (KPIs)
├── Mis anuncios (listado + filtros)
├── Ofertas activas
├── Liquidaciones
├── Reportes (ventas, devoluciones, etc.)
├── Configuración de políticas
└── Promociones

Moderadores (Invisible al usuario)
├── Centro de reportes
├── Revisión de contenido
├── Gestión de usuarios flagged
├── Métricas de moderación
└── Auditoría de acciones
```

**Features destacados:**
- ✅ Sistema de rating robusto (comprador + vendedor)
- ✅ Devoluciones y reclamos integrados
- ✅ Historial completo de transacciones
- ✅ Políticas por categoría
- ✅ Plantillas de anuncios
- ✅ Herramientas de promoción

---

### 2. AUTOTRADER (Automotive Marketplace - USA)

**Panel para Dealers:**
```
Dashboard
├── Ventas (widgets)
├── Leads (contactos)
├── Inventario (rápido)
└── Tendencias de mercado

Gestión de Inventario
├── Listar coche
├── Editar/Actualizar
├── Fotos y videos
├── Historial de vistas
├── Leads por vehículo
└── Comparación con market

Lead Management
├── Leads entrantes
├── Responder automático
├── CRM integrado
├── Historial de contacto
└── Conversión tracking

Reports & Analytics
├── Performance por vehículo
├── Tendencias de precios
├── Comparación con competencia
├── Métricas de engagement
└── Exportación

Herramientas
├── Pricing consultation
├── Vehicle details wizard
├── Photo guidelines
└── Marketing campaigns
```

**Features destacados:**
- ✅ Analítca granular por vehículo
- ✅ Integración con sistemas de precios
- ✅ Lead management profesional
- ✅ Comparación competitiva
- ✅ Herramientas de fotografía/marketing

---

### 3. WALLAPOP (Marketplace Classifieds - España)

**Panel para Vendedores:**
```
Mi Wallapop
├── Dashboard (ventanas)
├── Mis artículos
│   ├── Activos
│   ├── Vendidos
│   ├── No disponibles
│   └── Destaques
├── Ofertas recibidas
├── Conversaciones
├── Valoraciones
├── Mis réplicas (respuestas a ofertas)
└── Datos de pago

Publicar
├── Asistente paso a paso
├── Categoría
├── Fotos upload
├── Descripción
├── Precio
├── Ubicación
└── Bumps (volver a destacar)

Moderation (Internal)
├── Reportes de contenido
├── Usuarios flagged
├── Revisión de fotos
├── Verificación de usuarios
└── Acciones correctivas
```

**Features destacados:**
- ✅ Conversaciones integradas
- ✅ Ofertas y negociación dentro de plataforma
- ✅ Publicación sencilla (wizard)
- ✅ Sistema de legitimidad del vendedor

---

### 4. OLX (Marketplace Global)

**Panel Admin:**
```
Dashboard
├── Métricas principales
├── Alertas de fraude
├── Trending categories
└── Regional performance

Content Management
├── Reportes (queue)
├── Anuncios flagged
├── Usuarios sospechosos
├── Acciones (warn, suspend, ban)
└── Auditoría

User Management
├── Usuarios por estado
├── Verificación
├── KYC (Know Your Customer)
├── Historial
├── Locales baneados
└── Comportamiento sospechoso

Analytics
├── Categoría performance
├── Regional insights
├── Fraude patterns
├── Hitrate de reportes
└── Satisfaction metrics

Tools
├── Comunicación masiva
├── Configuración de políticas
├── Mantenimiento de base de datos
└── Importación/exportación de datos
```

**Features destacados:**
- ✅ KYC (Know Your Customer) integrado
- ✅ Análisis regional
- ✅ Detección de patrones de fraude
- ✅ Comunicación masiva

---

### 5. IMMOSCOUT24 (Real Estate - Alemania)

**Panel Admin:**
```
Dashboard
├── KPIs
├── Listados activos
├── Calidad de datos
├── Fraude alerts
└── Regional performance

Quality Control
├── Foto analysis
├── Descripción completitud
├── Precio outliers detection
├── Duplicado detection
└── Scoring por propiedad

Fraud Detection
├── Análisis de patrones
├── Usuarios sospechosos
├── IPs duplicadas
├── Comportamiento sospechoso
└── Reportes de usuarios

User Management
├── Vendedores profesionales
├── Vendedores individuales
├── Historial de transacciones
├── Trust score
└── Limitaciones según score

Real Estate Specific
├── Appraisal values
├── Market trends por zona
├── Comparables
├── Price suggestions
└── Investment analysis

Reports
├── Inventory rotation
├── Price trends
├── Demographic analysis
├── Fraud metrics
└── Revenue tracking
```

**Features destacados:**
- ✅ Análisis de calidad de datos
- ✅ Detección automática de outliers
- ✅ Detección de duplicados
- ✅ Sugerencias de precio basadas en ML
- ✅ Trust scoring

---

### 🎯 PATRONES COMUNES EN MARKETPLACES PROFESIONALES

#### Estructura General
```
1. DASHBOARD
   └── KPIs contextuales, alertas, quick actions

2. CONTENT MANAGEMENT
   ├── Moderación (reportes)
   ├── Gestión de publicaciones (listado, edición)
   └── Control de calidad (análisis de datos)

3. USER MANAGEMENT
   ├── Usuarios + historial
   ├── Verificación (KYC)
   ├── Sanciones y restricciones
   └── Trust scoring

4. REPORTS & ANALYTICS
   ├── Datos de operación (DAU, MAU, etc.)
   ├── Insights de negocio
   ├── Fraude detection
   └── Métricas por categoría

5. MONETIZATION
   ├── Transacciones
   ├── Comisiones
   ├── Planes premium
   └── Facturación

6. TOOLS
   ├── Comunicación masiva
   ├── Configuración
   ├── Mantenimiento de datos
   └── Exportación/importación

7. AUDITORÍA
   ├── Historial de acciones
   ├── Quién hizo qué
   └── Reversión si aplica
```

#### Funcionalidades Recurrentes (MUST HAVE)

| Feature | Importancia | En MotoMarket |
|---------|-------------|---------------|
| Búsqueda/Filtros avanzados | 🔴 CRÍTICO | ❌ NO |
| Listings con acciones | 🔴 CRÍTICO | ⚠️ INCOMPLETO |
| Moderación de reportes | 🔴 CRÍTICO | ❌ NO |
| User banning/suspension | 🔴 CRÍTICO | ❌ NO |
| Real-time notifications | 🔴 CRÍTICO | ❌ NO |
| Audit logging | 🔴 CRÍTICO | ❌ NO |
| Role-based access | 🔴 CRÍTICO | ❌ NO |
| Fraud detection patterns | 🟡 IMPORTANTE | ❌ NO |
| Bulk actions | 🟡 IMPORTANTE | ❌ NO |
| Export data | 🟡 IMPORTANTE | ❌ NO |
| Advanced analytics | 🟡 IMPORTANTE | ❌ NO |
| A/B testing tools | 🟢 RECOMENDADO | ❌ NO |
| Communication broadcast | 🟢 RECOMENDADO | ❌ NO |

---

## 🚨 FUNCIONALIDADES CRÍTICAS FALTANTES

### TIER 1: CRÍTICAS PARA OPERAR (SIN ESTAS, NO FUNCIONA EL MARKETPLACE)

#### 1.1 Sistema de Moderación y Reportes
**Impacto:** 🔴 **EXISTENCIAL**

Incluye:
```
✅ Queue de reportes (todas las razones)
✅ Revisión con preview de contenido
✅ Dashboard de investigación
✅ Decisión final (aprobar/rechazar/warning)
✅ Comunicación al usuario de la decisión
✅ Historial de reportes
✅ Escalamiento a gerencia si caso especial
✅ Auditoría de decisiones
```

**Por qué es crítico:**
- Sin moderación = marketplace lleno de estafas
- Los usuarios no confían
- Responsabilidad legal
- Pérdida de reputación

#### 1.2 Gestión de Usuarios (Banning, Verificación, Restricciones)
**Impacto:** 🔴 **EXISTENCIAL**

Incluye:
```
✅ Vista de usuario con historial completo
✅ Cambiar nivel de verificación
✅ Marcar como sospechoso
✅ Suspender temporalmente
✅ Banear permanentemente
✅ Lista negra
✅ Historial de sanciones
✅ Justificación de acciones
✅ Reversión si hay error
```

**Por qué es crítico:**
- Control de estafadores
- Protección de usuarios legítimos
- Capacidad de responder a denuncias

#### 1.3 Filtros y Búsqueda Avanzada
**Impacto:** 🔴 **OPERACIONAL**

Incluye:
```
✅ Búsqueda por: nombre, email, teléfono, marca, modelo, provincia
✅ Filtros avanzados: estado, fecha, país, tipo
✅ Ordenamiento: por fecha, por vistas, por reportes
✅ Guardado de búsquedas frecuentes
✅ Exportar resultados a CSV
```

**Por qué es crítico:**
- Imposible encontrar información sin esto
- 80% del tiempo del admin en búsqueda manual
- Error humano

#### 1.4 Real-time Notifications y Alertas
**Impacto:** 🔴 **OPERACIONAL**

Debe alertar de:
```
✅ Nuevo reporte de publicación
✅ Usuario reportado múltiples veces
✅ Publicación marcada como duplicada
✅ Publicación recibiendo muchas vistas sin conversión (posible fraude)
✅ Usuario nuevo con comportamiento sospechoso
✅ Pago fallido
✅ Muchos pendientes en cola
```

**Por qué es crítico:**
- Moderación proactiva vs reactiva
- Fraude se detecta rápido
- Admin puede responder en tiempo real

#### 1.5 Auditoría y Logging
**Impacto:** 🔴 **LEGAL**

Debe grabar:
```
✅ Quién hizo qué acción
✅ Cuándo  
✅ Por qué (comentario)
✅ IP de origen (security)
✅ Cambio anterior vs. nuevo
✅ Si fue rechazada o aprobada
```

**Por qué es crítico:**
- Responsabilidad legal
- Resolver disputas
- Detectar admin malicioso
- Cumplimiento normativo

#### 1.6 Control de Acceso (Roles y Permisos)
**Impacto:** 🔴 **SEGURIDAD**

Roles necesarios:
```
✅ SUPER_ADMIN - Todo acceso
✅ MODERATOR - Reportes, usuarios, publicaciones
✅ EDITOR - Solo publicaciones (destacar, pausar)
✅ SUPPORT - Ver información, responder usuarios
✅ ANALYST - Solo ver reportes/analytics
```

**Por qué es crítico:**
- Seguridad datos
- Límite responsabilidades
- Prevenir sabotaje interno

---

### TIER 2: IMPORTANTES PARA OPERACIÓN EFICIENTE

#### 2.1 Gestión de Publicaciones (Destacar, Pausar, Verificar)
**Impacto:** 🟡 **ALTO**

Incluye:
```
🟡 Listado con filtros (estado, vendedor, fecha)
🟡 Ver preview de publicación
🟡 Destacar/Desdestacar (si es pago)
🟡 Pausar/Reactivar
🟡 Marcar como verificada (has pass inspection)
🟡 Editar (como admin)
🟡 Eliminar con razón
🟡 Acciones en lote
```

#### 2.2 Sistema de Verificación de Vendedores
**Impacto:** 🟡 **ALTO**

Incluye:
```
🟡 Cola de verificación pendiente
🟡 Revisar documentos (cédula, selfie, etc.)
🟡 Aceptar o rechazar verificación
🟡 Dar niveles de verificación (básico, intermedio, premium)
🟡 Expirar verificación (anual?)
🟡 Historial de intentos
🟡 Integración con sistema de badges
```

#### 2.3 Analytics y Reportes Avanzados
**Impacto:** 🟡 **ALTO**

Incluye:
```
🟡 Dashboards por categoría
🟡 Tendencias (precio promedio, motos vendidas, etc.)
🟡 Análisis de fraude (patrones sospechosos)
🟡 Performance por región
🟡 ROI por tipo de contenido
🟡 Exportación de reportes
🟡 Scheduled reports (email diario/semanal)
```

#### 2.4 Gestión de Monetización
**Impacto:** 🟡 **ALTO**

Incluye:
```
🟡 Transacciones (publicaciones destacadas)
🟡 Revenue tracking
🟡 Comisiones por categoría
🟡 Cupones/códigos promocionales
🟡 Gestión de suscripciones
🟡 Reembolsos
```

#### 2.5 Bulk Actions
**Impacto:** 🟡 **MEDIO**

Incluye:
```
🟡 Rechazar múltiples publicaciones
🟡 Dar badges a múltiples usuarios
🟡 Pausar todas las motos de un usuario
🟡 Enviar mensaje a múltiples usuarios
🟡 Descargar filtrados
```

---

### TIER 3: NICE TO HAVE (DIFERENCIADORAS)

#### 3.1 Detección de Duplicados
Usar hashing de imágenes para detectar publicaciones duplicadas o muy similares.

#### 3.2 Sugerencias Automáticas
- "Probablemente esta moto es una estafa (precio 70% por debajo)"
- "Esta publicación podría ser un duplicado de [link]"
- "Este usuario tiene 8 reportes en 2 semanas"

#### 3.3 Integración con Servicios Externos
- Integración con WhatsApp Business para enviar notificaciones
- Auto-respuesta a reportes
- Webhooks para sistemas externos

#### 3.4 A/B Testing Dashboard
Para probar cambios en UX sin afectar a todos los usuarios.

---

## 🏗️ PROBLEMAS DE ARQUITECTURA FRONTEND

### 1. FALTA DE SEPARACIÓN ENTRE CAPAS

**Problema actual:**
```tsx
// Components/admin/dashboard.tsx - Mezcla TODO
export function Dashboard() {
  // 1. Datos hardcodeados (mockdata)
  const metrics = [...];
  const chartData = [...];
  
  // 2. Lógica de negocio
  // (Cálculos de tendencias, etc.)
  
  // 3. Presentación
  return <div>...</div>;
}
```

**Debería ser:**
```
app/admin/
├── layout.tsx                (Layout + Provider auth)
├── page.tsx                  (Página)
├── _components/              (Componentes locales)
├── _hooks/                   (Custom hooks - fetch, filters)
├── _lib/                     (Utilitarios - formatting, math)
└── _services/                (API calls)

components/admin/             (Componentes reutilizables)
├── tables/
│   ├── users-table.tsx
│   ├── motos-table.tsx
│   └── reports-table.tsx
├── forms/
│   ├── user-ban-form.tsx
│   ├── report-decision-form.tsx
│   └── publish-action-form.tsx
├── filters/
│   ├── advanced-filter.tsx
│   └── date-range-picker.tsx
└── dialogs/
    ├── user-details-dialog.tsx
    ├── moto-preview-dialog.tsx
    └── report-details-dialog.tsx
```

### 2. SIN HOOKS PERSONALIZADOS PARA DATA FETCHING

**Problema:**
```
Los componentes deberían usar hooks para:
❌ Fetch de datos con suspense
❌ Caché con revalidación
❌ Paginación
❌ Filtros persistentes
❌ Error handling
```

**Solución:**
```tsx
// hooks/admin/use-users-list.tsx
export function useUsersList({ page, filters, sort }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUsers({ page, filters, sort }).then(setData);
  }, [page, filters, sort]);
  
  return { data, loading, error, total };
}

// En componente:
export function UsersAdmin() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const { data, loading, error } = useUsersList({ page, filters });
  
  return <UsersList />;
}
```

### 3. SIN ABSTRACCIÓN DE ESTADO GLOBAL

**Problema:**
```
❌ Filtros se pierden si cambio de página
❌ Búsqueda no persiste
❌ Selecciones múltiples se resetean
❌ Loading states comparten estado
```

**Solución:**
```tsx
// context/admin-filters-context.tsx
export const AdminFiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: null,
    dateRange: null,
    page: 1,
    sort: 'newest',
  });
  
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return (
    <AdminFiltersContext.Provider value={{ filters, updateFilters }}>
      {children}
    </AdminFiltersContext.Provider>
  );
};

// En componentes:
const { filters, updateFilters } = useContext(AdminFiltersContext);
```

### 4. COMPONENTES NO REUTILIZABLES

**Problema:**
```
admin-table.tsx existe pero:
❌ Solo se usa en dashboard
❌ No soporta acciones personalizadas
❌ Sin soporte para bulk actions
❌ Sin export data
```

**Debería ser:**
```tsx
// components/admin/data-table.tsx (Generic)
export function DataTable({
  data,
  columns,
  onRowClick,
  onBulkAction,
  actions,
  selectable = false,
  paginated = false,
}) {
  // Genérica para cualquier tabla
}

// Usage:
<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
  ]}
  actions={[
    { label: 'Ver', onClick: openUserDetails },
    { label: 'Banear', onClick: banUser },
  ]}
  selectable
  onBulkAction={handleBulkBan}
/>
```

### 5. SIN SISTEMA DE PERMISOS EN FRONTEND

**Problema:**
```tsx
// ACTUAL: Muestra todo a todos
export function AdminPage() {
  return (
    <div>
      <Dashboard />        {/* Visible para todos */}
      <UsersList />        {/* Visible para todos */}
      <ReportsList />      {/* Visible para todos */}
    </div>
  );
}

// DEBERÍA SER:
export function AdminPage() {
  const { user } = useAuth();
  
  return (
    <div>
      {can(user, 'view:dashboard') && <Dashboard />}
      {can(user, 'manage:users') && <UsersList />}
      {can(user, 'moderate:reports') && <ReportsList />}
    </div>
  );
}

// Hook personalizado
function can(user, permission) {
  const roles = {
    'ADMIN': ['view:dashboard', 'manage:users', 'moderate:reports'],
    'MODERATOR': ['moderate:reports'],
    'SUPPORT': ['view:dashboard'],
  };
  
  return roles[user.role]?.includes(permission) ?? false;
}
```

### 6. SIN FORM BUILDERS PARA ACCIONES

**Problema:**
```
Cada acción requiere un formulario:
❌ Ban usuario
❌ Rechazar publicación
❌ Marcar como fraud
❌ Resolver reporte

Cada uno es un componente diferente y duplicado.
```

**Solución:**
```tsx
// components/admin/action-form.tsx
export function ActionForm({
  title,
  fields,
  onSubmit,
  submitLabel = 'Enviar',
}) {
  return (
    <form onSubmit={onSubmit}>
      <h2>{title}</h2>
      {fields.map(field => (
        <Field key={field.name} {...field} />
      ))}
      <button type="submit">{submitLabel}</button>
    </form>
  );
}

// Usage:
<ActionForm
  title="Banear usuario"
  fields={[
    { name: 'reason', type: 'select', options: ['Estafa', 'Abuso', ...] },
    { name: 'duration', type: 'number', label: 'Días' },
    { name: 'message', type: 'textarea', label: 'Mensaje' },
  ]}
  onSubmit={async (data) => {
    await banUser(userId, data);
  }}
/>
```

### 7. SIN LOADING STATES/SKELETONS

**Problema:**
```
❌ Tablas vacías mientras loading
❌ Sin feedback de acción en progreso
❌ Sin diferencia entre "loading" vs "sin datos"
```

**Solución:**
```tsx
<DataTable
  data={data}
  loading={isLoading}
  skeleton={<UserTableSkeleton rows={10} />}
/>
```

### 8. SIN ERROR BOUNDARIES

**Problema:**
```
❌ Error en una tabla = admin todo roto
❌ Sin fallback UI
❌ Sin retry logic
```

**Solución:**
```tsx
<ErrorBoundary fallback={<AdminErrorFallback />}>
  <DataTable data={data} />
</ErrorBoundary>
```

---

## 💡 RECOMENDACIONES ESTRUCTURADAS

### RECOMENDACIÓN 1: Refactorizar Estructura de Carpetas

**Nuevo árbol:**
```
app/
├── admin/
│   ├── layout.tsx                    (Auth check)
│   ├── page.tsx                      (Dashboard)
│   ├── (motos)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  (Listado)
│   │   ├── [id]/
│   │   │   └── page.tsx              (Detalle + acciones)
│   │   ├── reportadas/
│   │   │   └── page.tsx
│   │   └── _components/
│   │       ├── motos-table.tsx
│   │       ├── moto-details.tsx
│   │       └── moto-actions.tsx
│   │
│   ├── (usuarios)/
│   │   ├── page.tsx                  (Listado)
│   │   ├── [id]/
│   │   │   └── page.tsx              (Perfil + sanciones)
│   │   ├── verificacion/
│   │   │   └── page.tsx
│   │   ├── prohibidos/
│   │   │   └── page.tsx
│   │   └── _components/
│   │       ├── users-table.tsx
│   │       ├── user-profile.tsx
│   │       └── verification-form.tsx
│   │
│   ├── (reportes)/
│   │   ├── page.tsx                  (Centro de reportes)
│   │   ├── [id]/
│   │   │   └── page.tsx              (Detalle de reporte)
│   │   └── _components/
│   │       ├── reports-table.tsx
│   │       ├── report-details.tsx
│   │       └── resolution-form.tsx
│   │
│   ├── estadisticas/
│   │   ├── page.tsx
│   │   └── _components/
│   │
│   ├── monetizacion/
│   │   ├── page.tsx
│   │   └── _components/
│   │
│   ├── _hooks/
│   │   ├── use-admin-filter.ts
│   │   ├── use-users-list.ts
│   │   ├── use-motos-list.ts
│   │   ├── use-reports-list.ts
│   │   └── use-admin-auth.ts
│   │
│   ├── _services/
│   │   ├── users.service.ts
│   │   ├── motos.service.ts
│   │   ├── reports.service.ts
│   │   └── actions.service.ts    (Logging de auditoría)
│   │
│   └── _lib/
│       ├── permissions.ts        (RBAC logic)
│       ├── formatters.ts
│       └── validators.ts

components/
├── admin/                          (Reutilizable al contexto)
│   ├── tables/
│   │   └── data-table.tsx         (Genérica)
│   ├── forms/
│   │   ├── action-form.tsx        (Genérica)
│   │   └── verification-form.tsx
│   ├── dialogs/
│   │   ├── item-details.tsx
│   │   └── confirm-action.tsx
│   ├── filters/
│   │   ├── advanced-filter.tsx
│   │   └── search-box.tsx
│   └── layout/
│       ├── admin-sidebar.tsx
│       ├── admin-header.tsx
│       └── admin-layout.tsx
```

---

### RECOMENDACIÓN 2: Crear Hook System para Data

```tsx
// hooks/admin/use-admin-list.ts (Generic hook)
export function useAdminList<T>({
  fetchFn,
  pageSize = 20,
  initialFilters = {},
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchFn({
        page,
        pageSize,
        ...filters,
      });
      setData(result.items);
      setTotal(result.total);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [page, filters, fetchFn, pageSize]);
  
  useEffect(() => {
    fetch();
  }, [fetch]);
  
  return {
    data,
    total,
    isLoading,
    error,
    filters,
    setFilters,
    page,
    setPage,
    pageSize,
    hasMore: (page * pageSize) < total,
  };
}

// Usage:
export function AdminUsers() {
  const {
    data: users,
    isLoading,
    filters,
    setFilters,
    page,
    setPage,
  } = useAdminList({
    fetchFn: userService.getList,
    initialFilters: { status: 'active' },
  });
  
  return (
    <>
      <AdvancedFilter filters={filters} onChange={setFilters} />
      <DataTable
        data={users}
        loading={isLoading}
        onPageChange={setPage}
      />
    </>
  );
}
```

---

### RECOMENDACIÓN 3: Sistema de Permisos (RBAC)

```tsx
// lib/permissions.ts
enum Permission {
  // Dashboard
  'VIEW_DASHBOARD',
  
  // Motos
  'VIEW_MOTOS',
  'EDIT_MOTOS',
  'MODERATE_MOTOS',      // Rechazar/Pausar
  'FEATURE_MOTOS',       // Destacar
  'DELETE_MOTOS',
  
  // Usuarios
  'VIEW_USERS',
  'EDIT_USERS',
  'BAN_USERS',
  'VERIFY_USERS',
  'VIEW_USER_DETAILS',
  
  // Reportes
  'VIEW_REPORTS',
  'RESOLVE_REPORTS',
  
  // Administrativo
  'VIEW_ANALYTICS',
  'MANAGE_MONETIZATION',
  'MANAGE_ROLES',
  'VIEW_AUDIT_LOG',
}

enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',        // Todos los permisos
  MODERATOR = 'MODERATOR',            // Moderar contenido
  EDITOR = 'EDITOR',                  // Publicaciones
  SUPPORT = 'SUPPORT',                // Ver info
  ANALYST = 'ANALYST',                // Ver reports
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  [Role.MODERATOR]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_MOTOS,
    Permission.MODERATE_MOTOS,
    Permission.VIEW_USERS,
    Permission.VIEW_USER_DETAILS,
    Permission.VIEW_REPORTS,
    Permission.RESOLVE_REPORTS,
    Permission.BAN_USERS,
  ],
  [Role.EDITOR]: [
    Permission.VIEW_MOTOS,
    Permission.EDIT_MOTOS,
    Permission.FEATURE_MOTOS,
  ],
  [Role.SUPPORT]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_USERS,
    Permission.VIEW_USER_DETAILS,
  ],
  [Role.ANALYST]: [
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_DASHBOARD,
  ],
};

export function can(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Hook
export function usePermission() {
  const { user } = useAuth();
  
  return {
    can: (permission: Permission) => can(user.role, permission),
    canMultiple: (permissions: Permission[]) =>
      permissions.some(p => can(user.role, p)),
    canAll: (permissions: Permission[]) =>
      permissions.every(p => can(user.role, p)),
  };
}

// Componente para proteger UI
export function IfCan({
  permission,
  fallback = null,
  children,
}: {
  permission: Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { can: hasPermission } = usePermission();
  
  return hasPermission(permission) ? children : fallback;
}

// Uso:
<IfCan permission={Permission.BAN_USERS}>
  <button onClick={banUser}>Banear</button>
</IfCan>
```

---

### RECOMENDACIÓN 4: Sistema de Auditoría/Logging

```tsx
// services/audit.service.ts
interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: AuditAction;
  resource: AuditResource;
  resourceId: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  reason?: string;
  timestamp: Date;
  ipAddress: string;
  status: 'success' | 'failed';
  error?: string;
}

enum AuditAction {
  'CREATE',
  'UPDATE',
  'DELETE',
  'BAN',
  'UNBAN',
  'SUSPEND',
  'VERIFY',
  'REJECT',
  'MODERATE',
  'FEATURE',
}

enum AuditResource {
  'USER',
  'MOTO',
  'REPORT',
  'TRANSACTION',
}

export const auditService = {
  async log(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    // Guardarlo en BD (cuando exista)
    const auditLog = {
      id: generateId(),
      timestamp: new Date(),
      ...entry,
    };
    
    // Por ahora, loguear a consola/localStorage para dev
    console.log('[AUDIT]', auditLog);
    
    return auditLog;
  },
  
  async getLog(filters: {
    adminId?: string;
    resource?: AuditResource;
    startDate?: Date;
    endDate?: Date;
    action?: AuditAction;
  }) {
    // Retornar del storage temporal
    return [];
  },
};

// Hook wrapper
export function useAudit() {
  const { user } = useAuth();
  const getClientIp = useClientIp();
  
  return {
    logAction: async (
      action: AuditAction,
      resource: AuditResource,
      resourceId: string,
      options?: { before?: any; after?: any; reason?: string }
    ) => {
      try {
        await auditService.log({
          adminId: user.id,
          adminName: user.name,
          action,
          resource,
          resourceId,
          status: 'success',
          ipAddress: getClientIp(),
          ...options,
        });
      } catch (error) {
        await auditService.log({
          adminId: user.id,
          adminName: user.name,
          action,
          resource,
          resourceId,
          status: 'failed',
          error: (error as Error).message,
          ipAddress: getClientIp(),
        });
      }
    },
  };
}

// Uso:
const { logAction } = useAudit();

async function banUser(userId: string, days: number, reason: string) {
  const before = await getUserData(userId);
  
  await userService.ban(userId, days);
  
  const after = await getUserData(userId);
  
  await logAction(
    AuditAction.BAN,
    AuditResource.USER,
    userId,
    { before, after, reason }
  );
}
```

---

### RECOMENDACIÓN 5: Notificaciones en Tiempo Real

```tsx
// hooks/use-admin-notifications.ts
export function useAdminNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    if (!user) return;
    
    // Conectar a WebSocket / Server-Sent Events
    const eventSource = new EventSource(
      `/api/admin/notifications?role=${user.role}`
    );
    
    eventSource.addEventListener('report-new', (e) => {
      const data = JSON.parse(e.data);
      addNotification({
        type: 'report-new',
        title: 'Nueva denuncia',
        message: `${data.reason}: ${data.motoTitle}`,
        actionUrl: `/admin/reportes/${data.id}`,
      });
    });
    
    eventSource.addEventListener('user-flagged', (e) => {
      const data = JSON.parse(e.data);
      addNotification({
        type: 'user-flagged',
        title: 'Usuario sospechoso',
        message: `${data.userName} - ${data.reason}`,
        severity: 'warning',
      });
    });
    
    return () => eventSource.close();
  }, [user]);
  
  return notifications;
}

// Uso en admin header:
export function AdminHeader() {
  const notifications = useAdminNotifications();
  
  return (
    <header>
      <NotificationBell
        count={notifications.length}
        notifications={notifications}
      />
    </header>
  );
}
```

---

### RECOMENDACIÓN 6: Data Tables Reutilizable

```tsx
// components/admin/data-table.tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  skeleton?: React.ReactNode;
  actions?: Action<T>[];
  selectable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  total?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: T) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
  rowKey: keyof T;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  skeleton,
  actions,
  selectable,
  paginated,
  pageSize = 20,
  total,
  currentPage = 1,
  onPageChange,
  onRowClick,
  onBulkAction,
  rowKey,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  
  if (loading && skeleton) return skeleton;
  if (!data.length) return <EmptyState />;
  
  return (
    <div className="space-y-4">
      {selectable && selected.size > 0 && (
        <BulkActions
          count={selected.size}
          actions={actions}
          onAction={(action) =>
            onBulkAction?.(action, Array.from(selected))
          }
        />
      )}
      
      <table className="w-full">
        <thead>
          <tr>
            {selectable && (
              <th>
                <Checkbox
                  checked={selected.size === data.length}
                  onChange={(checked) =>
                    setSelected(
                      checked
                        ? new Set(data.map((row) => String(row[rowKey])))
                        : new Set()
                    )
                  }
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
            {actions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <TableRow
              key={String(row[rowKey])}
              row={row}
              columns={columns}
              actions={actions}
              selected={selected.has(String(row[rowKey]))}
              onSelect={(id) => {
                const newSelected = new Set(selected);
                newSelected.has(id)
                  ? newSelected.delete(id)
                  : newSelected.add(id);
                setSelected(newSelected);
              }}
              onClick={() => onRowClick?.(row)}
            />
          ))}
        </tbody>
      </table>
      
      {paginated && (
        <Pagination
          pageSize={pageSize}
          total={total || 0}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

// Uso:
<DataTable<User>
  data={users}
  columns={[
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Estado', render: (status) => <Badge>{status}</Badge> },
  ]}
  actions={[
    { label: 'Ver', onClick: openUserDetails },
    { label: 'Banear', onClick: banUser },
  ]}
  selectable
  paginated
  rowKey="id"
  total={totalUsers}
  currentPage={page}
  onPageChange={setPage}
  loading={isLoading}
/>
```

---

### RECOMENDACIÓN 7: Filtros Avanzados

```tsx
// components/admin/advanced-filter.tsx
interface FilterConfig {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date-range' | 'number-range' | 'multi-select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export function AdvancedFilter({
  config,
  filters,
  onChange,
  onReset,
}: {
  config: FilterConfig[];
  filters: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
  onReset: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {Object.entries(filters)
          .filter(([_, v]) => v !== null && v !== undefined && v !== '')
          .map(([key, value]) => (
            <FilterTag
              key={key}
              name={config.find((c) => c.name === key)?.label || key}
              value={String(value)}
              onRemove={() =>
                onChange({ ...filters, [key]: null })
              }
            />
          ))}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
        >
          + Añadir filtro
        </button>
        
        {Object.values(filters).some((v) => v) && (
          <button onClick={onReset} variant="ghost">
            Limpiar filtros
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="p-4 border rounded-lg space-y-3">
          {config.map((field) => (
            <FilterField
              key={field.name}
              field={field}
              value={filters[field.name]}
              onChange={(value) =>
                onChange({ ...filters, [field.name]: value })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Uso:
<AdvancedFilter
  config={[
    { name: 'status', type: 'select', label: 'Estado', 
      options: [
        { value: 'active', label: 'Activo' },
        { value: 'banned', label: 'Baneado' },
      ]
    },
    { name: 'joinDate', type: 'date-range', label: 'Fecha de registro' },
    { name: 'reports', type: 'number-range', label: 'Reportes' },
  ]}
  filters={filters}
  onChange={setFilters}
  onReset={() => setFilters({})}
/>
```

---

## 📅 PLAN DE IMPLEMENTACIÓN

### FASE 1: FUNDAMENTOS (Semanas 1-4)
**Objetivo:** Sentar base sólida para arquitectura scalable

#### Sprint 1.1: Refactorización Arquitectónica (1 semana)
- [ ] Reorganizar carpetas según estructura recomendada
- [ ] Crear carpetas de hooks, services, lib
- [ ] Setup de context para filtros admin
- [ ] Setup de auth/roles básico (mockdata)

#### Sprint 1.2: Sistema de Permisos (1 semana)
- [ ] Implementar RBAC (roles y permisos)
- [ ] Componente `<IfCan />`
- [ ] Hook `usePermission()`
- [ ] Proteger rutas del admin

#### Sprint 1.3: Datos Realistas (1 semana)
- [ ] Crear services para usuarios, motos, reportes
- [ ] Hooks personalizados para list (useAdminList)
- [ ] Mock data en localStorage (preparar para BD real)
- [ ] Placeholder para API endpoints

#### Sprint 1.4: Data Table y Filtros (1 semana)
- [ ] Componente DataTable genérico + reutilizable
- [ ] Componente AdvancedFilter
- [ ] Paginación
- [ ] Búsqueda básica

**Entregables:**
✅ Admin con estructura scalable  
✅ Sistema de roles funcional  
✅ DataTable reutilizable  
✅ Filtros básicos  

---

### FASE 2: FUNCIONALIDADES CRÍTICAS (Semanas 5-8)
**Objetivo:** Implementar moderación y gestión de usuarios

#### Sprint 2.1: Gestión de Usuarios (1 semana)
- [ ] Listado de usuarios + filtros
- [ ] Vista detallada de usuario
- [ ] Acciones: Banear, Suspender, Cambiar rol
- [ ] Historial de acciones en usuario

#### Sprint 2.2: Moderación de Publicaciones (1 semana)
- [ ] Listado de motos + filtros avanzados
- [ ] Vista preview de publicación
- [ ] Acciones: Destacar, Pausar, Eliminar, Marcar verificada
- [ ] Bulk actions

#### Sprint 2.3: Centro de Reportes (1 semana)
- [ ] Cola de reportes
- [ ] Vista detallada de reporte
- [ ] Formulario de resolución
- [ ] Notificación a usuario

#### Sprint 2.4: Auditoría y Logging (1 semana)
- [ ] Servicio de auditoría
- [ ] Logging de todas las acciones
- [ ] Dashboard simple de acciones recientes
- [ ] Export de audit log

**Entregables:**
✅ Gestión de usuarios completa  
✅ Moderación de publicaciones  
✅ Centro de reportes  
✅ Sistema de auditoría  

---

### FASE 3: CARACTERÍSTICAS AVANZADAS (Semanas 9-12)
**Objetivo:** Analytics, notificaciones, monetización

#### Sprint 3.1: Estadísticas Avanzadas (1 semana)
- [ ] Dashboard mejorado con KPIs
- [ ] Gráficos (tendencias, distribuciones)
- [ ] Reportes exportables
- [ ] Métricas por provincia/marca

#### Sprint 3.2: Notificaciones Reales (1 semana)
- [ ] Setup WebSocket / Server-Sent Events
- [ ] Hook useAdminNotifications
- [ ] Badges en sidebar
- [ ] Centro de notificaciones

#### Sprint 3.3: Gestión de Monetización (1 semana)
- [ ] Dashboard de transacciones
- [ ] Gestión de comisiones
- [ ] Cupones/códigos
- [ ] Reportes de ingresos

#### Sprint 3.4: UI/UX Pulishing (1 semana)
- [ ] Skeletons en lugar de spinners
- [ ] Error boundaries
- [ ] Confirmaciones de acciones críticas
- [ ] Toasts mejorados

**Entregables:**
✅ Analytics completo  
✅ Notificaciones en tiempo real  
✅ Monetización básica  
✅ UI pulida  

---

### FASE 4: OPTIMIZACIÓN Y ESCALA (Semanas 13+)
**Objetivo:** Rendimiento, seguridad, detección de fraude

#### Sprint 4.1: Rendimiento (1 semana)
- [ ] Virtualización de tablas largas
- [ ] Lazy loading de datos
- [ ] Caching estratégico
- [ ] Compresión de datos

#### Sprint 4.2: Seguridad (1 semana)
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input validation + sanitization
- [ ] Encriptación de datos sensibles

#### Sprint 4.3: Detección de Fraude (1 semana)
- [ ] Análisis de patrones sospechosos
- [ ] Machine learning básico
- [ ] Alertas automáticas
- [ ] Sugerencias de acción

#### Sprint 4.4: Mobile Admin (1 semana)
- [ ] Admin responsivo para tablet
- [ ] Touch-friendly tables
- [ ] Notificaciones push

**Entregables:**
✅ Admin de nivel producción  
✅ Seguridad robusta  
✅ Detección de fraude básica  
✅ Compatible con mobile  

---

## 📊 MÉTRICAS DE ÉXITO

### Para el Admin

| Métrica | Target | Cómo medir |
|---------|--------|-----------|
| Tiempo de revisión de reporte | <5 min promedio | Log de auditoría |
| % reportes resueltos | >95% | Dashboard de analítica |
| Falsos positivos | <5% | Feedback de usuarios |
| MTTR (Mean Time To React) | <30 min | Logs de eventos |
| Productividad admin | 20+ moderar/sesión | Auto-meter por logs |

### Para el Marketplace

| Métrica | Impacto |
|---------|--------|
| Tasa de estafas reportadas | ↓ Cae 50% |
| Confianza del usuario | ↑ Sube NPS 20 puntos |
| Usuarios baneados/mes | ↑ Detecta fraudes antes |
| Tiempo a resolución | ↓ Mejora respuesta |
| Admin burnout | ↓ Menos carga manual |

---

## 🎯 CONCLUSIÓN

El panel de administración de MotoMarket es **visualmente bonito pero funcionalmente vacío**. Para competir con marketplaces internacionales, necesita:

### CRÍTICO (Sin esto, fracasará):
1. ✅ Moderación de contenido robusta
2. ✅ Sistema de permisos/roles
3. ✅ Auditoría y logging
4. ✅ Gestión de usuarios (banning, verificación)
5. ✅ Filtros y búsqueda avanzada

### IMPORTANTE (Para operar eficientemente):
6. 🟡 Notificaciones reales
7. 🟡 Analytics avanzado
8. 🟡 Gestión de monetización
9. 🟡 Bulk actions
10. 🟡 Sistema de verificación de vendedores

### DIFERENCIADOR (Nice to have):
11. 🟢 Detección automática de fraude
12. 🟢 Sugerencias inteligentes
13. 🟢 A/B testing tools

### Next Steps Inmediatos:

**Semana 1:**
- [ ] Refactorizar estructura de carpetas
- [ ] Implementar RBAC básico
- [ ] Setup de Context para filtros

**Semana 2-3:**
- [ ] DataTable genérico + reutilizable
- [ ] AdvancedFilter component
- [ ] Listado de usuarios

**Semana 4:**
- [ ] Moderación de publicaciones
- [ ] Centro de reportes
- [ ] Sistema de auditoría

**Luego:** Ir escalando según roadmap de producto

---

**Documento creado:** Febrero 2026  
**Versión:** 1.0  
**Autor:** Product Manager + Software Architect  
**Revisor Recomendado:** CTO + Product Lead
