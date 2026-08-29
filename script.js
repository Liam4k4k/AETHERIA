const checkboxes = document.querySelectorAll(
    '.task input[type="checkbox"]'
);

function updateTask(task) {

    const label = task.closest('.task');

    if (task.checked) {
        label.classList.add('done');
    } else {
        label.classList.remove('done');
    }

    updateProgress();
}


function updateProgress() {

    const total = checkboxes.length;

    const completed = [...checkboxes]
        .filter(box => box.checked)
        .length;

    const remaining = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);


    document.getElementById('totalTasks').textContent = total;

    document.getElementById('completedTasks').textContent = completed;

    document.getElementById('remainingTasks').textContent = remaining;

    document.getElementById('progressText').textContent =
        percentage + '%';

    document.getElementById('progressBar').style.width =
        percentage + '%';
}


checkboxes.forEach(box => {

    box.addEventListener('change', () => {
        updateTask(box);
    });

});


updateProgress();
