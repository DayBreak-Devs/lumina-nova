import {displayResources} from "./domElements.js"
    import {showSection} from "./navigator.js"
// ==========================================
// 5. RESOURCE DISPLAY FUNCTIONS
// ==========================================
// Creates an individual action button that opens a target link in a new browser tab.
export const renderResource = (name, link) => {
    let btn = document.createElement("button")
    btn.textContent = name

    btn.addEventListener("click", () => {
        window.open(link, "_blank")
    })
    displayResources.appendChild(btn)
}

// Extracts individual resource URLs from a module database record and renders their view buttons.
export const unpackResource = (resource) => {
    showSection(displayResources) 
    displayResources.innerHTML = "" 

    let guide = resource.url_guide
    let pracQue = resource.url_practiceQues
    let test = resource.url_topicTests
    let exam = resource.url_mockExam

    let head = document.createElement("h1")
    head.textContent = "RESOURCES";
    displayResources.appendChild(head);

    renderResource("Study Guide", guide)
    renderResource("Practice Questions", pracQue)
    renderResource("Topic Tests", test)
    renderResource("Mock Exams", exam)
}
