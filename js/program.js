/* js/program.js — Interactive features for Program view */
(function () {
  'use strict';

  function initProgramInteractions() {
    var stageCards = document.querySelectorAll('.roadmap-stage-card');
    if (!stageCards.length) return;

    stageCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  window.initProgramInteractions = initProgramInteractions;

  document.addEventListener('DOMContentLoaded', function () {
    initProgramInteractions();
  });
})();

