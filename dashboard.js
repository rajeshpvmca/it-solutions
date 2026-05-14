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
            <div class="card-body" data-aos="fade-up">
                <div class="row align-items-center mb-4">
                    <div class="col-md-auto text-center mb-3 mb-md-0">
                        <div class="position-relative d-inline-block">
                            <img src="assets/img/logo.webp" class="rounded-circle border p-1 bg-white shadow-sm" style="width: 120px; height: 120px; object-fit: contain;" alt="Profile">
                            <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-success border border-2 border-white p-2"><span class="visually-hidden">Online</span></span>
                        </div>
                    </div>
                    <div class="col-md ps-md-4">
                        <h2 class="fw-bold mb-1">${loggedInUser.name}</h2>
                        <p class="text-muted mb-2"><i class="fa-solid fa-envelope me-2"></i>${loggedInUser.email}</p>
                        <span class="badge bg-soft-primary text-primary border px-3 py-2"><i class="fa-solid fa-shield-halved me-2"></i>System Administrator</span>
                    </div>
                </div>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-md-6">
                        <h5 class="fw-bold mb-3">Account Details</h5>
                        <div class="list-group list-group-flush">
                            <div class="list-group-item d-flex justify-content-between px-0"><span>Employee ID</span><span class="fw-semibold">#ADM-4492</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0"><span>Join Date</span><span class="fw-semibold">March 12, 2024</span></div>
                            <div class="list-group-item d-flex justify-content-between px-0"><span>Access Level</span><span class="fw-semibold text-danger">Root / Superuser</span></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5 class="fw-bold mb-3">Recent Activity</h5>
                        <div class="small">
                            <p class="mb-2"><i class="fa-solid fa-clock-rotate-left me-2 text-primary"></i> Logged in from 192.168.1.1 <span class="text-muted float-end">2m ago</span></p>
                            <p class="mb-2"><i class="fa-solid fa-gear me-2 text-warning"></i> Updated System Uptime Monitor <span class="text-muted float-end">1h ago</span></p>
                        </div>
                    </div>
                </div>
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

    else if (type === "projects" && loggedInUser.role === "Developer") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-bold">My Projects</h2>
                        <p class="text-muted">Overview of your active development projects.</p>
                    </div>
                    <button class="btn btn-primary rounded-pill px-4"><i class="fa-solid fa-plus me-2"></i>New Project</button>
                </div>
                <hr>
                <div class="row g-4 mt-2">
                    <!-- Project 1 -->
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="100">
                        <div class="card border shadow-sm h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="badge bg-soft-primary text-primary px-3 py-2">E-commerce Portal</span>
                                    <span class="text-muted small">Updated 2h ago</span>
                                </div>
                                <h5 class="fw-bold">Cloud Inventory Sync</h5>
                                <p class="small text-muted">Implementing real-time inventory tracking using WebSockets and Node.js microservices.</p>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1 small">
                                        <span>Progress</span>
                                        <span>75%</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: 75%"></div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="avatar-group">
                                        <span class="badge rounded-pill bg-light text-dark border me-1">React</span>
                                        <span class="badge rounded-pill bg-light text-dark border">Node.js</span>
                                    </div>
                                    <a href="#" class="btn btn-link btn-sm text-primary p-0 text-decoration-none fw-bold">View Repo <i class="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Project 2 -->
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card border shadow-sm h-100">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="badge bg-soft-success text-success px-3 py-2">Internal Tool</span>
                                    <span class="text-muted small">Updated 1d ago</span>
                                </div>
                                <h5 class="fw-bold">AI Analytics Dashboard</h5>
                                <p class="small text-muted">Building a predictive analysis tool using Python and integrating with the main dashboard.</p>
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between mb-1 small">
                                        <span>Progress</span>
                                        <span>40%</span>
                                    </div>
                                    <div class="progress" style="height: 6px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 40%"></div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="avatar-group">
                                        <span class="badge rounded-pill bg-light text-dark border me-1">Python</span>
                                        <span class="badge rounded-pill bg-light text-dark border">D3.js</span>
                                    </div>
                                    <a href="#" class="btn btn-link btn-sm text-primary p-0 text-decoration-none fw-bold">View Repo <i class="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    else if (type === "tasks" && loggedInUser.role === "Developer") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">My Tasks</h2>
                <p class="text-muted">Manage your daily development workflow.</p>
                <hr>
                <div class="table-responsive mt-4">
                    <table class="table table-hover align-middle border-top">
                        <thead class="bg-light">
                            <tr>
                                <th>Task Description</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-aos="fade-right" data-aos-delay="100">
                                <td>
                                    <div class="fw-bold">Fix Middleware Authentication Bug</div>
                                    <div class="small text-muted">Sprint 12 - Hotfix</div>
                                </td>
                                <td><span class="badge bg-danger rounded-pill px-3">High</span></td>
                                <td>Today, 5:00 PM</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-success me-1"><i class="fa-solid fa-check"></i></button>
                                    <button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr data-aos="fade-right" data-aos-delay="200">
                                <td>
                                    <div class="fw-bold">Refactor Database Schema</div>
                                    <div class="small text-muted">Architecture optimization</div>
                                </td>
                                <td><span class="badge bg-warning text-dark rounded-pill px-3">Medium</span></td>
                                <td>Oct 28, 2024</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-success me-1"><i class="fa-solid fa-check"></i></button>
                                    <button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                            <tr data-aos="fade-right" data-aos-delay="300">
                                <td>
                                    <div class="fw-bold">Update API Documentation</div>
                                    <div class="small text-muted">Swagger / OpenDocs</div>
                                </td>
                                <td><span class="badge bg-info text-white rounded-pill px-3">Low</span></td>
                                <td>Nov 02, 2024</td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-outline-success me-1"><i class="fa-solid fa-check"></i></button>
                                    <button class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    else if (type === "reports" && loggedInUser.role === "Manager") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 class="fw-bold">Team Performance Reports</h2>
                        <p class="text-muted">Analytics and efficiency metrics for the current sprint.</p>
                    </div>
                    <button class="btn btn-outline-primary btn-sm rounded-pill px-3"><i class="fa-solid fa-file-export me-1"></i> Export PDF</button>
                </div>
                <hr>
                <div class="row g-4">
                    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="100">
                        <div class="card bg-soft-primary border-0 p-4 h-100 shadow-sm">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted small mb-1 uppercase fw-bold">Team Velocity</p>
                                    <h3 class="fw-bold mb-0">94.2%</h3>
                                    <span class="text-success small fw-bold"><i class="fa-solid fa-caret-up me-1"></i>2.4%</span>
                                </div>
                                <div class="fs-2 text-primary opacity-50"><i class="fa-solid fa-gauge-high"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="200">
                        <div class="card bg-soft-success border-0 p-4 h-100 shadow-sm">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted small mb-1 uppercase fw-bold">Tickets Resolved</p>
                                    <h3 class="fw-bold mb-0">428</h3>
                                    <span class="text-success small fw-bold"><i class="fa-solid fa-caret-up me-1"></i>12%</span>
                                </div>
                                <div class="fs-2 text-success opacity-50"><i class="fa-solid fa-circle-check"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="300">
                        <div class="card bg-soft-danger border-0 p-4 h-100 shadow-sm">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="text-muted small mb-1 uppercase fw-bold">Active Blockers</p>
                                    <h3 class="fw-bold mb-0">5</h3>
                                    <span class="text-danger small fw-bold"><i class="fa-solid fa-triangle-exclamation me-1"></i>Critical</span>
                                </div>
                                <div class="fs-2 text-danger opacity-50"><i class="fa-solid fa-hand"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-5" data-aos="fade-up" data-aos-delay="400">
                    <h5 class="fw-bold mb-3">Member Workload Distribution</h5>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle border-top">
                            <thead>
                                <tr class="text-muted small uppercase">
                                    <th>Member</th>
                                    <th>Role</th>
                                    <th>Current Workload</th>
                                    <th>Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="fw-bold">Alice Henderson</span></td>
                                    <td>Sr. Developer</td>
                                    <td style="width: 300px;">
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: 82%"></div>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-soft-success text-success border">Available in 2d</span></td>
                                </tr>
                                <tr>
                                    <td><span class="fw-bold">Marcus Thorne</span></td>
                                    <td>Cloud Architect</td>
                                    <td>
                                        <div class="progress" style="height: 6px;">
                                            <div class="progress-bar bg-warning" role="progressbar" style="width: 95%"></div>
                                        </div>
                                    </td>
                                    <td><span class="badge bg-soft-danger text-danger border">Full Capacity</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    else if (type === "planning" && loggedInUser.role === "Manager") {
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold">Strategic Project Planning</h2>
                <p class="text-muted">Roadmap overview and resource allocation for Q4.</p>
                <hr>
                <div class="row g-4 mt-2">
                    <div class="col-12" data-aos="fade-left" data-aos-delay="100">
                        <div class="card border-0 shadow-sm p-4 bg-light">
                            <h5 class="fw-bold"><i class="fa-solid fa-rocket me-2 text-primary"></i>Next Generation Cloud Migration</h5>
                            <p class="small text-muted mb-4">Strategic transition of regional databases to high-availability multi-cloud clusters.</p>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="small fw-bold">Phase: Resource Allocation</span>
                                <span class="small text-primary">65% Progress</span>
                            </div>
                            <div class="progress" style="height: 10px;">
                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 65%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="card border shadow-sm p-4 h-100">
                            <h6 class="fw-bold mb-3">Project Budget Utilization</h6>
                            <div class="list-group list-group-flush small">
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                                    <span>Infrastructure Ops</span><span class="fw-bold">$240,000</span>
                                </div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                                    <span>External Audits</span><span class="fw-bold">$45,000</span>
                                </div>
                                <div class="list-group-item d-flex justify-content-between px-0 bg-transparent">
                                    <span>Contingency Fund</span><span class="fw-bold">$12,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div class="card border shadow-sm p-4 h-100">
                            <h6 class="fw-bold mb-3">Planning Milestones</h6>
                            <ul class="list-unstyled small mt-2">
                                <li class="mb-3 d-flex align-items-center">
                                    <i class="fa-solid fa-circle text-primary me-3" style="font-size: 8px;"></i>
                                    <div>
                                        <div class="fw-bold">Security Audit Initiation</div>
                                        <div class="text-muted">Deadline: Oct 28, 2024</div>
                                    </div>
                                </li>
                                <li class="mb-3 d-flex align-items-center">
                                    <i class="fa-solid fa-circle text-muted me-3" style="font-size: 8px;"></i>
                                    <div>
                                        <div class="fw-bold">Beta Deployment (Stage 1)</div>
                                        <div class="text-muted">Expected: Nov 12, 2024</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    else if(type === "settings"){
        contentBox.innerHTML = `
            <div class="card-body" data-aos="fade-up">
                <h2 class="fw-bold mb-4">System Settings</h2>
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="card h-100 border-light shadow-sm">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-bell me-2 text-primary"></i> Notifications</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif1" checked>
                                    <label class="form-check-label" for="notif1">Email alerts for new user registrations</label>
                                </div>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="notif2" checked>
                                    <label class="form-check-label" for="notif2">Security & Uptime critical alerts</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card h-100 border-light shadow-sm">
                            <div class="card-body">
                                <h5 class="fw-bold mb-3"><i class="fa-solid fa-lock me-2 text-primary"></i> Security</h5>
                                <div class="form-check form-switch mb-3">
                                    <input class="form-check-input" type="checkbox" id="sec1" checked>
                                    <label class="form-check-label" for="sec1">Two-Factor Authentication (2FA)</label>
                                </div>
                                <button class="btn btn-outline-primary btn-sm rounded-pill px-4">Change Admin Password</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 pt-3 border-top d-flex gap-2">
                    <button class="btn btn-primary px-4 py-2" >Save Configuration</button>
                    <button class="btn btn-light border px-4 py-2">Reset to Default</button>
                </div>
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