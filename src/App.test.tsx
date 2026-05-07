import { describe, it, expect } from 'vitest';
// Simulamos la función aquí mismo para la prueba
const formatearTarea = (texto: string) => texto.trim().toUpperCase();

describe('Pruebas de Lógica de Task Pro', () => {
  
  it('debe quitar espacios y poner en mayúsculas', () => {
    const entrada = "   comprar pan   ";
    const resultadoEsperado = "COMPRAR PAN";

    expect(formatearTarea(entrada)).toBe(resultadoEsperado);
  });

  it('debe manejar correctamente las tildes', () => {
    const entrada = "compré café";
    // Esperamos que la función respete los acentos (dependiendo de tu configuración regional de node)
    expect(formatearTarea(entrada)).toBe("COMPRÉ CAFÉ");
  });
});