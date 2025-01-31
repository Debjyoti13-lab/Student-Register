
// Ensuring script runs after loading full html page
document.addEventListener("DOMContentLoaded", () => {
    //taking form as variable 
    const studentForm = document.getElementById("studentForm");
    // taking studentlist inside of variable here student list means it will dynamically add rows 
    const studentList = document.getElementById("studentList");
    
    function loadStudents() {
        //Retrieves student data from localstorage if there is no data empty string will be added to table
        studentList.innerHTML = localStorage.getItem("students") || "";

        attachEventListeners();
    }
    
    studentForm.addEventListener("submit", (e) => {
        // preventdefault is preventing from its orignal behavior 
        e.preventDefault();

        // taking values from input storing them into a variable
        const name = document.getElementById("name").value.trim();
        const studentID = document.getElementById("studentID").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        // checking that any field is null or not if empty then return and preventing submission
        if (!name || !studentID || !email || !contact) return;
        
        // create a row for student entry from the form
        const row = document.createElement("tr");
        // taking values form entry and also added two new button edit and delete
        row.innerHTML = `<td>${name}</td>
                         <td>${studentID}</td>
                         <td>${email}</td>
                         <td>${contact}</td>
                         <td><button class="edit">Edit</button> <button class="delete">Delete</button></td>`;
        // now taking whole row inserting into tbody
        studentList.appendChild(row);
        //saving updated studentlist in localstorage 
        localStorage.setItem("students", studentList.innerHTML);
        // reseting form means input field will empty after taking value
        studentForm.reset();
        // event lisnters for edit and delete
        attachEventListeners();
    });
    
    function attachEventListeners() {
        // finding all delete button applying foreach on that 
        studentList.querySelectorAll(".delete").forEach(button => {
            // selecting all clicked delete button
            button.addEventListener("click", () => {
                // removing nearest whole table row
                button.closest("tr").remove();
                // updates localstorage 
                localStorage.setItem("students", studentList.innerHTML);
            });
        });

          // finding all edit button applying foreach on that 
        studentList.querySelectorAll(".edit").forEach(button => {
            // adding event lisnter on clicked edit button
            button.addEventListener("click", () => {
                // taking whole table row into row variable
                const row = button.closest("tr");
                // filling form field with existing data from selected tablerow
                document.getElementById("name").value = row.cells[0].textContent;
                document.getElementById("studentID").value = row.cells[1].textContent;
                document.getElementById("email").value = row.cells[2].textContent;
                document.getElementById("contact").value = row.cells[3].textContent;
                // now it is populated on input field so existing table row has to be removed
                row.remove();
                // updating onto localstorage
                localStorage.setItem("students", studentList.innerHTML);
            });
        });
    }
    // to display existing data from localstorage
    loadStudents();
});