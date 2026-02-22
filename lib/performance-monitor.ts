/**
 * Performance Monitoring Utilities
 * Ayudantes para monitorear métricas Core Web Vitals y performance
 */

interface PerformanceMetrics {
  FCP: number | undefined // First Contentful Paint
  LCP: number | undefined // Largest Contentful Paint
  FID: number | undefined // First Input Delay
  CLS: number | undefined // Cumulative Layout Shift
  TTFB: number | undefined // Time to First Byte
}

export function measureCoreWebVitals(): PerformanceMetrics {
  const metrics: PerformanceMetrics = {
    FCP: undefined,
    LCP: undefined,
    FID: undefined,
    CLS: undefined,
    TTFB: undefined,
  }

  if (typeof window === 'undefined') return metrics

  // FCP - First Contentful Paint
  const paintEntries = performance.getEntriesByType('paint')
  const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint')
  if (fcpEntry) metrics.FCP = Math.round(fcpEntry.startTime)

  // TTFB - Time to First Byte (Navigation Timing)
  const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navTiming?.responseStart) {
    metrics.TTFB = Math.round(navTiming.responseStart - navTiming.fetchStart)
  }

  // LCP, FID, CLS - Usar PerformanceObserver
  // (Estas requieren listeners activos durante la vida de la página)
  
  return metrics
}

export function logPerformanceMetrics() {
  if (typeof window === 'undefined') return

  // Web Vitals Library (si está disponible)
  const vitals = measureCoreWebVitals()
  
  console.group('📊 Core Web Vitals')
  console.log('FCP (First Contentful Paint):', vitals.FCP ? `${vitals.FCP}ms` : 'N/A')
  console.log('TTFB (Time to First Byte):', vitals.TTFB ? `${vitals.TTFB}ms` : 'N/A')
  console.groupEnd()

  // Memory usage (solo en DevTools)
  if ((performance as any).memory) {
    const memory = (performance as any).memory
    console.group('💾 Memory Usage')
    console.log(`Used JS Heap: ${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`)
    console.log(`Total JS Heap: ${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`)
    console.log(`Heap Limit: ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`)
    console.groupEnd()
  }
}

/**
 * Monitorear Long Tasks (tareas > 50ms)
 */
export function observeLongTasks(callback: (duration: number) => void) {
  if (typeof window === 'undefined') return

  // (( window as any).PerformanceObserver solo está disponible en navegadores modernos
  try {
    const observer = new (window as any).PerformanceObserver((list: any) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`⚠️ Long Task detected: ${entry.duration.toFixed(2)}ms`)
          callback(entry.duration)
        }
      }
    })
    observer.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    // PerformanceObserver con 'longtask' no soportado
  }
}

export default {
  measureCoreWebVitals,
  logPerformanceMetrics,
  observeLongTasks,
}
