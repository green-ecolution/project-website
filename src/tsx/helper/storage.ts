export function setInitialLoad() {
    localStorage.setItem("green_ecolution_initial_load", "false");
}

export function isInitialLoad(): boolean {
    return localStorage.getItem("green_ecolution_initial_load") !== "false";
}
