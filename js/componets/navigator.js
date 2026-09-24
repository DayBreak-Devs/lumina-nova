import {btnPrev,btnReset} from "./domElements.js"
import{InitFaculties} from "./resourceFetch.js"
import {displayIndex,displaySchools,displayYear,displayCourses,displayModules,displayResources,stepIndicator} from "./domElements.js"

// ==========================================
// 4. UI DISPLAY & NAVIGATION HELPERS
// ==========================================
// Syncs Back and Restart button states and step indicator


// Step containers in chronological sequence
const stepContainers = [displayIndex, displaySchools, displayYear, displayCourses, displayModules, displayResources]
const stepNames = ["Faculty", "School", "Year", "Courses", "Modules", "Resources"]
let currentStep = 0

export const updateNavState = () => {
    if (!btnPrev || !btnReset) return

    // Back & Restart are disabled only on the very first screen (Faculty)
    const isFirstStep = (currentStep === 0)
    btnPrev.disabled = isFirstStep
    btnReset.disabled = isFirstStep

    // Update step indicator text
    if (stepIndicator) {
        stepIndicator.textContent = `Step ${currentStep + 1} of ${stepContainers.length} • ${stepNames[currentStep]}`
    }
}

// Hides all screen containers first, then displays only the active container passed as an argument.
export const showSection = (target) => {
    stepContainers.forEach(container => {
        if (container) container.style.display = "none"
    })
    if (target) {
        target.style.display = "block"
        currentStep = stepContainers.indexOf(target)
        updateNavState()
    }
}

// Navigation event listeners
btnPrev?.addEventListener("click", () => {
    if (currentStep > 0) {
        showSection(stepContainers[currentStep - 1])
    }
})

btnReset?.addEventListener("click", () => {
    InitFaculties()
})