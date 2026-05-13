// Global colors for charts
const chartColors = ['#2563EB', '#60A5FA', '#93C5FD', '#BFDBFE', '#1D4ED8', '#3B82F6'];
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(!loggedInUser){
    window.location.href = "login.html";
}

document.getElementById("userName").innerText =
    loggedInUser.name;

document.getElementById("userEmail").innerText =
    loggedInUser.email;

document.getElementById("dashboardName").innerText =
    loggedInUser.name;

// Initialize Dashboard
window.onload = function() {
    loadMenuByRole();
    showContent('home');
};

// Load Menu based on role
function loadMenuByRole() {
    const desktopMenu = document.getElementById("sidebarMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const role = loggedInUser.role;
    
    let menuHtml = `
        <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="home" onclick="showContent('home')"><i class="fa-solid fa-house"></i> Home</a></li>
        <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="profile" onclick="showContent('profile')"><i class="fa-solid fa-user"></i> Profile</a></li>
    `;

    if (role === "Admin") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="users" onclick="showContent('users')"><i class="fa-solid fa-users-gear"></i> User Management</a></li>
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="analytics" onclick="showContent('analytics')"><i class="fa-solid fa-chart-line"></i> Analytics</a></li>
        `;
    } else if (role === "Developer") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="projects" onclick="showContent('projects')"><i class="fa-solid fa-code-branch"></i> My Projects</a></li>
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="tasks" onclick="showContent('tasks')"><i class="fa-solid fa-list-check"></i> Tasks</a></li>
        `;
    } else if (role === "Manager") {
        menuHtml += `
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="reports" onclick="showContent('reports')"><i class="fa-solid fa-file-invoice"></i> Team Reports</a></li>
            <li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="planning" onclick="showContent('planning')"><i class="fa-solid fa-calendar-days"></i> Project Planning</a></li>
        `;
    }

    menuHtml += `<li class="nav-item"><a href="#" class="nav-link sidebar-link" data-content-type="settings" onclick="showContent('settings')"><i class="fa-solid fa-gear"></i> Settings</a></li>`;
    
    if(desktopMenu) desktopMenu.innerHTML = menuHtml;
    if(mobileMenu) mobileMenu.innerHTML = menuHtml;
}


// LOGOUT

function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

}


// SIDEBAR CONTENT

function showContent(type){
    const contentBox = document.getElementById("contentBox");

    // Set active link style
    // This targets both desktop and mobile menu links
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll(`[data-content-type="${type}"]`).forEach(link => {
        link.classList.add('active');
    });

    // Close mobile offcanvas if it's open
    const offcanvas = document.getElementById('sidebarOffcanvas');
    if (offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas) || new bootstrap.Offcanvas(offcanvas);
        // Ensure bootstrap.Offcanvas exists and is initialized
        bsOffcanvas.hide();
    }

    if(type === "home"){
        let roleContent = "";
        if(loggedInUser.role === "Admin"){
            roleContent = `
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card bg-primary text-white p-4"><h3>150</h3><p>Total Users</p><i class="fa-solid fa-users"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-success text-white p-4"><h3>$12.5k</h3><p>Revenue</p><i class="fa-solid fa-dollar-sign"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-warning text-white p-4"><h3>99.9%</h3><p>Uptime</p><i class="fa-solid fa-server"></i></div></div>
                </div>`;
        } else if(loggedInUser.role === "Developer"){
            roleContent = `
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card bg-info text-white p-4"><h3>12</h3><p>Active Sprints</p><i class="fa-solid fa-code"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-dark text-white p-4"><h3>45</h3><p>Open PRs</p><i class="fa-solid fa-code-pull-request"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-danger text-white p-4"><h3>3</h3><p>Bugs Found</p><i class="fa-solid fa-bug"></i></div></div>
                </div>
                <div class="row g-4 mt-4">
                    <div class="col-md-6" data-aos="fade-up">
                        <div class="card p-3 h-100"><div id="developerLineChart"></div></div>
                    </div>
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card p-3 h-100"><div id="developerBarChart"></div></div>
                    </div>
                </div>
            `;
        } else {
            roleContent = `
                <div class="row g-4 mt-2">
                    <div class="col-md-4"><div class="card stat-card bg-primary text-white p-4"><h3>8</h3><p>Active Projects</p><i class="fa-solid fa-diagram-project"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-success text-white p-4"><h3>92%</h3><p>Team Perf.</p><i class="fa-solid fa-gauge-high"></i></div></div>
                    <div class="col-md-4"><div class="card stat-card bg-warning text-white p-4"><h3>$500k</h3><p>Monthly Budget</p><i class="fa-solid fa-wallet"></i></div></div>
                </div>
                <div class="row g-4 mt-4">
                    <div class="col-md-12" data-aos="fade-up">
                        <div class="card p-3 h-100"><div id="managerBarChart"></div></div>
                    </div>
                </div>
            `;
        }

        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">Welcome back, ${loggedInUser.name}!</h2>
                <p class="text-muted">You are logged in as <span class="badge bg-primary">${loggedInUser.role}</span></p>
                <hr>
                <h4 class="mt-4 mb-3">Overview</h4>
                ${roleContent}

                <!-- General Charts for all roles -->
                <div class="row g-4 mt-4">
                    <div class="col-lg-6" data-aos="fade-up">
                        <div class="card p-3 h-100">
                            <h5>Monthly Active Users</h5>
                            <div id="barChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card p-3 h-100">
                            <h5>Daily Server Load</h5>
                            <div id="lineChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6 mx-auto mt-4" data-aos="fade-up" data-aos-delay="400">
                        <div class="card p-3 h-100">
                            <h5>Project Status Distribution</h5>
                            <div id="doughnutChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Render charts after content is set
        renderHomeCharts();
    }

    else if(type === "profile"){

        contentBox.innerHTML = `
            <div class="card-body">
                <h2>User Profile</h2>
                <p><strong>Name:</strong> ${loggedInUser.name}</p>
                <p><strong>Email:</strong> ${loggedInUser.email}</p>
                <p><strong>Role:</strong> ${loggedInUser.role}</p>
            </div>
        `;
    }

    else if (type === "analytics" && loggedInUser.role === "Admin") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">Analytics Dashboard</h2>
                <p class="text-muted">In-depth insights for administrators.</p>
                <hr>
                <div class="row g-4 mt-4">
                    <div class="col-lg-6" data-aos="fade-up">
                        <div class="card p-3 h-100">
                            <h5>Team Performance by Project</h5>
                            <div id="stackedBarChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card p-3 h-100">
                            <h5>Revenue Trend (Last 6 Months)</h5>
                            <div id="revenueLineChart"></div>
                        </div>
                    </div>
                    <div class="col-lg-6 mx-auto mt-4" data-aos="fade-up" data-aos-delay="400">
                        <div class="card p-3 h-100">
                            <h5>Technology Stack Usage</h5>
                            <div id="techPieChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderAdminAnalyticsCharts();
    }

    else if (type === "users" && loggedInUser.role === "Admin") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">User Management</h2>
                <p class="text-muted">Manage all system users.</p>
                <hr>
                <div class="alert alert-info mt-4">User management features coming soon!</div>
            </div>
        `;
    }

    else if (type === "projects" && loggedInUser.role === "Developer") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">My Projects</h2>
                <p class="text-muted">View and manage your assigned projects.</p>
                <hr>
                <div class="alert alert-info mt-4">Project listing and details coming soon!</div>
            </div>
        `;
    }

    else if (type === "tasks" && loggedInUser.role === "Developer") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">My Tasks</h2>
                <p class="text-muted">Your current and pending tasks.</p>
                <hr>
                <div class="alert alert-info mt-4">Task management features coming soon!</div>
            </div>
        `;
    }

    else if (type === "reports" && loggedInUser.role === "Manager") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">Team Reports</h2>
                <p class="text-muted">Analyze team performance and progress.</p>
                <hr>
                <div class="alert alert-info mt-4">Detailed team reports coming soon!</div>
            </div>
        `;
    }

    else if (type === "planning" && loggedInUser.role === "Manager") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">Project Planning</h2>
                <p class="text-muted">Schedule and plan upcoming milestones.</p>
                <hr>
                <div class="alert alert-info mt-4">Planning module coming soon.</div>
            </div>
        `;
    }
    else if(type === "settings"){
        contentBox.innerHTML = `
            <div class="card-body">
                <h2>Settings</h2>
                <p>No settings available now.</p>
            </div>
        `;
    }
    else {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-in">
                <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <p class="lead">Module for ${type} is coming soon for ${loggedInUser.role}s.</p>
                <div class="text-center py-5"><i class="fa-solid fa-screwdriver-wrench fa-4x text-light"></i></div>
            </div>
        `;
    }
}

function renderHomeCharts() {
    // Monthly Active Users - Bar Chart
    new ApexCharts(document.querySelector("#barChart"), {
        series: [{ name: 'Users', data: [120, 190, 300, 500, 200, 300] }],
        chart: { type: 'bar', height: 350, toolbar: { show: false } },
        colors: [chartColors[0]],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
    }).render();

    // Daily Server Load - Line Chart
    new ApexCharts(document.querySelector("#lineChart"), {
        series: [{ name: 'Load %', data: [20, 15, 45, 80, 60, 30] }],
        chart: { type: 'line', height: 350, toolbar: { show: false }, zoom: { enabled: false } },
        colors: [chartColors[1]],
        stroke: { curve: 'smooth' },
        xaxis: { categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] }
    }).render();

    // Project Status - Pie/Doughnut Chart
    new ApexCharts(document.querySelector("#doughnutChart"), {
        series: [45, 25, 30],
        chart: { type: 'donut', height: 350 },
        labels: ['Web', 'Cloud', 'DevOps'],
        colors: [chartColors[0], chartColors[1], chartColors[2]]
    }).render();

    // Role-specific Home Charts
    if (loggedInUser.role === "Developer") {
        new ApexCharts(document.querySelector("#developerLineChart"), {
            series: [{ name: 'Commits', data: [3, 7, 2, 8, 4] }],
            chart: { type: 'line', height: 250, toolbar: { show: false } },
            stroke: { curve: 'stepline' },
            colors: [chartColors[4]]
        }).render();
        new ApexCharts(document.querySelector("#developerBarChart"), {
            series: [{ name: 'Tasks', data: [5, 8, 12, 6] }],
            chart: { type: 'bar', height: 250, toolbar: { show: false } },
            colors: [chartColors[0]],
            xaxis: { categories: ['Auth', 'DB', 'UI', 'API'] }
        }).render();
    } else if (loggedInUser.role === "Manager") {
        new ApexCharts(document.querySelector("#managerBarChart"), {
            series: [{ name: 'Progress %', data: [85, 70, 95] }],
            chart: { type: 'bar', height: 300, toolbar: { show: false } },
            plotOptions: { bar: { horizontal: true } },
            colors: [chartColors[2]],
            xaxis: { categories: ['Team A', 'Team B', 'Team C'] }
        }).render();
    }
}

function renderAdminAnalyticsCharts() {
    // Team Performance - Stacked Bar
    new ApexCharts(document.querySelector("#stackedBarChart"), {
        series: [
            { name: 'Completed', data: [12, 19, 3] },
            { name: 'Pending', data: [2, 3, 1] }
        ],
        chart: { type: 'bar', height: 350, stacked: true, toolbar: { show: false } },
        colors: [chartColors[0], chartColors[1]],
        xaxis: { categories: ['Project X', 'Project Y', 'Project Z'] }
    }).render();

    // Revenue Trend - Line
    new ApexCharts(document.querySelector("#revenueLineChart"), {
        series: [{ name: 'Revenue ($)', data: [1000, 1500, 1200, 1800, 2200, 2500] }],
        chart: { type: 'line', height: 350, toolbar: { show: false } },
        stroke: { width: 4, curve: 'smooth' },
        colors: [chartColors[4]],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
    }).render();

    // Tech Stack - Pie
    new ApexCharts(document.querySelector("#techPieChart"), {
        series: [40, 30, 20, 10],
        chart: { type: 'pie', height: 350 },
        labels: ['React', 'Node.js', 'AWS', 'Docker'],
        colors: [chartColors[0], chartColors[1], chartColors[2], chartColors[3]]
    }).render();
}

// REDIRECT TO 404

function redirect404(){
    window.location.href = "404.html";
}