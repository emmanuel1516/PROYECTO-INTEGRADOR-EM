
export function toggleNavbar() {
    const navBar = document.querySelector(".navbar");
    const toggleButton = document.getElementById("navBarToggleButton");

    toggleButton.addEventListener("click", () => {
        navBar.classList.toggle("navbar--active");
    });


}