export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useCookie("restaurant-pos-user");

  if (to.path === "/login" && auth.value) {
    return navigateTo("/");
  } else {
    abortNavigation();
  }

  if (to.path !== "/login" && !auth.value) {
    return navigateTo("/login");
  }
});
