// App Integration Test
console.log('[TEST] Starting App integration test...');

// Simulate class loading order
try {
  console.log('[TEST] Checking EmotionEngine...');
  if (typeof EmotionEngine === 'undefined') throw new Error('EmotionEngine not loaded');
  
  console.log('[TEST] Checking MemorySystem...');
  if (typeof MemorySystem === 'undefined') throw new Error('MemorySystem not loaded');
  
  console.log('[TEST] Checking CompanionCore...');
  if (typeof CompanionCore === 'undefined') throw new Error('CompanionCore not loaded');
  
  console.log('[TEST] Checking FitnessExpert...');
  if (typeof FitnessExpert === 'undefined') throw new Error('FitnessExpert not loaded');
  
  console.log('[TEST] Checking NutritionExpert...');
  if (typeof NutritionExpert === 'undefined') throw new Error('NutritionExpert not loaded');
  
  console.log('[TEST] Checking LongevityExpert...');
  if (typeof LongevityExpert === 'undefined') throw new Error('LongevityExpert not loaded');
  
  console.log('[TEST] Checking PhilosophyCore...');
  if (typeof PhilosophyCore === 'undefined') throw new Error('PhilosophyCore not loaded');
  
  console.log('[TEST] Checking AmbroseHealthCore...');
  if (typeof AmbroseHealthCore === 'undefined') throw new Error('AmbroseHealthCore not loaded');
  
  console.log('[TEST] ✅ All modules loaded successfully!');
} catch (e) {
  console.error('[TEST] ❌ Error:', e.message);
  process.exit(1);
}
