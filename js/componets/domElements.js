// ==========================================
// 2. DOM ELEMENT REFERENCES
// ==========================================
// Grab references to the HTML container <div> tags where content will be rendered dynamically.
export let displayIndex = document.getElementById("display-index")
export let displaySchools = document.getElementById("display-schools")
export let displayCourses = document.getElementById("display-courses")
export let displayYear = document.getElementById("display-year")
export let displayModules = document.getElementById("display-modules")
export let displayResources = document.getElementById("display-resource")

// Navigation bar controls
export const btnPrev = document.getElementById("btn-prev")
export const btnReset = document.getElementById("btn-reset")
export const stepIndicator = document.getElementById("nav-step-indicator")

export const emptyResponseFunction = () => {
    let error = document.createElement('div')
    error.className = "error-page"
    let errorMessage = document.createElement("p")
    errorMessage.textContent = "Strange...theres nothing here. Press 'Restart' and choose a different path"
    error.appendChild(errorMessage)
    return error
}
