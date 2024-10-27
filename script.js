const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');
const leaderboard = document.getElementById('leaderboard');

let habits = [];
let userScores = {};

addHabitBtn.addEventListener('click', () => {
    const habit = habitInput.value.trim();
    if (habit) {
        habits.push({ name: habit, streak: 0 });
        userScores[habit] = 0;
        habitInput.value = '';
        renderHabits();
        renderLeaderboard();
    }
});

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.textContent = `${habit.name} (Streak: ${habit.streak})`;
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => completeHabit(index);
        li.appendChild(completeBtn);
        habitList.appendChild(li);
    });
}

function completeHabit(index) {
    habits[index].streak++;
    userScores[habits[index].name]++;
    renderHabits();
    renderLeaderboard();
}

function renderLeaderboard() {
    leaderboard.innerHTML = '';
    const sortedScores = Object.entries(userScores).sort((a, b) => b[1] - a[1]);
    sortedScores.forEach(([habit, score]) => {
        const li = document.createElement('li');
        li.textContent = `${habit}: ${score}`;
        leaderboard.appendChild(li);
    });
}