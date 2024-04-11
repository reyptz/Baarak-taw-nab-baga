$(document).ready(function(){
    // Déclaration d'une liste de tâches vide
    let tasks = [];
  
    // Vérifie s'il y a des tâches enregistrées localement dans le navigateur
    if(localStorage.getItem('tasks')) {
        // Si des tâches sont trouvées, les récupérer et les assigner à la variable 'tasks'
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // Afficher les tâches récupérées
        displayTasks();
    }
  
    // Gestionnaire d'événement pour le clic sur le bouton d'ajout de tâche
    $('#addTaskBtn').click(function(){
        // Récupération des valeurs des champs de saisie
        let taskText = $('#taskInput').val();
        let startDate = $('#startDateInput').val();
        let endDate = $('#endDateInput').val();
        let priority = $('#prioritySelect').val();
        let status = $('#statusSelect').val();
        // Vérification si le champ de texte de la tâche n'est pas vide
        if(taskText !== '') {
            // Création d'un nouvel objet tâche
            let newTask = {
                task: taskText,
                startDate: startDate,
                endDate: endDate,
                priority: priority,
                status: status
            };
            // Ajout de la nouvelle tâche à la liste 'tasks'
            tasks.push(newTask);
            // Enregistrement de la liste mise à jour dans le stockage local
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // Affichage des tâches mises à jour
            displayTasks();
            // Réinitialisation des champs de saisie
            $('#taskInput').val('');
            $('#startDateInput').val('');
            $('#endDateInput').val('');
        }
    });
  
    // Fonction pour afficher les tâches dans le tableau HTML
    function displayTasks() {
        // Effacement du contenu actuel du tableau des tâches
        $('#taskList').empty();
        // Parcours de la liste 'tasks' pour afficher chaque tâche
        tasks.forEach(function(task, index){
            $('#taskList').append(`<tr id="task_${index}">
                                        <td>${task.task}</td>
                                        <td>${task.startDate}</td>
                                        <td>${task.endDate}</td>
                                        <td>${task.priority}</td>
                                        <td>${task.status}</td>
                                        <td><button class="editBtn button" aria-label="Modifier la tâche" data-index="${index}"><i class="fas fa-edit" style='font-size:20px;color:green'></i> </button>
                                        <br><button class="deleteBtn button" aria-label="Supprimer la tâche" data-index="${index}"><i class="fas fa-trash-alt" style='font-size:20px;color:red'></i> </button></br>
                                    </tr>`);
        });
    }
  
    // Gestionnaire d'événement pour le clic sur le bouton de suppression de tâche
    $(document).on('click', '.deleteBtn', function(){
        // Récupération de l'index de la tâche à supprimer
        let index = $(this).data('index');
        // Suppression de la tâche correspondante de la liste 'tasks'
        tasks.splice(index, 1);
        // Mise à jour de la liste dans le stockage local
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Réaffichage des tâches mises à jour
        displayTasks();
    });
  
    // Gestionnaire d'événement pour le clic sur le bouton de modification de tâche
    $(document).on('click', '.editBtn', function(){
        // Récupération de l'index de la tâche à modifier
        let index = $(this).data('index');
        // Récupération de la tâche correspondante
        let task = tasks[index];
        // Pré-remplissage des champs de saisie avec les détails de la tâche sélectionnée
        $('#taskInput').val(task.task);
        $('#startDateInput').val(task.startDate);
        $('#endDateInput').val(task.endDate);
        $('#prioritySelect').val(task.priority);
        $('#statusSelect').val(task.status);
        // Masquage du bouton d'ajout et affichage du bouton de mise à jour de la tâche
        $('#addTaskBtn').hide();
        $('#updateTaskBtn').data('index', index).show();
    });
  
    // Gestionnaire d'événement pour le clic sur le bouton de mise à jour de tâche
    $('#updateTaskBtn').click(function(){
        // Récupération de l'index de la tâche à mettre à jour
        let index = $(this).data('index');
        // Récupération des valeurs modifiées des champs de saisie
        let taskText = $('#taskInput').val();
        let startDate = $('#startDateInput').val();
        let endDate = $('#endDateInput').val();
        let priority = $('#prioritySelect').val();
        let status = $('#statusSelect').val();
        // Mise à jour de la tâche correspondante dans la liste 'tasks'
        tasks[index] = {
            task: taskText,
            startDate: startDate,
            endDate: endDate,
            priority: priority,
            status: status
        };
        // Enregistrement de la liste mise à jour dans le stockage local
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Affichage des tâches mises à jour
        displayTasks();
        // Réinitialisation des champs de saisie
        $('#taskInput').val('');
        $('#startDateInput').val('');
        $('#endDateInput').val('');
        // Affichage du bouton d'ajout et masquage du bouton de mise à jour
        $('#addTaskBtn').show();
        $('#updateTaskBtn').hide().removeData('index');
    });
  });
  