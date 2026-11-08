'use strict'

// salvar.js - Salva automaticamente tudo da ficha

document.addEventListener('DOMContentLoaded', () => {
  const campos = document.querySelectorAll('input, textarea, select');

  // Função pra gerar um ID único baseado no título
  function getId(campo, index) {
    return campo.id || campo.name || `ficha-${index}`;
  }

  // 1. CARREGAR: Quando entra no site
  campos.forEach((campo, index) => {
    const id = getId(campo, index);
    const valorSalvo = localStorage.getItem(id);

    if (valorSalvo !== null) {
      if (campo.type === 'checkbox') {
        campo.checked = valorSalvo === 'true';
      } else {
        campo.value = valorSalvo;
      }
    }

    // 2. SALVAR: Sempre que digitar/mudar
    const evento = campo.type === 'checkbox' || campo.tagName === 'SELECT' ? 'change' : 'input';
    
    campo.addEventListener(evento, () => {
      if (campo.type === 'checkbox') {
        localStorage.setItem(id, campo.checked);
      } else {
        localStorage.setItem(id, campo.value);
      }
      console.log(`Salvo: ${id}`);
    });
  });

  // Botão pra limpar tudo se precisar (opcional)
  window.limparFicha = () => {
    if (confirm('Apagar tudo da ficha?')) {
      localStorage.clear();
      location.reload();
    }
  };
});