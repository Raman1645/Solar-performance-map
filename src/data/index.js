import pr_2024 from "./pr_ICR17";
// later: import pr_2025 from "./pr_ICR17_2025";

export function loadPRData() {
    return {
        pr_data: {
            ...pr_2024.pr_data
            // ...pr_2025.pr_data   // auto-expands when added
        }
    };
}
