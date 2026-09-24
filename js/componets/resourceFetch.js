import {mySupabase,fetchFunction} from "../services/supabase.js"
import  {unpackResource} from "./resourceRender.js"
import {displayIndex,displaySchools,displayYear,displayCourses,displayModules,displayResources} from "./domElements.js"
import {showSection} from "./navigator.js"


// ==========================================
// 3. GLOBAL APPLICATION STATE
// ==========================================
// Hardcoded array list of static options for the step-by-step navigation.
export let faculties = ["Commence, Law and Management", "Engineering and Built Environment", "Health Sciences", "Humanities", "Science"]
export let years = [1, 2, 3, 4]

// Temporary array used to pass data from one step to the next as the user clicks through choices.
let arrayHolding = [];

// Navigation state variables used to construct dynamic database queries.
let table = null;
let filterKey = null;
let filterValue = null;
let filterValue2 = null;
let selection = null;
let year = null;

// ==========================================
// 6. NAVIGATION VIEWS (STEP-BY-STEP FLOW)
// ==========================================

// STEP 1: Render Faculty Options
export const InitFaculties = () => {
    showSection(displayIndex) 
    table = 'Schools'
    filterKey = "faculty"
    selection = "school" 
    
    displayIndex.innerHTML = "" 

    let head = document.createElement("h1")
    head.textContent = filterKey.toUpperCase();
    displayIndex.appendChild(head);

    faculties.forEach(function(item){
        let btn = document.createElement("button")
        btn.textContent = item

        btn.addEventListener("click", async () => {
            filterValue = item
            let tempArr = await fetchFunction(table, filterKey, filterValue, selection) 
            arrayHolding = tempArr
            InitSchool()
        })
        displayIndex.appendChild(btn)
    })
}

// STEP 2: Render School Options
const InitSchool = () => {
    showSection(displaySchools) 
    displaySchools.innerHTML = "" 

    let head = document.createElement("h1")
    head.textContent = "SCHOOL";
    displaySchools.appendChild(head);

    arrayHolding.forEach(function(item){
        let btn = document.createElement("button")
        btn.textContent = item

        btn.addEventListener("click", () => {
            filterValue = item
            let tempArr = years 
            arrayHolding = tempArr
            InitYears()
        })
        displaySchools.appendChild(btn)
    })
}

// STEP 3: Render Academic Year Options
const InitYears = () => {
    showSection(displayYear) 
    table = 'Courses'
    filterKey = "course_year"
    selection = "*"
    let filterkey2 = "school_name";
    filterValue2 = filterValue; // Use the previously selected school as the second filter

    displayYear.innerHTML = "" 

    let head = document.createElement("h1")
    head.textContent = filterKey.toUpperCase();
    displayYear.appendChild(head);

    arrayHolding.forEach(function(item){
        let btn = document.createElement("button")
        btn.textContent = item

        btn.addEventListener("click", async () => {
            filterValue = item
            let tempArr = await fetchFunction(table, filterKey, filterValue, selection, filterkey2, filterValue2) 
            arrayHolding = tempArr 
            console.log(arrayHolding)
            InitCourse()
        })
        displayYear.appendChild(btn)
    })
}

// STEP 4: Render Available Courses
const InitCourse = () => {
    showSection(displayCourses) 
    table = 'Modules'
    filterKey = "course_id"
    selection = "module_name"

    displayCourses.innerHTML = "" 

    let head = document.createElement("h1")
    head.textContent = "COURSES";
    displayCourses.appendChild(head);

    arrayHolding.forEach(function(item){
        let btn = document.createElement("button")
        btn.textContent = item.course_name

        btn.addEventListener("click", async () => {
            filterValue = item.id
            let tempArr = await fetchFunction(table, filterKey, filterValue, selection) 
            arrayHolding = tempArr
            InitModule()
        })
        displayCourses.appendChild(btn)
    })
}

// STEP 5: Render Available Modules
const InitModule = () => {
    showSection(displayModules) 
    table = 'Modules'
    filterKey = "module_name"
    selection = "*"

    displayModules.innerHTML = "" 

    let head = document.createElement("h1")
    head.textContent = filterKey.toUpperCase();
    displayModules.appendChild(head);

    arrayHolding.forEach(function(item){
        let btn = document.createElement("button")
        btn.textContent = item

        btn.addEventListener("click", async () => {
            filterValue = item
            let resourceObj = await fetchFunction(table, filterKey, filterValue, selection) 
            console.log(resourceObj[0])
            unpackResource(resourceObj[0])
        })
        displayModules.appendChild(btn)
    })
}