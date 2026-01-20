import { Router } from "expo-router";

/**
 * Go back to the previous page. If there is no previous page (likely after page reload), go to the home page.
 * @param router The navigation router.
 */
export function back(router: Router) {
    if (router.canGoBack()) {
        router.back();
    } else {
        router.replace('/');
    }
}