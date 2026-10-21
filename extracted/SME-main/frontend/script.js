const API_BASE = "https://dummyjson.com";

/*
 * This is a public demo API.
 * It may enforce rate limits or temporarily block browser requests.
 */

let employees = [];
let salaryChart = null;
let toastTimer = null;

const $ = (id) => document.getElementById(id);

const tableBody = $("employeeTable");


// -------------------------------
// INITIALIZATION
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
    $("currentDate").textContent = new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(new Date());

    loadEmployees();

    $("refreshBtn").addEventListener("click", loadEmployees);

    $("searchInput").addEventListener("input", renderEmployees);

    $("sortSelect").addEventListener("change", renderEmployees);

    $("clearSearchBtn").addEventListener("click", () => {
        $("searchInput").value = "";
        $("sortSelect").value = "id";
        renderEmployees();
    });

    $("addEmployeeBtn").addEventListener("click", () => {
        openEmployeeForm();
    });

    $("closeModal").addEventListener("click", closeEmployeeForm);
    $("cancelModal").addEventListener("click", closeEmployeeForm);
    $("closeDetails").addEventListener("click", closeDetailsModal);

    $("employeeForm").addEventListener("submit", saveEmployee);

    // Close modals by clicking outside them.
    $("employeeModal").addEventListener("click", (event) => {
        if (event.target === $("employeeModal")) {
            closeEmployeeForm();
        }
    });

    $("detailsModal").addEventListener("click", (event) => {
        if (event.target === $("detailsModal")) {
            closeDetailsModal();
        }
    });

    // Close open modals with Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeEmployeeForm();
            closeDetailsModal();
        }
    });

    // Update active navigation state.
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".nav-link").forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });
});


// -------------------------------
// API REQUESTS
// -------------------------------

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
    }

    const result = await response.json();

    // Dummy REST API commonly returns the record in "data".
    if (result.status === "error") {
        throw new Error(result.message || "The API returned an error.");
    }

    return result;
}



async function loadEmployees() {
    setApiStatus("Connecting", "loading");

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="loading-cell">
                Loading employee records...
            </td>
        </tr>
    `;

    $("refreshBtn").disabled = true;

    try {
        const result = await apiRequest(
            `${API_BASE}/users?limit=0`
        );

        if (!Array.isArray(result.users)) {
            throw new Error("Invalid API response.");
        }

        employees = result.users.map(user => ({
            id: user.id,
            employee_name:
                `${user.firstName} ${user.lastName}`.trim(),
            employee_age: user.age,

            // Demo value for this dashboard:
            // DummyJSON does not provide employee salaries.
            employee_salary: 30000 + (user.id * 2500),

            employee_image: user.image,
            employee_department: user.company?.department || "",
            employee_title: user.company?.title || ""
        }));

        setApiStatus("Connected", "online");

        renderDashboard();
        renderEmployees();

    } catch (error) {
        console.error("Unable to load employees:", error);

        setApiStatus("Unavailable", "offline");

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cell">
                    Unable to load employee records.
                    <br><br>
                    ${escapeHTML(error.message)}
                </td>
            </tr>
        `;

        destroyChart();

    } finally {
        $("refreshBtn").disabled = false;
    }
}



// Normalize the fields returned by the API.
function normalizeEmployee(employee) {
    if (!employee || employee.id == null) {
        return null;
    }

    return {
        id: employee.id,
        employee_name: String(employee.employee_name ?? ""),
        employee_salary: Number(employee.employee_salary) || 0,
        employee_age: Number(employee.employee_age) || 0
    };
}


// -------------------------------
// DASHBOARD STATISTICS
// -------------------------------

function renderDashboard() {
    const count = employees.length;

    const totalSalary = employees.reduce(
        (sum, employee) => sum + employee.employee_salary,
        0
    );

    const totalAge = employees.reduce(
        (sum, employee) => sum + employee.employee_age,
        0
    );

    const averageSalary = count ? totalSalary / count : 0;
    const averageAge = count ? totalAge / count : 0;

    const highestSalary = count
        ? Math.max(...employees.map((employee) => employee.employee_salary))
        : 0;

    $("totalEmployees").textContent = count.toLocaleString();

    $("averageSalary").textContent = formatCompactCurrency(averageSalary);

    $("averageAge").textContent = count
        ? `${averageAge.toFixed(1)} yrs`
        : "—";

    $("highestSalary").textContent = formatCompactCurrency(highestSalary);

    renderSalaryChart();

    renderInsights({
        count,
        averageSalary,
        averageAge,
        highestSalary
    });
}


// -------------------------------
// SALARY CHART
// -------------------------------

function destroyChart() {
    if (salaryChart) {
        salaryChart.destroy();
        salaryChart = null;
    }
}


function renderSalaryChart() {
    const canvas = $("salaryChart");

    destroyChart();

    if (!employees.length) {
        return;
    }

    const salaries = employees.map((employee) => employee.employee_salary);

    const maxSalary = Math.max(...salaries);

    const ranges = [
        {
            label: "0–25%",
            min: 0,
            max: maxSalary * 0.25
        },
        {
            label: "25–50%",
            min: maxSalary * 0.25,
            max: maxSalary * 0.5
        },
        {
            label: "50–75%",
            min: maxSalary * 0.5,
            max: maxSalary * 0.75
        },
        {
            label: "75–100%",
            min: maxSalary * 0.75,
            max: maxSalary
        }
    ];

    // Count employees within each salary band.
    // This chart is relative to the maximum salary in the dataset.
    const counts = ranges.map((range, index) => {
        return salaries.filter((salary) => {
            if (index === ranges.length - 1) {
                return salary >= range.min && salary <= range.max;
            }

            return salary >= range.min && salary < range.max;
        }).length;
    });

    salaryChart = new Chart(canvas, {
        type: "bar",

        data: {
            labels: ranges.map((range) => range.label),

            datasets: [{
                label: "Employees",
                data: counts,
                backgroundColor: "#477a60",
                borderRadius: 5,
                maxBarThickness: 45
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    backgroundColor: "#242424",
                    padding: 12,
                    displayColors: false
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },

                    border: {
                        display: false
                    },

                    ticks: {
                        color: "#777872",
                        font: {
                            family: "DM Sans",
                            size: 11
                        }
                    }
                },

                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                        color: "#777872",
                        font: {
                            family: "DM Sans",
                            size: 10
                        }
                    },

                    grid: {
                        color: "#eeeeea"
                    },

                    border: {
                        display: false
                    }
                }
            }
        }
    });
}


// -------------------------------
// AUTOMATIC WORKFORCE INSIGHTS
// -------------------------------

function renderInsights(stats) {
    const container = $("insightsList");

    if (!stats.count) {
        container.innerHTML = `
            <p class="muted">No employee data is available.</p>
        `;
        return;
    }

    const sorted = [...employees].sort(
        (a, b) => b.employee_salary - a.employee_salary
    );

    const highestPaid = sorted[0];

    const lowestPaid = sorted[sorted.length - 1];

    const salaryDifference =
        highestPaid.employee_salary - lowestPaid.employee_salary;

    const insights = [
        {
            title: "Workforce size",
            text: `The dataset contains ${stats.count} employee record${stats.count === 1 ? "" : "s"}.`
        },
        {
            title: "Compensation overview",
            text: `The average recorded salary is ${formatCurrency(stats.averageSalary)}. The highest recorded salary is ${formatCurrency(stats.highestSalary)}.`
        },
        {
            title: "Salary range",
            text: `The difference between the highest and lowest recorded salaries is ${formatCurrency(salaryDifference)}.`
        },
        {
            title: "Age overview",
            text: `The average recorded employee age is ${stats.averageAge.toFixed(1)} years.`
        }
    ];

    container.innerHTML = insights.map((insight) => `
        <article class="insight-item">
            <h4>${escapeHTML(insight.title)}</h4>
            <p>${escapeHTML(insight.text)}</p>
        </article>
    `).join("");
}


// -------------------------------
// EMPLOYEE DIRECTORY
// -------------------------------

function renderEmployees() {
    const search = $("searchInput").value.trim().toLowerCase();

    let filtered = employees.filter((employee) => {
        return (
            String(employee.employee_name).toLowerCase().includes(search) ||
            String(employee.id).toLowerCase().includes(search)
        );
    });

    const sort = $("sortSelect").value;

    switch (sort) {
        case "name":
            filtered.sort((a, b) =>
                a.employee_name.localeCompare(b.employee_name)
            );
            break;

        case "salary-desc":
            filtered.sort((a, b) =>
                b.employee_salary - a.employee_salary
            );
            break;

        case "salary-asc":
            filtered.sort((a, b) =>
                a.employee_salary - b.employee_salary
            );
            break;

        case "age":
            filtered.sort((a, b) =>
                a.employee_age - b.employee_age
            );
            break;

        default:
            filtered.sort((a, b) =>
                Number(a.id) - Number(b.id)
            );
    }

    $("recordCount").textContent =
        `${filtered.length} employee${filtered.length === 1 ? "" : "s"}`;

    $("tableSummary").textContent =
        `Showing ${filtered.length} of ${employees.length} records`;

    if (!filtered.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-cell">
                    No matching employees found.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = filtered.map((employee) => `
        <tr>
            <td>
                <div class="employee-cell">
                    <div class="employee-avatar">
                        ${escapeHTML(getInitials(employee.employee_name))}
                    </div>

                    <div>
                        <div class="employee-name">
                            ${escapeHTML(employee.employee_name || "Unnamed employee")}
                        </div>

                        <div class="employee-subtitle">
                            Employee record
                        </div>
                    </div>
                </div>
            </td>

            <td>
                <span class="employee-id">#${escapeHTML(employee.id)}</span>
            </td>

            <td>
                ${employee.employee_age > 0
                    ? `${employee.employee_age} yrs`
                    : "—"}
            </td>

            <td>
                <span class="salary-value">
                    ${formatCurrency(employee.employee_salary)}
                </span>
            </td>

            <td>
                <button
                    class="view-button"
                    data-action="view"
                    data-id="${escapeHTML(employee.id)}">
                    View details
                </button>
            </td>
        </tr>
    `).join("");
}


// Event delegation for dynamically generated rows.
tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const employee = employees.find(
        (item) => String(item.id) === button.dataset.id
    );

    if (!employee) {
        return;
    }

    if (button.dataset.action === "view") {
        openDetails(employee);
    }
});


// -------------------------------
// EMPLOYEE DETAILS
// -------------------------------

function openDetails(employee) {
    const averageSalary = employees.length
        ? employees.reduce(
            (sum, item) => sum + item.employee_salary, 0
        ) / employees.length
        : 0;

    const comparison = employee.employee_salary - averageSalary;

    let comparisonText;

    if (comparison > 0) {
        comparisonText =
            `This recorded salary is ${formatCurrency(comparison)} above the dataset average.`;
    } else if (comparison < 0) {
        comparisonText =
            `This recorded salary is ${formatCurrency(Math.abs(comparison))} below the dataset average.`;
    } else {
        comparisonText = "This recorded salary equals the dataset average.";
    }

    $("employeeDetails").innerHTML = `
        <div class="details-hero">
            <div class="employee-avatar">
                ${escapeHTML(getInitials(employee.employee_name))}
            </div>

            <div>
                <h3>${escapeHTML(employee.employee_name || "Unnamed employee")}</h3>
                <p>Employee ID: #${escapeHTML(employee.id)}</p>
            </div>
        </div>

        <div class="detail-row">
            <span>Employee ID</span>
            <strong>#${escapeHTML(employee.id)}</strong>
        </div>

        <div class="detail-row">
            <span>Full name</span>
            <strong>${escapeHTML(employee.employee_name || "—")}</strong>
        </div>

        <div class="detail-row">
            <span>Age</span>
            <strong>${employee.employee_age > 0
                ? `${employee.employee_age} years`
                : "Not available"}</strong>
        </div>

        <div class="detail-row">
            <span>Salary</span>
            <strong>${formatCurrency(employee.employee_salary)}</strong>
        </div>

        <div class="profile-comparison">
            <strong>Compensation comparison</strong>
            <br>
            ${escapeHTML(comparisonText)}
            <br><br>
            This is a statistical comparison, not a measure of employee performance.
        </div>

        <div class="modal-actions">
            <button class="secondary-button" id="editFromDetails">
                Edit employee
            </button>

            <button class="primary-button" id="deleteFromDetails">
                Delete
            </button>
        </div>
    `;

    $("detailsModal").classList.add("open");

    $("editFromDetails").addEventListener("click", () => {
        closeDetailsModal();
        openEmployeeForm(employee);
    });

    $("deleteFromDetails").addEventListener("click", () => {
        deleteEmployee(employee);
    });
}


function closeDetailsModal() {
    $("detailsModal").classList.remove("open");
}


// -------------------------------
// ADD / EDIT EMPLOYEE
// -------------------------------

function openEmployeeForm(employee = null) {
    $("employeeForm").reset();

    $("formMessage").textContent = "";

    $("employeeId").value = employee ? employee.id : "";

    $("modalTitle").textContent = employee
        ? "Edit employee"
        : "Add employee";

    $("saveEmployeeBtn").textContent = employee
        ? "Update employee"
        : "Create employee";

    if (employee) {
        $("employeeName").value = employee.employee_name;
        $("employeeAge").value = employee.employee_age || "";
        $("employeeSalary").value = employee.employee_salary;
    }

    $("employeeModal").classList.add("open");
}


function closeEmployeeForm() {
    $("employeeModal").classList.remove("open");
}


async function saveEmployee(event) {
    event.preventDefault();

    const id = $("employeeId").value;

    const name = $("employeeName").value.trim();

    const age = Number($("employeeAge").value);

    const salary = Number($("employeeSalary").value);

    if (!name) {
        $("formMessage").textContent = "Please enter an employee name.";
        return;
    }

    if (!Number.isInteger(age) || age < 18 || age > 100) {
        $("formMessage").textContent =
            "Please enter an age between 18 and 100.";
        return;
    }

    if (!Number.isFinite(salary) || salary < 0) {
        $("formMessage").textContent =
            "Please enter a valid non-negative salary.";
        return;
    }

    const payload = {
        name: name,
        age: age,
        salary: salary
    };

    const saveButton = $("saveEmployeeBtn");

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    try {
        let result;

        if (id) {
            result = await apiRequest(
                `${API_BASE}/update/${encodeURIComponent(id)}`,
                {
                    method: "PUT",
                    body: JSON.stringify(payload)
                }
            );
        } else {
            result = await apiRequest(
                `${API_BASE}/create`,
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                }
            );
        }

        /*
         * This is a demo API.
         * A successful response does not guarantee that changes persist.
         *
         * Reflect the operation in this browser session only.
         */

        if (id) {
            const index = employees.findIndex(
                (employee) => String(employee.id) === String(id)
            );

            if (index !== -1) {
                employees[index] = {
                    ...employees[index],
                    employee_name: name,
                    employee_age: age,
                    employee_salary: salary
                };
            }
        } else {
            const returnedId = result.data?.id;

            if (returnedId != null) {
                employees.unshift({
                    id: returnedId,
                    employee_name: name,
                    employee_age: age,
                    employee_salary: salary
                });
            } else {
                throw new Error(
                    "The API did not return an employee ID. Please refresh the records."
                );
            }
        }

        closeEmployeeForm();

        renderDashboard();
        renderEmployees();

        showToast(
            id
                ? "Update accepted by the demo API."
                : "Create request accepted by the demo API."
        );

    } catch (error) {
        console.error("Save failed:", error);

        $("formMessage").textContent =
            `${error.message}. Please try again.`;

    } finally {
        saveButton.disabled = false;

        saveButton.textContent = id
            ? "Update employee"
            : "Create employee";
    }
}


// -------------------------------
// DELETE EMPLOYEE
// -------------------------------

async function deleteEmployee(employee) {
    const confirmed = confirm(
        `Delete ${employee.employee_name || "this employee"}?\n\n` +
        "This sends a delete request to the demo API."
    );

    if (!confirmed) {
        return;
    }

    try {
        await apiRequest(
            `${API_BASE}/delete/${encodeURIComponent(employee.id)}`,
            {
                method: "DELETE"
            }
        );

        employees = employees.filter(
            (item) => String(item.id) !== String(employee.id)
        );

        closeDetailsModal();

        renderDashboard();
        renderEmployees();

        showToast(
            "Delete request accepted by the demo API."
        );

    } catch (error) {
        console.error("Delete failed:", error);

        showToast(
            `Could not delete employee: ${error.message}`
        );
    }
}


// -------------------------------
// UTILITIES
// -------------------------------

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}


function formatCompactCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        notation: "compact",
        maximumFractionDigits: 1
    }).format(Number(value) || 0);
}


function getInitials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);

    if (!parts.length) {
        return "NA";
    }

    return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}


function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}


function setApiStatus(message, state) {
    $("apiStatus").textContent = message;

    $("statusDot").className = "status-dot";

    if (state === "online") {
        $("statusDot").classList.add("online");
    } else if (state === "offline") {
        $("statusDot").classList.add("offline");
    }
}


function showToast(message) {
    const toast = $("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
