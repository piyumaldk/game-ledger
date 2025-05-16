document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const progressText = document.getElementById("progress-circle-text");
  const progressCircle = document.querySelector(".progress-circle-fg");
  const circleCircumference = 2 * Math.PI * 30;

  checkboxes.forEach(checkbox => {
    const id = checkbox.dataset.id;
    const saved = localStorage.getItem(id);
    checkbox.checked = saved === "true";
  });

  function updateProgress() {
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / total) * 100);

    progressText.textContent = `${percent}%`;

    const offset = circleCircumference - (percent / 100) * circleCircumference;
    progressCircle.style.strokeDashoffset = offset;
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.dataset.id;
      localStorage.setItem(id, checkbox.checked);
      updateProgress();
    });
  });

  updateProgress();
});
