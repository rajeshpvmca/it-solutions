// const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// if(!loggedInUser){
//     window.location.href = "login.html";
// }

// document.getElementById("userName").innerText =
//     loggedInUser.name;

// document.getElementById("userEmail").innerText =
//     loggedInUser.email;

// document.getElementById("dashboardName").innerText =
//     loggedInUser.name;

// // Initialize Dashboard
// window.onload = function() {
//     loadMenuByRole();
//     showContent('home');
// };

// // Load Menu based on role
// function loadMenuByRole() {
//     const desktopMenu = document.getElementById("sidebarMenu");
//     const mobileMenu = document.getElementById("mobileMenu");
//     const role = loggedInUser.role;
    
//     let menuHtml = `
//         <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="home" onclick="showContent('home')"><i class="fa-solid fa-house"></i> Home</a></li>
//         <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="profile" onclick="showContent('profile')"><i class="fa-solid fa-user"></i> Profile</a></li>
//     `;

//     if (role === "Admin") {
//         menuHtml += `
//             <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="analytics" onclick="showContent('analytics')"><i class="fa-solid fa-chart-line"></i> Analytics</a></li>
//         `;
//     } else if (role === "Developer") {
//         menuHtml += `
//             <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="projects" onclick="showContent('projects')"><i class="fa-solid fa-code-branch"></i> My Projects</a></li>
//             <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="tasks" onclick="showContent('tasks')"><i class="fa-solid fa-list-check"></i> Tasks</a></li>
//         `;
//     } else if (role === "Manager") {
//         menuHtml += `
//             <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="reports" onclick="showContent('reports')"><i class="fa-solid fa-file-invoice"></i> Team Reports</a></li>
//             <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="planning" onclick="showContent('planning')"><i class="fa-solid fa-calendar-days"></i> Project Planning</a></li>
//         `;
//     }

//     menuHtml += `<li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="settings" onclick="showContent('settings')"><i class="fa-solid fa-gear"></i> Settings</a></li>`;
    
//     if(desktopMenu) desktopMenu.innerHTML = menuHtml;
//     if(mobileMenu) mobileMenu.innerHTML = menuHtml;
// }


// // LOGOUT

// function logout(){

//     localStorage.removeItem("loggedInUser");

//     window.location.href = "index.html";

// }


// // SIDEBAR CONTENT

// function showContent(type){

//     const contentBox = document.getElementById("contentBox");

//     // Set active link style
//     document.querySelectorAll('.sidebar-link').forEach(link => {
//         link.classList.remove('active');
//     });
//     document.querySelectorAll(`[data-content-type="${type}"]`).forEach(link => {
//         link.classList.add('active');
//     });

//     // Close mobile offcanvas if it's open
//     const offcanvasElement = document.getElementById('sidebarOffcanvas');
//     if (offcanvasElement && typeof bootstrap !== 'undefined') {
//         const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
//         bsOffcanvas.hide();
//     }

//     if(type === "home"){
//         let roleContent = "";
//         if(loggedInUser.role === "Admin"){
//             roleContent = `
//                 <div class="row g-4 mt-2">
//                     <div class="col-md-4"><div class="card stat-card bg-primary text-white p-4"><h3>150</h3><p>Total Users</p><i class="fa-solid fa-users"></i></div></div>
//                     <div class="col-md-4"><div class="card stat-card bg-success text-white p-4"><h3>$12.5k</h3><p>Revenue</p><i class="fa-solid fa-dollar-sign"></i></div></div>
//                     <div class="col-md-4"><div class="card stat-card bg-warning text-white p-4"><h3>99.9%</h3><p>Uptime</p><i class="fa-solid fa-server"></i></div></div>
//                 </div>`;
//         } else if(loggedInUser.role === "Developer"){
//             roleContent = `
//                 <div class="row g-4 mt-2">
//                     <div class="col-md-4"><div class="card stat-card bg-info text-white p-4"><h3>12</h3><p>Active Sprints</p><i class="fa-solid fa-code"></i></div></div>
//                     <div class="col-md-4"><div class="card stat-card bg-dark text-white p-4"><h3>45</h3><p>Open PRs</p><i class="fa-solid fa-code-pull-request"></i></div></div>
//                     <div class="col-md-4"><div class="card stat-card bg-danger text-white p-4"><h3>3</h3><p>Bugs Found</p><i class="fa-solid fa-bug"></i></div></div>
//                 </div>`;
//         } else {
//             roleContent = `
//                 <div class="row g-4 mt-2">
//                     <div class="col-md-4"><div class="card stat-card bg-primary text-white p-4"><h3>8</h3><p>Active Projects</p><i class="fa-solid fa-diagram-project"></i></div></div>
//                     <div class="col-md-4"><div class="card stat-card bg-success text-white p-4"><h3>92%</h3><p>Team Perf.</p><i class="fa-solid fa-gauge-high"></i></div></div>
//                 </div>`;
//         }

//         contentBox.innerHTML = `
//             <div class="card-body" data-aos="fade-up">
//                 <h2 class="fw-bold">Welcome back, ${loggedInUser.name}!</h2>
//                 <p class="text-muted">You are logged in as <span class="badge bg-primary">${loggedInUser.role}</span></p>
//                 <hr>
//                 ${roleContent}
//             </div>
//         `;
//     }

//     else if(type === "profile"){

//         contentBox.innerHTML = `
//             <div class="card-body">
//                 <h2>User Profile</h2>

//                 <p><strong>Name:</strong> ${loggedInUser.name}</p>
//                 <p><strong>Email:</strong> ${loggedInUser.email}</p>
//                 <p><strong>Role:</strong> ${loggedInUser.role}</p>
//             </div>
//         `;

//     }

//     else if(type === "settings"){

//         contentBox.innerHTML = `
//             <div class="card-body">
//                 <h2>Settings</h2>
//                 <p>No settings available now.</p>
//             </div>
//         `;

//     }

//     else {
//         contentBox.innerHTML = `
//             <div class="card-body" data-aos="fade-in">
//                 <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
//                 <p class="lead">Module for ${type} is coming soon for ${loggedInUser.role}s.</p>
//                 <div class="text-center py-5"><i class="fa-solid fa-screwdriver-wrench fa-4x text-light"></i></div>
//             </div>
//         `;
//     }
// }
// // REDIRECT TO 404

// function redirect404(){
//     window.location.href = "404.html";
// }