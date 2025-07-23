
export function toggleNavbar() {
    const navBar = document.querySelector(".navbar");
    const toggleButton = document.getElementById("navBarToggleButton");

    toggleButton.addEventListener("click", () => {
        navBar.classList.toggle("navbar--active");
    });

    // Cerrar el navbar si se hace clic fuera
    document.addEventListener("click", (event) => {
        const clickedInsideNavbar = navBar.contains(event.target);
        const clickedToggleButton = toggleButton.contains(event.target);

        if (!clickedInsideNavbar && !clickedToggleButton) {
            navBar.classList.remove("navbar--active");
        }
    });

}


