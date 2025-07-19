let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const recurrence = document.getElementById("recurrence").value;

  if (!title || !date) {
    alert("Please enter both title and date!");
    return;
  }

  const task = {
    title,
    date: new Date(date),
    recurrence
  };

  tasks.push(task);
  displayTasks();
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("recurrence").value = "none";
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class='fa-solid fa-circle-check' style='color:#7c3aed;'></i> ${task.title} – ${task.date.toLocaleString()} (${task.recurrence})`;
    // Re-trigger animation for new tasks
    li.style.animation = 'none';
    void li.offsetWidth; // trigger reflow
    li.style.animation = null;
    list.appendChild(li);
  });
}

setInterval(() => {
  const now = new Date();
  tasks.forEach((task) => {
    const diff = Math.abs(now - task.date);
    if (diff < 5000) {
      showNotification(`Reminder: ${task.title} is scheduled now!`);

      if (task.recurrence === "daily") task.date.setDate(task.date.getDate() + 1);
      if (task.recurrence === "weekly") task.date.setDate(task.date.getDate() + 7);
      if (task.recurrence === "monthly") task.date.setMonth(task.date.getMonth() + 1);
    }
  });
}, 5000);

function showNotification(msg) {
  const notif = document.getElementById("notifications");
  notif.textContent = msg;
  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}

// Cartoon bubble animation for background
(function cartoonBubbles() {
  const canvas = document.getElementById('cartoon-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);

  const colors = ['#ffeb3b', '#00e5ff', '#ff4081', '#69f0ae', '#fff'];
  const bubbles = Array.from({length: 22}, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 18 + Math.random() * 32,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 0.3 + Math.random() * 0.7,
    dx: (Math.random() - 0.5) * 0.5,
    alpha: 0.18 + Math.random() * 0.22
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const b of bubbles) {
      ctx.save();
      ctx.globalAlpha = b.alpha;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, 2 * Math.PI);
      ctx.fillStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
      b.y -= b.speed;
      b.x += b.dx;
      if (b.y + b.r < 0) {
        b.y = height + b.r;
        b.x = Math.random() * width;
      }
      if (b.x < -b.r) b.x = width + b.r;
      if (b.x > width + b.r) b.x = -b.r;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();